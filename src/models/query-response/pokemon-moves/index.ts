import { TypeProps } from '../pokemon-info-by-id/types'
import { GenerationProps } from '../pokemon-species'
import { LanguageProps } from '../shared/language'
import { NamesProps } from '../shared/names'
import { ContestEffetcProps, ContestTypeProps, SuperContestEffectProps } from './contest'

type DamageClassProps = {
  name: string,
  url: string,
}

type EffectEntriesProps = {
  effect: string,
  language: LanguageProps,
  shortEffect: string,
}

type VersionGroupProps = {
  name: string,
  url: string,
}

type FlavorTextEntriesProps = {
  flavorText: string,
  language: LanguageProps,
  versionGroup: VersionGroupProps,
}

type LearnedByPokemonProps = {
  name: string,
  url: string,
}

type MachineProps = {
  url: string,
}

type MachinesProps = {
  machine: MachineProps,
  versionGroup: VersionGroupProps,
}

type AilmentProps = {
  name: string,
  url: string,
}

type CategoryProps = {
  name: string,
  url: string,
}

type MetaProps = {
  ailment: AilmentProps,
  ailmentChance: number,
  category: CategoryProps,
  critRate: 1,
  drain: number,
  flinchChance: number,
  healing: number,
  maxHits: null,
  maxTurns: null,
  minHits: null,
  minTurns: null,
  statChance: number
}

type PastValuesProps = {
  accuracy: number,
  effectChance: null,
  effectEntries: EffectEntriesProps[],
  power: null,
  pp: null,
  type: null,
  versionGroup: VersionGroupProps,
}

type TargetProps = {
  name: string,
  url: string,
}

export type PokemonMovesResponseProps = {
  accuracy: number,
  contestCombos: null,
  contestEffect: ContestEffetcProps,
  contestType: ContestTypeProps,
  damageClass: DamageClassProps,
  effectChance: null,
  effectChanges: [],
  effectEntries: EffectEntriesProps[],
  flavorTextEntries: FlavorTextEntriesProps[],
  generation: GenerationProps,
  id: number,
  learnedByPokemon: LearnedByPokemonProps[],
  machines: MachinesProps[],
  meta: MetaProps,
  name: string,
  names: NamesProps[],
  pastValues: PastValuesProps,
  power: number,
  pp: number,
  priority: number,
  statChanges: [],
  superContestEffect: SuperContestEffectProps,
  target: TargetProps,
  type: TypeProps,
}
