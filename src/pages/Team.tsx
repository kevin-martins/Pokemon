import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import Button from '../components/shared/Button'
import Center from '../components/shared/Center'
import Title from '../components/shared/Title'
import TeamCard from '../components/Team/TeamCard'
import { emptyTeam } from '../features/pokemon-slice'
import { NewPokemonDataProps } from '../models/pokemon'
import { TeamState } from '../models/team'

const Team = () => {
  const team = useAppSelector(state => state.pokemon.team)
  const [teamState, setTeamState] = useState<TeamState>(TeamState.None)
  const dispatch = useAppDispatch()

  const handleEmptyTeam = () => {
    dispatch(emptyTeam())
    setTeamState(TeamState.None)
  }

  const handleTeamState = (newState: TeamState) => {
    if (teamState === newState) {
      setTeamState(TeamState.None)
    } else {
      setTeamState(newState)
    }
  }

  return (
    <Center>
      <>
        <Title text="My Team" />
        <section className='flex gap-2 mt-10 h-content'>
          {team.length > 0 &&
            <Button
              className='text-center w-44 px-3 py-2 bg-white mx-auto hover:bg-gray-400'
              onClick={handleEmptyTeam}
            >
              <p>Empty Your Team</p>
            </Button>
          }
          {team.length > 0 &&
            <Button
              className={`text-center w-44 px-3 py-2 mx-auto hover:bg-gray-400 ${
                teamState === TeamState.Remove
                  ? 'bg-gray-600'
                  : 'bg-white'
                }`
              }
              onClick={() => handleTeamState(TeamState.Remove)}
            >
              <p>Remove Selection</p>
            </Button>
          }
          {team.length > 0 &&
            <Button
              className={`text-center w-44 px-3 py-2 mx-auto hover:bg-gray-400 ${
                teamState === TeamState.Evolve
                  ? 'bg-gray-600'
                  : 'bg-white'
                }`
              }
              onClick={() => handleTeamState(TeamState.Evolve)}
            >
              <p>Evolve Selection</p>
            </Button>
          }
        </section>
        <section className='flex flex-row flex-wrap max-w-6xl gap-2 mt-10'>
          {team.map((pokemon: NewPokemonDataProps, i: number) => (
            <TeamCard key={i + Date.now()} pokemon={pokemon} state={teamState} />
          ))}
        </section>
      </>
    </Center>
  )
}

export default Team