import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { shop } from '../api/shop';
import { isEvolutionFormAlreadyInArray, isPokemonAlreadyInArray } from '../helpers/pokemons/checkData';
import { getEvolutionChainRecursively, getNextPokemonEvolutionFormData, getPokemonNames, getPokemonIndexByIdentifier, getPokemonEvolutionFormData, getPokemonDataByIdentifier, getPokemonSpriteUrlById, getPokemonDiscover, getCurrentPokemonEvolutionIndex } from '../helpers/pokemons/getData';
import { capitalize, getRandomValue } from '../helpers/utils';
import { AlertProps, AlertState } from '../models/alert';
import { LoadingState } from '../models/loading';
import { GenerationRangeProps, NewPokemonDataProps, NewPokemonEvolutionProps, NewPokemonMovesProps } from '../models/pokemon'
import { PokemonEvolutionChainResponseProps } from '../models/query-response/pokemon-evolution-chain';
import { MovesProps } from '../models/query-response/pokemon-info-by-id/moves';
import { PokemonMovesResponseProps } from '../models/query-response/pokemon-moves';
import { PokemonSpeciesResponseProps } from '../models/query-response/pokemon-species';
import { ShopProps } from '../models/shop';
import { fetchPokemonDataByUrl, fetchPokemonInfoById } from './pokemon/pokemonAPI';
import { createAlertParams } from './slice-utils';

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

const makeAllApiRequests = async (pokemonId: number) => {
    const pokemonInfoResponse = await fetchPokemonInfoById(pokemonId)
    const pokemonSpeciesResponse = await fetchPokemonDataByUrl<PokemonSpeciesResponseProps>(pokemonInfoResponse.species.url)
    const pokemonEvolutionResponse = await fetchPokemonDataByUrl<PokemonEvolutionChainResponseProps>(pokemonSpeciesResponse.evolution_chain.url)
    const pokemonMovesResponse = await getPokemonMoves(pokemonInfoResponse.moves)
    const initialPokemon = {
        level: 1,
        name: pokemonEvolutionResponse.chain.species.name,
        current: true,
        sprite: getPokemonSpriteUrlById(pokemonEvolutionResponse.chain.species.url.split('/')[6]),
    }
    const evolutions = getEvolutionChainRecursively(pokemonEvolutionResponse.chain.evolves_to, [initialPokemon])

    return { pokemonInfoResponse, pokemonSpeciesResponse, pokemonMovesResponse, evolutions }
}

const organiseDataAfterResponse = async (pokemonId: number): Promise<NewPokemonDataProps> => {
    const {
        pokemonInfoResponse,
        pokemonSpeciesResponse,
        pokemonMovesResponse,
        evolutions
    } = await makeAllApiRequests(pokemonId)

    return {
        id: pokemonInfoResponse.id,
        name: pokemonInfoResponse.name,
        names: [ ...pokemonSpeciesResponse.names ],
        discovered: evolutions[0].name === pokemonInfoResponse.name && true,
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
    }
}

export const fetchDataAsync = createAsyncThunk(
    'pokemon/fetchData',
    async ({ from, to }: { from: number, to: number}): Promise<NewPokemonDataProps[]> => {
        const newPokemonData: NewPokemonDataProps[] = []

        for (let pokemonId = from; pokemonId < to; pokemonId++) {
            newPokemonData.push(await organiseDataAfterResponse(pokemonId))
        }
      return newPokemonData
    }
)

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
            const teamIndex = getPokemonIndexByIdentifier(state.team, action.payload.name)

            if (action.payload.current_level < 100) {
                // evolutionNames.forEach((evolutionName: string) => {
                //     const pokedexId = getPokemonIndexByIdentifier(state.pokedex, evolutionName)

                // })
                // state.pokedex[pokemonIndex] = {
                //     ...state.pokedex[pokemonIndex],
                //     current_level: action.payload.current_level + 1
                // }

                state.team[teamIndex] = {
                    ...state.pokedex[teamIndex],
                    current_level: action.payload.current_level + 1
                }
                // state.team[teamIndex] = state.pokedex[pokemonIndex]
                state.alerts = [{
                    action: AlertState.Upgrade,
                    pokemonSprite: action.payload.sprites.default,
                    message: `${capitalize(action.payload.name)} increases to level ${state.team[teamIndex].current_level}`
                }]
            } else if (action.payload.current_level === 100) {
                state.alerts = [{
                    action: AlertState.Upgrade,
                    pokemonSprite: action.payload.sprites.default,
                    message: `${capitalize(action.payload.name)} has reach the maximum level !`
                }]
            }
        },
        addToTeam(state, action: PayloadAction<NewPokemonDataProps>) {
            if (state.team.length < 6) {
                const pokemonEvolutionFormData = getPokemonEvolutionFormData(action.payload.evolutions)

                if (isEvolutionFormAlreadyInArray(action.payload.evolutions, state.team)) {
                    // if (action.payload.name !== pokemonEvolutionFormData.name) {
                    //     state.team.push(getPokemonDataByIdentifier(state.pokedex, pokemonEvolutionFormData.name))
                    // }
                    // choper l'evo max et l'ajoute a la place du pokemon actuel dans la team

                    // const currentTeamIndex = getPokemonDataByIdentifier(state.team, action.payload.name)
                    // state.alerts = [{
                    //     action: AlertState.Add,
                    //     pokemonSprite: pokemonEvolutionFormData.sprite,
                    //     message: `Adding the maximum evolution form discovered`
                    // }]
                } else if (!isPokemonAlreadyInArray(state.team, action.payload.id)) {
                    state.team.push(action.payload)
                    state.alerts = [{
                        action: AlertState.Add,
                        pokemonSprite: action.payload.sprites.default,
                        message: `${capitalize(action.payload.name)} added to your team !`
                    }]
                }
            } else {
                state.alerts = [{
                    action: AlertState.Full,
                    pokemonSprite: null,
                    message: `Can\'t add more than 6 pokemons in your team !`
                }]
            }
        },
        evolvesPokemon(state, action: PayloadAction<NewPokemonDataProps>) {
            const pokedexIndex = getPokemonIndexByIdentifier(state.pokedex, action.payload.id)
            const teamIndex = getPokemonIndexByIdentifier(state.team, action.payload.id)
            const nextEvolutionFormData = getNextPokemonEvolutionFormData(action.payload.evolutions)
            // const newEvolutions = action.payload.evolutions

            if (nextEvolutionFormData.name !== action.payload.name) {
                const newEvolutions = action.payload.evolutions
                // newEvolutions[getCurrentPokemonEvolutionIndex()]
                state.team[teamIndex] = {
                    ...state.pokedex[pokedexIndex],
                    current_level: action.payload.current_level,
                    evolutions: []
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
            const pokedexIndex = getPokemonIndexByIdentifier(state.pokedex, action.payload.id)
            // const 

            const index = state.team.findIndex(pokemon => pokemon.name === action.payload.name)
            state.alerts = [{
                action: AlertState.Remove,
                pokemonSprite: action.payload.sprites.default,
                message: `${capitalize(action.payload.name)} removed from your team !`
            }]
            state.team.splice(index, 1)

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
                console.log(action.payload)
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
    setOnlyDiscovered,
} = apiSlice.actions

export default apiSlice.reducer