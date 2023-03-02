export enum ItemUtilisation {
    Food,
    Pokeball,
}

export type ItemsProps = {
    type: ItemUtilisation,
    name: string,
    onUse: number,
}

export type ShopProps = {
    item: ItemsProps,
    price: number
    left: number,
}