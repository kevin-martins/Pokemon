import { LanguageProps } from "../shared/language";
import { NamesProps } from "../shared/names";
import { FlavorTextEntriesProps } from "./flavor-text-entries";
import { PalParkEncountersProps } from "./pal-park-encounters";
import { PokedexNumbersProps } from "./pokedex-numbers";
import { VarietiesProps } from "./varieties";

type ColorProps = {
    name: string,
    url: string,
}

type EggGroupsProps = {
    name: string,
    url: string,
}

type EvolutionChainProps = {
    url: string,
}

type EvolvesFromSpeciesProps = {
    name: string,
    url: string,
}

type GeneraProps = {
    genus: string,
    language: LanguageProps,
}

export type GenerationProps = {
    name: string,
    url: string,
}

type GrowthRateProps = {
    name: string,
    url: string,
}

type HabitatProps = {
    name: string,
    url: string,
}

type ShapeProps = {
    name: string,
    url: string,
}

export type PokemonSpeciesResponseProps = {
    id: number,
    baseHappiness: number,
    captureRate: number,
    color: ColorProps,
    eggGroups: EggGroupsProps,
    evolutionChain: EvolutionChainProps,
    evolvesFromSpecies: EvolvesFromSpeciesProps | null,
    flavorTextEntries: FlavorTextEntriesProps[],
    formDescriptions: [],
    formsSwitchable: boolean,
    genderRate: number,
    genera: GeneraProps[],
    generation: GenerationProps[],
    growthRate: GrowthRateProps,
    habitat: HabitatProps,
    hasGenderDifferences: boolean,
    hatchCounter: number,
    isBaby: boolean,
    isLegendary: boolean,
    isMythical: boolean,
    name: string,
    names: NamesProps[],
    order: number,
    palParkEncounters: PalParkEncountersProps[],
    pokedexNumbers: PokedexNumbersProps[],
    shape: ShapeProps,
    varieties: VarietiesProps[],
}