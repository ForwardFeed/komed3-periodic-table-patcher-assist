import { get_isotope_csv } from "./filesystem_integration"
import { Elements, type MainstreamElementData } from "./mainstream_structure"
import { get_patcheable_object, type DeepPartial } from "./patchable_mainstream_structure"

const EnergyShift = [ undefined, "X", "V", "Z"] as const
type EnergyShift = typeof EnergyShift[number]
const Unit_HL = [ undefined, "unit_hl", "s", "MeV", "Y", "ms", "keV", "d", "eV", "m", "ns", "ps", "as", "h", "us" ] as const
type Unit_HL = typeof Unit_HL[number]
const Operator_HL = [ undefined, "LT", "AP", "GT", "GE"] as const
type Operator_HL = typeof Operator_HL[number]
const ME_Systematics = [ undefined, "N", "Y"] as const
type ME_Systematics = typeof ME_Systematics[number]

export type IsotopeElement = {
    z: number
    n: number
    radius: number | undefined
    unc_r: number | undefined
    abundance: number | undefined
    unc_a: number | undefined
    energy_shift: EnergyShift
    energy: number | undefined
    unc_e: number | undefined
    ripl_shift: number | undefined
    jp: string | undefined
    half_life: number | "STABLE" | undefined | "?"
    operator_hl: Operator_HL
    unc_hl: string | undefined
    unit_hl: Unit_HL
    half_life_sec: number | undefined
    unc_hls: number | undefined
    decay_1: string | undefined
    decay_1_percent: number | undefined
    unc_1: number | undefined
    decay_2: string | undefined
    decay_2_percent: number | undefined
    unc_2: number | undefined
    decay_3: string | undefined
    decay_3_percent: number | undefined
    unc_3: number | undefined
    isospin: string | undefined
    magnetic_dipole: number | undefined
    unc_md: number | undefined
    electric_quadrupole: number | undefined
    unc_eq: number | undefined
    qbm: number | undefined
    unc_qb: number | undefined
    qbm_n: number | undefined
    unc_qbmn: number | undefined
    qa: number | undefined
    unc_qa: number | undefined
    qec: number | undefined
    unc_qec: number | undefined
    sn: number | undefined
    unc_sn: number | undefined
    sp: number | undefined
    unc_sp: number | undefined
    binding: number | undefined
    unc_ba: number | undefined
    atomic_mass: number | undefined
    unc_am: number | undefined
    massexcess: number | undefined
    unc_me: number | undefined
    me_systematics: ME_Systematics
    discovery: string | undefined
    ENSDFpublicationcut_off: string
    ENSDFauthors: string
    extraction_date: string
}

type IsotopeElementCSV = IsotopeElement & {
    symbol: Elements
}

export type IsotopePatch = {
    [key in Elements]: {
        isotopes: IsotopeElement[]
    }
}

