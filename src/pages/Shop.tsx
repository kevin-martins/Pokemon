import React from 'react'
import { useAppSelector } from '../app/hooks'
import Title from '../components/shared/Title'
import { getFile } from '../helpers/utils'
import { ItemUtilisation } from '../models/shop'

const Shop = () => {
  const shop = useAppSelector(state => state.pokemon.shop)
  return (
    <div className='flex flex-row flex-wrap gap-4'>
      <Title text="Shop" />
      {shop.map((item, i: number) => {
        const itemType: string = item.item.type === ItemUtilisation.Pokeball ? 'pokeballs' : 'foods'
        return (
          <div key={i + Date.now()} className='flex flex-col'>
            {/* <p>{getFile(`/assets/shop/${itemType}/${getPokeballFilename(item.item.name)}`)}</p> */}
            <p>{item.item.name}</p>
            <img
              // src={getFile(`/assets/shop/${itemType}/${getPokeballFilename(item.item.name)}`)}
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