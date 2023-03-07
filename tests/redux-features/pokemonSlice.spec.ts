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
  current_level: 1,
  current_xp: 0,
  to_next_level: 0,
  capture_rate: 0,
  evolutions: [],
  is_legendary: false,
  is_mythical: false,
  moves: [],
  current_moves: [],
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

  // Petit pb av ce test :'( pourtant dans la console quand je le fais avec validStore.pokedex
  // j'ai le pokedex mais quand je pointe pas sur le pokedex j'ai un rien.
  expect(reducer(previousState, addToPokedex(validPokemon))).toEqual(validStore)
})
