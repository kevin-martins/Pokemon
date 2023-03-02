import { useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { capitalize, getActionMessage } from '../../helpers/helpers'
import { PokemonTeamProps, TeamChangeState } from '../../models/pokemon'
import Center from './Center'

const Alerte = () => {
  const teamChanges = useAppSelector(state => state.pokemon.teamChanges)
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    if (teamChanges.action !== TeamChangeState.None) {
      setDisplay(true)
      setTimeout(() => {
        setDisplay(false)
      }, 800)
    }
  }, [teamChanges])

  return (
    <>
      {display &&
        <div className='absolute h-screen top-0 w-full z-50 bg-white/30'>
          <Center>
            <>
              {teamChanges.pokemonChange.map((teamChange: PokemonTeamProps) => (
                <div>
                  <p className='text-center text-3xl font-bold'>
                    {capitalize(teamChange.name)} {getActionMessage(teamChanges.action)} your team !
                  </p>
                  <img src={teamChange.sprites.default} alt={teamChange.name} className='m-auto' />
                </div>
              ))}
            </>
          </Center>
        </div>
      }
    </>
  )
}

export default Alerte