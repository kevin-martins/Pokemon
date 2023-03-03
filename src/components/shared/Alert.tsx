import { useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { capitalize, getActionMessage } from '../../helpers/helpers'
import { NewPokemonDataProps, TeamChangeState } from '../../models/pokemon'
import '../../styles/alert.css'

const Alert = () => {
  const teamChanges = useAppSelector(state => state.pokemon.teamChanges)
  const [display, setDisplay] = useState(true)

  const handleClick = () => {
    setDisplay(false)
  }

  useEffect(() => {
    if (teamChanges.action !== TeamChangeState.None) {
      setDisplay(true)
    }
  }, [teamChanges])

  return (
    <>
      {display &&
        <div className={`absolute w-full animate`}>
          {teamChanges.pokemonChange.map((teamChange: NewPokemonDataProps) => (
            <div
              className='flex flex-row mx-auto bg-emerald-500 border-2 border-emerald-700 rounded-lg w-1/4 pl-2 pr-2 pb-4 hover:border-rose-500'
              onClick={handleClick}
            >
              <img
                src={teamChange.sprites.default}
                alt={teamChange.name}
                className='w-20 h-20 ml-auto pr-2'
              />
              <p className='mr-auto text-xl font-bold mt-auto pb-4 text-white'>
                {capitalize(teamChange.name)} {getActionMessage(teamChanges.action)} your team !
              </p>
              {/* <button className='h-full pl-2 text-sm scale-150 hover:text-red-500 hover:scale-100 hover:text-center'>x</button> */}
            </div>
          ))}
        </div>
      }
    </>
  )
}

export default Alert