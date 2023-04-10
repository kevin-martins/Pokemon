type OmegaRubisAlphaSapphireProps = {
    front_default: string | null,
    front_female: string | null,
    front_shiny: string | null,
    front_shiny_female: string | null
}

type XYProps = {
    front_default: string | null,
    front_female: string | null,
    front_shiny: string | null,
    front_shiny_female: string | null
}

export type GenerationVIProps = {
    [`omegaruby-alphasapphire`]: OmegaRubisAlphaSapphireProps
    [`x-y`]: XYProps,
}