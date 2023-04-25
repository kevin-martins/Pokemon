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
  const showNextEvolutionForm = state === TeamState.Evolve && hover && missingLevelToEvolve <= 0 && !isLastForm
  return (
    <>
      {showNextEvolutionForm ? 
        <img
          src={nextPokemonFormSprite}
          alt={pokemon.name}
          className={`w-60 h-60 m-auto ${showNextEvolutionForm ? 'grayscale' : ''}`}
        />
        : <img
          src={pokemon.sprites.default}
          alt={pokemon.name}
          className={`w-60 h-60 m-auto ${showNextEvolutionForm ? 'grayscale' : ''}`}
        />
      }
    </>
  )
}

export default EvolutionImages