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
    base_experience: number,
    forms: FormsProps[],
    game_indices: GameIndicesProps[],
    height: number,
    weight: number,
    held_items: HeldItemsProps[],
    is_default: boolean,
    location_area_encounters: string,
    moves: MovesProps[],
    name: string,
    order: number,
    past_types: [],
    species: SpeciesProps,
    sprites: SpritesProps,
    stats: StatsProps[],
    types: TypesProps[],
}
