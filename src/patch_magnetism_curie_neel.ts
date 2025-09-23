import { get_periodictabledotcom_json, write_periodictabledotcom_patch } from "./filesystem_integration"
import { Elements, type MainstreamValueUnit } from "./mainstream_structure"

export type PTDCCurieNeelPatch = {
    [key in Elements]?:  {
        curie_point?: MainstreamValueUnit
        neel_point?: MainstreamValueUnit
    }
}

export async function create_magnetism_curie_neel_patch(){
    const PTDCData = await get_periodictabledotcom_json()
    const elements: PTDCCurieNeelPatch = {}
    PTDCData.forEach((element)=>{
        const symbol = element.symbol.toLowerCase() as Elements
        if (!Elements.includes(symbol)){
            throw `unknown symbol: ${symbol}`
        }
        const curie_point = element.curie_point == "N/A" ? undefined : {
            value: element.curie_point,
            unit: "K"
        }
        const neel_point = element.neel_point == "N/A" ? undefined : { 
            value: element.neel_point,
            unit: "K"
        }
        if (curie_point && neel_point){
            elements[symbol] = {
                curie_point,
                neel_point
            }
        } else if (curie_point){
            elements[symbol] = {
                curie_point,
            }
        } else if (neel_point){
            elements[symbol] = {
                neel_point
            }
        }
        
    })
    write_periodictabledotcom_patch(elements)
}