import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import Button from '../components/shared/Button'
import Center from '../components/shared/Center'
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
  }

  const handleTeamState = (newState: TeamState) => {
    setTeamState(newState)
  }

  return (
    <Center>
      <>
        <h1 className="text-center text-5xl text-white pt-10 pb-5">My Team</h1>
        <section className='flex gap-2 mt-10 h-content'>
          {team.length > 0 && <Button children='Empty Your Team' handleClick={handleEmptyTeam} />}
          {team.length > 0 && <Button children='Remove Selection' handleClick={() => handleTeamState(TeamState.Remove)} />}
          {team.length > 0 && <Button children='Evolve Selection' handleClick={() => handleTeamState(TeamState.Evolve)} />}
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