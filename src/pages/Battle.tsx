import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import Button from '../components/shared/Button'
import { createComputerTeam } from '../features/pokemon-slice'
import { capitalize } from '../helpers/helpers'
import { NewPokemonDataProps } from '../models/pokemon'

const Battle = () => {
  const team = useAppSelector(state => state.pokemon.team)
  const [startBattle, setStartBattle] = useState<boolean>(false)
  const computerTeam = useAppSelector(state => state.pokemon.computerTeam)
  const dispatch = useAppDispatch()

  const handleBattleState = () => {
    setStartBattle(current => !current)
  }

  useEffect(() => {
    return () => {
      dispatch(createComputerTeam())
    }
  }, [startBattle])
  

  return (
    <>
      <Button
        handleClick={handleBattleState}
      >
        Start Battle
      </Button>
      <section className="flex flex-row justify-center flex-wrap gap-6 p-5 w-full">
        {computerTeam.map((pokemon: NewPokemonDataProps, i: number) => (
          <div
            className='relative w-60 h-60 rounded-lg'
          >
            <div className='w-full h-full flex justify-center '>
              <img src={pokemon.sprites.default} alt={pokemon.name} className={`w-60 h-60 m-auto`} />
            </div>
          </div>
        ))}
      </section>
    </>
  )
}

export default Battle