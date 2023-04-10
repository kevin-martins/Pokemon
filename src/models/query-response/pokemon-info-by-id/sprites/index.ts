import { VersionProps } from "./version"

type DreamWorldProps = {
    front_default: string,
    front_female: null,
}

type HomeProps = {
    front_default: string,
    front_female: null,
    front_shiny: string,
    front_shiny_female: null
}

type OfficialArtworkProps = {
    front_default: string,
    front_shiny: string,
}

type OtherProps = {
    dream_world: DreamWorldProps,
    home: HomeProps,
    [`official-artwork`]: OfficialArtworkProps
}

export type SpritesProps = {
    back_default: string | null,
    back_female: string | null,
    back_shiny: string | null,
    back_shiny_female: string | null,
    front_default: string | null,
    front_female: string | null,
    front_shiny: string | null,
    front_shiny_female: string | null,
    other: OtherProps,
    version: VersionProps,
}