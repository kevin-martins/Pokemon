import { AbilitiesProps } from "./abilities"
import { GameIndicesProps } from "./game-indices"
import { HeldItemsProps } from "./held-items"
import { MovesProps } from "./moves"
import { SpeciesProps } from "../shared/species"
import { SpritesProps } from "./sprites"
import { StatsProps } from "./stats"
import { TypesProps } from "./types"

type FormsProps = {
    name: string,
    url: string,
}

export type PokemonInfoByIdResponseProps = {
    id: number,
    abilities: AbilitiesProps[],
    baseExperience: number,
    forms: FormsProps[],
    gameIndices: GameIndicesProps[],
    height: number,
    weight: number,
    heldItems: HeldItemsProps[],
    isDefault: boolean,
    locationAreaEncounters: string,
    moves: MovesProps[],
    name: string,
    order: number,
    pastTypes: [],
    species: SpeciesProps,
    sprites: SpritesProps,
    stats: StatsProps[],
    types: TypesProps[],
}
