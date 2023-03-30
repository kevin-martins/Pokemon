import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchDataAsync } from '../features/pokemon-slice';
import Loading from '../components/shared/Loading';
import Pokedex from '../components/Pokedex';
import { LoadingState } from '../models/loading';
import InfiniteScroll from 'react-infinite-scroller';

export const Home = () => {
  const generationRange = useAppSelector(state => state.pokemon.generationRange)
  const status = useAppSelector(state => state.pokemon.status)
  const [progression, setProgression] = useState<number>(0)
  const dispatch = useAppDispatch()

  const getNextFetchCall = () => {
    if (status === LoadingState.Idle && generationRange) {
      const from = generationRange.from + progression
      // TODO: magic number => better to declare it as a const
      const to = from + 19
      if (to >= generationRange.to) {
        dispatch(fetchDataAsync({ from: from, to: generationRange.to }))
        setProgression(generationRange.to)
      } else {
        dispatch(fetchDataAsync({ from: from, to: to }))
        setProgression(to)
      }
    }
  }

  useEffect(() => {
    setProgression(0)
  }, [generationRange.value])

  return (
    <div className='bg-gray-800 min-h-screen'>
      <InfiniteScroll
        pageStart={0}
        loadMore={getNextFetchCall}
        hasMore={progression >= generationRange.to ? false : true}
        // TODO: why a key for Loading
        loader={status !== LoadingState.Idle && <Loading key={Date.now()} />}
      >
        <Pokedex />
      </InfiniteScroll>
    </div>
  )
}

export default Home
