type BlackWhiteProps = {
    animated: BlackWhiteAnimatedProps,
    backDefault: string | null,
    backFemale: string | null,
    backShiny: string | null,
    backShinyFemale: string | null,
    frontDefault: string | null,
    frontFemale: string | null,
    frontShiny: string | null,
    frontShinyFemale: string | null
}

type BlackWhiteAnimatedProps = {
    backDefault: string | null,
    backFemale: string | null,
    backShiny: string | null,
    backShinyFemale: string | null,
    frontDefault: string | null,
    frontFemale: string | null,
    frontShiny: string | null,
    frontShinyFemale: string | null
}

export type GenerationVProps = {
    [`black-white`]: BlackWhiteProps,
}