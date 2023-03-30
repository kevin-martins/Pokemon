import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addToTeam, removeFromTeam } from '../../features/pokemon-slice'
import { getCurrentPokemonEvolutionForm } from '../../helpers/pokemons/getData'
import { getPokemonNames } from '../../helpers/pokemons/getData'
import { capitalize } from '../../helpers/utils'
import { NewPokemonDataProps, NewPokemonEvolutionProps } from '../../models/pokemon'
import Button from '../shared/Button'
import Center from '../shared/Center'
import Redirection from '../shared/Redirection'

const PokedexCard = (pokemon: NewPokemonDataProps): JSX.Element => {
  const team = useAppSelector(state => state.pokemon.team)
  const isInTeam = getPokemonNames(team).includes(pokemon.name)
  const [hover, setHover] = useState(false)
  const dispatch = useAppDispatch()

  const handleEnter = () => {
    setHover(true)
  }

  const handleLeave = () => {
    setHover(false)
  }

  const handleClick = () => {
    if (isInTeam) {
      dispatch(removeFromTeam(pokemon))
    } else {
      dispatch(addToTeam(pokemon))
    }
  }

  return (
    <div
      className={`relative mx-auto bg-gray-900 w-80 h-80 rounded-lg border-2 border-gray-900 
        ${isInTeam && 'border-green-500'}
      `}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {hover &&
        <div className='absolute z-40 bg-gray-900/70 w-full h-full rounded-lg'>
          <Center>
            <div className='flex flex-col text-center w-44 mx-auto gap-5'>
              {!pokemon.discovered
                ? <p className='text-white'>Pokemon not discovered</p>
                : <>
                    <Button
                      className='w-full text-center px-3 py-2 bg-white mx-auto hover:bg-gray-400'
                      onClick={handleClick}
                    >
                      <p>{isInTeam ? 'Remove from Team' : 'Add to Team'}</p>
                    </Button>
                    <Redirection
                      to={`/pokedex/${pokemon.id}`}
                      className='w-full text-center px-3 py-2 bg-white mx-auto hover:bg-gray-400'
                    >
                      about
                    </Redirection>
                  </>
              }
            </div>
          </Center>
        </div>
      }
      {/* TODO: why use translate? */}
      <p className='absolute text-2xl text-white left-1/2 -translate-x-1/2 translate-y-1/2'>
        {pokemon.discovered && capitalize(pokemon.name)}
      </p>
      {/* TODO: why full height? */}
      <div className='w-full h-full flex justify-center '>
        <img src={pokemon.sprites.default} alt={pokemon.name} className={`w-60 h-60 m-auto ${!pokemon.discovered && 'grayscale'}`} />
      </div>
      <p className='absolute text-lg text-white bottom-0 right-0 px-2 pb-1'>{pokemon.discovered && 'n°' + pokemon.id}</p>
    </div>
  )
}

export default PokedexCard