import { AlertProps, AlertState } from "../models/alert";

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