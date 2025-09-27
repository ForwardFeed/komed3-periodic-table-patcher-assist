import { fetch_and_write_to_cache, get_compounds_list_json, get_from_cache, write_compounds_data } from "./filesystem_integration";
import {JSDOM} from "jsdom"
import { Symbols } from "./mainstream_structure";
import ChemParse from 'chemparse';

const compounds_list = await get_compounds_list_json()

const SHOULD_DOWNLOAD_TO_CACHE = false
const SHOULD_REDOWNLOAD_ON_NOT_FOUND = false
const SHOULD_MANUAL_URL = true
const MANUAL_DATA = {
    "CaC2": "https://en.wikipedia.org/wiki/Calcium_carbide",
    "KAl(SO4)2": "https://en.wikipedia.org/wiki/Potassium_alum",
    "Mg(NO3)2": "https://en.wikipedia.org/wiki/Magnesium_nitrate",
    "C6H5BH2": "https://www.chemicalaid.com/tools/molarmass.php?formula=C6H5BH2&hl=en",
    "CICH2COOH": "https://en.wikipedia.org/wiki/Chloroacetic_acid",
    "C2OH42": "https://en.wikipedia.org/wiki/Eicosane",
    "C5H1O": "https://en.wikipedia.org/wiki/C5H10",
}

export type Compound = {
    raw_formula: string,
    empirical_formula: string,
    name: string,
    cas_number: string | undefined,
    inchi_number: string | undefined,
    inchi_key: string | undefined
    chemical_structure_url: string | undefined
}

const compounds:Compound[] = []

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



for (const raw_formula of compounds_list){

    const formula = convert_formula_with_chem_parse(raw_formula)

    const filename = `compounds_${raw_formula}.html`
    if (SHOULD_DOWNLOAD_TO_CACHE){
        const URL = `https://webbook.nist.gov/cgi/cbook.cgi?Formula=${raw_formula}&NoIon=on&Units=SI`
        await fetch_and_write_to_cache(URL, filename)
    }
    const file_html = await get_from_cache(filename)
    const dom = new JSDOM(file_html)
    const document = dom.window.document
    let name = document.title
    if (name == "Search Results"){
        const searches = [...document.querySelectorAll<HTMLAnchorElement>('main>ol>li>a')].map(x => x.href) as string[]
        if (searches.length < 1){
            throw `searche didn't give any result for: ${raw_formula}`
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
            const URL = `https://webbook.nist.gov/cgi/cbook.cgi?Formula=${raw_formula}&NoIon=on&Units=SI`
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
    
    const empirical_formula = get_data_1('li [title="IUPAC definition of empirical formula"]')
    if (empirical_formula && JSON.stringify(convert_formula_with_chem_parse(empirical_formula)) != JSON.stringify(formula)){
        console.warn(`formulas: ${empirical_formula} and ${raw_formula} aren't the same?`)
    }
    const molecular_weight = get_data_1('li [title="IUPAC definition of relative molecular mass (molecular weight)"]')
    const InChI_number = document.querySelector('.inchi-text')?.textContent.trim()
    const InChI_key = document.querySelectorAll('.inchi-text')?.[1]?.textContent.trim()
    const CAS_number = get_data_2('CAS Registry Number:')
    const chemical_structure_URL = document.querySelector<HTMLImageElement>('.struct')?.src

    if (!empirical_formula) throw `no empirical formula found for :${raw_formula}`

    compounds.push({
        raw_formula,
        name,
        empirical_formula,
        cas_number: CAS_number,
        inchi_number: InChI_number,
        inchi_key: InChI_key,
        chemical_structure_url: chemical_structure_URL
    })
}

await write_compounds_data(compounds)





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
