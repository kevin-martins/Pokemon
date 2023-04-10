type ItemProps = {
    name: string,
    url: string,
}

type VersionProps = {
    name: string,
    url: string,
}

type VersionDetailProps = {
    ratiry: number,
    version: VersionProps[],
}

export type HeldItemsProps = {
    item: ItemProps,
    version_details: VersionDetailProps[],
}