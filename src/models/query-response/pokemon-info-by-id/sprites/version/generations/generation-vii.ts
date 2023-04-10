export type IconProps = {
    frontDefault: string | null,
    frontFemale: string | null
}

type UltraSunUltraMoonProps = {
    frontDefault: string | null,
    frontFemale: string | null,
    frontShiny: string | null,
    frontShinyFemale: string | null
}

export type GenerationVIIProps = {
    icons: IconProps,
    [`ultra-sun-ultra-moon`]: UltraSunUltraMoonProps,
}