import { fetch_and_write_to_cache, get_compounds_list_json } from "./filesystem_integration";

const compounds_list = await get_compounds_list_json()

const SHOULD_DOWNLOAD_TO_CACHE = true

for (const compound of compounds_list){
    if (SHOULD_DOWNLOAD_TO_CACHE){
        const URL = `https://webbook.nist.gov/cgi/cbook.cgi?Formula=${compound}&NoIon=on&Units=SI`
        await fetch_and_write_to_cache(URL, `compounds_${compound}.html`)
    }
}