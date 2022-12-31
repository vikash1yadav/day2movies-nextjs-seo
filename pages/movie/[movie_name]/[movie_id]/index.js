// import { getSession, useSession } from "next-auth/client";
// import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { PlusIcon, XIcon } from "@heroicons/react/solid";
// import ReactPlayer from "react-player/lazy";
import MoviesCollection from "../../../../components/MoviesCollection";
import MovieSummary from "../../../../components/MovieSummary";
import MovieSeo from "../../../../components/SEO/movie-seo";
// import MovieList2 from "../../../../components/movieList";
import ErrorPage from "../../../404";

const reformatTitle = (title) => {
  return title.replaceAll(" ", "-").toLowerCase();
};

export async function getStaticPaths() {
  const popularMoviesRes = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=10682f9f7e873f9fefa9c47949aca414&language=en-US&page=1`
  );
  const popularMovies = await popularMoviesRes.json();
  // const posts = await res.json();
  // console.log(popularMovies);
  // Get the paths we want to pre-render based on posts
  const paths = popularMovies.results.map((post) => ({
    params: {
      movie_name: post.original_title.replace(" ", "-"),
      movie_id: post.id.toString(),
    },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

export async function getStaticProps(context) {
  // const session = await getSession(context);
  // const { id } = context.query;
  const id = context.params.movie_id;

  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=videos`
  ).then((response) => response.json());

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=10682f9f7e873f9fefa9c47949aca414&page=1`
  ).then((res) => res.json());

  return {
    props: {
      // session,
      result: request,
      recommendedMovie: response,
    },
    revalidate: 10,
  };
}

function Movie({ result, recommendedMovie }) {
  // const [session] = useSession();
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const router = useRouter();
  const [showPlayer, setShowPlayer] = useState(false);
  const [posterLink, setposterLink] = useState(
    `${BASE_URL}${result.poster_path}`
  );

  useEffect(() => {
    // scroll.scrollToTop({ smooth: true });
    console.log("show hit");
    setShowPlayer(false);
    setposterLink(
      `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
        `${BASE_URL}${result.poster_path}`
    );
  }, [result]);

  if (result.success === false) {
    return (<ErrorPage/>);
  }

  return (
    <>
      <MovieSeo movie={result} />
      <MovieSummary result={result} />
      {/* <MovieList2
        results={recommendedMovie.results}
        result={recommendedMovie.results}
        title="Recommended Movies"
      /> */}
      {recommendedMovie.results && <MoviesCollection results={recommendedMovie.results} title="Recommended Movies" />}
    </>
  );
}

export default Movie;
