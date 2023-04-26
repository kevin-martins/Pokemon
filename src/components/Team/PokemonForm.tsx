// import { useState, useEffect } from 'react'
import { NewPokemonDataProps } from '../../models/pokemon'
import { TeamState } from '../../models/team'
// import { getNextPokemonEvolutionFormData } from '../../helpers/pokemons/getData'
// import { capitalize } from '../../helpers/utils'
// import { getCurrentPokemonEvolutionForm } from '../../helpers/pokemons/getData'

type Props = {
  state: TeamState
  hover: boolean
  missingLevelToEvolve: number
  isLastForm: boolean
  pokemon: NewPokemonDataProps
}

const PokemonForm = ({
  state,
  hover,
  missingLevelToEvolve,
  isLastForm,
  pokemon,
}: Props) => {
  // const [currentForm, setCurrentForm] = useState<NewPokemonEvolutionProps>(getCurrentPokemonEvolutionForm(pokemon.evolutions))
  // const [nextForm, setNextForm] = useState<NewPokemonEvolutionProps>(getNextPokemonEvolutionFormData(pokemon.evolutions))
  // const [loading, setLoading] = useState<boolean>(false)
  // const nextPokemonForm = 

  // useEffect(() => {

  // }, [, pokemon])

  // return (
  //   <>
  //     <section className='absolute w-full left-1/2 -translate-x-1/2 translate-y-1/2 text-white flex flex-row'>
  //       <p className='text-2xl mx-auto'>
  //         {state === TeamState.Evolve && hover && missingLevelToEvolve <= 0
  //         ? capitalize(nextPokemonName)
  //         : capitalize(name)}
  //       </p>
  //       <p className='text-xl text-right leading-9'>
  //         Lvl.
  //       </p>
  //       <p className='text-3xl mx-2 leading-7'>{currentLevel}</p>
  //     </section>
  //     <div className='w-full h-full flex justify-center '>
  //       {showNextEvolutionForm ? 
  //         <img
  //           src={nextPokemonFormSprite}
  //           alt={pokemon.name}
  //           className={`w-60 h-60 m-auto ${showNextEvolutionForm ? 'grayscale' : ''}`}
  //         />
  //         : <img
  //           src={pokemon.sprites.default}
  //           alt={pokemon.name}
  //           className={`w-60 h-60 m-auto ${showNextEvolutionForm ? 'grayscale' : ''}`}
  //         />
  //       }
  //     </div>
  //   </>
  // )
}

export default PokemonForm