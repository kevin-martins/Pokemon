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
    level_learned_at: number,
    move_learn_method: MoveLearnMethodProps,
    version_group: VersionGroupProps,
}

export type MovesProps = {
    move: MoveProps[],
    version_group_detail: VersionGroupDetailProps[],
}