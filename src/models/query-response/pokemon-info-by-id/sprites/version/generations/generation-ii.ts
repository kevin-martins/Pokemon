type CrystalProps = {
    back_default: string,
    back_shiny: string,
    back_shiny_transparent: string,
    back_transparent: string,
    front_default: string,
    front_shiny: string,
    front_shiny_transparent: string,
    front_transparent: string,
}

type GoldProps = {
    back_default: string,
    back_shiny: string,
    front_default: string,
    front_shiny: string,
    front_transparent: string,
}

type SilverProps = {
    back_default: string,
    back_shiny: string,
    front_default: string,
    front_shiny: string,
    front_transparent: string,
}

export type GenerationIIProps = {
    crystal : CrystalProps,
    gold: GoldProps,
    silver: SilverProps,
}