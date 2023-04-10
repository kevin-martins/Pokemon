type CrystalProps = {
    backDefault: string,
    backShiny: string,
    backShinyTransparent: string,
    backTransparent: string,
    frontDefault: string,
    frontShiny: string,
    frontShinyTransparent: string,
    frontTransparent: string,
}

type GoldProps = {
    backDefault: string,
    backShiny: string,
    frontDefault: string,
    frontShiny: string,
    frontTransparent: string,
}

type SilverProps = {
    backDefault: string,
    backShiny: string,
    frontDefault: string,
    frontShiny: string,
    frontTransparent: string,
}

export type GenerationIIProps = {
    crystal : CrystalProps,
    gold: GoldProps,
    silver: SilverProps,
}