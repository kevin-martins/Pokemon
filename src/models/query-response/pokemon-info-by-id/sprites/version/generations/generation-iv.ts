type DiamondPearlProps = {
    backDefault: string | null,
    backFemale: string | null,
    backShiny: string | null,
    backShinyFemale: string | null,
    frontDefault: string | null,
    frontFemale: string | null,
    frontShiny: string | null,
    frontShinyFemale: string | null;
}

type HeartgoldSoulsilverProps = {
    backDefault: string | null,
    backFemale: string | null,
    backShiny: string | null,
    backShinyFemale: string | null,
    frontDefault: string | null,
    frontFemale: string | null,
    frontShiny: string | null,
    frontShinyFemale: string | null;
}

type PlatinumProps = {
    backDefault: string | null,
    backFemale: string | null,
    backShiny: string | null,
    backShinyFemale: string | null,
    frontDefault: string | null,
    frontFemale: string | null,
    frontShiny: string | null,
    frontShinyFemale: string | null;
}

export type GenerationIVProps = {
    [`diamond-pearl`]: DiamondPearlProps,
    [`heartgold-soulsilver`]: HeartgoldSoulsilverProps,
    platinium: PlatinumProps,
}