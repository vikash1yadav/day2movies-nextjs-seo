// import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import MoviesCollection from "../components/MoviesCollection";

import Slider from "../components/Slider";
import ShowsCollection from "../components/ShowsCollection";

export default function Home({
  popularMovies,
  popularShows,
  top_ratedMovies,
  top_ratedShows,
  trendingNow
}) {
  return (
    <div>
      <Head>
        {/* Primary Meta Tags */}
        <title>day2movies - watch movies and web series online</title>
        {/* <meta
          name="description"
          content="day2movies watch movies & series online for free, day2movies is free streaming website, download movies and webseries in high quality for free on day2movies"
        /> */}
        <meta name="description" content="Discover the ultimate online destination for movies and web series at Day2Movies. Explore a vast library of content, enjoy seamless streaming, and stay updated with the latest releases. Join us for an unparalleled entertainment experience!" />
        <meta name="keywords" content="movies, web series, online streaming, Day2Movies, entertainment platform, streaming website, movie library, watch films online" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://day2movies.com/" />
        <meta
          property="og:title"
          content="day2movies - watch movies & series online for free"
        />
        <meta
          property="og:description"
          content="Discover the ultimate online destination for movies and web series at Day2Movies. Explore a vast library of content, enjoy seamless streaming, and stay updated with the latest releases. Join us for an unparalleled entertainment experience!"
        />
        <meta property="og:image" content="https://day2movies.com/" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://day2movies.com/" />
        <meta
          property="twitter:title"
          content="day2movies - watch movies & series online for free"
        />
        <meta
          property="twitter:description"
          content="Discover the ultimate online destination for movies and web series at Day2Movies. Explore a vast library of content, enjoy seamless streaming, and stay updated with the latest releases. Join us for an unparalleled entertainment experience!"
        />
        <meta property="twitter:image" content="https://day2movies.com/" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Header /> */}
      <main className="relative min-h-screen after:bg-home after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1]">
        <Slider results={trendingNow || popularMovies} />
        {/* <Brands /> */}
        {popularMovies &&<MoviesCollection results={popularMovies} title="Popular Movies" />}
        {popularShows && <ShowsCollection results={popularShows} title="Popular Shows" />}
        {top_ratedMovies && <MoviesCollection results={top_ratedMovies} title="Top Rated Movies" />}
        {top_ratedShows &&<ShowsCollection results={top_ratedShows} title="Top Rated Shows" />}
      </main>
    </div>
  );
}

export async function getStaticProps() {
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
      `https://api.themoviedb.org/3/movie/popular?api_key=10682f9f7e873f9fefa9c47949aca414&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=10682f9f7e873f9fefa9c47949aca414&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=10682f9f7e873f9fefa9c47949aca414&language=hi-IN&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=10682f9f7e873f9fefa9c47949aca414&language=en-US&page=1`
    ),
  ]);
  const [trendingNow, popularMovies, popularShows, top_ratedMovies, top_ratedShows] =
    await Promise.all([
      trendingShowRes.json(),
      popularMoviesRes.json(),
      popularShowsRes.json(),
      top_ratedMoviesRes.json(),
      top_ratedShowsRes.json(),
    ]);

  return {
    props: {
      trendingNow: trendingNow.results,
      popularMovies: popularMovies.results,
      popularShows: popularShows.results,
      top_ratedMovies: top_ratedMovies.results,
      top_ratedShows: top_ratedShows.results,
    },
    revalidate: 100,
  };
}
