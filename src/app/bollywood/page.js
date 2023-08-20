import React from 'react'
const catType = {
  tendingAllByWeek: 'trending/all/week',
  discoverMovie: 'discover/movie',
  popularMovies: 'movie/popular',
  nowPlaying:'movie/now_playing'
}
import Home from "..";
import moment from 'moment/moment';
import { getDiscoverMovies } from '../../api/movie';

const payload = {
  certification_country: "IN",
  with_original_language: "hi",
  "release_date.gte": moment().subtract(1, 'year').startOf('year').format("YYYY-MM-DD") || "2023-01-01",
  "release_date.lte": moment().add(1, 'week').format("YYYY-MM-DD") || "2023-08-16",
}


export async function getData() {
  // const session = await getSession(context);
  const [popularMovies] =
    await Promise.all([
      getDiscoverMovies({ ...payload, page: 1 }),
      // getDiscoverMovies({ ...payload, page: 2 }),
      // getDiscoverMovies({ ...payload, page: 3 }),
    ]);
  popularMovies.apiCallMethod = 'getPopularMovies';
  popularMovies.defaultApiPayload = { ...payload };
  return {
    props: {
      popularMovies: popularMovies,
    },
    revalidate: 100,
  };
}

export default async function(){
  const data = await getData();
  return <Home {...data?.props}/>;
}

// export default Home;

