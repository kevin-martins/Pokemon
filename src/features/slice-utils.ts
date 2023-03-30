import { AlertProps, AlertState } from "../models/alert";

// TODO: not used
export const createAlertParams = (
    action: AlertState,
    pokemonSprite: string,
    message: string
): AlertProps => {
    return {
        action,
        pokemonSprite,
        message,
    }
}