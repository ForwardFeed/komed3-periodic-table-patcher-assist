import type { PTDCCurieNeelPatch } from "./patch_magnetism_curie_neel"
import type { IsotopePatch } from "./patch_isotopes"
import type { PTDCElementRefined } from "./periodictabledotcom"


const MAINSTREAM_JSON = "./data/mainstream.json"
const ISOTOPES_CSV = './data/isotopes.csv'
const ISOTOPES_PATCH_JSON = "./data/_patch_isotopes.json"
const PERIODICTABLEDOTCOM_JSON = "./data/periodictabledotcom.json"
const PERIODICTABLEDOTCOM_PATCH = "./data/_patch_curie_neel_point.json"

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