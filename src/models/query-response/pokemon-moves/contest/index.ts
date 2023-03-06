export type ContestCombosProps = {
  normal: ContestComboProps,
  super: ContestComboProps,
}

type ContestComboProps = {
  use_after: UseAfterComboProps[] | null,
  use_before: null,
}

type UseAfterComboProps = {
  name: string,
  url: string,
}

export type ContestEffetcProps = {
  url: string,
}

export type ContestTypeProps = {
  name: string,
  url: string
}

export type SuperContestEffectProps = {
  url: string,
}
