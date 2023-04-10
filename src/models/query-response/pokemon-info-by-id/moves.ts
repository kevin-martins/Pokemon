type MoveProps = {
    name: string,
    url: string,
}

type MoveLearnMethodProps = {
    name: string,
    url: string,
}

type VersionGroupProps = {
    name: string,
    url: string,
}

type VersionGroupDetailProps = {
    levelLearnedAt: number,
    moveLearnMethod: MoveLearnMethodProps,
    versionGroup: VersionGroupProps,
}

export type MovesProps = {
    move: MoveProps,
    versionGroupDetails: VersionGroupDetailProps[],
}