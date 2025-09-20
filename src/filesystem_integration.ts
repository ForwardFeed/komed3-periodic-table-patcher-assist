import type { IsotopePatch } from "./patch_isotopes"


const MAINSTREAM_JSON = "./data/mainstream.json"
const ISOTOPES_CSV = './data/isotopes.csv'
const ISOTOPES_PATCH_JSON = "./data/_patch_isotopes.json"

export async function get_mainstream_data(){
    return Bun.file(MAINSTREAM_JSON).json()
}

export async function get_isotope_csv() {
    return Bun.file(ISOTOPES_CSV).text()
}

export async function write_isotope_json(data: IsotopePatch) {
    return Bun.write(ISOTOPES_PATCH_JSON, JSON.stringify(data,null,2))
}
