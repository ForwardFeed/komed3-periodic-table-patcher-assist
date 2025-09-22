import { get_periodictabledotcom_json, write_periodictabledotcom_patch } from "./filesystem_integration"
import { Elements, type MainstreamValueUnit } from "./mainstream_structure"

export type PTDCCuriePointPatch = {
    [key in Elements]?: MainstreamValueUnit
}

export async function create_curie_point_patch(){
    const PTDCData = await get_periodictabledotcom_json()
    const elements: PTDCCuriePointPatch = {}
    PTDCData.forEach((element)=>{
        const symbol = element.symbol.toLowerCase() as Elements
        if (!Elements.includes(symbol)){
            throw `unknown symbol: ${symbol}`
        }
        const curie_point = element.curie_point
        if (curie_point != "N/A"){
            elements[symbol] = {
                value: curie_point,
                unit: "K"
            }
        }
    })
    write_periodictabledotcom_patch(elements)
}