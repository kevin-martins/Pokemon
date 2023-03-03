import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { shop } from '../api/shop';
import { checkPokemonOccurences, getEvolutionChainRecursively, getNextPokemonEvolutionName, getPokemonIndexByName, getRandomValue } from '../helpers/helpers'
import { AlertProps, AlertState } from '../models/alert';
import { LoadingState } from '../models/loading';
import { NewPokemonDataProps } from '../models/pokemon'
import { ShopProps } from '../models/shop';
import { fetchPokemonEvolutionChain, fetchPokemonInfoById, fetchPokemonSpecies } from './pokemon/pokemonAPI';

const teamChange = {
    action: AlertState.None,
    pokemonChange: [],
}

export interface PokemonState {
    status: LoadingState,
    pokedex: NewPokemonDataProps[],
    team: NewPokemonDataProps[],
    teamChanges: AlertProps,
    computerTeam: NewPokemonDataProps[],
    shop: ShopProps[],
    evolutionList: [],
    berries: number,
    onlyDiscovered: boolean,
}

const initialState: PokemonState = {
    status: LoadingState.Idle,
    pokedex: [],
    team : [],
    teamChanges: teamChange,
    computerTeam: [],
    shop: shop,
    evolutionList: [],
    berries: 10,
    onlyDiscovered: true,
}

export const fetchDataAsync = createAsyncThunk(
    'pokemon/fetchData',
    async ({ from, to }: { from: number, to: number}): Promise<NewPokemonDataProps[]> => {
        const newPokemonData: NewPokemonDataProps[] = []
        for (let pokemonId = from; pokemonId < to; pokemonId++) {
            const pokemonInfoResponse = await fetchPokemonInfoById(pokemonId)
            const pokemonSpeciesResponse = await fetchPokemonSpecies(pokemonInfoResponse.species.url)
            const pokemonEvolutionResponse = await fetchPokemonEvolutionChain(pokemonSpeciesResponse.evolution_chain.url)
            const evolutions = getEvolutionChainRecursively(pokemonEvolutionResponse.chain.evolves_to, [])
            newPokemonData.push({
                id: pokemonInfoResponse.id,
                name: pokemonInfoResponse.name,
                names: [ ...pokemonSpeciesResponse.names ],
                discovered: evolutions.every(evolution => evolution.to !== pokemonInfoResponse.name),
                current_level: 1,
                current_xp: 0,
                to_next_level: pokemonInfoResponse.base_experience,
                capture_rate: pokemonSpeciesResponse.capture_rate,
                evolutions: [ ...evolutions ],
                is_legendary: pokemonSpeciesResponse.is_legendary,
                is_mythical: pokemonSpeciesResponse.is_mythical,
                moves: [ ...pokemonInfoResponse.moves ],
                sprites: {
                    default: pokemonInfoResponse.sprites.other.home.front_default,
                    shiny: pokemonInfoResponse.sprites.other.home.front_shiny,
                },
                stats: [ ...pokemonInfoResponse.stats ],
                types: [ ...pokemonInfoResponse.types ],
            })
        }
      return newPokemonData
    }
)

const apiSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        addToPokedex(state, action: PayloadAction<NewPokemonDataProps>) {
            if (checkPokemonOccurences(state.pokedex, action.payload.id))
                state.pokedex.push(action.payload)
        },
        createComputerTeam(state) {
            state.computerTeam = []
            console.log(state.pokedex.length)
            for (let i = 0; i < 7; i++) {
                const randomValue = getRandomValue(state.pokedex.length - 1)
                state.computerTeam.push(state.pokedex[randomValue])
            }
        },
        addToTeam(state, action: PayloadAction<NewPokemonDataProps>) {
            if (state.team.length < 7) {
                if (checkPokemonOccurences(state.team, action.payload.id)) {
                    state.team.push(action.payload)
                    state.teamChanges = {
                        action: AlertState.Add,
                        pokemonChange: [action.payload],
                    }
                } else {
                    state.teamChanges = {
                        action: AlertState.AlreadyIn,
                        pokemonChange: [action.payload],
                    }
                }
            } else {
                state.teamChanges = {
                    action: AlertState.Full,
                    pokemonChange: [action.payload],
                }
            }
        },
        evolvesPokemon(state, action: PayloadAction<NewPokemonDataProps>) {
            const nextEvolutionName = getNextPokemonEvolutionName(action.payload)
            console.log(nextEvolutionName)
            if (action.payload.name !== nextEvolutionName) {
                const currentPokemonFormIndex = getPokemonIndexByName(state.pokedex, action.payload.name)
                const nextPokemonFormIndex = getPokemonIndexByName(state.pokedex, nextEvolutionName)
                state.pokedex[currentPokemonFormIndex] = {
                    ...action.payload,
                    evolutions: action.payload.evolutions.map(pkm => {
                        return {
                            ...pkm,
                            current: nextEvolutionName.includes(pkm.to) ? true : false,
                        }
                    }),
                }
                state.pokedex[nextPokemonFormIndex] = {
                    ...state.pokedex[nextPokemonFormIndex],
                    discovered: true,
                    evolutions: state.pokedex[nextPokemonFormIndex].evolutions.map(pkm => {
                        return {
                            ...pkm,
                            current: nextEvolutionName.includes(pkm.to) ? true : false,
                        }
                    }),
                }
                
            }
        },
        removeToTeam(state, action: PayloadAction<number>) {
            const index = state.team.findIndex(pokemon => pokemon.id === action.payload)
            state.team.splice(index, 1)
        },
        replaceToTeam(state, action: PayloadAction<NewPokemonDataProps>) {

        },
        emptyTeam(state) {
            state.team = []
        },
        setOnlyDiscovered(state, action: PayloadAction<boolean>) {
            state.onlyDiscovered = action.payload
        }
    },
    extraReducers: (builder) =>{
        builder
            .addCase(fetchDataAsync.pending, (state) => {
                state.status = LoadingState.Loading
            })
            .addCase(fetchDataAsync.fulfilled, (state, action) => {
                state.status = LoadingState.Idle
                state.pokedex = action.payload
                console.log(state.pokedex)
            })
            .addCase(fetchDataAsync.rejected, (state) => {
                state.status = LoadingState.Failed
            })
    }
})

export const {
    addToPokedex,
    createComputerTeam,
    addToTeam,
    removeToTeam,
    evolvesPokemon,
    emptyTeam,
    setOnlyDiscovered,
} = apiSlice.actions

export default apiSlice.reducer