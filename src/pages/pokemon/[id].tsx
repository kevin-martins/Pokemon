import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

const PokemonInfo = () => {
  const location = useLocation()
  const pokemonId: number = parseInt(location.pathname.split('/')[2])
  const pokedex = useAppSelector(state => state.pokemon.pokedex)
  
  console.log(pokedex)

  return (
    <div className="text-white">{pokemonId}</div>
  )
}

export default PokemonInfo