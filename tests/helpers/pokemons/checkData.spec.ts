import { isEvolutionFormAlreadyInArray, isPokemonAlreadyInArray } from "../../../src/helpers/pokemons/checkData";

describe('isPokemonAlreadyInArray', () => {
  const pokemonArray = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]
  
  it('should return true when PokemonID is not in the array', () => {
    const result = isPokemonAlreadyInArray(pokemonArray, 5)

    expect(result).toBe(true)
  })
  
  it('should return false when PokemonID is in the array', () => {
    const result = isPokemonAlreadyInArray(pokemonArray, 1)

    expect(result).toBe(false)
  });
})

describe('isEvolutionFormAlreadyInArray', () => {
  const validPokemonEvolutions = [
    { level: 1, name: "bulbasaur", current: false, sprite: "" },
    { level: 16, name: "ivysaur", current: true, sprite: "" },
    { level: 32, name: "venusaur", current: false, sprite: "" }
  ]
  const teamMock = [
    {
      id: 0,
      name: "machin",
      names: [],
      discovered: true,
      current_level: 0,
      current_xp: 0,
      to_next_level: 0,
      capture_rate: 0,
      evolutions: [...validPokemonEvolutions],
      is_legendary: false,
      is_mythical: false,
      moves: [],
      current_moves: [],
      sprites: { default: "", shiny: "" },
      stats: [],
      types: [],
    },
    {
      id: 0,
      name: "truc",
      names: [],
      discovered: true,
      current_level: 0,
      current_xp: 0,
      to_next_level: 0,
      capture_rate: 0,
      evolutions: [...validPokemonEvolutions],
      is_legendary: false,
      is_mythical: false,
      moves: [],
      current_moves: [],
      sprites: { default: "", shiny: "" },
      stats: [],
      types: [],
    },
    {
      id: 0,
      name: "venusaur",
      names: [],
      discovered: true,
      current_level: 0,
      current_xp: 0,
      to_next_level: 0,
      capture_rate: 0,
      evolutions: [...validPokemonEvolutions],
      is_legendary: false,
      is_mythical: false,
      moves: [],
      current_moves: [],
      sprites: { default: "", shiny: "" },
      stats: [],
      types: [],
    }
  ]
  
  it('should return true if evolution forms is found in array', () => {
    const result = isEvolutionFormAlreadyInArray(validPokemonEvolutions, teamMock)

    expect(result).toStrictEqual(true)
  })

  it('should return false if evolution forms not found in array', () => {
    const invalidPokemonEvolution = [
      { level: 1, name: "truc", current: false, sprite: "" },
      { level: 16, name: "bizz", current: true, sprite: "" },
      { level: 32, name: "boom", current: false, sprite: "" }
    ]
    const result = isEvolutionFormAlreadyInArray(invalidPokemonEvolution, teamMock)

    expect(result).toStrictEqual(false)
  })

})