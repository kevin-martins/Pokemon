import React from 'react'
import { NewPokemonDataProps, NewPokemonMovesProps, SpritesProps } from '../../../models/pokemon'
import Button from '../../shared/Button'
import '../../../styles/pokedex/[id]/image.css'
import Title from '../../shared/Title'
import { capitalize } from '../../../helpers/utils'

type Props = {
  sprites: SpritesProps,
  name: string,
  selectedPokemon: NewPokemonDataProps
}

const PokemonCard = ({
  sprites,
  name,
  selectedPokemon,
}: Props) => {
  return (
    <>
      <p className='text-center text-5xl'>{capitalize(name)}</p>
      <img
        src={sprites.default}
        alt={name}
        className={`mx-auto ${selectedPokemon.name === name && 'outline-selected'}`}
      />
    </>
  )
}

export default PokemonCard