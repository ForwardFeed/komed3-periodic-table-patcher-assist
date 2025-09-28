
// Site web URL: https://commonchemistry.cas.org
// this is the API entrypoint for search
// const API_SEARCH = "https://rboq1qukh0.execute-api.us-east-2.amazonaws.com/default/search?q=${CAS_NUMBER}offset=0&size=30"
// this is the API entrypoint for compound directly
// const API_COMPOUNDS = "https://rboq1qukh0.execute-api.us-east-2.amazonaws.com/default/detail?cas_rn=${CAS_NUMBER}"

import { does_cache_file_exist, fetch_json_and_write_to_cache, get_from_cache_json, get_nist_compounds_data, write_to_cache_json } from "../filesystem_integration"

const API_KEY = "4vrOF3YIRf5vFkzLsed1i2OBH7BLUusf6NMu2UCD"
const USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64; rv:142.0) Gecko/20100101 Firefox/142.0'

// needs the CAS NUMBER from that previous mining
const nist_data = await get_nist_compounds_data()

async function download_to_cache(){

    for (const nist_entry of nist_data){
        const URL = `https://rboq1qukh0.execute-api.us-east-2.amazonaws.com/default/detail?cas_rn=${nist_entry.cas_number}`
        const filename = `compounds_${nist_entry.original_formula}_c_c.json`
        if (await does_cache_file_exist(filename)){
            continue
        }
        if (!nist_entry.cas_number){
            await write_to_cache_json(filename, {
                no_cas_number: true,
            })
            continue
        }
        const header = new Headers({
            "Host": "rboq1qukh0.execute-api.us-east-2.amazonaws.com",
            "Origin":"https://commonchemistry.cas.org",
            "Referer":"https://commonchemistry.cas.org/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "cross-site",
            'User-Agent': USER_AGENT,
            'X-API-KEY':  API_KEY
        })
        try {
            await fetch_json_and_write_to_cache(URL, filename, "GET", header)
        } catch(err_msg: any){
            if (err_msg == "response is not okay: 404"){
                console.error(`failed to get: ${nist_entry.original_formula} with cas: ${nist_entry.cas_number}, 404'd`)
                await write_to_cache_json(filename, {
                    404: true,
                    cas_number: nist_entry.cas_number
                })
            } else {
                throw(`failed to get: ${nist_entry.original_formula} with cas: ${nist_entry.cas_number},\nError message: ${err_msg}`)
            }
            
        }
        // I'm scared to be timeouted 
        await Bun.sleep(0.5)
    }
}

await download_to_cache()

type PropertyFound = {
    name: string,
    is_always_found: boolean
}

function get_all_properties(obj: unknown): string[] | undefined{
    if (typeof obj != "object" || obj == null){
        return undefined
    }
    return Object.keys(obj)
}

async function type_helper(){

    const property_list: PropertyFound[] = []

    function add_to_property_list(prop: string){
        if (! ~property_list.findIndex(x => x.name == prop)){
            property_list.push({
                name: prop,
                is_always_found: true
            })
            return
        }
    }
    function check_if_always_found(props: string[]){
        property_list.filter(x => x.is_always_found).forEach(x => {
            if (! props.includes(x.name)){
                x.is_always_found = false
            }
        })
    }
    for (const nist_entry of nist_data){
        const filename = `compounds_${nist_entry.original_formula}_c_c.json`
        if (! await does_cache_file_exist(filename)){
            console.error(`missing file: ${filename}`)
            continue
        }
        const file_data_json = await get_from_cache_json(filename)
        const props_found = get_all_properties(file_data_json)
        if (! props_found){
            throw(`not a JSON object: ${filename}`)
        }
        if ( props_found.includes('404') || props_found.includes('no_cas_number')){
            continue
        }
        props_found.forEach(add_to_property_list)
        check_if_always_found(props_found)
    }
    console.log(property_list)
}

await type_helper()