import Image from 'next/image'
import MainPage from "./index";

export async function getData(context) {
  // const session = await getSession(context);

  const [
    trendingShowRes,
    popularMoviesRes,
    popularShowsRes,
    top_ratedMoviesRes,
    top_ratedShowsRes,
  ] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=abb29bea88e171807e8533520836bfce`),
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=10682f9f7e873f9fefa9c47949aca414&language=en-INS&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=10682f9f7e873f9fefa9c47949aca414&language=en-INS&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=10682f9f7e873f9fefa9c47949aca414&language=en-IN&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=10682f9f7e873f9fefa9c47949aca414&language=en-INS&page=1`
    ),
  ]);
  const [trendingNow, popularMovies, popularShows, top_ratedMovies, top_ratedShows,] =
    await Promise.all([
      trendingShowRes.json(),
      popularMoviesRes.json(),
      popularShowsRes.json(),
      top_ratedMoviesRes.json(),
      top_ratedShowsRes.json(),
      // context.json(),
    ]);

  return {
    props: {
      trendingNow: trendingNow.results,
      popularMovies: popularMovies.results,
      popularShows: popularShows.results,
      top_ratedMovies: top_ratedMovies.results,
      top_ratedShows: top_ratedShows.results,
      pageRoutes: "/",
    },
    revalidate: 100,
  };
}


export default async function Home() {
  const data = await getData()
  return <MainPage {...data?.props}/>
}
