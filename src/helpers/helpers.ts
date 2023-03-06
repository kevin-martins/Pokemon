import { NewPokemonEvolutionProps, NewPokemonDataProps } from "../models/pokemon"

export const getPokemonIndexByName = (pokemons: NewPokemonDataProps[], name: string): number => {
    return pokemons.findIndex((pkm: NewPokemonDataProps) => pkm.name === name)
}
