import type { NIST_Compound } from "./compounds/nist"
import { does_cache_file_exist, get_from_cache_json } from "./filesystem_integration"

export type TypeOfProperty = "object" | "undefined" | "boolean" | "number" | "bigint" | "string" | "symbol" | "function"

export type PropertyFound = {
    name: string,
    is_always_found: boolean,
    types: (TypeOfProperty)[]
}

function get_all_properties(obj: unknown): string[] | undefined{
    if (typeof obj != "object" || obj == null){
        return undefined
    }
    return Object.keys(obj)
}

function property_list_to_ts(root_type_name: string, property_list: PropertyFound[], tab_n: string = "    "): string{
    return `export type ${root_type_name} = {\n${property_list.map(x => {
        return `${tab_n}${x.name}${x.is_always_found ? "" : "?"}: ${x.types.map(type => {
            if (type == "object"){
                return `{[key: string]: any}`
            }
            return `${type}`
        }).join(' | ')}`
    })
    .join('\n')}\n}`
}

export async function type_helper_for_common_chemistry(data_list: NIST_Compound[]){

    const property_list: PropertyFound[] = []

    // and manipulate its typing
    function add_to_property_list(prop: string, data: unknown){
        const index = property_list.findIndex(x => x.name == prop)
        if (! ~index){
            property_list.push({
                name: prop,
                is_always_found: true,
                types: [typeof data]
            })
            return
        } else {
            const prop = property_list[index] as PropertyFound
            if (!prop.types.includes(typeof data)){
                prop.types.push(typeof data)
            }
        }
    }
    function check_if_always_found(props: string[]){
        property_list.filter(x => x.is_always_found).forEach(x => {
            if (! props.includes(x.name)){
                x.is_always_found = false
            }
        })
    }
    for (const nist_entry of data_list){
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
        // those are not parse of the common_chemistry database and are added by me
        if ( props_found.includes('404') || props_found.includes('no_cas_number')){
            continue
        }
        
        props_found.forEach(x => add_to_property_list(x,
            // @ts-expect-error
            file_data_json[x]
            )
        )
        check_if_always_found(props_found)
    }
    console.log(property_list_to_ts("CommonChemistryCompound",property_list))
}
