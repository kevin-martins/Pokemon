import { configureStore } from '@reduxjs/toolkit'
import pokemonReducer from '../features/pokemon-slice'
import { apiSlice } from '../features/pokemon/pokemon-api-slice'

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware)
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
