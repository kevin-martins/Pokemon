import { NewPokemonDataProps } from "./pokemon";

export enum AlertState {
    Add,
    Swap,
    Remove,
    AlreadyIn,
    None,
}

export type AlertProps = {
    action: AlertState,
    pokemonChange: NewPokemonDataProps[],
}