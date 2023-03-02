import { MovesProps } from "./query-response/pokemon-info-by-id/moves"
import { SpeciesProps } from "./query-response/shared/species"
import { StatsProps } from "./query-response/pokemon-info-by-id/stats"
import { TypesProps } from "./query-response/pokemon-info-by-id/types"
import { PokemonSpeciesResponseProps } from "./query-response/pokemon-species"
import { NamesProps } from "./query-response/shared/names"

type SpritesProps = {
    default: string,
    shiny: string,
}

export type NewPokemonEvolutionProps = {
    level: number,
    to: string,
}

export type NewPokemonSpeciesProps = {
    capture_rate: number,
    is_legendary: boolean,
    is_mythical: boolean,
    names: NamesProps[],
    evolutions: string,
}

export type NewPokemonDataProps = {
    id: number,
    name: string,
    names: NamesProps[],
    discovered: boolean,
    current_level: 1,
    current_xp: number,
    to_next_level: number,
    capture_rate: number,
    evolutions: NewPokemonEvolutionProps[],
    is_legendary: boolean,
    is_mythical: boolean,
    moves: MovesProps[],
    sprites: SpritesProps,
    stats: StatsProps[],
    types: TypesProps[],
}

export type PokemonTeam = {
    id: number,
    name: string,

}
