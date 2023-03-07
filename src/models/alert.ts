export enum AlertState {
    Add,
    Remove,
    AlreadyIn,
    Full,
    Evolve,
    Upgrade,
    None,
}

export type AlertProps = {
    action: AlertState,
    pokemonSprite: string | null,
    message: string,
}