type TriggerProps = {
    name: string,
    url: string,
}

export type EvolutionDetailsProps = {
    gender: null,
    held_item: null,
    item: null,
    known_move: null,
    known_move_type: null,
    location: null,
    min_affection: null,
    min_beauty: null,
    min_happiness: null,
    min_level: number,
    needs_overworld_rain: false,
    party_species: null,
    party_type: null,
    relative_physical_stats: null,
    time_of_day: string,
    trade_species: null,
    trigger: TriggerProps,
    turn_upside_down: boolean,
}