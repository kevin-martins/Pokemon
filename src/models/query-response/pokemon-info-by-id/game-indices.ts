type VersionProps = {
    name: string,
    url: string,
}

export type GameIndicesProps = {
    game_index: number,
    version: VersionProps[],
}