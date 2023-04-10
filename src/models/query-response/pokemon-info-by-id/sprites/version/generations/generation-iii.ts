type EmeraldProps = {
    frontDefault: string,
    frontShiny: string,
}

type FireredLeafgreenProps = {
    backDefault: string,
    backShiny: string,
    frontDefault: string,
    frontShiny: string,
}

type RubisSapphireProps = {
    backDefault: string,
    backShiny: string,
    frontDefault: string,
    frontShiny: string,
}

export type GenerationIIIProps = {
    emerald: EmeraldProps,
    [`firered-leafgreen`]: FireredLeafgreenProps,
    [`rubis-sapphire`]: RubisSapphireProps,
}