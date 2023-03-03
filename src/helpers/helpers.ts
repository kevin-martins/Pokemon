import { AlertState } from "../models/alert"
import { NewPokemonEvolutionProps, NewPokemonDataProps } from "../models/pokemon"
import { EvolvesToProps } from "../models/query-response/pokemon-evolution-chain/chain/evolves-to"

export const capitalize = (str: string): string => {
    return str[0].toUpperCase() + str.split('').splice(1, str.length).join('')
}

export const checkPokemonOccurences = (pokedex: { id: number }[], pokemonId: number): boolean => {
    return pokedex.every(pokemon => pokemonId !== pokemon.id)
}

export const getRandomValue = (max: number) => {
    return Math.floor(Math.random() * max);
}

export const getEvolutionChainRecursively = (evolves_to: EvolvesToProps[] | [], evolutions: NewPokemonEvolutionProps[]) => {
    evolves_to.forEach((e: EvolvesToProps) => {
        evolutions.push({
            level: e.evolution_details[0].min_level,
            to: e.species.name,
            current: false,
        })
        return getEvolutionChainRecursively(e.evolves_to, evolutions)
    })
    return evolutions
}

export const getActionMessage = (action: AlertState) => {
    switch (action) {
        case AlertState.Add: return 'added to'
        case AlertState.AlreadyIn: return 'already in'
        case AlertState.Remove: return 'removed from'
        case AlertState.Swap: return 'replaced by'
        default: return ""
    }
}

export const getFile = (path: string, ext: string = "png"): string => {
    return process.env.PUBLIC_URL + path + "." + ext
}

export const getPokeballFilename = (name: string): string => {
    return name.toLocaleLowerCase().split(/ ?ball/).join('ball').trim()
}

export const getPokemonByName = (name: string, pokemons: NewPokemonDataProps[]): NewPokemonDataProps => {
    return pokemons[pokemons.findIndex((pkm: NewPokemonDataProps) => pkm.name === name)]
}

export const getPokemonIndexByName = (pokemons: NewPokemonDataProps[], name: string): number => {
    return pokemons.findIndex((pkm: NewPokemonDataProps) => pkm.name === name)
}

export const getNextPokemonEvolutionName = (pokemon: NewPokemonDataProps): string => {
    const evolutionNames = [pokemon.name, ...pokemon.evolutions.map((pkm: NewPokemonEvolutionProps) => pkm.to)]
    const currentFormIndex = evolutionNames.findIndex(pkm => pkm.includes(pokemon.name))
    return evolutionNames[currentFormIndex + (currentFormIndex === (evolutionNames.length - 1) ? 0 : 1)]
}
