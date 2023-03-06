import { capitalize } from '../../helpers/utils';
import { TeamState } from '../../models/team';

type Props = {
  state: TeamState
  hover: boolean
  missingLevelToEvolve: number
  nextPokemonName: string
  pokemon: { name: string, current_level: number }
}

const EvolutionNames = ({
  state,
  hover,
  missingLevelToEvolve,
  nextPokemonName,
  pokemon,
}: Props) => {
  const { name, current_level } = pokemon
  return (
    <p className='absolute text-2xl text-white left-1/2 -translate-x-1/2 translate-y-1/2'>
      {state === TeamState.Evolve && hover && missingLevelToEvolve <= 0
      ? capitalize(nextPokemonName)
      : capitalize(pokemon.name)}{' '}
      Lvl. {pokemon.current_level}
    </p>
  )
}

export default EvolutionNames