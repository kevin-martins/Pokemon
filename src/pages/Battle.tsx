import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import Button from '../components/shared/Button'
import Center from '../components/shared/Center'
import Title from '../components/shared/Title'
import { createComputerTeam } from '../features/pokemon-slice'
import { LoadingState } from '../models/loading'
import { NewPokemonDataProps } from '../models/pokemon'
import '../styles/battle.css'

const Battle = () => {
  const team = useAppSelector(state => state.pokemon.team)
  const computerTeam = useAppSelector(state => state.pokemon.computerTeam)
  const [startBattle, setStartBattle] = useState(false)
  const dispatch = useAppDispatch()

  const handleBattleState = () => {
    dispatch(createComputerTeam())
  }

  useEffect(() => {
    if (team.length > 0) {
      setStartBattle(true)
    } else {
      setStartBattle(false)
    }
  }, [])

  return (
    <>
      <Title text="Battle" />
      <Center>
        <Button
          className='text-center px-3 py-2 bg-white mx-auto mt-10 hover:bg-gray-400'
          onClick={handleBattleState}
        >
          <p>Start Battle</p>
        </Button>
      </Center>
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
      <section>

      </section>
    </>
  )
}

export default Battle