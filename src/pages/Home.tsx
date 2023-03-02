import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchDataAsync } from '../features/pokemon-slice';
import Loading from '../components/shared/Loading';
import Pokedex from '../components/Pokedex';
import { LoadingState } from '../models/loading';

export const Home = () => {
  const status = useAppSelector(state => state.pokemon.status)
  const pokedex = useAppSelector(state => state.pokemon.pokedex)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (pokedex.length <= 0)
      dispatch(fetchDataAsync({ from: 1, to: 30}))
  }, [])

  return (
    <div className='bg-gray-800 min-h-screen'>
      {status === LoadingState.Idle ? <Pokedex /> : <Loading />}
    </div>
  )
}

export default Home
