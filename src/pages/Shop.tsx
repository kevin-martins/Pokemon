import React from 'react'
import { useAppSelector } from '../app/hooks'
import { getFile, getPokeballFilename } from '../helpers/helpers'
import { ItemUtilisation } from '../models/shop'

const Shop = () => {
  const shop = useAppSelector(state => state.pokemon.shop)
  return (
    <div className='flex flex-row flex-wrap gap-4'>
      {shop.map(item => {
        const itemType: string = item.item.type === ItemUtilisation.Pokeball ? 'pokeballs' : 'foods'
        return (
          <div className='flex flex-col'>
            {/* <p>{getFile(`/assets/shop/${itemType}/${getPokeballFilename(item.item.name)}`)}</p> */}
            <p>{item.item.name}</p>
            <img
              src={getFile(`/assets/shop/${itemType}/${getPokeballFilename(item.item.name)}`)}
              alt={item.item.name}
              className='w-36 h-36'
            />
          </div>
        )
      })}
    </div>
  )
}

export default Shop