function check_symbol(str: string): Elements{
    // @ts-ignore dumb ts
    if (Elements.includes(str)){
        // @ts-ignore dumb ts
        return str
    }
    throw `unknown element ${str}`

}
const ISOTOPES_ELEMENT_OBJECT_KEYS = Object.keys(
    {
        z: 0,
        n: 0,
        radius: 0,
        unc_r: 0,
        abundance: 0,
        unc_a: 0,
        energy_shift: undefined,
        energy: 0,
        unc_e: 0,
        ripl_shift: 0,
        jp: "",
        half_life: 0,
        operator_hl: undefined,
        unc_hl: "",
        unit_hl: undefined,
        half_life_sec: 0,
        unc_hls: 0,
        decay_1: "",
        decay_1_percent: 0,
        unc_1: 0,
        decay_2: "",
        decay_2_percent: 0,
        unc_2: 0,
        decay_3: "",
        decay_3_percent: 0,
        unc_3: 0,
        isospin: "",
        magnetic_dipole: 0,
        unc_md: 0,
        electric_quadrupole: 0,
        unc_eq: 0,
        qbm: 0,
        unc_qb: 0,
        qbm_n: 0,
        unc_qbmn: 0,
        qa: 0,
        unc_qa: 0,
        qec: 0,
        unc_qec: 0,
        sn: 0,
        unc_sn: 0,
        sp: 0,
        unc_sp: 0,
        binding: 0,
        unc_ba: 0,
        atomic_mass: 0,
        unc_am: 0,
        massexcess: 0,
        unc_me: 0,
        me_systematics: undefined,
        discovery: "",
        ENSDFpublicationcut_off: "",
        ENSDFauthors: "",
        extraction_date: ""
    } satisfies IsotopeElement
)
export function create_patch_isotopes(isotopes: IsotopeElementCSV[]){
    function _(){
        return {isotopes: []}
    }
    const patch: IsotopePatch = {
        la: _(), h: _(), he: _(), li: _(), be: _(), b: _(), c: _(), n: _(), o: _(), f: _(),
        ne: _(), na: _(), mg: _(), al: _(), si: _(), p: _(), s: _(), cl: _(), ar: _(), k: _(), ca: _(),
        sc: _(), ti: _(), v: _(), cr: _(), mn: _(), fe: _(), co: _(), ni: _(), cu: _(), zn: _(), ga: _(),
        ge: _(), as: _(), se: _(), br: _(), kr: _(), rb: _(), sr: _(), y: _(), zr: _(), nb: _(), mo: _(),
        tc: _(), ru: _(), rh: _(), pd: _(), ag: _(), cd: _(), in: _(), sn: _(), sb: _(), te: _(), i: _(),
        xe: _(), cs: _(), ba: _(), ce: _(), pr: _(), nd: _(), pm: _(), sm: _(), eu: _(), gd: _(), tb: _(),
        dy: _(), ho: _(), er: _(), tm: _(), yb: _(), lu: _(), hf: _(), ta: _(), w: _(), re: _(), os: _(),
        ir: _(), pt: _(), au: _(), hg: _(), tl: _(), pb: _(), bi: _(), po: _(), at: _(), rn: _(), fr: _(),
        ra: _(), ac: _(), th: _(), pa: _(), u: _(), np: _(), pu: _(), am: _(), cm: _(), bk: _(), cf: _(),
        es: _(), fm: _(), md: _(), no: _(), lr: _(), rf: _(), db: _(), sg: _(), bh: _(), hs: _(), mt: _(),
        ds: _(), rg: _(), cn: _(), nh: _(), fl: _(), mc: _(), lv: _(), ts: _(), og: _()
    }
    isotopes.forEach(element => {
        const symbol = check_symbol(element.symbol)
        const manufactured_object = ISOTOPES_ELEMENT_OBJECT_KEYS.reduce((cumu, curr)=>{
            // @ts-ignore
            cumu[curr] = element[curr]
            return cumu
        }, {} as IsotopeElement)
        patch[symbol].isotopes.push(manufactured_object)
    });
    return patch
}
const CSV_FIELD = [
  "z", "n", "symbol", "radius", "unc_r", "abundance", "unc_a", "energy_shift", "energy", "unc_e", "ripl_shift",
  "jp", "half_life", "operator_hl", "unc_hl", "unit_hl", "half_life_sec", "unc_hls", "decay_1", "decay_1_%",
  "unc_1", "decay_2", "decay_2_%", "unc_2", "decay_3", "decay_3_%", "unc_3", "isospin", "magnetic_dipole",
  "unc_md", "electric_quadrupole", "unc_eq", "qbm", "unc_qb", "qbm_n", "unc_qbmn", "qa", "unc_qa", "qec",
  "unc_qec", "sn", "unc_sn", "sp", "unc_sp", "binding", "unc_ba", "atomic_mass", "unc_am", "massexcess",
  "unc_me", "me_systematics", "discovery", "ENSDFpublicationcut-off", "ENSDFauthors", "Extraction_date"
] as const
type CSV_FIELD = typeof CSV_FIELD[number]

