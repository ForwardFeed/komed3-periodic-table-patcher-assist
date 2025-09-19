

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


export type MainstreamValue = {
    value: string
}

export type MainstreamValueUnit = {
    value: number
    unit: string
}

export type MainstreamValueLabel = {
    value: number
    label: string
}

export type MainstreamMultipleValuesUnit = {
    value: number[]
    unit: string
}

export type MainstreamValueUnitCondition = {
    value: number
    unit: string,
    condition: MainstreamValue[]
}


export type MainstreamValueUnitConditionArobase = {
    value: number
    unit: string,
    condition: MainstreamValue[]
}

export type MainstreamLabelValueUnit = {
    label: string,
    value: number
    unit: string,
}

export type MainstreamAbundance = {
    universe: MainstreamValueUnit
    sun: MainstreamValueUnit
    meteorite: MainstreamValueUnit
    crust: MainstreamValueUnit
    water: MainstreamValueUnit
    stream: MainstreamValueUnit
    human: MainstreamValueUnit
}

export type MainstreamAppearance = {
    [key in Languages]?: string
}

export type MainstreamClassification = {
    cas: MainstreamValueLabel[],
    eg: MainstreamValue[],
    echa: MainstreamValue[]
}

export type MainstreamDensity = {
    label: string
    value: number
    unit: string
    condition: MainstreamValueUnit[]
}

export type MainstreamDiscovery = {
    by: string,
    value: number
}

export type MainstreamEnthalpy = {
    fusion: MainstreamValueUnit,
    vaporisation: MainstreamValueUnit,
    atomisation: MainstreamValueUnit
}


export type MainstreamNFPA = {
    h: string
    f: string
    i: string
    s: string
}

export type MainstreamHazard = {
    h: string[],
    p: string[]
    hazard: string[]
    ghs: string[]
    adr: string[],
    nfpa: MainstreamNFPA
}

export type MainstreamHeat = {
    heat_capacity: MainstreamValueUnit,
    thermal_conductivity: MainstreamValueUnit
}

export type MainstreamImage = {
    url: string,
    caption: string
}

export type MainstreamIonization = {
    values: number[],
    unit: string
}

export type MainstreamNames = {
    [key in Languages]?: string
}

export type MainstreamNegativity = {
    pauling: number
    sanderson: number
    allred: number
    mulliken: number
    allen: number
    ghosh_gupta: MainstreamValueUnit
    nagle: number
    pearson: MainstreamValueUnit
}

export type MainstreamOptical = {
    refractive_index: MainstreamValueUnit[]
}

export type MainstreamRadius = {
    empirical: MainstreamValueUnit
    calculated: MainstreamValueUnit
    covalent: MainstreamValueUnit
    vdw: MainstreamValueUnit
}

export type MainstreamStandardAtomicWeight = {
    value: number,
    deviation: number,
    range: number[]
}

export type MainstreamTemperature = {
    melting: MainstreamValueUnit
    boiling: MainstreamValueUnit
    liquid: MainstreamValueUnit
    triple: MainstreamValueUnitConditionArobase
    critical: MainstreamValueUnitConditionArobase
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
    abundance: MainstreamAbundance
    appearance: MainstreamAppearance
    atomic_mass: MainstreamValueUnit
    basicity: string
    block: string
    classification: MainstreamClassification
    column: number
    crystal_structure: string
    density: MainstreamDensity[]
    discovery: MainstreamDiscovery
    electron_config: string
    enthalpy: MainstreamEnthalpy
    era: string
    goldschmidt: string
    group: number
    hazard: MainstreamHazard
    heat: MainstreamHeat
    image: MainstreamImage
    ionization: MainstreamMultipleValuesUnit
    magnetic_ordering: string
    magnetic_susceptibility: MainstreamValueUnitCondition
    molar_volume: MainstreamLabelValueUnit
    names: MainstreamNames
    natural_occurrence: string
    negativity: MainstreamNegativity
    number: number
    optical: MainstreamOptical
    oxidation_state: string
    period: number
    phase: string
    price: MainstreamValueUnit
    properties: string[]
    radius: MainstreamRadius
    set: string
    shell: number[]
    sound_speed: MainstreamValueUnitCondition
    standard_atomic_weight: MainstreamStandardAtomicWeight
    standard_potential: MainstreamValueUnit
    superconductivity: string
    symbol: string
    temperature: MainstreamTemperature,
    weblinks: MainstreamWebLink[]
    wiki: MainstreamWiki
}


export type MainstreamStructure = {
    [key in Elements]: MainstreamElementData
}
