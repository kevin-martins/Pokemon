import { isEvolutionFormAlreadyInArray, isPokemonAlreadyInArray } from "../../../src/helpers/pokemons/checkData";

describe('isPokemonAlreadyInArray', () => {
  const pokemonId = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]
  
  it('should return false if PokemonID is not in in the array', () => {
    const result = isPokemonAlreadyInArray(pokemonId, 5)

    expect(result).toBe(false)
  })
  
  it('should return true when PokemonID is already the array', () => {
    const result = isPokemonAlreadyInArray(pokemonId, 1)

    expect(result).toBe(true)
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
      currentLevel: 0,
      currentXp: 0,
      toNextLevel: 0,
      captureRate: 0,
      evolutions: [...validPokemonEvolutions],
      isLegendary: false,
      isMythical: false,
      moves: [],
      currentMoves: [],
      sprites: { default: "", shiny: "" },
      stats: [],
      types: [],
    },
    {
      id: 0,
      name: "truc",
      names: [],
      discovered: true,
      currentLevel: 0,
      currentXp: 0,
      toNextLevel: 0,
      captureRate: 0,
      evolutions: [...validPokemonEvolutions],
      isLegendary: false,
      isMythical: false,
      moves: [],
      currentMoves: [],
      sprites: { default: "", shiny: "" },
      stats: [],
      types: [],
    },
    {
      id: 0,
      name: "venusaur",
      names: [],
      discovered: true,
      currentLevel: 0,
      currentXp: 0,
      toNextLevel: 0,
      captureRate: 0,
      evolutions: [...validPokemonEvolutions],
      isLegendary: false,
      isMythical: false,
      moves: [],
      currentMoves: [],
      sprites: { default: "", shiny: "" },
      stats: [],
      types: [],
    }
  ]
  
  it('should return true if evolution forms is found in array', () => {
    const result = isEvolutionFormAlreadyInArray(validPokemonEvolutions, teamMock)

    // TODO: why strict equal?
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