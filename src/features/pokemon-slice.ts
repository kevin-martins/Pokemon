import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    isPokemonAlreadyInArray,
    isEvolutionFormAlreadyInArray
} from '../helpers/pokemons/checkData';
import {
    getPokemonNames,
    getPokemonSpriteUrlById,
    getPokemonDataByIdentifier,
    getPokemonIndexByIdentifier,
    getEvolutionChainRecursively,
    updatePokemonEvolutionFormData,
    getNextPokemonEvolutionFormData,
} from '../helpers/pokemons/getData';
import { capitalize, getRandomValue } from '../helpers/utils';
import { AlertProps, AlertState } from '../models/alert';
import { LoadingState } from '../models/loading';
import { GenerationRangeProps, NewPokemonDataProps, NewPokemonMovesProps } from '../models/pokemon'
import { PokemonEvolutionChainResponseProps } from '../models/query-response/pokemon-evolution-chain';
import { MovesProps } from '../models/query-response/pokemon-info-by-id/moves';
import { PokemonMovesResponseProps } from '../models/query-response/pokemon-moves';
import { PokemonSpeciesResponseProps } from '../models/query-response/pokemon-species';
import { fetchPokemonDataByUrl, fetchPokemonInfoById } from './pokemon/pokemonAPI';

const getPokemonMoves = async (moves: MovesProps[]): Promise<NewPokemonMovesProps[]> => {
    return Promise.all(
        moves.map(async (move: MovesProps) => {
            const movesResponse = await fetchPokemonDataByUrl<PokemonMovesResponseProps>(move.move.url);

            return {
                learnedAt: move.version_group_details[0].level_learned_at,
                name: movesResponse.name,
                power: movesResponse.power,
                pp: movesResponse.pp,
                accuracy: movesResponse.accuracy,
                type: movesResponse.type.name,
            }
    }))    
}

const makeAllApiRequests = async (pokemonId: number) => {
    const pokemonInfoResponse = await fetchPokemonInfoById(pokemonId)
    const pokemonSpeciesResponse = await fetchPokemonDataByUrl<PokemonSpeciesResponseProps>(pokemonInfoResponse.species.url)
    const pokemonEvolutionResponse = await fetchPokemonDataByUrl<PokemonEvolutionChainResponseProps>(pokemonSpeciesResponse.evolution_chain.url)
    // const pokemonMovesResponse = await getPokemonMoves(pokemonInfoResponse.moves)
    const initialPokemon = {
        level: 1,
        name: pokemonEvolutionResponse.chain.species.name,
        current: true,
        sprite: getPokemonSpriteUrlById(pokemonEvolutionResponse.chain.species.url.split('/')[6]),
    }
    const evolutions = getEvolutionChainRecursively(pokemonEvolutionResponse.chain.evolves_to, [initialPokemon])

    return { pokemonInfoResponse, pokemonSpeciesResponse, evolutions }
}

const organiseDataAfterResponse = async (pokemonId: number): Promise<NewPokemonDataProps> => {
    const {
        pokemonInfoResponse,
        pokemonSpeciesResponse,
        // pokemonMovesResponse,
        evolutions
    } = await makeAllApiRequests(pokemonId)

    return {
        id: pokemonInfoResponse.id,
        name: pokemonInfoResponse.name,
        names: [ ...pokemonSpeciesResponse.names ],
        discovered: evolutions[0].name === pokemonInfoResponse.name,
        currentLevel: 1,
        currentXp: 0,
        toNextLevel: pokemonInfoResponse.base_experience,
        captureRate: pokemonSpeciesResponse.capture_rate,
        evolutions: [
            ...evolutions,
        ],
        isLegendary: pokemonSpeciesResponse.is_legendary,
        isMythical: pokemonSpeciesResponse.is_mythical,
        moves: [],
        currentMoves: [],
        sprites: {
            default: pokemonInfoResponse.sprites.other.home.front_default,
            shiny: pokemonInfoResponse.sprites.other.home.front_shiny,
        },
        stats: [ ...pokemonInfoResponse.stats ],
        types: [ ...pokemonInfoResponse.types ],
        // id: pokemonInfoResponse.id,
        // name: pokemonInfoResponse.name,
        // names: [],
        // discovered: true,
        // currentLevel: 1,
        // currentXp: 0,
        // toNextLevel: pokemonInfoResponse.base_experience,
        // captureRate: 1,
        // evolutions: [],
        // isLegendary: true,
        // isMythical: true,
        // moves: [],
        // currentMoves: [],
        // sprites: {
        //     default: pokemonInfoResponse.sprites.other.home.front_default,
        //     shiny: pokemonInfoResponse.sprites.other.home.front_shiny,
        // },
        // stats: [ ...pokemonInfoResponse.stats ],
        // types: [ ...pokemonInfoResponse.types ],
    }
}

export const fetchDataAsync = createAsyncThunk(
    'pokemon/fetchData',
    async ({ from, to }: { from: number, to: number}): Promise<NewPokemonDataProps[]> => {
        const newPokemonData: NewPokemonDataProps[] = []

        for (let pokemonId = from; pokemonId < to; pokemonId++) {
            console.log(pokemonId)
            newPokemonData.push(await organiseDataAfterResponse(pokemonId))
        }
      return newPokemonData
    }
)

const initialGeneration: GenerationRangeProps = {
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
    evolutionList: [],
}

