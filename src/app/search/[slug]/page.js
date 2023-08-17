'use client'
import React,{useEffect, useState} from 'react'
import MoviesCollection from "../../../components/MoviesCollection";
import { getMovieSearchResult } from '@/api/movie';
import { getTvSeriesSearchResult } from '@/api/tv-series';
import ShowsCollection from '@/components/ShowsCollection';



function index(context) {
  const [searchResult, setsearchResult] = useState([]);
  const [searchShowResult, setSearchShowResult] = useState([]);
  
  useEffect(() => {
    getMovieSearchResult({query:context?.params?.slug})
    .then(async(res) => {
      const { results } = res;
      setsearchResult(results);
    })

    getTvSeriesSearchResult({query:context?.params?.slug})
    .then(async(res) => {
      const { results } = res;
      setSearchShowResult(results);
    })
  }, [context.params?.slug])
  

  return (
    <div>
      <main className="relative min-h-screen after:bg-home after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1]">
        {/* <Slider results={popularMovies} /> */}
        {/* <Brands /> */}
        <MoviesCollection
          results={searchResult}
          title={`Movies Search results for ${context.params.slug}`}
        />

        <ShowsCollection
          results={searchShowResult}
          title={`Tv-show/Series Search results for ${context.params.slug}`}
        />
      </main>
    </div>
  );
}

export default index