type OmegaRubisAlphaSapphireProps = {
    frontDefault: string | null,
    frontFemale: string | null,
    frontShiny: string | null,
    frontShinyFemale: string | null
}

type XYProps = {
    frontDefault: string | null,
    frontFemale: string | null,
    frontShiny: string | null,
    frontShinyFemale: string | null
}

export type GenerationVIProps = {
    [`omegaruby-alphasapphire`]: OmegaRubisAlphaSapphireProps
    [`x-y`]: XYProps,
}