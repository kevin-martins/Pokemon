import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { evolvesPokemon, givePokemonLevel, removeToTeam } from '../../features/pokemon-slice'
import { getCurrentPokemonEvolutionFormData, getMissingLevelToEvolve, getNextPokemonEvolutionFormData } from '../../helpers/pokemons/getData'
import { NewPokemonDataProps, NewPokemonEvolutionProps } from '../../models/pokemon'
import { TeamState } from '../../models/team'
import Button from '../shared/Button'
import Center from '../shared/Center'
import EvolutionImages from './EvolutionImages'
import EvolutionNames from './EvolutionNames'

type Props = {
  pokemon: NewPokemonDataProps,
  state: TeamState,
}

const TeamCard = ({ pokemon, state }: Props) => {
  const [missingLevelToEvolve, setLevelMissingToEvolve] = useState<number>(getMissingLevelToEvolve(pokemon.evolutions, pokemon.current_level))
  const [hover, setHover] = useState<boolean>(false)
  const [isLastForm, setIsLastForm] = useState<boolean>(false)
  const [nextPokemonForm, setNextPokemonForm] = useState<NewPokemonEvolutionProps>(getNextPokemonEvolutionFormData(pokemon.evolutions))
  const dispatch = useAppDispatch()
  
  const handleTeamStates = () => {
    if (state === TeamState.Remove)
      dispatch(removeToTeam(pokemon))
    else if (state === TeamState.Evolve) {
      dispatch(evolvesPokemon(pokemon))
      setNextPokemonForm(getNextPokemonEvolutionFormData(pokemon.evolutions))
    }
  }

  const handlePokemonUpgrades = () => {
    dispatch(givePokemonLevel(pokemon))
  }

  const handlerHoverState = () => {
    setHover(current => !current)
  }

  useEffect(() => {
    return () => {
      const missingLevel = getMissingLevelToEvolve(pokemon.evolutions, pokemon.current_level)
      if (missingLevel <= 0) {
        const currentEvolutionForm = getCurrentPokemonEvolutionFormData(pokemon.evolutions)
        const nextEvolutionForm = getNextPokemonEvolutionFormData(pokemon.evolutions)
        if (currentEvolutionForm === nextEvolutionForm) {
          setIsLastForm(true)
        }
      }
      setLevelMissingToEvolve(missingLevel)
    }
  }, [pokemon.current_level])

  return (
    <div className='flex flex-col'>
      <div
        className='relative gap-3'
        onMouseEnter={handlerHoverState}
        onMouseLeave={handlerHoverState}
      >
        <Button
          className={`mx-auto bg-gray-900 rounded-lg w-60 h-80 border-2 border-gray-900 
            ${state === TeamState.Remove && 'hover:border-red-600'}
            ${state === TeamState.Evolve && 'hover:border-green-600'}
          `}
          onClick={handleTeamStates}
        >
          <div
            className={`relative w-full h-full ${(state === TeamState.Remove && !isLastForm) && 'hover:grayscale'}`}
          >
            <EvolutionNames
              state={state}
              hover={hover}
              missingLevelToEvolve={missingLevelToEvolve}
              nextPokemonName={nextPokemonForm.name}
              pokemon={pokemon}
            />
            <div className='w-full h-full flex justify-center '>
              <EvolutionImages
                state={state}
                hover={hover}
                missingLevelToEvolve={missingLevelToEvolve}
                isLastForm={isLastForm}
                nextPokemonFormSprite={nextPokemonForm.sprite}
                pokemon={pokemon}
              />
            </div>

            {/* Block user to prompt evolution if level not reached */}
          </div>
        </Button>
          {(state === TeamState.Evolve && (missingLevelToEvolve > 0 || isLastForm)) &&
            <div className='absolute top-0 w-60 bg-gray-900/70 h-80 rounded-lg'>
              <Center>
                <div className='flex flex-col h-content w-44 gap-5'>
                  <p
                    className='text-center text-white'
                  >
                    {
                      isLastForm
                        ? 'already at is maximum evolution form'
                        : `level to evolve not reached, missing ${missingLevelToEvolve} ${missingLevelToEvolve > 1 ? 'levels': 'level'}`
                    }
                  </p>
                </div>
              </Center>
            </div>
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