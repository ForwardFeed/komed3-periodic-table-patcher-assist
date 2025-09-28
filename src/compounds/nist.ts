import { fetch_and_write_to_cache, get_compounds_list_json, get_from_cache, write_nist_compounds_data } from "../filesystem_integration";
import {JSDOM} from "jsdom"
import { Symbols } from "../mainstream_structure";
import ChemParse from 'chemparse';
import { manual_nist_patching } from "./nist_manual_patch";

const compounds_list = await get_compounds_list_json()

const SHOULD_DOWNLOAD_TO_CACHE = false
const SHOULD_REDOWNLOAD_ON_NOT_FOUND = false

export type NIST_Compound = {
    original_formula: string,
    nist_formula: string | undefined, // if undefined means that it was manually fed
    name: string,
    mol_weight: number,
    cas_number: string | undefined,
    inchi_number: string | undefined,
    inchi_key: string | undefined
    chemical_structure_url: string | undefined
}

const compounds:NIST_Compound[] = manual_nist_patching

type Formula = {
    [key in Symbols]?: number
}

function convert_formula_with_chem_parse(formula: string): Formula{
    const parsed = ChemParse.parse(formula).elementCounts
    return Object.keys(parsed).reduce((cumu, curr)=>{
        const symbol = curr.toLowerCase() as Symbols
        // @ts-ignore ts stupid
        cumu[symbol] = +(parsed[curr] || -1)
        return cumu
    }, {} as Formula)
}



for (const original_formula of compounds_list){

    const formula = convert_formula_with_chem_parse(original_formula)

    const filename = `compounds_${original_formula}.html`
    if (SHOULD_DOWNLOAD_TO_CACHE){
        const URL = `https://webbook.nist.gov/cgi/cbook.cgi?Formula=${original_formula}&NoIon=on&Units=SI`
        await fetch_and_write_to_cache(URL, filename)
    }
    const file_html = await get_from_cache(filename)
    const dom = new JSDOM(file_html)
    const document = dom.window.document
    let name = document.title
    if (name == "Search Results"){
        const searches = [...document.querySelectorAll<HTMLAnchorElement>('main>ol>li>a')].map(x => x.href) as string[]
        if (searches.length < 1){
            throw `searche didn't give any result for: ${original_formula}`
        }
        const URL = `https://webbook.nist.gov/${searches[0]}`
        await fetch_and_write_to_cache(URL, filename)
        const file_html = await get_from_cache(filename)
        const dom2 = new JSDOM(file_html)
        const document2 = dom2.window.document
        name = document2.title
    }
    if (name == "Chemical Formula Not Found"){
        if (SHOULD_REDOWNLOAD_ON_NOT_FOUND){
            const URL = `https://webbook.nist.gov/cgi/cbook.cgi?Formula=${original_formula}&NoIon=on&Units=SI`
            await fetch_and_write_to_cache(URL, filename)
        }
        continue
    }
    const get_data_1 = (selector: string): undefined | string => {
        const title_target = document.querySelector(selector)?.parentElement
        if (!title_target){
            return undefined
        }
        const parent = title_target.parentElement
        if (!parent) throw `you should kill yourself, ⚡NOW⚡`
        title_target.remove()
        return parent.textContent.trim()
    }
    const get_data_2 = (text_in: string): undefined | string => {
        const text_targeted = [...document.querySelectorAll('li > strong')].find(x => x.textContent == text_in)
        if (!text_targeted) return undefined
        const parent = text_targeted.parentElement
        if (!parent) throw `you should kill yourself, ⚡NOW⚡`
        text_targeted.remove()
        return parent.textContent.trim()
    }
    
    const nist_formula = get_data_1('li [title="IUPAC definition of empirical formula"]')
    if (nist_formula && JSON.stringify(convert_formula_with_chem_parse(nist_formula)) != JSON.stringify(formula)){
        console.warn(`formulas: ${nist_formula} and ${original_formula} aren't the same?`)
    }
    let molecular_weight_str = get_data_1('li [title="IUPAC definition of relative molecular mass (molecular weight)"]')
    let molecular_weight_num = -1
    if (molecular_weight_str){
        if (isNaN(+molecular_weight_str)){
            throw `unrecognized mol weight: ${molecular_weight_str} for ${original_formula}`
        }
        molecular_weight_num = +molecular_weight_str
    }
    const InChI_number = document.querySelector('.inchi-text')?.textContent.trim()
    const InChI_key = document.querySelectorAll('.inchi-text')?.[1]?.textContent.trim()
    const CAS_number = get_data_2('CAS Registry Number:')
    let chemical_structure_URL = document.querySelector<HTMLImageElement>('.struct')?.src
    if (chemical_structure_URL){
        chemical_structure_URL = `https://webbook.nist.gov/${chemical_structure_URL}`
    }
    if (!nist_formula) throw `no empirical formula found for :${original_formula}`

    compounds.push({
        original_formula: original_formula,
        nist_formula: nist_formula,
        name,
        cas_number: CAS_number,
        inchi_number: InChI_number,
        inchi_key: InChI_key,
        chemical_structure_url: chemical_structure_URL,
        mol_weight: molecular_weight_num
    })
}

await write_nist_compounds_data(compounds)





/* function break_down_formula(formula: string): Formula{
    const basic_breakdown = formula.split(/(\([^\)]+\))/).map(x => x.split(/([A-Z][a-z0-9]+)/).filter(x => x))
    const formulat_to_return: Formula = {}
    let curr_parenthesese_element: Symbols[] = []
    basic_breakdown.forEach((row, index)=>{
        row.forEach((value, index)=>{
             if (!isNaN(+value)){
                if (! curr_parenthesese_element.length){
                    throw `formula: ${formula} had a lone number: ${value}`
                }
                curr_parenthesese_element
                return
            }
            if (value[0] == "("){
                const no_parenthesis = value.replace(/[\(\)]/g, '')
                curr_parenthesese_element = no_parenthesis.split(/([A-Z][a-z0-9]?)/).filter(x => x).map(x => {
                    const symbol = x as Symbols
                    if (! Symbols.includes(symbol)){
                        throw(`unknown element: ${symbol}, in formula: ${formula}`)
                    }
                    return symbol
                })
                return
            }
            const split = value.split(/([A-Za-z]+)/).filter(x => x)
            const symbol = split[0]?.toLowerCase() as Symbols
            if (! Symbols.includes(symbol)){
                throw(`unknown element: ${symbol}, in formula: ${formula}`)
            }
            formulat_to_return[symbol] = +(split[1] || -1)
        })
       
    })
    return formulat_to_return
}
 */
