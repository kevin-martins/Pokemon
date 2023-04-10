import { VersionProps } from "./version"

type DreamWorldProps = {
    frontDefault: string,
    frontFemale: null,
}

type HomeProps = {
    frontDefault: string,
    frontFemale: null,
    frontShiny: string,
    frontShinyFemale: null
}

type OfficialArtworkProps = {
    frontDefault: string,
    frontShiny: string,
}

type OtherProps = {
    dreamWorld: DreamWorldProps,
    home: HomeProps,
    [`official-artwork`]: OfficialArtworkProps
}

export type SpritesProps = {
    backDefault: string | null,
    backFemale: string | null,
    backShiny: string | null,
    backShinyFemale: string | null,
    frontDefault: string | null,
    frontFemale: string | null,
    frontShiny: string | null,
    frontShinyFemale: string | null,
    other: OtherProps,
    version: VersionProps,
}