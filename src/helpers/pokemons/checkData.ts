import { NewPokemonDataProps, NewPokemonEvolutionProps } from "../../models/pokemon"
import { getPokemonNames } from "./getData"

export const isPokemonAlreadyInArray = (pokemonArray: { id: number }[], pokemonId: number): boolean => {
    return pokemonArray.every(pokemon => pokemonId !== pokemon.id)
}

export const isEvolutionFormAlreadyInArray = (
    evolutions: NewPokemonEvolutionProps[],
    team: NewPokemonDataProps[]
): boolean => {
    const tryingToAddFormNames = getPokemonNames(evolutions)

    for (const pokemon of team) {
        const teamEvolutionFormNames = getPokemonNames(pokemon.evolutions)

        for (const teamEvolutionFormName of teamEvolutionFormNames) {
            if (tryingToAddFormNames.includes(teamEvolutionFormName)) {
                return true
            }
        }
    }
    return false
}
