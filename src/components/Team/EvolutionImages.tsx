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
  return (
    <img
      src={
        (state === TeamState.Evolve && hover && missingLevelToEvolve <= 0 && !isLastForm)
          ? nextPokemonFormSprite
          : pokemon.sprites.default
      }
    alt={pokemon.name}
    className={`w-60 h-60 m-auto ${
      (state === TeamState.Evolve && hover && missingLevelToEvolve <= 0 && !isLastForm)
        ? 'grayscale'
        : ''
    }`}
  />
  )
}

export default EvolutionImages