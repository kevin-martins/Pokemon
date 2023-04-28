import { useState, useEffect } from 'react'
import { NewPokemonEvolutionProps } from '../../models/pokemon'
import { TeamState } from '../../models/team'
import { capitalize } from '../../helpers/utils'

type Props = {
  state: TeamState
  hover: boolean
  canEvolve: boolean
  isLastForm: boolean
  currentLevel: number
  currentEvolution: NewPokemonEvolutionProps
  nextEvolution: NewPokemonEvolutionProps
}

const PokemonForm = ({
  state,
  hover,
  canEvolve,
  isLastForm,
  currentLevel,
  currentEvolution,
  nextEvolution
}: Props) => {
  return (
    <>
      <section className='absolute w-full left-1/2 -translate-x-1/2 translate-y-1/2 text-white flex flex-row'>
        <p className='text-2xl mx-auto'>
          {state === TeamState.Evolve && hover && canEvolve
          ? capitalize(nextEvolution.name)
          : capitalize(currentEvolution.name)}
        </p>
        <p className='text-xl text-right leading-9'>
          Lvl.
        </p>
        <p className='text-3xl mx-2 leading-7'>{currentLevel}</p>
      </section>
      <div className='w-full h-full flex justify-center '>
        {state === TeamState.Evolve && hover && canEvolve && !isLastForm
          ? <img
              src={nextEvolution.sprite}
              alt={nextEvolution.name}
              className={`w-60 h-60 m-auto grayscale`}
            />
          : <img
              src={currentEvolution.sprite}
              alt={currentEvolution.name}
              className='w-60 h-60 m-auto'
            />
        }
      </div>
    </>
  )
}

export default PokemonForm