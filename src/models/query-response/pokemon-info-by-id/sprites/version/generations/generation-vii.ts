export type IconProps = {
    front_default: string | null,
    front_female: string | null
}

type UltraSunUltraMoonProps = {
    front_default: string | null,
    front_female: string | null,
    front_shiny: string | null,
    front_shiny_female: string | null
}

export type GenerationVIIProps = {
    icons: IconProps,
    [`ultra-sun-ultra-moon`]: UltraSunUltraMoonProps,
}