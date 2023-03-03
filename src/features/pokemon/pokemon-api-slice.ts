import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PokemonInfoByIdResponseProps } from '../../models/query-response/pokemon-info-by-id'
import { GetPokemonsQueryProps, PokemonsResponseProps } from '../../models/query-response/pokemons'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://pokeapi.co/api/v2/',
        // prepareHeaders(headers) {
        //     // headers.set('x-api-key', "")
        //     return headers
        // }
    }),
    endpoints(builder) {
        return {
            fetchPokemons: builder.query<{ data: PokemonsResponseProps }, GetPokemonsQueryProps>({
                query({ limit, offset }: GetPokemonsQueryProps) {
                    return `pokemon?limit=${limit}&offset=${offset}`
                }
            }),
            fetchPokemonInfoById: builder.query<{ data: PokemonInfoByIdResponseProps }, number>({
                query(pokemonId: number) {
                    return `pokemon/${pokemonId}`
                }
            })
        }
    }
})

export const {
    useFetchPokemonsQuery,
    useFetchPokemonInfoByIdQuery
} = apiSlice
