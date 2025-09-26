import type { PTDCCurieNeelPatch } from "./patch_magnetism_curie_neel"
import type { IsotopePatch } from "./patch_isotopes"
import type { PTDCElementRefined } from "./periodictabledotcom"


const MAINSTREAM_JSON = "./data/mainstream.json"
const ISOTOPES_CSV = './data/isotopes.csv'
const ISOTOPES_PATCH_JSON = "./data/_patch_isotopes.json"
const PERIODICTABLEDOTCOM_JSON = "./data/periodictabledotcom.json"
const PERIODICTABLEDOTCOM_PATCH = "./data/_patch_curie_neel_point.json"
const COMPOUNDS_LIST = "./data/komed3_selected_compounds.json"

export async function get_mainstream_data(){
    return Bun.file(MAINSTREAM_JSON).json()
}

export async function get_isotope_csv() {
    return Bun.file(ISOTOPES_CSV).text()
}

export async function write_isotope_json(data: IsotopePatch) {
    return Bun.write(ISOTOPES_PATCH_JSON, JSON.stringify(data,null,2))
}


export async function get_periodictabledotcom_json() {
    return Bun.file(PERIODICTABLEDOTCOM_JSON).json() as unknown as PTDCElementRefined[]
}

export async function write_periodictabledotcom_patch(data: PTDCCurieNeelPatch) {
    return Bun.write(PERIODICTABLEDOTCOM_PATCH, JSON.stringify(data,null,2))
}


export async function get_compounds_list_json(): Promise<string[]>{
    return Bun.file(COMPOUNDS_LIST).json() as unknown as string[]
}

export async function write_to_cache(filename:string, data: string){
    const filepath = `./cache/${filename}`
    console.log(`writing to cache: ${filepath}; ${data.length} characters`)
    return Bun.write(filepath, data)
}

export async function get_from_cache(filename: string): Promise<String>{
    return Bun.file(filename).text()
}

export async function fetch_and_write_to_cache(url: string, filename: string): Promise<void>{
    console.log(`fetching URL: ${url}`)
    return new Promise((resolve, reject)=>{
        fetch(url)
        .then((response)=>{
            if (!response.ok){
                reject(`response is not okay: ${response.status}`)
                return
            }
            response.text()
            .then((text)=>{
                write_to_cache(filename, text)
                .then(()=>{
                    resolve()
                })
                .catch((err)=>{
                    reject(`failed to write to cache: ${err}`)
                })
            })
            .catch((err)=>{
                reject(`failed to transform to text: ${err}`)
            })
            
        })
        .catch((err)=>{
            reject(`failed to fetch: ${err}`)
        })
    })
    
}