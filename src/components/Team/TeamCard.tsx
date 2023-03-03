import { useAppDispatch } from '../../app/hooks'
import { evolvesPokemon, removeToTeam } from '../../features/pokemon-slice'
import { capitalize } from '../../helpers/helpers'
import { NewPokemonDataProps } from '../../models/pokemon'
import { TeamState } from '../../models/team'
import Button from '../shared/Button'

type Props = {
  pokemon: NewPokemonDataProps,
  state: TeamState,
}

const TeamCard = ({ pokemon, state }: Props) => {
  const dispatch = useAppDispatch()

  const handleRemoveOne = () => {
    if (state === TeamState.Remove)
      dispatch(removeToTeam(pokemon.id))
    else if (state === TeamState.Evolve)
      dispatch(evolvesPokemon(pokemon))
  }

  return (
    <Button
      className=''
      addClassName={`mx-auto bg-gray-900 rounded-lg w-60 h-80 border-2 border-gray-900 
        ${state === TeamState.Remove && 'hover:border-red-600'}
        ${state === TeamState.Evolve && 'hover:border-green-600'}
      `}
      handleClick={handleRemoveOne}
    >
      <div
        className={`relative w-full h-full ${state === TeamState.Remove && 'hover:grayscale'}`}
      >
        <p className='absolute text-2xl text-white left-1/2 -translate-x-1/2 translate-y-1/2'>
          {capitalize(pokemon.name)}
        </p>
        <div className='w-full h-full flex justify-center '>
          <img src={pokemon.sprites.default} alt={pokemon.name} className='w-60 h-60 m-auto' />
          {/* <img src={state !== TeamState.Evolve ? pokemon.sprites.default : pokemon.evolutions.} alt={pokemon.name} className='w-60 h-60 m-auto' /> */}
        </div>
      </div>
    </Button>
  )
}

export default TeamCard