export async function csv_to_isotope_data(): Promise<IsotopeElementCSV[]>{
    const text = await get_isotope_csv()
    return text.split("\n")
        .filter(x => x)
        .map(x => 
            x.split(',')
        )
        .slice(1)
        .map(convert_csv_row_into_element)
    
}
function convert_csv_row_into_element(row: string[], index: number): IsotopeElementCSV{

    let latest_field_for_debug: CSV_FIELD = "z"
    
    const get_value_from_row = (field: CSV_FIELD): string | undefined => {
        latest_field_for_debug = field
        const str = row[CSV_FIELD.indexOf(field)]
        if (str == undefined){
            throw `unknown field: ${field}`
        } 
        if (str == ""){
            return undefined
        }
        return str
    }

    const s = (field: CSV_FIELD): string  => {
        const str = get_value_from_row(field)
        if (! str){
            throw `expected non-empty string, field: ${latest_field_for_debug}, index: ${index}`
        }
        return str
    }
    const s_u = get_value_from_row

    const n = (field: CSV_FIELD): number => {
        const str = get_value_from_row(field)
        if (str == undefined){
            throw `expected non-empty string, field: ${latest_field_for_debug}, index: ${index}`
        }
        const simple = +str
        if (isNaN(simple)){
            throw `field: ${latest_field_for_debug} couldn't parse this number: ${str}, index: ${index}`
        }
        return simple
    }
    
    const n_u = (field: CSV_FIELD, value?: string | undefined): number | undefined => {
        const str = value ? value : get_value_from_row(field) 
        if (str == undefined){
            return undefined
        }
        const simple = +str
        if (isNaN(simple)){
            throw `field: ${latest_field_for_debug} couldn't parse this number: ${str}, index: ${index}`
        }
        return simple
    }

    const s_a = <T>(field: CSV_FIELD, list: T[] | readonly T[], value?: string | undefined): T => {
        const str = value ? value : get_value_from_row(field)
        // @ts-expect-error ts is stupid
        if (! list.includes(str)){
            throw `field: ${latest_field_for_debug}, with given element: ${str}, wasn't in list: ${list}, index: ${index}`
        }
        return str as T
    }

    return {
        z: n('z'),
        n: n('n'),
        symbol: s_a('symbol', Elements, s('symbol').toLowerCase()),
        radius: n_u('radius'),
        unc_r: n_u('unc_r'),
        abundance: n_u('abundance'),
        unc_a: n_u('unc_a'),
        energy_shift: s_a('energy_shift', EnergyShift),
        energy: n_u('energy'),
        unc_e: n_u('unc_e'),
        ripl_shift: n_u('ripl_shift'),
        jp: s_u('jp'),
        half_life: ((value: string | undefined)=>{
            if (value == "STABLE"){
                return "STABLE"
            } else if (value == "?"){
                return "?"
            }
            return n_u('half_life')
        })(s_u('half_life')),
        operator_hl: s_a('operator_hl', Operator_HL),
        unc_hl: s_u('unc_hl'),
        unit_hl: s_a('unit_hl', Unit_HL),
        half_life_sec: n_u('half_life_sec'),
        unc_hls: n_u('unc_hls'),
        decay_1: s_u('decay_1'),
        decay_1_percent: n_u('decay_1_%'),
        unc_1: n_u('unc_1'),
        decay_2: s_u('decay_2'),
        decay_2_percent: n_u('decay_2_%'),
        unc_2: n_u('unc_2'),
        decay_3: s_u('decay_3'),
        decay_3_percent: n_u('decay_3_%'),
        unc_3: n_u('unc_3'),
        isospin: s_u('isospin'),
        magnetic_dipole: n_u('magnetic_dipole'),
        unc_md: n_u('unc_md'),
        electric_quadrupole: n_u('electric_quadrupole'),
        unc_eq: n_u('unc_eq'),
        qbm: n_u('qbm'),
        unc_qb: n_u('unc_qb'),
        qbm_n: n_u('qbm_n'),
        unc_qbmn: n_u('unc_qbmn'),
        qa: n_u('qa'),
        unc_qa: n_u('unc_qa'),
        qec: n_u('qec'),
        unc_qec: n_u('unc_qec'),
        sn: n_u('sn'),
        unc_sn: n_u('unc_sn'),
        sp: n_u('sp'),
        unc_sp: n_u('unc_sp'),
        binding: n_u('binding'),
        unc_ba: n_u('unc_ba'),
        atomic_mass: n_u('atomic_mass'),
        unc_am: n_u('unc_am'),
        massexcess: n_u('massexcess'),
        unc_me: n_u('unc_me'),
        me_systematics: s_a('me_systematics', ME_Systematics),
        discovery: s_u('discovery'),
        ENSDFpublicationcut_off: s('ENSDFpublicationcut-off'),
        ENSDFauthors: s('ENSDFauthors'),
        extraction_date: s('Extraction_date')
    } satisfies IsotopeElementCSV
}