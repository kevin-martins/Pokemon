import { generationRange } from "../../../src/constants/select"
import {
  getCurrentPokemonEvolutionFormData,
  getCurrentPokemonEvolutionIndex,
  getEvolutionChainRecursively,
  getGenerationRangeByGenerationValue,
  getMissingLevelToEvolve,
  getNextPokemonEvolutionFormData,
  getNextPokemonEvolutionFormDataByName,
  getPokemonDataByIdentifier,
  getPokemonDataFormEvolutions,
  getPokemonIndexByIdentifier,
  getPokemonNames,
  getPokemonSpriteUrlById,
  updatePokemonEvolutionFormData
} from "../../../src/helpers/pokemons/getData"
import { ChainProps } from '../../../src/models/query-response/pokemon-evolution-chain/chain'

describe('getPokemonSpriteUrlById', () => {
  it('should return correct url', () => {
    const resutl = getPokemonSpriteUrlById(1)
    const validData = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png`
    expect(resutl).toBe(validData)
  })
})

describe('getEvolutionChainRecursively', () => {
  
  const chain: ChainProps = {
    evolution_details: [],
    evolves_to: [
      {
        evolution_details: [
          {
            gender: null,
            held_item: null,
            item: null,
            known_move: null,
            known_move_type: null,
            location: null,
            min_affection: null,
            min_beauty: null,
            min_happiness: null,
            min_level: 16,
            needs_overworld_rain: false,
            party_species: null,
            party_type: null,
            relative_physical_stats: null,
            time_of_day: "",
            trade_species: null,
            trigger: { name: "", url: "" },
            turn_upside_down: false,
          }
        ],
        evolves_to: [
          {
            evolution_details: [
              {
                gender: null,
                held_item: null,
                item: null,
                known_move: null,
                known_move_type: null,
                location: null,
                min_affection: null,
                min_beauty: null,
                min_happiness: null,
                min_level: 32,
                needs_overworld_rain: false,
                party_species: null,
                party_type: null,
                relative_physical_stats: null,
                time_of_day: "",
                trade_species: null,
                trigger: { name: "", url: "" },
                turn_upside_down: false,
              }
            ],
            evolves_to: [],
            is_baby: false,
            species: {
              name: "venusaur",
              url: "https://pokeapi.co/api/v2/pokemon-species/3/",
            }
          }
        ],
        is_baby: false,
        species: {
          name: "ivysaur",
          url: "https://pokeapi.co/api/v2/pokemon-species/2/",
        }
      }
    ],
    is_baby: false,
    species: {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon-species/1/",
    }
  }

  it('should retun all pokemon evolutions', () => {
    const evolution = {
      level: 1,
      name: chain.species.name,
      current: true,
      sprite: getPokemonSpriteUrlById(chain.species.url.split('/')[6])
    }
    const validData = [
      { level: 1, name: "bulbasaur", current: true, sprite: getPokemonSpriteUrlById(1) },
      { level: 16, name: "ivysaur", current: false, sprite: getPokemonSpriteUrlById(2) },
      { level: 32, name: "venusaur", current: false, sprite: getPokemonSpriteUrlById(3) }
    ]
    const result = getEvolutionChainRecursively(chain.evolves_to, [evolution])

    expect(result).toStrictEqual(validData)
  })
})

describe('getCurrentPokemonEvolutionIndex', () => {
  it('should return true if the pokemon is the current evolution form', () => {
    const validData = [
      { level: 1, name: "bulbasaur", current: true, sprite: getPokemonSpriteUrlById(1) },
      { level: 16, name: "ivysaur", current: false, sprite: getPokemonSpriteUrlById(2) },
      { level: 32, name: "venusaur", current: false, sprite: getPokemonSpriteUrlById(3) }
    ]
    const result = getCurrentPokemonEvolutionIndex(validData)

    expect(result).toBe(0)
  })

  it('should return true if the pokemon is the current evolution form', () => {
    const validData = [
      { level: 1, name: "bulbasaur", current: false, sprite: getPokemonSpriteUrlById(1) },
      { level: 16, name: "ivysaur", current: true, sprite: getPokemonSpriteUrlById(2) },
      { level: 32, name: "venusaur", current: false, sprite: getPokemonSpriteUrlById(3) }
    ]
    const result = getCurrentPokemonEvolutionIndex(validData)

    expect(result).toBe(1)
  })
})

describe('getCurrentPokemonEvolutionFormData', () => {
  it('should return the current pokemon evolution data', () => {
    const validData = { level: 1, name: "bulbasaur", current: true, sprite: getPokemonSpriteUrlById(1) }
    const pokemonEvolutionMock = [
      { level: 1, name: "bulbasaur", current: true, sprite: getPokemonSpriteUrlById(1) },
      { level: 16, name: "ivysaur", current: false, sprite: getPokemonSpriteUrlById(2) },
      { level: 32, name: "venusaur", current: false, sprite: getPokemonSpriteUrlById(3) }
    ]
    const result = getCurrentPokemonEvolutionFormData(pokemonEvolutionMock)

    expect(result).toStrictEqual(validData)
  })

  it('should return the current pokemon evolution data', () => {
    const validData = { level: 32, name: "venusaur", current: true, sprite: getPokemonSpriteUrlById(3) }
    const pokemonEvolutionMock = [
      { level: 1, name: "bulbasaur", current: false, sprite: getPokemonSpriteUrlById(1) },
      { level: 16, name: "ivysaur", current: false, sprite: getPokemonSpriteUrlById(2) },
      { level: 32, name: "venusaur", current: true, sprite: getPokemonSpriteUrlById(3) }
    ]
    const result = getCurrentPokemonEvolutionFormData(pokemonEvolutionMock)

    expect(result).toStrictEqual(validData)
  })
})

describe('updatePokemonEvolutionFormData', () => {
  it('should return the evolution data with the current updated to true only for the next pokemon', () => {
    const pokemonEvolutionMock = [
      { level: 1, name: "bulbasaur", current: false, sprite: getPokemonSpriteUrlById(1) },
      { level: 16, name: "ivysaur", current: true, sprite: getPokemonSpriteUrlById(2) },
      { level: 32, name: "venusaur", current: false, sprite: getPokemonSpriteUrlById(3) }
    ]
    const validData = [
      { level: 1, name: "bulbasaur", current: false, sprite: getPokemonSpriteUrlById(1) },
      { level: 16, name: "ivysaur", current: false, sprite: getPokemonSpriteUrlById(2) },
      { level: 32, name: "venusaur", current: true, sprite: getPokemonSpriteUrlById(3) }
    ]
    const result = updatePokemonEvolutionFormData(pokemonEvolutionMock)

    expect(result).toStrictEqual(validData)
  })
})

describe('getNextPokemonEvolutionFormDataByName', () => {
  it('should return the next pokemon evolution data using the current pokemon name', () => {
    const validData = { level: 32, name: "venusaur", current: true, sprite: getPokemonSpriteUrlById(3) }
    const pokemonEvolutionMock = [
      { level: 1, name: "bulbasaur", current: false, sprite: getPokemonSpriteUrlById(1) },
      { level: 16, name: "ivysaur", current: true, sprite: getPokemonSpriteUrlById(2) },
      { level: 32, name: "venusaur", current: false, sprite: getPokemonSpriteUrlById(3) }
    ]
    const result = getNextPokemonEvolutionFormDataByName(pokemonEvolutionMock, "ivysaur")

    expect(result).toStrictEqual(validData)
  })

  it('should return the same pokemon evolution form data if it\'s already at the maximum evolution form', () => {
    const validData = { level: 32, name: "venusaur", current: true, sprite: getPokemonSpriteUrlById(3) }
    const pokemonEvolutionMock = [
      { level: 1, name: "bulbasaur", current: false, sprite: getPokemonSpriteUrlById(1) },
      { level: 16, name: "ivysaur", current: false, sprite: getPokemonSpriteUrlById(2) },
      { level: 32, name: "venusaur", current: true, sprite: getPokemonSpriteUrlById(3) }
    ]
    const result = getNextPokemonEvolutionFormDataByName(pokemonEvolutionMock, "venusaur")

    expect(result).toStrictEqual(validData)
  })
})

describe('getNextPokemonEvolutionFormData', () => {
  it('should return the next pokemon evolution data for: ivysaur', () => {
    const validData = { level: 32, name: "venusaur", current: true, sprite: getPokemonSpriteUrlById(3) }
    const pokemonEvolutionMock = [
      { level: 1, name: "bulbasaur", current: false, sprite: getPokemonSpriteUrlById(1) },
      { level: 16, name: "ivysaur", current: true, sprite: getPokemonSpriteUrlById(2) },
      { level: 32, name: "venusaur", current: false, sprite: getPokemonSpriteUrlById(3) }
    ]
    const result = getNextPokemonEvolutionFormData(pokemonEvolutionMock)

    expect(result).toStrictEqual(validData)
  })

  it('should return the same pokemon evolution form data if it\'s already at the maximum evolution form', () => {
    const validData = { level: 32, name: "venusaur", current: true, sprite: getPokemonSpriteUrlById(3) }
    const pokemonEvolutionMock = [
      { level: 1, name: "bulbasaur", current: false, sprite: getPokemonSpriteUrlById(1) },
      { level: 16, name: "ivysaur", current: false, sprite: getPokemonSpriteUrlById(2) },
      { level: 32, name: "venusaur", current: true, sprite: getPokemonSpriteUrlById(3) }
    ]
    const result = getCurrentPokemonEvolutionFormData(pokemonEvolutionMock)

    expect(result).toStrictEqual(validData)
  })
})

describe('getPokemonNames', () => {
  it('should return all the pokemon\'s name in the array', () => {
    const pokemonEvolutionMock = [
      { level: 1, name: "bulbasaur", current: false, sprite: getPokemonSpriteUrlById(1) },
      { level: 16, name: "ivysaur", current: true, sprite: getPokemonSpriteUrlById(2) },
      { level: 32, name: "venusaur", current: false, sprite: getPokemonSpriteUrlById(3) }
    ]
    const result = getPokemonNames(pokemonEvolutionMock)
    const validData = ["bulbasaur", "ivysaur", "venusaur"]

    expect(result).toStrictEqual(validData)
  })
})

describe('getPokemonDataFormEvolutions', () => {
  const pokemonEvolutionMock = [
    { level: 1, name: "bulbasaur", current: false, sprite: getPokemonSpriteUrlById(1) },
    { level: 16, name: "ivysaur", current: true, sprite: getPokemonSpriteUrlById(2) },
    { level: 32, name: "venusaur", current: false, sprite: getPokemonSpriteUrlById(3) }
  ]
  const validData = [
    {
      id: 0,
      name: "bulbasaur",
      names: [],
      discovered: true,
      currentLevel: 0,
      currentXp: 0,
      toNextLevel: 0,
      captureRate: 0,
      evolutions: [...pokemonEvolutionMock],
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
      name: "ivysaur",
      names: [],
      discovered: true,
      currentLevel: 0,
      currentXp: 0,
      toNextLevel: 0,
      captureRate: 0,
      evolutions: [...pokemonEvolutionMock],
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
      evolutions: [...pokemonEvolutionMock],
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
      evolutions: [],
      isLegendary: false,
      isMythical: false,
      moves: [],
      currentMoves: [],
      sprites: { default: "", shiny: "" },
      stats: [],
      types: [],
    },
  ]

  it('should return all pokemon evolution form data based on one pokemon identifier', () => {
    const result = getPokemonDataFormEvolutions(validData, "bulbasaur")

    expect(result).toStrictEqual([ validData[0], validData[1], validData[2] ])
  })
})

describe('getPokemonDataByIdentifier', () => {
  const validData = [
    {
      id: 1,
      name: "bulbasaur",
      names: [],
      discovered: true,
      currentLevel: 0,
      currentXp: 0,
      toNextLevel: 0,
      captureRate: 0,
      evolutions: [],
      isLegendary: false,
      isMythical: false,
      moves: [],
      currentMoves: [],
      sprites: { default: "", shiny: "" },
      stats: [],
      types: [],
    },
    {
      id: 2,
      name: "ivysaur",
      names: [],
      discovered: true,
      currentLevel: 0,
      currentXp: 0,
      toNextLevel: 0,
      captureRate: 0,
      evolutions: [],
      isLegendary: false,
      isMythical: false,
      moves: [],
      currentMoves: [],
      sprites: { default: "", shiny: "" },
      stats: [],
      types: [],
    }
  ]

  it('should return pokemon data using the pokemon id or its name', () => {
    const textingValues = ["ivysaur", 2]

    textingValues.forEach(value => {
      const result = getPokemonDataByIdentifier(validData, value)
      expect(result).toStrictEqual(validData[1])
    })
  })
})

describe('getPokemonIndexByIdentifier', () => {
  const validData = [
    {
      id: 1,
      name: "bulbasaur",
      names: [],
      discovered: true,
      currentLevel: 0,
      currentXp: 0,
      toNextLevel: 0,
      captureRate: 0,
      evolutions: [],
      isLegendary: false,
      isMythical: false,
      moves: [],
      currentMoves: [],
      sprites: { default: "", shiny: "" },
      stats: [],
      types: [],
    },
    {
      id: 2,
      name: "ivysaur",
      names: [],
      discovered: true,
      currentLevel: 0,
      currentXp: 0,
      toNextLevel: 0,
      captureRate: 0,
      evolutions: [],
      isLegendary: false,
      isMythical: false,
      moves: [],
      currentMoves: [],
      sprites: { default: "", shiny: "" },
      stats: [],
      types: [],
    }
  ]

  it('should return pokemon data index using the pokemon id or its name', () => {
    const textingValues = ["ivysaur", 2]

    textingValues.forEach(value => {
      const result = getPokemonIndexByIdentifier(validData, value)
      expect(result).toBe(1)
    })
  })
})

describe('getMissingLevelToEvolve', () => {
  it('should return how many level is missing to evolve', () => {
    const pokemonEvolutionMock = [
      { level: 1, name: "bulbasaur", current: false, sprite: getPokemonSpriteUrlById(1) },
      { level: 16, name: "ivysaur", current: true, sprite: getPokemonSpriteUrlById(2) },
      { level: 32, name: "venusaur", current: false, sprite: getPokemonSpriteUrlById(3) }
    ]
    const testingValues = [10, 5]

    testingValues.forEach(value => {
      const result = getMissingLevelToEvolve(pokemonEvolutionMock, value)

      expect(result).toStrictEqual(32 - value)
    })
  })
})

describe('getGenerationRangeByGenerationValue', () => {
  it('should return how many level is missing to evolve', () => {
    const testingValues = generationRange

    testingValues.forEach(value => {
      const result = getGenerationRangeByGenerationValue(value.value)

      expect(result).toStrictEqual({ ...value })
    })
  })
})
