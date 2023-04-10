import { SpeciesProps } from "../../shared/species";
import { EvolutionDetailsProps } from "./evolution-detail";
import { EvolvesToProps } from "./evolves-to";

export type ChainProps = {
    evolutionDetails: EvolutionDetailsProps[] | [],
    evolvesTo: EvolvesToProps[] | [],
    isBaby: boolean,
    species: SpeciesProps,
}