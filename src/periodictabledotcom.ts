/**
 * Taken from https://github.com/ForwardFeed/periodic-table-data
 */


export type MaybeNumber = number | "N/A"
export const Phase = [ "N/A", "gas", "liquid", "solid"] as const
export type Phase = typeof Phase[number]
export const GasAtomicMultiplicities = ["N/A", "diatomic", "monoatomic"] as const
export type GasAtomicMultiplicities = typeof GasAtomicMultiplicities[number]
export const Series = ["actinide", "alkali_metal", "alkali_earth_metal", "chalcogen", "halogen", "lanthanide",
    "noble_gas", "metalloid", "non_metal", "poor_metal", "transition_metal"] as const
export type Series = typeof Series[number]
export const Color = ["N/A", "colorless", "silver", "slate_gray", "black", "gray", "yellow", "copper", "red", "gold" ] as const
export type Color = typeof Color[number]
export const ElectricalType =  ["N/A", "conductor", "insulator", "semiconductor" ] as const
export type ElectricalType = typeof ElectricalType[number]
export const MagneticType = ["N/A", "diamagnetic", "paramagnetic", "antiferromagnetic", "ferromagnetic"] as const
export type MagneticType = typeof MagneticType[number]
export const CrystalStructure = ["N/A", "simple_hexagonal", "simple_trigonal", "face_centered_cubic", "body_centered_cubic",
    "base_centered_monoclinic", "tetrahedral_packing", "simple_triclinic", "face_centered_orthorhombic", "base_orthorhombic",
    "simple_monoclinic", "simple_orthorhombic", "centered_tetragonal", "simple_cubic"] as const
export type CrystalStructure = typeof CrystalStructure[number]
export const DecayMode = ["N/A", "beta_decay", "electron_capture", "alpha_emission", "beta_plus_decay" ] as const
export type DecayMode = typeof DecayMode[number]
export const Block = ["N/A", "s", "p", "d", "f"] as const
export type Block = typeof Block[number]
export type IsotopicAbundance = {
    isotope: string,
    percent: number
}

export type PTDCElementRefined = {
    name: string,
    symbol: string
    atomic_number: MaybeNumber,
    atomic_weight: MaybeNumber,
    density: MaybeNumber,
    density_liquid: MaybeNumber,
    melting: MaybeNumber,
    melting_absolute: MaybeNumber,
    boiling: MaybeNumber,
    boiling_absolute: MaybeNumber,
    phase: Phase,
    critical_pressure: MaybeNumber,
    critial_temperature: MaybeNumber,
    heat_fusion: MaybeNumber,
    heat_vaporisation: MaybeNumber,
    specific_heat: MaybeNumber,
    adiabatic_index: string,
    neel_point: MaybeNumber,
    thermal_conductivity:MaybeNumber,
    thermal_expansion: MaybeNumber,
    molar_volume: MaybeNumber,
    hardness_brinell: MaybeNumber,
    hardness_mohs: MaybeNumber
    hardness_vickers: MaybeNumber,
    modulus_bulk: MaybeNumber,
    modulus_shear: MaybeNumber,
    modulus_young: MaybeNumber,
    ratio_poisson: MaybeNumber,
    refractive_index: MaybeNumber,
    speed_sound: MaybeNumber,
    valence: MaybeNumber,
    electronegativity: MaybeNumber,
    electroaffinity: MaybeNumber,
    ionization_energy: MaybeNumber[],
    dot_hazard_class: string,
    dot_number: string,
    rtecs_number: string,
    nfpa_label: string,
    name_alternative: string,
    name_allotropes: string,
    block: string,
    group: MaybeNumber,
    period: MaybeNumber,
    series: Series,
    electron_configuration: string,
    color: Color,
    discovery: string,
    gas_phase: GasAtomicMultiplicities,
    cas_number: string,
    cid_number: string,
    electrical_type: ElectricalType,
    electrical_conductivity: MaybeNumber,
    resistivity: MaybeNumber,
    superconducting_point:MaybeNumber,
    magnetic_type: MagneticType,
    curie_point: MaybeNumber,
    magnetic_susceptibility_mass: MaybeNumber,
    magnetic_susceptibility_molar: MaybeNumber,
    magnetic_susceptibility_volume: MaybeNumber,
    abundance_universe: MaybeNumber,
    abundance_sun: MaybeNumber,
    abundance_meteorite: MaybeNumber,
    abundance_earth_crust: MaybeNumber,
    abundance_ocean: MaybeNumber,
    abundance_human: MaybeNumber,
    radius_atomic: MaybeNumber,
    radius_covalent: MaybeNumber,
    radius_van_der_waals: MaybeNumber,
    crystal_structure: CrystalStructure,
    lattice_angles: [string, string, string] | undefined,
    lattice_constants: [number, number, number] | undefined,
    space_group_name:string,
    space_group_number: MaybeNumber
    half_life: string,
    lifetime: string,
    decay_mode: DecayMode,
    quantum_number: string,
    neutron_cross_section: MaybeNumber,
    neutron_mass_absorbtion: MaybeNumber,
    isotopes_known: string[],
    isotopes_stable: string[],
    isotopes_abundance: IsotopicAbundance[]
}
