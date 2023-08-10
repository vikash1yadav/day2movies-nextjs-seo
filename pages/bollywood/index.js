import React from 'react'
const catType = {
  tendingAllByWeek: 'trending/all/week',
  discoverMovie: 'discover/movie',
  popularMovies: 'movie/popular',
  nowPlaying:'movie/now_playing'
}
const MOVIEAPI = `https://api.themoviedb.org/3/${catType.discoverMovie}?api_key=10682f9f7e873f9fefa9c47949aca414`;
const payload = {
  certification_country: "IN",
  with_original_language: "hi",
  "release_date.gte": moment().subtract(1, 'year').startOf('year').format("YYYY-MM-DD") ||"2023-01-01",
  "release_date.lte": moment().add(1, 'week').format("YYYY-MM-DD") || "2023-08-16",
}


const bollywoodMovieUrl =
  `${MOVIEAPI}&with_original_language=${payload.with_original_language}&certification_country=${payload.certification_country}&release_date.gte=${payload['release_date.gte']}&release_date.lte=${payload['release_date.lte']}`
import Home from "..";
import moment from 'moment/moment';

export default Home;


export async function getStaticProps() {
  // const session = await getSession(context);

  const [
    popularMoviesRes,
    popularMoviesRes2,
    popularMoviesRes3
  ] = await Promise.all([
    fetch(`${bollywoodMovieUrl}&page=1`),
    fetch(`${bollywoodMovieUrl}&page=2`),
    fetch(`${bollywoodMovieUrl}&page=3`),
  ]);
  const [Movies1, MovieList2, MovieList3] =
    await Promise.all([
      popularMoviesRes.json(),
      popularMoviesRes2.json(),
      popularMoviesRes3.json(),
    ]);

  return {
    props: {
      popularMovies: [...Movies1?.results, ...MovieList2?.results, ...MovieList3?.results],
    },
    revalidate: 100,
  };
}
