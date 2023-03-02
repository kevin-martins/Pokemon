import { useAppDispatch, useAppSelector } from '../app/hooks'
import Button from '../components/shared/Button'
import { emptyTeam } from '../features/pokemon-slice'
import { capitalize } from '../helpers/helpers'
import { PokemonTeamProps } from '../models/pokemon'

const Team = () => {
  const team = useAppSelector(state => state.pokemon.team)
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(emptyTeam())
  }

  return (
    <div>
      {team.length > 0 && <Button type='button' text='Empty Your Team' handleClick={handleClick} />}
      {team.map((pokemon: PokemonTeamProps, i: number) => (
        <div
          key={i + Date.now()}
          className='relative bg-gray-900 w-80 h-80 rounded-lg'
        >
          <p className='absolute text-2xl text-white left-1/2 -translate-x-1/2 translate-y-1/2'>
            {capitalize(pokemon.name)}
          </p>
          <div className='w-full h-full flex justify-center '>
            <img src={pokemon.sprites.default} alt={pokemon.name} className='w-60 h-60 m-auto' />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Team