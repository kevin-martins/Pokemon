type EmeraldProps = {
    front_default: string,
    front_shiny: string,
}

type FireredLeafgreenProps = {
    back_default: string,
    back_shiny: string,
    front_default: string,
    front_shiny: string,
}

type RubisSapphireProps = {
    back_default: string,
    back_shiny: string,
    front_default: string,
    front_shiny: string,
}

export type GenerationIIIProps = {
    emerald: EmeraldProps,
    [`firered-leafgreen`]: FireredLeafgreenProps,
    [`rubis-sapphire`]: RubisSapphireProps,
}