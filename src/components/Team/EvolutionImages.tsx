import { SpritesProps } from '../../models/pokemon';
import { TeamState } from '../../models/team';

type Props = {
  state: TeamState,
  hover: boolean,
  missingLevelToEvolve: number,
  isLastForm: boolean,
  nextPokemonFormSprite: string,
  pokemon: { name: string, sprites: SpritesProps }
}

const EvolutionImages = ({
  state,
  hover,
  missingLevelToEvolve,
  isLastForm,
  nextPokemonFormSprite,
  pokemon,
}: Props) => {
  const displayNextPokemonForm = state === TeamState.Evolve && hover && missingLevelToEvolve <= 0 && !isLastForm
  return (
    <img
      src={displayNextPokemonForm ? nextPokemonFormSprite : pokemon.sprites.default}
      alt={pokemon.name}
      className={`w-60 h-60 m-auto ${displayNextPokemonForm ? 'grayscale' : ''}`}
    />
  )
}

export default EvolutionImages