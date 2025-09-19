import Ajv from "ajv";

const schema = await Bun.file('./schema.json').json()
const target = await Bun.file('./data/mainstream.json').json()

const ajv = new Ajv()
const validate =ajv.compile(schema)
const valid = validate(target)
if (!valid){
    console.log(validate.errors)
}