const initialState: PokemonState = {
    status: LoadingState.Idle,
    pokedex: [],
    team : [],
    generationRange: initialGeneration,
    alerts: [],
    computerTeam: [],
    evolutionList: [],
}

const apiSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        addToPokedex(state, action: PayloadAction<NewPokemonDataProps>) {
            if (!isPokemonAlreadyInArray(state.pokedex, action.payload.id)) {
                state.pokedex.push(action.payload)
            }
        },
        setGeneration(state, action: PayloadAction<GenerationRangeProps>) {
            if (state.generationRange.value !== action.payload.value) {
                state.pokedex = []
                state.team = []
                state.computerTeam = []
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
            const randomValue = getRandomValue(maxPokemonAvailable)
            state.computerTeam.push(state.pokedex[randomValue])
        },
        givePokemonLevel(state, action: PayloadAction<NewPokemonDataProps>) {
            const teamIndex = getPokemonIndexByIdentifier(state.team, action.payload.id)

            if (action.payload.currentLevel < 100) {
                state.team[teamIndex] = {
                    ...state.team[teamIndex],
                    currentLevel: action.payload.currentLevel + 1
                }
                state.alerts = [{
                    action: AlertState.Upgrade,
                    pokemonSprite: action.payload.sprites.default,
                    message: `${capitalize(action.payload.name)} increases to level ${state.team[teamIndex].currentLevel}`
                }]
            } else if (action.payload.currentLevel === 100) {
                state.alerts = [{
                    action: AlertState.Upgrade,
                    pokemonSprite: action.payload.sprites.default,
                    message: `${capitalize(action.payload.name)} has reach the maximum level !`
                }]
            }
        },
        addToTeam(state, action: PayloadAction<NewPokemonDataProps>) {
            // TODO: too complex
            if (state.team.length < 6) {
                if (isEvolutionFormAlreadyInArray(action.payload.evolutions, state.team)) {
                    action.payload.evolutions.forEach(pokemon => {
                        if (pokemon.current) {
                            state.team.push({
                                ...getPokemonDataByIdentifier(state.pokedex, pokemon.name)
                            })
                        }
                    })
                }
                state.team.push(action.payload)
                state.alerts = [{
                    action: AlertState.Add,
                    pokemonSprite: action.payload.sprites.default,
                    message: `${capitalize(action.payload.name)} added to your team !`
                }]
            } else {
                state.alerts = [{
                    action: AlertState.Full,
                    pokemonSprite: null,
                    message: `Can\'t add more than 6 pokemons in your team !`
                }]
            }
        },
        evolvesPokemon(state, action: PayloadAction<NewPokemonDataProps>) {
            const teamIndex = getPokemonIndexByIdentifier(state.team, action.payload.id)
            const nextEvolutionFormData = getNextPokemonEvolutionFormData(action.payload.evolutions)
            const nextPokemonIndex = getPokemonIndexByIdentifier(state.pokedex, nextEvolutionFormData.name)

            if (nextEvolutionFormData.name !== action.payload.name) {
                state.pokedex[nextPokemonIndex] = {
                    ...state.pokedex[nextPokemonIndex],
                    discovered: true,
                    evolutions: updatePokemonEvolutionFormData(action.payload.evolutions),
                }
                state.team[teamIndex] = {
                    ...state.pokedex[nextPokemonIndex],
                    currentLevel: action.payload.currentLevel,
                    evolutions: updatePokemonEvolutionFormData(action.payload.evolutions)
                }
            }
            state.alerts = [
                {
                    action: AlertState.Evolve,
                    pokemonSprite: action.payload.sprites.default,
                    message: `${capitalize(action.payload.name)} just evolved`
                },
                {
                    action: AlertState.Evolve,
                    pokemonSprite: nextEvolutionFormData.sprite,
                    message: `${capitalize(nextEvolutionFormData.name)} have been discovered`
                }
            ]
        },
        removeFromTeam(state, action: PayloadAction<NewPokemonDataProps>) {
            const teamIndex = getPokemonIndexByIdentifier(state.team, action.payload.id)
            const evolutionNames = getPokemonNames(action.payload.evolutions)

            evolutionNames.forEach(name => {
                const pokemonIndex = getPokemonIndexByIdentifier(state.pokedex, name)

                state.pokedex[pokemonIndex] = {
                    ...state.pokedex[pokemonIndex],
                    currentLevel: action.payload.currentLevel,
                    evolutions: action.payload.evolutions,
                }
            })
            state.team.splice(teamIndex, 1)
            state.alerts = [{
                action: AlertState.Remove,
                pokemonSprite: action.payload.sprites.default,
                message: `${capitalize(action.payload.name)} removed from your team !`
            }]

        },
        emptyTeam(state) {
            state.team.forEach(pkm => {
                state.alerts.push({
                    action: AlertState.Remove,
                    pokemonSprite: pkm.sprites.default,
                    message: `${capitalize(pkm.name)} removed from your team !`
                })
            })
            state.team = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataAsync.pending, (state) => {
                state.status = LoadingState.Loading
            })
            .addCase(fetchDataAsync.fulfilled, (state, action) => {
                state.status = LoadingState.Idle
                console.log("call")
                action.payload.forEach(pkm => {
                    state.pokedex.push(pkm)
                })
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
    removeFromTeam,
    evolvesPokemon,
    emptyTeam,
} = apiSlice.actions

export default apiSlice.reducer