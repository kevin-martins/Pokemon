import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { evolvesPokemon, givePokemonLevel, removeFromTeam } from '../../features/pokemon-slice'
import { getPokemonEvolutionFormData, getMissingLevelToEvolve, getNextPokemonEvolutionFormData } from '../../helpers/pokemons/getData'
import { NewPokemonDataProps } from '../../models/pokemon'
import { TeamState } from '../../models/team'
import Button from '../shared/Button'
import Center from '../shared/Center'
import EvolutionImages from './EvolutionImages'
import EvolutionNames from './EvolutionNames'
import { plurial } from '../../helpers/utils'

type Props = {
  pokemon: NewPokemonDataProps,
  state: TeamState,
}

const TeamCard = ({ pokemon, state }: Props) => {
  const missingLevelToEvolve = getMissingLevelToEvolve(pokemon.evolutions, pokemon.currentLevel)
  const [hover, setHover] = useState<boolean>(false)
  const [isLastForm, setIsLastForm] = useState<boolean>(false)
  const nextPokemonForm = getNextPokemonEvolutionFormData(pokemon.evolutions)
  const dispatch = useAppDispatch()

  const handleTeamStates = () => {
    if (state === TeamState.Remove)
      dispatch(removeFromTeam(pokemon))
    else if (state === TeamState.Evolve) {
      dispatch(evolvesPokemon(pokemon))
    }
  }

  const handlePokemonUpgrades = () => {
    dispatch(givePokemonLevel(pokemon))
  }

  const handlerHoverState = () => {
    setHover(current => !current)
  }

  // useEffect(() => {
  //   if (state === TeamState.Evolve) {

  //   }
  // }, [state])

  useEffect(() => {
    const missingLevel = getMissingLevelToEvolve(pokemon.evolutions, pokemon.currentLevel)
    if (missingLevel <= 0) {
      const currentEvolutionForm = getPokemonEvolutionFormData(pokemon.evolutions)
      const nextEvolutionForm = getNextPokemonEvolutionFormData(pokemon.evolutions)
      if (currentEvolutionForm.name === nextEvolutionForm.name) {
        setIsLastForm(true)
      }
    }
  }, [pokemon])

  return (
    <div className='flex flex-col'>
      <div
        className='relative gap-3'
        onMouseEnter={handlerHoverState}
        onMouseLeave={handlerHoverState}
      >
        <div
          className={`mx-auto bg-gray-900 rounded-lg w-60 h-80 border-2 border-gray-900 hover:cursor-pointer
            ${state === TeamState.Remove && 'hover:border-red-600'}
            ${state === TeamState.Evolve && !isLastForm && 'hover:border-green-600'}
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
          </div>
        </div>
          {state === TeamState.Evolve && (missingLevelToEvolve > 0 || isLastForm) &&
            <div className='absolute top-0 w-60 bg-gray-900/70 h-80 rounded-lg'>
              <Center>
                <div className='flex flex-col h-content w-44 gap-5'>
                  <p
                    className='text-center text-white'
                  >
                    {isLastForm
                      ? 'Already at is maximum evolution form'
                      : `Level to evolve not reached, missing ${missingLevelToEvolve} ${plurial(missingLevelToEvolve > 1, "s")}`
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