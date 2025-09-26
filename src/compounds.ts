import { fetch_and_write_to_cache, get_compounds_list_json, get_from_cache, write_compounds_data } from "./filesystem_integration";
import {JSDOM} from "jsdom"
import { Symbols } from "./mainstream_structure";
import ChemParse from 'chemparse';

const compounds_list = await get_compounds_list_json()

const SHOULD_DOWNLOAD_TO_CACHE = false

export type Compound = {
    raw_formula: string,
    name: string | {url: string, name: string}[],
    formula: Formula
    // cas: string
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
for (const raw_formula of compounds_list){
    const filename = `compounds_${raw_formula}.html`
    if (SHOULD_DOWNLOAD_TO_CACHE){
        const URL = `https://webbook.nist.gov/cgi/cbook.cgi?Formula=${raw_formula}&NoIon=on&Units=SI`
        await fetch_and_write_to_cache(URL, filename)
    }
    const file_html = await get_from_cache(filename)
    const dom = new JSDOM(file_html)
    const document = dom.window.document
    let name: string | { url: string; name: string; }[] = document.title
    if (name == "Search Results"){
        name = [...document.querySelectorAll('main>ol>li>a')].map((x, i) => {
            return {
                // @ts-expect-error
                url: `https://webbook.nist.gov/${x.href}`,
                name: x.textContent + ";" + i
            }
        })
    }

    compounds.push({
        raw_formula,
        name,
        formula: convert_formula_with_chem_parse(raw_formula)
    })
}

await write_compounds_data(compounds)