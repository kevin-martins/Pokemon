type ResultsProps = {
    name: string,
    url: string,
}

export type GetPokemonsQueryProps = {
    limit: number,
    offset: number,
}

export type PokemonsResponseProps = {
    count: number,
    next: string | null,
    previous: string| null,
    results: ResultsProps[],
}