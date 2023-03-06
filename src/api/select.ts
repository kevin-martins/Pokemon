import { GenerationRangeProps } from "../models/pokemon";

export const generationRange: GenerationRangeProps[] = [
    { value: "I", from: 1, to: 151 },
    { value: "II", from: 152, to: 251 },
    { value: "III", from: 252, to: 386 },
    { value: "IV", from: 387, to: 493 },
    { value: "V", from: 494, to: 649 },
    { value: "VI", from: 650, to: 721 },
    { value: "VII", from: 722, to: 898 }
]

export const generationOptions = [
    { value: "I", label: "Generation I" },
    { value: "II", label: "Generation II" },
    { value: "III", label: "Generation III" },
    { value: "IV", label: "Generation IV" },
    { value: "V", label: "Generation V" },
    { value: "VI", label: "Generation VI" },
    { value: "VII", label: "Generation VII" },
  ]