import React from 'react'
import { capitalize } from '../../../helpers/utils'
import { NewPokemonMovesProps } from '../../../models/pokemon'

const PokemonMove = (move: NewPokemonMovesProps) => {
  return (
    <div
      className="w-72 m-1 h-28 bg-gray-900 rounded mx-auto text-white"
    >
      <p className='text-2xl font-medium pl-2 pt-1'>{capitalize(move.name)}</p>
      <div className='flex flex-row'>
        <div>
          <p className='text-xl ml-4'>damage: {move.power}</p>
          <p className='text-xl ml-4'>accuracy: {move.accuracy}</p>
        </div>
        <div>
          <p className='text-xl ml-4'>utilisation: {move.pp}</p>
          <p className='text-xl ml-4'>type: {move.type}</p>
        </div>
      </div>
    </div>
  )
}

export default PokemonMove