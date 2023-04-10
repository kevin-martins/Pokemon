type PokemonProps = {
    name: string,
    url: string,
}

export type VarietiesProps = {
    is_default: boolean,
    pokemon: PokemonProps,
}