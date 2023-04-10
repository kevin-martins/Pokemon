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
  const [generation, setGeneration] = useState<string>(generationRange.value)
  const dispatch = useAppDispatch()

  // const getNextFetchCall = () => {
  //   if (status === LoadingState.Idle && generationRange) {
  //     const from = generationRange.from + progression
  //     const to = from + pas
  //     if (to >= generationRange.to) {
  //       dispatch(fetchDataAsync({ from: from, to: generationRange.to }))
  //       setProgression(generationRange.to)
  //     } else {
  //       dispatch(fetchDataAsync({ from: from, to: to }))
  //       setProgression(to)
  //     }
  //   }
  // }

  const getNextFetchCall = () => {
    if (status === LoadingState.Idle && generationRange.value === generation) {
      const pas = 19
      // const from = generationRange.from + progression
      // let to = from + pas
      const from = generationRange.from + (pas * progression)
      const to = from + pas - 1
      if (to > generationRange.to) {
        dispatch(fetchDataAsync({ from: from, to: generationRange.to }))
      } else {
        dispatch(fetchDataAsync({ from: from, to: to }))
      }
      setProgression(current => current + 1)
      // setProgression(current => current + pas)
      console.log(from, to, progression, generationRange)
    }
  }

  useEffect(() => {
    if (generationRange.value !== generation) {
      console.log('reset')
      setProgression(0)
      // getNextFetchCall()
      setGeneration(generationRange.value)
    }
  }, [generationRange])

  // useEffect(() => {
  //   const handleScroll = (e: any) => {
  //     return window.scrollY
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <div className='bg-gray-800 min-h-screen'>
      <InfiniteScroll
        pageStart={0}
        loadMore={getNextFetchCall}
        hasMore={progression < generationRange.to ? true : false}
        loader={status !== LoadingState.Idle && <Loading key={progression} />}
      >
        <Pokedex />
      </InfiniteScroll>
    </div>
  )
}

export default Home
