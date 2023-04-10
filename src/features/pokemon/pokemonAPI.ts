import axios from 'axios';
import { PokemonInfoByIdResponseProps } from '../../models/query-response/pokemon-info-by-id';
import { PokemonEvolutionChainResponseProps } from '../../models/query-response/pokemon-evolution-chain';
import { PokemonSpeciesResponseProps } from '../../models/query-response/pokemon-species';
import { PokemonMovesResponseProps } from '../../models/query-response/pokemon-moves';

type Responseprops = PokemonEvolutionChainResponseProps
    | PokemonSpeciesResponseProps
    | PokemonMovesResponseProps

export const fetchPokemonInfoById = async (pokemonId: number): Promise<PokemonInfoByIdResponseProps> => {
    const { data } = await axios.request<PokemonInfoByIdResponseProps>({
        url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    })

    return data
}

export const fetchPokemonDataByUrl = async <T extends Responseprops>(apiCall: string): Promise<T> => {
    const { data } = await axios.request<T>({ url: apiCall })

    return data
}
