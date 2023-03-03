import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setOnlyDiscovered } from "../../features/pokemon-slice"
import { NewPokemonDataProps } from "../../models/pokemon"
import Checkbox from "../shared/Checkbox"
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
      <h1 className="text-center text-5xl text-white pt-5 pb-10">Pokedex</h1>
      <Checkbox
        text="only display discovered pokemons"
        value={onlyDiscovered}
        onChange={handleChange}
      />
      <section className="flex flex-row justify-center flex-wrap gap-6 p-5 w-full">
        {pokedex.map((pokemon: NewPokemonDataProps, i: number) => (
          onlyDiscovered ?
            (pokemon.discovered && <PokedexCard key={i + Date.now()} {...pokemon} />) :
            (<PokedexCard key={i + Date.now()} {...pokemon} />)
        ))}
      </section>
      {/* <Alert /> */}
    </div>
  )
}

export default Pokedex