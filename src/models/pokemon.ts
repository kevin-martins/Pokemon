import { MovesProps } from "./query-response/pokemon-info-by-id/moves"
import { StatsProps } from "./query-response/pokemon-info-by-id/stats"
import { TypesProps } from "./query-response/pokemon-info-by-id/types"
import { NamesProps } from "./query-response/shared/names"

export type SpritesProps = {
    default: string,
    shiny: string,
}

export type NewPokemonEvolutionProps = {
    level: number,
    name: string,
    sprite: string,
    current: boolean,
}

export type NewPokemonSpeciesProps = {
    captureRate: number,
    isLegendary: boolean,
    isMythical: boolean,
    names: NamesProps[],
    evolutions: string,
}

export type GenerationRangeProps = {
    value: string,
    from: number,
    to: number,
}

export type NewPokemonMovesProps = {
    name: string,
    power: number,
    pp: number,
    accuracy: number,
    type: string,
}

export type NewPokemonDataProps = {
    id: number,
    name: string,
    names: NamesProps[],
    discovered: boolean,
    currentLevel: number,
    currentXp: number,
    toNextLevel: number,
    captureRate: number,
    evolutions: NewPokemonEvolutionProps[],
    isLegendary: boolean,
    isMythical: boolean,
    moves: NewPokemonMovesProps[],
    currentMoves: NewPokemonMovesProps[],
    sprites: SpritesProps,
    stats: StatsProps[],
    types: TypesProps[],
}
