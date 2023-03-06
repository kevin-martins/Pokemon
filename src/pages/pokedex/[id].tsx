import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { NewPokemonDataProps } from '../../models/pokemon';
import { MovesProps } from '../../models/query-response/pokemon-info-by-id/moves';
import Button from '../../components/shared/Button'

const Card = (pokemon: NewPokemonDataProps) => {
  const [pokemonMoves, SetPokemonMoves] = useState<MovesProps[]>()

  const handlePokemonMoves = () => {
    SetPokemonMoves(pokemon.moves)
  }

  return (
    <Button
      onClick={handlePokemonMoves}
    >
      {pokemon.evolutions.map(evolutions => (
        <img
          key={Date.now()}
          src={evolutions.sprite}
          alt={evolutions.to}
          className='mx-auto'
        />
      ))}
    </Button>
    // <div className='mx-auto flex flex-row'>
    // </div>
  )
}

const Move = (move: MovesProps) => {
  return (
    <>
    </>
  )
}

const PokemonInfo = () => {
  const location = useLocation()
  const pokemonId: number = parseInt(location.pathname.split('/')[2])
  const pokedex = useAppSelector(state => state.pokemon.pokedex)

  return (
    <div className="text-white max-w-5xl">
      {pokedex.reduce((acc: NewPokemonDataProps[], curr: NewPokemonDataProps) => {
        if (curr.id === pokemonId)
          acc.push(curr)
        return acc
      }, []).map(pkm => (
        <Card key={Date.now()} {...pkm} />
      ))}
    </div>
  )
}

export default PokemonInfo