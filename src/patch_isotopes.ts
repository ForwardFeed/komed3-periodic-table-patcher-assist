import { Elements, type MainstreamElementData } from "./mainstream_structure"
import { get_patcheable_object, type DeepPartial } from "./patchable_mainstream_structure"

const Axis = [ "X", "Y", "Z"] as const
type Axis = typeof Axis[number]
const Unit_HL = [ "", "unit_hl", "s", "MeV", "Y", "ms", "keV", "d", "eV", "m", "ns", "ps", "as", "h", "us" ] as const
type Unit_HL = typeof Unit_HL[number]
const Operator_HL = ["", "LT", "AP", "GT", "GE"] as const
type Operator_HL = typeof Operator_HL[number]
const ME_Systematics = ["", "N", "Y"] as const
type ME_Systematics = typeof ME_Systematics[number]

export type IsotopeElement = {
    z: number
    n: number
    radius: number
    unc_r: number
    abundance: number
    unc_a: number
    energy_shift: Axis
    energy: number
    unc_e: number
    ripl_shift: number
    jp: number
    half_life: number | "STABLE"
    operator_hl: Operator_HL
    unc_hl: number
    unit_hl: Unit_HL
    half_life_sec: number
    unc_hls: number
    decay_1: string
    decay_1_percent: number
    unc_1: number
    decay_2: string
    decay_2_percent: number
    unc_2: number
    decay_3: string
    decay_3_percent: number
    unc_3: number
    isospin: number
    magnetic_dipole: number
    unc_md: number
    electric_quadrupole: number
    unc_eq: number
    qbm: number
    unc_qb: number
    qbm_n: number
    unc_qbmn: number
    qa: number
    unc_qa: number
    qec: number
    unc_qec: number
    sn: number
    unc_sn: number
    sp: number
    unc_sp: number
    binding: number
    unc_ba: number
    atomic_mass: number
    unc_am: number
    massexcess: number
    unc_me: number
    me_systematics: ME_Systematics
    discovery: string
    ENSDFpublicationcut_off: string
    ENSDFauthors: string
    Extraction_date: string
}

type IsotopeElementCSV = IsotopeElement & {
    symbol: string
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
        energy_shift: "Y",
        energy: 0,
        unc_e: 0,
        ripl_shift: 0,
        jp: 0,
        half_life: 0,
        operator_hl: "",
        unc_hl: 0,
        unit_hl: "",
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
        isospin: 0,
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
        me_systematics: "",
        discovery: "",
        ENSDFpublicationcut_off: "",
        ENSDFauthors: "",
        Extraction_date: ""
    } satisfies IsotopeElement
)
export function create_patch_isotopes(isotopes: IsotopeElementCSV[]){
    function _(){
        return {isotopes: []}
    }
    const patch: IsotopePatch = {
        la: _(), h: _(), he: _(), li: _(), be: _(), b: _(), c: _(), n: _(), o: _(), f: _(),       ne: _(), na: _(), mg: _(), al: _(), si: _(), p: _(), s: _(), cl: _(), ar: _(), k: _(), ca: _(),       sc: _(), ti: _(), v: _(), cr: _(), mn: _(), fe: _(), co: _(), ni: _(), cu: _(), zn: _(), ga: _(),       ge: _(), as: _(), se: _(), br: _(), kr: _(), rb: _(), sr: _(), y: _(), zr: _(), nb: _(), mo: _(),       tc: _(), ru: _(), rh: _(), pd: _(), ag: _(), cd: _(), in: _(), sn: _(), sb: _(), te: _(), i: _(),       xe: _(), cs: _(), ba: _(), ce: _(), pr: _(), nd: _(), pm: _(), sm: _(), eu: _(), gd: _(), tb: _(),       dy: _(), ho: _(), er: _(), tm: _(), yb: _(), lu: _(), hf: _(), ta: _(), w: _(), re: _(), os: _(),       ir: _(), pt: _(), au: _(), hg: _(), tl: _(), pb: _(), bi: _(), po: _(), at: _(), rn: _(), fr: _(),       ra: _(), ac: _(), th: _(), pa: _(), u: _(), np: _(), pu: _(), am: _(), cm: _(), bk: _(), cf: _(),       es: _(), fm: _(), md: _(), no: _(), lr: _(), rf: _(), db: _(), sg: _(), bh: _(), hs: _(), mt: _(),       ds: _(), rg: _(), cn: _(), nh: _(), fl: _(), mc: _(), lv: _(), ts: _(), og: _()
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

export function csv_to_isotope_data(): I{

}