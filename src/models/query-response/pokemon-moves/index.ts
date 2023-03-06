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
  short_effect: string,
}

type VersionGroupProps = {
  name: string,
  url: string,
}

type FlavorTextEntriesProps = {
  flavor_text: string,
  language: LanguageProps,
  version_group: VersionGroupProps,
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
  version_group: VersionGroupProps,
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
  ailment_chance: number,
  category: CategoryProps,
  crit_rate: 1,
  drain: number,
  flinch_chance: number,
  healing: number,
  max_hits: null,
  max_turns: null,
  min_hits: null,
  min_turns: null,
  stat_chance: number
}

type PastValuesProps = {
  accuracy: number,
  effect_chance: null,
  effect_entries: EffectEntriesProps[],
  power: null,
  pp: null,
  type: null,
  version_group: VersionGroupProps,
}

type TargetProps = {
  name: string,
  url: string,
}

export type PokemonMovesResponseProps = {
  accuracy: number,
  contest_combos: null,
  contest_effect: ContestEffetcProps,
  contest_type: ContestTypeProps,
  damage_class: DamageClassProps,
  effect_chance: null,
  effect_changes: [],
  effect_entries: EffectEntriesProps[],
  flavor_text_entries: FlavorTextEntriesProps[],
  generation: GenerationProps,
  id: number,
  learned_by_pokemon: LearnedByPokemonProps[],
  machines: MachinesProps[],
  meta: MetaProps,
  name: string,
  names: NamesProps[],
  past_values: PastValuesProps,
  power: number,
  pp: number,
  priority: number,
  stat_changes: [],
  super_contest_effect: SuperContestEffectProps,
  target: TargetProps,
  type: TypeProps,
}
