import { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { addToTeam } from '../../features/pokemon-slice'
import { capitalize } from '../../helpers/helpers'
import { NewPokemonDataProps } from '../../models/pokemon'
import Button from '../shared/Button'
import Center from '../shared/Center'

const PokedexCard = (pokemon: NewPokemonDataProps): JSX.Element => {
  const [hover, setHover] = useState(false)
  const dispatch = useAppDispatch()

  const handleEnter = () => {
    setHover(true)
  }

  const handleLeave = () => {
    setHover(false)
  }

  const handleClick = () => {
    dispatch(addToTeam(pokemon))
  }

  return (
    <div
      className='relative bg-gray-900 w-80 h-80 rounded-lg'
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {(hover && pokemon.discovered) &&
        <div className='absolute z-40 bg-gray-900/70 w-full h-full rounded-lg'>
          <Center>
            <Button
              children='Add to Team'
              handleClick={handleClick}
            />
          </Center>
        </div>
      }
      <p className='absolute text-2xl text-white left-1/2 -translate-x-1/2 translate-y-1/2'>
        {pokemon.discovered && capitalize(pokemon.name)}
      </p>
      <div className='w-full h-full flex justify-center '>
        <img src={pokemon.sprites.default} alt={pokemon.name} className={`w-60 h-60 m-auto ${!pokemon.discovered && 'grayscale'}`} />
      </div>
      <p className='absolute text-lg text-white bottom-0 right-0 px-2 pb-1'>{pokemon.discovered && 'n°' + pokemon.id}</p>
    </div>
  )
}

export default PokedexCard