export const isPokemonAlreadyInArray = (pokemonArray: { id: number }[], pokemonId: number): boolean => {
    return !pokemonArray.every(pokemon => pokemonId !== pokemon.id)
}