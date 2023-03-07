import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import Button from '../components/shared/Button'
import Title from '../components/shared/Title'
import { createComputerTeam } from '../features/pokemon-slice'
import { NewPokemonDataProps } from '../models/pokemon'
import '../styles/battle.css'

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
      <Title text="Battle" />
      <Button
        onClick={handleBattleState}
      >
        <p>Start Battle</p>
      </Button>
      <section className="flex flex-row justify-center mx-auto flex-wrap max-w-6xl gap-6 p-5 w-full">
        {computerTeam.map((pokemon: NewPokemonDataProps, i: number) => (
          <div
            key={i + Date.now()}
            className='w-72 h-72 rounded-lg'
          >
            <div className='relative w-full h-full flex justify-center '>
              <p
                className='absolute top-1/2 text-2xl font-bold text-color-outline'
              >
                -100
              </p>
              <img src={pokemon.sprites.default} alt={pokemon.name} className={`m-auto`} />
            </div>
          </div>
        ))}
      </section>
    </>
  )
}

export default Battle