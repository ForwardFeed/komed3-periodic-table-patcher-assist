import Ajv from "ajv";
import { create_patch_isotopes, csv_to_isotope_data } from "./patch_isotopes";
import { write_isotope_json } from "./filesystem_integration";
import { create_curie_point_patch } from "./patch_curie_point";

/* const schema = await Bun.file('./schema.json').json()
const target = await Bun.file('./data/mainstream.json').json()

const ajv = new Ajv()
const validate =ajv.compile(schema)
const valid = validate(target)
if (!valid){
    console.log(validate.errors)
} */

/* const csv_data = await csv_to_isotope_data()
const patch = create_patch_isotopes(csv_data)
write_isotope_json(patch) */

create_curie_point_patch()