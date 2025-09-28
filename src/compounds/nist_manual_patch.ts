import type { NIST_Compound } from "./nist"

const MANUAL_DATA = {
    "CaC2": "https://en.wikipedia.org/wiki/Calcium_carbide",
    "KAl(SO4)2": "https://en.wikipedia.org/wiki/Potassium_alum",
    "Mg(NO3)2": "https://en.wikipedia.org/wiki/Magnesium_nitrate",
    "C6H5BH2": "https://www.chemicalaid.com/tools/molarmass.php?formula=C6H5BH2&hl=en",
    "CICH2COOH": "https://en.wikipedia.org/wiki/Chloroacetic_acid",
    "C2OH42": "https://en.wikipedia.org/wiki/Eicosane",
    "C5H1O": "https://en.wikipedia.org/wiki/C5H10",
}

export const manual_nist_patching: NIST_Compound[] = [
    {
        original_formula: "CaC2",
        nist_formula: undefined,
        name: "Calcium Carbide",
        mol_weight: 64.100,
        cas_number: "75-20-7",
        inchi_number: "1S/C2.Ca/c1-2;/q-2;+2",
        inchi_key: "UIXRSLJINYRGFQ-UHFFFAOYSA-N",
        chemical_structure_url: undefined
    },
    {
        original_formula: "KAl(SO4)2",
        nist_formula: undefined,
        name: "Potassium alum",
        mol_weight: 258.192,
        cas_number: "10043-67-1",
        inchi_number: "1S/Al.K.2H2O4S/c;;2*1-5(2,3)4/h;;2*(H2,1,2,3,4)/q+3;+1;;/p-4",
        inchi_key: undefined,
        chemical_structure_url: undefined
    },
    {
        original_formula: "Mg(NO3)2",
        nist_formula: undefined,
        name: "Magnesium nitrate",
        mol_weight: 148.32,
        cas_number: "10377-60-3",
        inchi_number: "1S/Mg.2NO3/c;2*2-1(3)4/q+2;2*-1",
        inchi_key: "YIXJRHPUWRPCBB-UHFFFAOYSA-N",
        chemical_structure_url: undefined
    },
    {
        original_formula: "C6H5BH2",
        nist_formula: undefined,
        name: "Borepin",
        mol_weight: 89.9308,
        cas_number: undefined,
        inchi_number: undefined,
        inchi_key: undefined,
        chemical_structure_url: undefined
    },
    {
        original_formula: "CICH2COOH",
        nist_formula: undefined,
        name: "Chloroacetic acid",
        mol_weight: 94.49,
        cas_number: "79-11-8",
        inchi_number: "1S/C2H3ClO2/c3-1-2(4)5/h1H2,(H,4,5)",
        inchi_key: "FOCAUTSVDIKZOP-UHFFFAOYSA-N",
        chemical_structure_url: undefined
    },
    {
        original_formula: "C2OH42",
        nist_formula: undefined,
        name: "Eicosane",
        mol_weight: 282.556,
        cas_number: "112-95-8",
        inchi_number: "1S/C20H42/c1-3-5-7-9-11-13-15-17-19-20-18-16-14-12-10-8-6-4-2/h3-20H2,1-2H3",
        inchi_key: "CBFCDTFDPHXCNY-UHFFFAOYSA-N",
        chemical_structure_url: undefined
    },
    {
        original_formula: "C5H1O",
        nist_formula: undefined,
        name: "13 hydrocarbon isomers",
        mol_weight: 0,
        cas_number: undefined,
        inchi_number: undefined,
        inchi_key: undefined,
        chemical_structure_url: undefined
    }
]