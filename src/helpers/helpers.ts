import { NewPokemonEvolutionProps, NewPokemonDataProps } from "../models/pokemon"

export const getPokemonIndexByName = (pokemons: NewPokemonDataProps[], name: string): number => {
    console.log(name, pokemons.findIndex((pkm: NewPokemonDataProps) => pkm.name === name))
    return pokemons.findIndex((pkm: NewPokemonDataProps) => pkm.name === name)
}
