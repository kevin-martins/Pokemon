import axios from 'axios';
import { PokemonInfoByIdResponseProps } from '../../models/query-response/pokemon-info-by-id';
import { PokemonEvolutionChainResponseProps } from '../../models/query-response/pokemon-evolution-chain';
import { PokemonSpeciesResponseProps } from '../../models/query-response/pokemon-species';
import { PokemonMovesResponseProps } from '../../models/query-response/pokemon-moves';

type Responseprops =  PokemonEvolutionChainResponseProps |
PokemonSpeciesResponseProps |
PokemonMovesResponseProps

export const fetchPokemonInfoById = async (pokemonId: number): Promise<PokemonInfoByIdResponseProps> => {
    const response = await axios.request<PokemonInfoByIdResponseProps>({
        url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    })
    return response.data
}

export const fetchPokemonDataByUrl = async <T extends Responseprops>(apiCall: string): Promise<T> => {
    const response = await axios.request<T>({ url: apiCall })
    const { data } = response
    return data
}

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
    return new Promise<{ data: number }>((resolve) =>
      setTimeout(() => resolve({ data: amount }), 500)
    );
}
