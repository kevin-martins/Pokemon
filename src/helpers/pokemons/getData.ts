import { NewPokemonEvolutionProps } from "../../models/pokemon"
import { EvolvesToProps } from "../../models/query-response/pokemon-evolution-chain/chain/evolves-to"

export const getEvolutionChainRecursively = (evolves_to: EvolvesToProps[] | [], evolutions: NewPokemonEvolutionProps[]) => {
    evolves_to.forEach((e: EvolvesToProps) => {
        evolutions.push({
            level: e.evolution_details[0].min_level,
            to: e.species.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${e.species.url.split('/')[6]}.png`,
            current: false,
        })
        return getEvolutionChainRecursively(e.evolves_to, evolutions)
    })
    return evolutions
}

export const getCurrentPokemonEvolutionIndex = (evolutions: NewPokemonEvolutionProps[]): number => {
    return evolutions.findIndex(pkm => pkm.current)
}

export const getCurrentPokemonEvolutionFormData = (evolutions: NewPokemonEvolutionProps[]): NewPokemonEvolutionProps => {
    return evolutions[getCurrentPokemonEvolutionIndex(evolutions)]
}

export const getNextPokemonEvolutionFormData = (evolutions: NewPokemonEvolutionProps[]): NewPokemonEvolutionProps => {
    const currentFormIndex = getCurrentPokemonEvolutionIndex(evolutions)
    if (currentFormIndex >= evolutions.length - 1) {
        return evolutions[currentFormIndex]
    }
    return evolutions[currentFormIndex + 1]
}

export const getMissingLevelToEvolve = (evolutions: NewPokemonEvolutionProps[], currentLevel: number): number => {
    const missingLevels =  getNextPokemonEvolutionFormData(evolutions).level - currentLevel
    return missingLevels
}


export const getPokeballFilename = (name: string): string => {
    return name.toLocaleLowerCase().split(/ ?ball/).join('ball').trim()
}
