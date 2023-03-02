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

type GenerationProps = {
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
    base_happiness: number,
    capture_rate: number,
    color: ColorProps,
    egg_groups: EggGroupsProps,
    evolution_chain: EvolutionChainProps,
    evolves_from_species: EvolvesFromSpeciesProps | null,
    flavor_text_entries: FlavorTextEntriesProps[],
    form_descriptions: [],
    forms_switchable: boolean,
    gender_rate: number,
    genera: GeneraProps[],
    generation: GenerationProps[],
    growth_rate: GrowthRateProps,
    habitat: HabitatProps,
    has_gender_differences: boolean,
    hatch_counter: number,
    is_baby: boolean,
    is_legendary: boolean,
    is_mythical: boolean,
    name: string,
    names: NamesProps[],
    order: number,
    pal_park_encounters: PalParkEncountersProps[],
    pokedex_numbers: PokedexNumbersProps[],
    shape: ShapeProps,
    varieties: VarietiesProps[],
}