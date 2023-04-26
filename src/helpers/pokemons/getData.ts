import { generationRange } from "../../constants/select"
import { GenerationRangeProps, NewPokemonDataProps, NewPokemonEvolutionProps } from "../../models/pokemon"
import { EvolvesToProps } from "../../models/query-response/pokemon-evolution-chain/chain/evolves-to"

export const getPokemonSpriteUrlById = (pokemonId: number | string): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`
}

export const getEvolutionChainRecursively = (
    evolvesTo: EvolvesToProps[] | [],
    evolutions: NewPokemonEvolutionProps[]
) => {
    evolvesTo.forEach((e: EvolvesToProps) => {
        evolutions.push({
            level: e.evolution_details[0].min_level,
            name: e.species.name,
            sprite: getPokemonSpriteUrlById(e.species.url.split('/')[6]),
            current: false,
        })
        return getEvolutionChainRecursively(e.evolves_to, evolutions)
    })
    return evolutions
}

export const getCurrentPokemonEvolutionIndex = (
    evolutions: NewPokemonEvolutionProps[]
): number => {
    return evolutions.findIndex(pkm => pkm.current)
}

export const getPokemonEvolutionFormData = (
    evolutions: NewPokemonEvolutionProps[]
): NewPokemonEvolutionProps => {
    return evolutions[getCurrentPokemonEvolutionIndex(evolutions)]
}

export const getCurrentPokemonEvolutionForm = (
    evolutions: NewPokemonEvolutionProps[]
): string => {
    for (const evolution of evolutions) {
        if (evolution.current) {
            return evolution.name
        }
    }
    return ""
}

export const updatePokemonEvolutionFormData = (
    evolutions: NewPokemonEvolutionProps[]
): NewPokemonEvolutionProps[] => {
    const nextEvolutionForm = getNextPokemonEvolutionFormData(evolutions)

    return evolutions.map(evolution => {
        if (evolution.name === nextEvolutionForm.name) {
            return {
                ...evolution,
                current: true,
            }
        } else {
            return {
                ...evolution,
                current: false,
            }
        }
    })
}

export const getNextPokemonEvolutionFormData = (
    evolutions: NewPokemonEvolutionProps[]
): NewPokemonEvolutionProps => {
    const currentFormIndex = getCurrentPokemonEvolutionIndex(evolutions)

    if (currentFormIndex >= evolutions.length - 1) {
        return {
            ...evolutions[currentFormIndex],
            current: true
        }
    }
    return {
        ...evolutions[currentFormIndex + 1],
        current: true
    }
}

export const getPokemonNames = (
    pokemonArray: { name: string }[]
): string[] => {
    return pokemonArray.map((pkm: { name: string }) => pkm.name)
}


// TODO: what is the point of this function?
export const getPokemonDataFormEvolutions = <T extends string | number>(
    pokedex: NewPokemonDataProps[],
    identifier: T
): NewPokemonDataProps[] => {
    const evolutionFormNames = getPokemonNames(getPokemonDataByIdentifier(pokedex, identifier).evolutions)
    return evolutionFormNames.map(name => getPokemonDataByIdentifier(pokedex, name))
}

export const getPokemonDataByIdentifier = <T extends string | number>(
    pokedex: NewPokemonDataProps[],
    identifier: T
): NewPokemonDataProps => {
    if (typeof identifier === "string")
        return pokedex[pokedex.findIndex(pkm => pkm.name === identifier)]
    return pokedex[pokedex.findIndex(pkm => pkm.id === identifier)]
}

export const getPokemonIndexByIdentifier = <T extends string | number>(
    pokemons: NewPokemonDataProps[],
    identifier: T
): number => {
    if (typeof identifier === "string")
        return pokemons.findIndex((pkm: NewPokemonDataProps) => pkm.name === identifier)
    return pokemons.findIndex((pkm: NewPokemonDataProps) => pkm.id === identifier)
}

export const getMissingLevelToEvolve = (
    evolutions: NewPokemonEvolutionProps[],
    currentLevel: number
): number => {
    return getNextPokemonEvolutionFormData(evolutions).level - currentLevel
}

// TODO: not used?
export const getPokemonDiscover = (
    evolutionNames: string[],
    nextEvolutionName: string,
    pokemonName: string,
): boolean => {
    const nextFormIndex = evolutionNames.findIndex(name => name === nextEvolutionName)
    const currentFormIndex = evolutionNames.findIndex(name => name === pokemonName)

    return currentFormIndex <= nextFormIndex
}

export const getGenerationRangeByGenerationValue = (value: string): GenerationRangeProps => {
    return generationRange.find(generation => generation.value === value)!
}
