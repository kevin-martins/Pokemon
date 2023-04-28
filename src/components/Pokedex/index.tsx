import { generationOptions } from "../../constants/select"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setGeneration } from "../../features/pokemon-slice"
import { getGenerationRangeByGenerationValue } from "../../helpers/pokemons/getData"
import { NewPokemonDataProps } from "../../models/pokemon"
import Checkbox from "../shared/Checkbox"
import Select from "../shared/Select"
import Title from "../shared/Title"
import PokedexCard from "./PokedexCard"
import { useState } from "react"

const Pokedex = (): JSX.Element => {
  const pokedex = useAppSelector<NewPokemonDataProps[]>(state => state.pokemon.pokedex)
  const [onlyDiscovered, setOnlyDiscovered] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const handleUndiscovered = () => {
    if (onlyDiscovered) {
      setOnlyDiscovered(false)
    } else {
      setOnlyDiscovered(true)
    }
  }

  const handleGenerationFetch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setGeneration(getGenerationRangeByGenerationValue(e.target.value)))
  }

  return (
    <div className="w-2/3 mx-auto">
      <div className="w-full flex flex-col pb-10">
        <Title text="Pokedex" />
        <Select
          className='w-60 mx-auto text-center text-xl font-medium px-4 py-2'
          options={generationOptions}
          onChange={handleGenerationFetch}
        />
        <Checkbox
          text="discovered pokemons"
          value={onlyDiscovered}
          className="text-white text-center"
          onChange={handleUndiscovered}
        />
      </div>
      <section
        className={`flex flex-row flex-wrap gap-5 p-5 w-full`}
      >
        {pokedex
          .filter((filter: NewPokemonDataProps) => onlyDiscovered === filter.discovered || !onlyDiscovered)
          .map((pokemon, i: number) => <PokedexCard key={i} pokemon={pokemon} onlyDiscovered={onlyDiscovered} />)
        }
      </section>
    </div>
  )
}

export default Pokedex