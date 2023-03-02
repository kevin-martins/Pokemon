import { SpeciesProps } from "../../shared/species";
import { EvolutionDetailsProps } from "./evolution-detail";

export type EvolvesToProps = {
    evolution_details: EvolutionDetailsProps[],
    evolves_to: EvolvesToProps[] | [],
    is_baby: boolean,
    species: SpeciesProps,
}