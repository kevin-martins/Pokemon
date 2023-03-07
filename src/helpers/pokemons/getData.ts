import { generationRange } from "../../api/select"
import { GenerationRangeProps, NewPokemonDataProps, NewPokemonEvolutionProps } from "../../models/pokemon"
import { EvolvesToProps } from "../../models/query-response/pokemon-evolution-chain/chain/evolves-to"

export const getPokemonSpriteUrlById = (pokemonId: number | string): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`
}

export const getEvolutionChainRecursively = (
    evolves_to: EvolvesToProps[] | [],
    evolutions: NewPokemonEvolutionProps[]
) => {
    evolves_to.forEach((e: EvolvesToProps) => {
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

export const getNextPokemonEvolutionFormData = (
    evolutions: NewPokemonEvolutionProps[]
): NewPokemonEvolutionProps => {
    const currentFormIndex = getCurrentPokemonEvolutionIndex(evolutions)
    if (currentFormIndex >= evolutions.length - 1) {
        return evolutions[currentFormIndex]
    }
    return evolutions[currentFormIndex + 1]
}

// export const get

// export const getMaxEvolutionFormData = (
//     pokemonArray: NewPokemonDataProps[],
//     evolutions: NewPokemonEvolutionProps[]
// ): NewPokemonDataProps => {
//     const evolutionsFormName = getPokemonNames(evolutions)
//     const maxEvolutionFormName = evolutionsFormName[evolutionsFormName.length - 1]

//     return getPokemonDataByIdentifier(pokemonArray, maxEvolutionFormName)
// }

export const getPokemonNames = (
    pokemonArray: { name: string }[]
): string[] => {
    return pokemonArray.map((pkm: { name: string }) => pkm.name)
}

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

export const getPokemonDiscover = (
    evolutionNames: string[],
    nextEvolutionName: string,
    pokemonName: string,
): boolean => {
    const nextFormIndex = evolutionNames.findIndex(name => name === nextEvolutionName)
    const currentFormIndex = evolutionNames.findIndex(name => name === pokemonName)

    return currentFormIndex <= nextFormIndex
}

// export const getPokeballFilename = (name: string): string => {
//     return name.toLocaleLowerCase().split(/ ?ball/).join('ball').trim()
// }

export const getGenerationRangeByGenerationValue = (value: string): GenerationRangeProps => {
    return generationRange.reduce((acc: GenerationRangeProps, curr: GenerationRangeProps) => {
        if (curr.value === value)
            acc = { ...curr }
        return acc
    }, { value: "", from: 0, to: 0 })
}
