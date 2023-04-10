type AbilityProps = {
    name: string,
    url: string,
}

export type AbilitiesProps = {
    ability: AbilityProps[],
    isHidden: boolean,
    slot: number,
}