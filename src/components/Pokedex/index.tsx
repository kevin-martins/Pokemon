import { generationOptions } from "../../api/select"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setGeneration, setOnlyDiscovered } from "../../features/pokemon-slice"
import { getGenerationRangeByGenerationValue } from "../../helpers/pokemons/getData"
import { NewPokemonDataProps } from "../../models/pokemon"
import Checkbox from "../shared/Checkbox"
import Select from "../shared/Select"
import Title from "../shared/Title"
import PokedexCard from "./PokedexCard"

const Pokedex = (): JSX.Element => {
  const pokedex = useAppSelector<NewPokemonDataProps[]>(state => state.pokemon.pokedex)
  const onlyDiscovered = useAppSelector(state => state.pokemon.onlyDiscovered)
  const dispatch = useAppDispatch()

  const handleUndiscovered = () => {
    dispatch(setOnlyDiscovered(!onlyDiscovered))
  }

  const handleFetchWhenOnBottom = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setGeneration(getGenerationRangeByGenerationValue(e.target.value)))
  }

  return (
    <div className="w-2/3 mx-auto">
      <div className="w-full flex flex-col pb-10">
        <Title text="Pokedex" />
        <Select
          className='w-60 mx-auto text-center text-xl font-medium px-4 py-2'
          options={generationOptions}
          onChange={handleFetchWhenOnBottom}
        />
        <Checkbox
          text="only discovered pokemons"
          value={onlyDiscovered}
          className="text-white text-center"
          onChange={handleUndiscovered}
        />
      </div>
      <section
        className={`flex flex-row flex-wrap gap-5 p-5 w-full`}
      >
        {pokedex.map((pokemon: NewPokemonDataProps, i: number) => (
          // TODO: use filter for onlyDiscovered pokemon
          onlyDiscovered ?
          // TODO use pokemon id instead of array index
            (pokemon.discovered && <PokedexCard key={i + Date.now()} {...pokemon} />) :
            <PokedexCard key={i + Date.now()} {...pokemon} />
        ))}
      </section>
    </div>
  )
}

export default Pokedex