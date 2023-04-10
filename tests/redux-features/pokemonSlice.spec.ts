import reducer, { addToPokedex, PokemonState } from '../../src/features/pokemon-slice'
import { LoadingState } from '../../src/models/loading'

const mockStore: PokemonState = {
  status: LoadingState.Idle,
  pokedex: [],
  team : [],
  generationRange: {
    value: "I",
    from: 1,
    to: 151,
  },
  alerts: [],
  computerTeam: [],
  evolutionList: [],
  onlyDiscovered: true,
}

const validPokemon = {
  id: 1,
  name: "bulbasaur",
  names: [],
  discovered: true,
  currentLevel: 1,
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

test('should add pokemon to the pokedex', () => {
  const previousState: PokemonState = mockStore
  const validStore = {
    ...mockStore
  }
  validStore.pokedex.push(validPokemon)

  expect(reducer(previousState, addToPokedex(validPokemon))).toEqual(validStore)
})
