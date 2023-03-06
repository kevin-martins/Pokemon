import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchDataAsync } from '../features/pokemon-slice';
import Loading from '../components/shared/Loading';
import Pokedex from '../components/Pokedex';
import { LoadingState } from '../models/loading';
import Select from '../components/shared/Select';
import InfiniteScroll from 'react-infinite-scroller';

export const Home = () => {
  const generationRange = useAppSelector(state => state.pokemon.generationRange)
  const status = useAppSelector(state => state.pokemon.status)
  const [progression, setProgression] = useState<number>(0)
  const dispatch = useAppDispatch()

  const getNextFetchCall = () => {
    console.log("call", progression)
    if (status === LoadingState.Idle && generationRange) {
      const from = generationRange.from + progression
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

  return (
    <div className='bg-gray-800 min-h-screen'>
      <InfiniteScroll
        pageStart={0}
        loadMore={getNextFetchCall}
        // initialLoad={dispatch(fetchDataAsync({ from: 1, to: 20 }))}
        hasMore={progression >= generationRange.to ? false : true}
        loader={status !== LoadingState.Idle && <Loading />}
      >
        <Pokedex />
      </InfiniteScroll>
    </div>
  )
}

export default Home
