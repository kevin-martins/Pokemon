import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setOnlyDiscovered } from "../../features/pokemon-slice"
import { NewPokemonDataProps } from "../../models/pokemon"
import Checkbox from "../shared/Checkbox"
import Title from "../shared/Title"
import PokedexCard from "./PokedexCard"

const Pokedex = (): JSX.Element => {
  const pokedex = useAppSelector<NewPokemonDataProps[]>(state => state.pokemon.pokedex)
  const onlyDiscovered = useAppSelector(state => state.pokemon.onlyDiscovered)
  const dispatch = useAppDispatch()

  const handleChange = () => {
    dispatch(setOnlyDiscovered(!onlyDiscovered))
  }

  return (
    <div>
      <div className="w-full flex flex-col pb-10">
        <Title text="Pokedex" />
        <Checkbox
          text="only discovered pokemons"
          value={onlyDiscovered}
          className="text-white text-center"
          onChange={handleChange}
        />
      </div>
      <section className="flex flex-row justify-center flex-wrap gap-6 p-5 w-full">
        {pokedex.map((pokemon: NewPokemonDataProps, i: number) => (
          onlyDiscovered ?
            (pokemon.discovered && <PokedexCard key={i + Date.now()} {...pokemon} />) :
            <PokedexCard key={i + Date.now()} {...pokemon} />
        ))}
      </section>
    </div>
  )
}

export default Pokedex