import { capitalize } from '../../helpers/utils';
import { TeamState } from '../../models/team';

type Props = {
  state: TeamState
  hover: boolean
  missingLevelToEvolve: number
  nextPokemonName: string
  pokemon: { name: string, currentLevel: number }
}

const EvolutionNames = ({
  state,
  hover,
  missingLevelToEvolve,
  nextPokemonName,
  pokemon,
}: Props) => {
  const { name, currentLevel } = pokemon
  return (
    // TODO don't use translate (use margin or padding)
    <section className='absolute w-full left-1/2 -translate-x-1/2 translate-y-1/2 text-white flex flex-row'>
      <p className='text-2xl mx-auto'>
        {state === TeamState.Evolve && hover && missingLevelToEvolve <= 0
        ? capitalize(nextPokemonName)
        : capitalize(name)}
      </p>
      <p className='text-xl text-right leading-9'>
        Lvl.
      </p>
      <p className='text-3xl mx-2 leading-7'>{currentLevel}</p>
    </section>
  )
}

export default EvolutionNames