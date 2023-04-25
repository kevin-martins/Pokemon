import { ItemUtilisation, ShopProps } from "../models/shop";

export const shop: ShopProps[] = [
    {
        item: {
            type: ItemUtilisation.Pokeball,
            name: "Filet Ball",
            onUse: 20,
        },
        price: 1000,
        left: 15,
    },
    {
        item: {
            type: ItemUtilisation.Pokeball,
            name: "Honor Ball",
            onUse: 60,
        },
        price: 2000,
        left: 6,
    },
    {
        item: {
            type: ItemUtilisation.Pokeball,
            name: "Hyper Ball",
            onUse: 100,
        },
        price: 100000,
        left: 1,
    },
    {
        item: {
            type: ItemUtilisation.Pokeball,
            name: "Luxe Ball",
            onUse: 5,
        },
        price: 5000,
        left: 7,
    },
    {
        item: {
            type: ItemUtilisation.Pokeball,
            name: "PokeBall",
            onUse: 15,
        },
        price: 150,
        left: 100,
    },
    {
        item: {
            type: ItemUtilisation.Pokeball,
            name: "Safari Ball",
            onUse: 20,
        },
        price: 1500,
        left: 10,
    },
    {
        item: {
            type: ItemUtilisation.Pokeball,
            name: "Super Ball",
            onUse: 35,
        },
        price: 600,
        left: 40,
    },
    {
        item: {
            type: ItemUtilisation.Pokeball,
            name: "Ultra Ball",
            onUse: 50,
        },
        price: 2000,
        left: 25,
    }
]