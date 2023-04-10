type TriggerProps = {
    name: string,
    url: string,
}

export type EvolutionDetailsProps = {
    gender: null,
    heldItem: null,
    item: null,
    knownMove: null,
    knownMoveType: null,
    location: null,
    minAffection: null,
    minBeauty: null,
    minHappiness: null,
    minLevel: number,
    needsOverworldRain: false,
    partySpecies: null,
    partyType: null,
    relativePhysicalStats: null,
    timeOfDay: string,
    tradeSpecies: null,
    trigger: TriggerProps,
    turnUpsideDown: boolean,
}