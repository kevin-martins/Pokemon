import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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
  const validStore = {
    ...mockStore,
    pokedex: [ validPokemon ]
  }
  expect(reducer(undefined, addToPokedex(validPokemon))).toEqual(validStore.pokedex)
})

// test('should handle a todo being added to an empty list', () => {
//   const previousState: Todo[] = []

//   expect(reducer(previousState, todoAdded('Run the tests'))).toEqual([
//     { text: 'Run the tests', completed: false, id: 0 }
//   ])
// })

// test('should handle a todo being added to an existing list', () => {
//   const previousState: Todo[] = [
//     { text: 'Run the tests', completed: true, id: 0 }
//   ]

//   expect(reducer(previousState, todoAdded('Use Redux'))).toEqual([
//     { text: 'Run the tests', completed: true, id: 0 },
//     { text: 'Use Redux', completed: false, id: 1 }
//   ])
// })