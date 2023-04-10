import { SpeciesProps } from "../../shared/species";
import { EvolutionDetailsProps } from "./evolution-detail";

export type EvolvesToProps = {
    evolutionDetails: EvolutionDetailsProps[],
    evolvesTo: EvolvesToProps[] | [],
    isBaby: boolean,
    species: SpeciesProps,
}