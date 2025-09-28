
// Site web URL: https://commonchemistry.cas.org
// this is the API entrypoint for search
// const API_SEARCH = "https://rboq1qukh0.execute-api.us-east-2.amazonaws.com/default/search?q=${CAS_NUMBER}offset=0&size=30"
// this is the API entrypoint for compound directly
// const API_COMPOUNDS = "https://rboq1qukh0.execute-api.us-east-2.amazonaws.com/default/detail?cas_rn=${CAS_NUMBER}"

import { does_cache_file_exist, fetch_json_and_write_to_cache, get_from_cache_json, get_nist_compounds_data } from "../filesystem_integration"

const API_KEY = "4vrOF3YIRf5vFkzLsed1i2OBH7BLUusf6NMu2UCD"
const USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64; rv:142.0) Gecko/20100101 Firefox/142.0'

async function download_to_cache(){

    // needs the CAS NUMBER from that previous mining
    const nist_data = await get_nist_compounds_data()

    for (const nist_entry of nist_data){
        const URL = `https://rboq1qukh0.execute-api.us-east-2.amazonaws.com/default/detail?cas_rn=${nist_entry.cas_number}`
        const filename = `compounds_${nist_entry.original_formula}_c_c.json`
        if (await does_cache_file_exist(filename)){
            continue
        }
        if (!nist_entry.cas_number){
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
        await fetch_json_and_write_to_cache(URL, filename, "GET", header)
        const data = await get_from_cache_json(filename)
        console.log(data.name)
        await Bun.sleep(0.2)
        break
    }
}

await download_to_cache()
