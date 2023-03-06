import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { shop } from '../api/shop';
import { getPokemonIndexByName } from '../helpers/helpers'
import { isPokemonAlreadyInArray } from '../helpers/pokemons/checkData';
import { getEvolutionChainRecursively, getNextPokemonEvolutionFormData } from '../helpers/pokemons/getData';
import { capitalize, getRandomValue } from '../helpers/utils';
import { AlertProps, AlertState } from '../models/alert';
import { LoadingState } from '../models/loading';
import { GenerationRangeProps, NewPokemonDataProps, NewPokemonMovesProps } from '../models/pokemon'
import { PokemonEvolutionChainResponseProps } from '../models/query-response/pokemon-evolution-chain';
import { MovesProps } from '../models/query-response/pokemon-info-by-id/moves';
import { PokemonMovesResponseProps } from '../models/query-response/pokemon-moves';
import { PokemonSpeciesResponseProps } from '../models/query-response/pokemon-species';
import { ShopProps } from '../models/shop';
import { fetchPokemonDataByUrl, fetchPokemonInfoById } from './pokemon/pokemonAPI';

const generationRange: GenerationRangeProps = {
    value: "I",
    from: 1,
    to: 151,
}

export interface PokemonState {
    status: LoadingState,
    pokedex: NewPokemonDataProps[],
    team: NewPokemonDataProps[],
    generationRange: GenerationRangeProps,
    alerts: AlertProps[],
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
    generationRange: generationRange,
    alerts: [],
    computerTeam: [],
    shop: shop,
    evolutionList: [],
    berries: 10,
    onlyDiscovered: true,
}

