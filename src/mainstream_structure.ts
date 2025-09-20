

export const Elements = [ "h", "he", "li", "be", "b", "c", "n", "o", "f", "ne", "na", "mg", "al",
    "si", "p", "s", "cl", "ar", "k", "ca", "sc", "ti", "v", "cr", "mn", "fe", "co", "ni", "cu",
    "zn", "ga", "ge", "as", "se", "br", "kr", "rb", "sr", "y", "zr", "nb", "mo", "tc", "ru", "rh",
    "pd", "ag", "cd", "in", "sn", "sb", "te", "i", "xe", "cs", "ba", "la", "ce", "pr", "nd", "pm",
    "sm", "eu", "gd", "tb", "dy", "ho", "er", "tm", "yb", "lu", "hf", "ta", "w", "re", "os", "ir",
    "pt", "au", "hg", "tl", "pb", "bi", "po", "at", "rn", "fr", "ra", "ac", "th", "pa", "u", "np",
    "pu", "am", "cm", "bk", "cf", "es", "fm", "md", "no", "lr", "rf", "db", "sg", "bh", "hs", "mt",
    "ds", "rg", "cn", "nh", "fl", "mc", "lv", "ts", "og"
] as const
export type Elements = typeof Elements[number]

export const Languages = ["en", "de", "la"] as const
export type Languages = typeof Languages[number]

export type MainstreamValueUnit = {
    value: number | null
    unit?: string
    "*"?: boolean
    "@"?: MainstreamValueUnit
    info?: string
    condition?: MainstreamValueUnit[]
    deviation?: number,
    range?: number[]
    label?: string
}
export type MainstreamValueLabel = {
    value: number
    label: string
}

export type MainstreamValueString = {
    value: string,
    label?: string,
}

export type MainstreamMultipleValuesUnit = {
    values: number[]
    unit: string
}

export type MainstreamLabelValueUnit = {
    label: string,
    value: number
    unit: string,
}

export type MainstreamAbundance = {
    universe?: MainstreamValueUnit
    sun?: MainstreamValueUnit
    meteorite?: MainstreamValueUnit
    crust?: MainstreamValueUnit
    water?: MainstreamValueUnit
    stream?: MainstreamValueUnit
    human?: MainstreamValueUnit
}

export type MainstreamAppearance = {
    [key in Languages]?: string
}

export type MainstreamClassification = {
    cas: (MainstreamValueString | MainstreamValueString)[],
    eg: MainstreamValueString[] | null,
    echa: MainstreamValueString[] | null
    atc?: MainstreamValueString[]
}

export type MainstreamDensity = {
    label: string
    value: number
    unit: string
    condition?: MainstreamValueUnit[]
    range?: number[]
}

export type MainstreamDiscovery = {
    by: string,
    value: number
}

export type MainstreamEnthalpy = {
    fusion?: MainstreamValueUnit,
    vaporisation: MainstreamValueUnit,
    atomisation?: MainstreamValueUnit
}

export type MainstreamElastic = {
    young?: MainstreamValueUnit,
    rigidity?: MainstreamValueUnit,
    bulk?: MainstreamValueUnit,
    poisson?: number,
}

export type MainstreamElectrical = {
    conductivity?: MainstreamValueUnit,
    resistivity?: MainstreamValueUnit,
}

export type MainstreamHardness = {
    mohs?: number,
    brinell?: MainstreamValueUnit
    vickers?: MainstreamValueUnit
}

export type MainstreamNFPA = {
    h: string
    f: string
    i: string
    s: string
}

export type MainstreamHazard = {
    h: string[],
    p: string[] | null
    hazard?: string[]
    ghs: string[]
    adr?: string[],
    nfpa?: MainstreamNFPA
}

export type MainstreamHeat = {
    heat_capacity?: MainstreamValueUnit | MainstreamValueUnit[],
    thermal_conductivity: MainstreamValueUnit
    thermal_expansion?: MainstreamValueUnit
    work_function?: MainstreamValueUnit
}

export type MainstreamImage = {
    url: string,
    caption: string
}

export type MainstreamIonization = {
    values: number[],
    unit: string
    "*"?: boolean,
}

export type MainstreamNames = {
    [key in Languages]?: string
}

export type MainstreamNegativity = {
    pauling?: number
    sanderson?: number
    allred?: number
    mulliken?: number
    allen?: number
    ghosh_gupta?: MainstreamValueUnit
    nagle?: number
    boyd?: number,
    pearson?: MainstreamValueUnit
}

export type MainstreamOptical = {
    refractive_index?: MainstreamValueUnit[] | number | MainstreamValueUnit,
    reflectivity?: MainstreamValueUnit,
}

export type MainstreamRadius = {
    empirical?: MainstreamValueUnit
    calculated?: MainstreamValueUnit
    covalent?: MainstreamValueUnit
    vdw?: MainstreamValueUnit
}

export type MainstreamStandardAtomicWeight = {
    value: number,
    deviation: number,
    range?: number[]
}

export type MainstreamTemperature = {
    melting?: MainstreamValueUnit
    boiling?: MainstreamValueUnit
    liquid?: MainstreamValueUnit
    triple?: MainstreamValueUnit
    critical?: MainstreamValueUnit
    transition?: MainstreamValueUnit
    sublimation?: MainstreamValueUnit
}

export type MainstreamToxicity = {
    type: string
    organism: string,
    application: string,
    time?: number,
    value: MainstreamValueUnit
}

export type MainstreamWebLink = {
    url: string,
    text: string
}

export type MainstreamWiki = {
    [key in Languages]?: string
}
export type MainstreamElementData = {
    "@modified": string
    abundance?: MainstreamAbundance
    appearance?: MainstreamAppearance
    atomic_mass: MainstreamValueUnit,
    basicity?: string
    block: string
    classification: MainstreamClassification
    column: number
    crystal_structure?: string
    density?: MainstreamDensity[] | MainstreamValueUnit
    discovery?: MainstreamDiscovery
    electron_config: string
    enthalpy?: MainstreamEnthalpy
    era: string
    elastic?: MainstreamElastic,
    electrical?: MainstreamElectrical,
    goldschmidt: string
    group: number
    hardness?: MainstreamHardness,
    hazard: MainstreamHazard | null
    heat?: MainstreamHeat
    image?: MainstreamImage
    ionization: MainstreamIonization
    magnetic_ordering?: string
    magnetic_susceptibility?: MainstreamValueUnit
    molar_volume?: MainstreamLabelValueUnit | MainstreamValueUnit
    names: MainstreamNames
    natural_occurrence: string
    negativity?: MainstreamNegativity
    number: number
    optical?: MainstreamOptical
    oxidation_state?: string
    oxide_character?: string,
    period: number
    phase?: string
    price?: MainstreamValueUnit
    properties: string[]
    radioactive?: boolean,
    radioactivity?: string,
    radius?: MainstreamRadius
    set: string
    shell: number[]
    sound_speed?: MainstreamValueUnit | MainstreamValueUnit[]
    standard_atomic_weight?: MainstreamStandardAtomicWeight
    standard_potential?: MainstreamValueUnit
    superconductivity?: string
    symbol: string
    temperature?: MainstreamTemperature,
    toxicity?: MainstreamToxicity[]
    weblinks?: MainstreamWebLink[]
    wiki: MainstreamWiki
}


export type MainstreamStructure = {
    [key in Elements]: MainstreamElementData
}