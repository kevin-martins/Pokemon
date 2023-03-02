import { SpeciesProps } from "../../shared/species";
import { EvolutionDetailsProps } from "./evolution-detail";
import { EvolvesToProps } from "./evolves-to";

export type ChainProps = {
    evolution_details: EvolutionDetailsProps[] | [],
    evolves_to: EvolvesToProps[] | [],
    is_baby: boolean,
    species: SpeciesProps,
}