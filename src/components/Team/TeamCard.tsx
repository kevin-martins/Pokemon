import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { evolvesPokemon, givePokemonLevel, removeFromTeam } from '../../features/pokemon-slice'
import { getCurrentPokemonEvolutionFormData, getMissingLevelToEvolve, getNextPokemonEvolutionFormData, getNextPokemonEvolutionFormDataByName } from '../../helpers/pokemons/getData'
import { NewPokemonDataProps, NewPokemonEvolutionProps } from '../../models/pokemon'
import { TeamState } from '../../models/team'
import Button from '../shared/Button'
import { changeWord } from '../../helpers/utils'
import TeamCardMessage from './TeamCardMessage'
import PokemonForm from './PokemonForm'

type Props = {
  pokemon: NewPokemonDataProps,
  state: TeamState,
}

const TeamCard = ({ pokemon, state }: Props) => {
  const [hover, setHover] = useState<boolean>(false)
  const [currentLevel, setCurrentLevel] = useState<number>(pokemon.currentLevel)
  const [canEvolve, setCanEvolve] = useState<boolean>(false)
  const [isLastForm, setIsLastForm] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const [missingLevelToEvolve, setMissingLevelToEvolve] = useState<number>(
    getMissingLevelToEvolve(pokemon.evolutions, pokemon.currentLevel))
  const [nextEvolutionForm, setNextEvolutionForm] = useState<NewPokemonEvolutionProps>(
    getNextPokemonEvolutionFormData(pokemon.evolutions))
  const [currentEvolutionForm, setCurrentEvolutionForm] = useState<NewPokemonEvolutionProps>(
    getCurrentPokemonEvolutionFormData(pokemon.evolutions))

  const handleTeamStates = () => {
    if (state === TeamState.Remove)
      dispatch(removeFromTeam(pokemon))
    else if (state === TeamState.Evolve) {
      dispatch(evolvesPokemon(pokemon))
      setCanEvolve(false)
      setCurrentEvolutionForm(nextEvolutionForm)
      setNextEvolutionForm(getNextPokemonEvolutionFormDataByName(pokemon.evolutions, nextEvolutionForm.name))
    }
  }

  const handlePokemonUpgrades = () => {
    setCurrentLevel(pokemon.currentLevel + 1)
    setMissingLevelToEvolve(getMissingLevelToEvolve(pokemon.evolutions, currentLevel + 1))
    dispatch(givePokemonLevel(pokemon))
  }

  const handleMouseEnter = () => {
    setHover(true)
  }

  const handleMouseLeave = () => {
    setHover(false)
  }

  useEffect(() => {
    if (currentEvolutionForm.name === nextEvolutionForm.name) {
      setIsLastForm(true)
      setCanEvolve(false)
    }
  }, [currentEvolutionForm, nextEvolutionForm])

  useEffect(() => {
    if (missingLevelToEvolve <= 0 && !isLastForm) {
      setCanEvolve(true)
    }
  }, [missingLevelToEvolve, isLastForm])

  useEffect(() => {
    if (!canEvolve) {
      setMissingLevelToEvolve(nextEvolutionForm.level - currentLevel)
    }
  }, [canEvolve])

  console.log(pokemon)

  return (
    <div className='flex flex-col'>
      <div
        className='relative gap-3'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`relative mx-auto bg-gray-900 rounded-lg w-60 h-80 border-2 border-gray-900
            ${(state === TeamState.Remove || (state === TeamState.Evolve && canEvolve)) && 'cursor-pointer'}
            ${state === TeamState.Remove && 'hover:border-red-600'}
            ${(state === TeamState.Evolve && !isLastForm) && 'hover:border-green-600'}
          `}
          onClick={handleTeamStates}
        >
          <div
            className={`w-full h-full ${state === TeamState.Remove && 'hover:grayscale'}`}
          >
            <PokemonForm
              hover={hover}
              state={state}
              canEvolve={canEvolve}
              isLastForm={isLastForm}
              currentLevel={currentLevel}
              currentEvolution={currentEvolutionForm}
              nextEvolution={nextEvolutionForm}
            />
          </div>
        </div>
          {!hover && state === TeamState.Remove
            && <TeamCardMessage message="Click to remove" />
          }
          {!hover && state === TeamState.Evolve && canEvolve && !isLastForm
            && <TeamCardMessage message="Click to evolve" />
          }
          {state === TeamState.Evolve && !canEvolve && !isLastForm
            && <TeamCardMessage message={`Level to evolve not reached, missing
                  ${missingLevelToEvolve} ${changeWord(missingLevelToEvolve > 1, "level", "levels")}
                `}
            />
          }
          {state === TeamState.Evolve && isLastForm && !canEvolve
            && <TeamCardMessage message="Already at is maximum evolution form" />
          }
      </div>
      <Button
        className='text-center w-44 px-3 py-2 mx-auto bg-green-500 rounded hover:bg-green-400'
        onClick={handlePokemonUpgrades}
      >
        <p className='font-bold'>upgrade</p>
      </Button>
    </div>
  )
}

export default TeamCard