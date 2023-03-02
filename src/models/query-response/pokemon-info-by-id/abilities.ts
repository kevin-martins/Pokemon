type AbilityProps = {
    name: string,
    url: string,
}

export type AbilitiesProps = {
    ability: AbilityProps[],
    is_hidden: boolean,
    slot: number,
}