import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { NewPokemonDataProps, NewPokemonMovesProps } from '../../models/pokemon';
import { getPokemonDataByIdentifier, getPokemonDataFromEvolutions } from '../../helpers/pokemons/getData';
import PokemonCard from '../../components/Pokedex/[id]/PokemonCard';
import Button from '../../components/shared/Button';
import PokemonMove from '../../components/Pokedex/[id]/PokemonMove';

const PokemonInfo = () => {
  const location = useLocation()
  const pokemonId: number = parseInt(location.pathname.split('/')[2])
  const pokedex = useAppSelector(state => state.pokemon.pokedex)
  const pokemons = getPokemonDataFromEvolutions(pokedex, pokemonId)
  const [selectedPokemon, setSelectedPokemon] = useState<NewPokemonDataProps>(
    getPokemonDataByIdentifier(pokedex, pokemonId))

  const handlePokemonSelected = (pokemon: NewPokemonDataProps) => {
    setSelectedPokemon(pokemon)
  }

  return (
    <div className='w-full'>
      <div className='flex flex-row w-full mx-auto max-w-6xl'>
        {pokemons.map((pokemon: NewPokemonDataProps, i: number) => (
          <Button
            key={i + Date.now()}
            className='relative w-96 h-96 mx-auto mt-20'
            onClick={() => handlePokemonSelected(pokemon)}
          >
            <PokemonCard {...pokemon} selectedPokemon={selectedPokemon} />
          </Button>
        ))}
      </div>
      <section className='max-w-screen-xl grid grid-cols-4 mx-auto mt-24'>
        {pokemons.map((pokemon: NewPokemonDataProps, i: number) => {
          return (
            <>
              {selectedPokemon.name === pokemon.name
                && pokemon.moves.map((move: NewPokemonMovesProps, i: number) => (
                  <PokemonMove key={i + Date.now()} {...move} />
              ))}
            </>
          )
        })}
      </section>
    </div>
  )
}

export default PokemonInfo