const makeAllApiRequests = async (pokemonId: number) => {
    const pokemonInfoResponse = await fetchPokemonInfoById(pokemonId)
    const pokemonSpeciesResponse = await fetchPokemonDataByUrl<PokemonSpeciesResponseProps>(pokemonInfoResponse.species.url)
    const pokemonEvolutionResponse = await fetchPokemonDataByUrl<PokemonEvolutionChainResponseProps>(pokemonSpeciesResponse.evolution_chain.url)
    const pokemonMovesResponse = await getPokemonMoves(pokemonInfoResponse.moves)
    const initialPokemon = {
        level: 1,
        to: pokemonEvolutionResponse.chain.species.name,
        current: true,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonEvolutionResponse.chain.species.url.split('/')[6]}.png`
    }
    const evolutions = getEvolutionChainRecursively(pokemonEvolutionResponse.chain.evolves_to, [initialPokemon])
    return { pokemonInfoResponse, pokemonSpeciesResponse, pokemonMovesResponse, evolutions }
}

const getPokemonMoves = async (moves: MovesProps[]): Promise<NewPokemonMovesProps[]> => {
    return await Promise.all(
        moves.map(async (move: MovesProps) => {
            const movesResponse = await fetchPokemonDataByUrl<PokemonMovesResponseProps>(move.move.url);
            return {
                learned_at: move.version_group_details[0].level_learned_at,
                name: movesResponse.name,
                power: movesResponse.power,
                pp: movesResponse.pp,
                accuracy: movesResponse.accuracy,
                type: movesResponse.type.name,
            }
    }))    
}

export const fetchDataAsync = createAsyncThunk(
    'pokemon/fetchData',
    async ({ from, to }: { from: number, to: number}): Promise<NewPokemonDataProps[]> => {
        const newPokemonData: NewPokemonDataProps[] = []

        for (let pokemonId = from; pokemonId < to; pokemonId++) {
            const { pokemonInfoResponse, pokemonSpeciesResponse, pokemonMovesResponse, evolutions } = await makeAllApiRequests(pokemonId)
            newPokemonData.push({
                id: pokemonInfoResponse.id,
                name: pokemonInfoResponse.name,
                names: [ ...pokemonSpeciesResponse.names ],
                discovered: evolutions[0].to === pokemonInfoResponse.name && true,
                current_level: 1,
                current_xp: 0,
                to_next_level: pokemonInfoResponse.base_experience,
                capture_rate: pokemonSpeciesResponse.capture_rate,
                evolutions: [
                    ...evolutions,
                ],
                is_legendary: pokemonSpeciesResponse.is_legendary,
                is_mythical: pokemonSpeciesResponse.is_mythical,
                moves: pokemonMovesResponse,
                current_moves: [],
                sprites: {
                    default: pokemonInfoResponse.sprites.other.home.front_default,
                    shiny: pokemonInfoResponse.sprites.other.home.front_shiny,
                },
                stats: [ ...pokemonInfoResponse.stats ],
                types: [ ...pokemonInfoResponse.types ],
            })
            // console.log(pokemonInfoResponse.name)
        }
      return newPokemonData
    }
)

const apiSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {

        addToPokedex(state, action: PayloadAction<NewPokemonDataProps>) {
            if (isPokemonAlreadyInArray(state.pokedex, action.payload.id)) {
                state.pokedex.push(action.payload)
            }
        },
        setGeneration(state, action: PayloadAction<GenerationRangeProps>) {
            console.log(state.generationRange.value !== action.payload.value)
            if (state.generationRange.value !== action.payload.value) {
                state.generationRange = action.payload
            }
        },
        createComputerTeam(state) {
            state.computerTeam = []
            const maxPokemonAvailable = state.pokedex.reduce((acc: number, curr: NewPokemonDataProps) => {
                if (curr.discovered) {
                    acc += 1
                }
                return acc
            }, 0)
            for (let i = 0; i < 6; i++) {
                const randomValue = getRandomValue(state.pokedex.length - 1)
                if (maxPokemonAvailable < 6) {
                    state.computerTeam.push(state.pokedex[randomValue])

                } else if (isPokemonAlreadyInArray(state.computerTeam, state.pokedex[randomValue].id) &&
                    state.pokedex[randomValue].discovered) {
                        state.computerTeam.push(state.pokedex[randomValue])
                    }
                else {
                    i--
                }
            }
        },
        givePokemonLevel(state, action: PayloadAction<NewPokemonDataProps>) {
            if (action.payload.current_level < 100) {
                const pokedexIndex = getPokemonIndexByName(state.pokedex, action.payload.name)
                const teamIndex = getPokemonIndexByName(state.team, action.payload.name)
    
                state.pokedex[pokedexIndex] = {
                    ...action.payload,
                    current_level: action.payload.current_level + 1
                }
                state.team[teamIndex] = state.pokedex[pokedexIndex]
            }
        },
        addToTeam(state, action: PayloadAction<NewPokemonDataProps>) {
            if (state.team.length < 6) {
                if (!isPokemonAlreadyInArray(state.team, action.payload.id)) {
                    state.team.push(action.payload)
                    state.alerts = [{
                        action: AlertState.Add,
                        pokemonSprite: action.payload.sprites.default,
                        message: `${capitalize(action.payload.name)} added to your team !`
                    }]
                } else {
                    state.alerts = [{
                        action: AlertState.AlreadyIn,
                        pokemonSprite: action.payload.sprites.default,
                        message: `${capitalize(action.payload.name)} already in your team !`
                    }]
                }
            } else {
                state.alerts = [{
                    action: AlertState.Full,
                    pokemonSprite: null,
                    message: `your team is already full !`
                }]
            }
        },
        evolvesPokemon(state, action: PayloadAction<NewPokemonDataProps>) {
            const nextEvolutionName = getNextPokemonEvolutionFormData(action.payload.evolutions)
            if (nextEvolutionName.to !== action.payload.name) {
                const currentPokemonFormIndex = getPokemonIndexByName(state.pokedex, action.payload.name)
                const nextPokemonFormIndex = getPokemonIndexByName(state.pokedex, nextEvolutionName.to)
                state.pokedex[currentPokemonFormIndex] = {
                    ...action.payload,
                    evolutions: action.payload.evolutions.map(pkm => {
                        return {
                            ...pkm,
                            current: nextEvolutionName.to.includes(pkm.to) ? true : false,
                        }
                    }),
                }
                state.pokedex[nextPokemonFormIndex] = {
                    ...state.pokedex[nextPokemonFormIndex],
                    discovered: true,
                    current_level: action.payload.current_level,
                    evolutions: state.pokedex[nextPokemonFormIndex].evolutions.map(pkm => {
                        return {
                            ...pkm,
                            current: nextEvolutionName.to.includes(pkm.to) ? true : false,
                        }
                    }),
                }
                state.team[getPokemonIndexByName(state.team, action.payload.name)] = state.pokedex[nextPokemonFormIndex]
            }
        },
        removeToTeam(state, action: PayloadAction<NewPokemonDataProps>) {
            const index = state.team.findIndex(pokemon => pokemon.name === action.payload.name)
            state.alerts = [{
                action: AlertState.Remove,
                pokemonSprite: action.payload.sprites.default,
                message: `${capitalize(action.payload.name)} removed from your team !`
            }]
            state.team.splice(index, 1)
            // = state.team.map((pkm: NewPokemonDataProps) => pkm.name)
            // state.teamName.splice(index, 1)
        },
        emptyTeam(state) {
            state.alerts = []
            state.team.forEach(pkm => {
                state.alerts.push({
                    action: AlertState.Remove,
                    pokemonSprite: pkm.sprites.default,
                    message: `${capitalize(pkm.name)} removed from your team !`
                })
            })
            state.team = []
        },
        setOnlyDiscovered(state, action: PayloadAction<boolean>) {
            state.onlyDiscovered = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataAsync.pending, (state) => {
                state.status = LoadingState.Loading
            })
            .addCase(fetchDataAsync.fulfilled, (state, action) => {
                state.status = LoadingState.Idle
                action.payload.forEach(pkm => {
                    state.pokedex.push(pkm)
                })
                // state.pokedex += action.payload
            })
            .addCase(fetchDataAsync.rejected, (state) => {
                state.status = LoadingState.Failed
            })
    }
})

export const {
    addToPokedex,
    setGeneration,
    createComputerTeam,
    addToTeam,
    givePokemonLevel,
    removeToTeam,
    evolvesPokemon,
    emptyTeam,
    setOnlyDiscovered,
} = apiSlice.actions

export default apiSlice.reducer