type VersionProps = {
    name: string,
    url: string,
}

export type GameIndicesProps = {
    gameIndex: number,
    version: VersionProps[],
}