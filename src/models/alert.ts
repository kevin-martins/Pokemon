export enum AlertState {
    Add,
    Swap,
    Remove,
    AlreadyIn,
    Full,
    None,
}

export type AlertProps = {
    action: AlertState,
    pokemonSprite: string | null,
    message: string,
}