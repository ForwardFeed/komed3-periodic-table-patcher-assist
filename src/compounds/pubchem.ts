import {JSDOM} from "jsdom"
import { does_cache_file_exist, fetch_and_write_to_cache, fetch_json_and_write_to_cache, get_from_cache, get_nist_compounds_data, write_to_cache } from "../filesystem_integration";
import type { NIST_Compound } from "./nist";

/**
 * 
 * https://www.ncbi.nlm.nih.gov/pccompound/?term=7631-86-9 <= in HTML search gives link to 
 * https://pubchem.ncbi.nlm.nih.gov/compound/24261
 * https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/24261/JSON/
 * 
 * => Chemical and Physical Properties
 */

/** */
const nist_entries: readonly NIST_Compound[] = await get_nist_compounds_data()

async function download_with_(entry: NIST_Compound, filename: string, term: string): Promise<boolean>{
    const URL = `https://www.ncbi.nlm.nih.gov/pccompound/?term=${term}`
    try {
        await fetch_and_write_to_cache(URL, filename)
        const file_html = await get_from_cache(filename)
        const dom = new JSDOM(file_html)
        const document = dom.window.document
        if (document.title ==  "No items found - PubChem Compound - NCBI")
            return false
        return true
    }catch(e){
        return false
    }
    
}

async function download_to_cache(){
    for (const entry of nist_entries){
        const filename = `compounds_${entry.original_formula}_pubchem_search.html`
        // make sure we don't redownload it
        if (await does_cache_file_exist(filename)){
            continue
        }
        // if there's a cas prioritize it in search
        if (entry.cas_number){
            if (await download_with_(entry, filename, entry.cas_number))
                continue
        }
        // if not, or if the cas didn't gave any result, try by name.
        if (! await download_with_(entry, filename, entry.name)){
            console.error(`failed to get information on: ${entry.original_formula}`)
        }
        // I'm scared of timeout
        await Bun.sleep(0.4)
    }
}
await download_to_cache()


async function download_json_from_API(){
    for (const entry of nist_entries){
        const filename_json_data = `compounds_${entry.original_formula}_pubchem.json`
        // make sure we don't redownload it
        if (await does_cache_file_exist(filename_json_data)){
            continue
        }
        const filename_html_search = `compounds_${entry.original_formula}_pubchem_search.html`
        // prior steps may or may not have downloaded it
        if (! await does_cache_file_exist(filename_html_search)){
            continue
        }
        const file_html = await get_from_cache(filename_html_search)
        const dom = new JSDOM(file_html)
        const document = dom.window.document
        // prior steps may have failed to find it
        if (document.title ==  "No items found - PubChem Compound - NCBI"){
            continue 
        }
        // parse the searches for the fist result id (only first result)
        const first_search_result = document.querySelector<HTMLAnchorElement>('div.rprt p.title>a')
        if (!first_search_result){
            continue
        }
        const link = first_search_result.href
        const searched_CIDs =  /[0-9]+$/.exec(link)
        if (!searched_CIDs){
            throw `regex failed link: ${link}, compounds: ${entry.original_formula}`
        }
        const CID = searched_CIDs[0]
        const URL = `https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${CID}/JSON/`
        // download the data in JSON from the REST API
        try {
            await fetch_json_and_write_to_cache(URL, filename_json_data, "GET")
        } catch(err_msg: any){
            console.error(`failed to get: ${entry.original_formula} json data`)
        }
        // I'm scared of timeout
        await Bun.sleep(0.4)
    }
}

await download_json_from_API()