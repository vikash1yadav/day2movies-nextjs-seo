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
// import { getMovieById } from "../../../../api/movie";
import * as tmdbMovieApiList from "../../../../api/movie";
// import slugify from "../../../../utils/slugify";
// import tmdbPayload from "../../../../helper/tmdb-payload";

// generateStaticParams getStaticPaths
// export async function generateStaticParams() {

//   const [Movies1 = [], MovieList2 = [], MovieList3 = [], top_ratedMovies = [], trendingNow = [], popularMovies = []] =
//     await Promise.all([
//       tmdbMovieApiList.getDiscoverMovies({ ...tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD, page: 1 }),
//       tmdbMovieApiList.getDiscoverMovies({ ...tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD, page: 2 }),
//       tmdbMovieApiList.getDiscoverMovies({ ...tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD, page: 3 }),
//       tmdbMovieApiList.getTopRatedMovies({ page: 1 }),
//       tmdbMovieApiList.getTrendingAllByWeek({ page: 1 }),
//       tmdbMovieApiList.getPopularMovies({ page: 1 })
//     ]);
//   const data = [
//     ...trendingNow.results,
//     // ...Movies1.results,
//     // ...MovieList2.results,
//     // ...MovieList3.results,
//     // ...popularMovies.results,
//     // ...top_ratedMovies.results,
//   ]

//   let paths = [];
//   data.forEach((item) => {
//     const slugifyTitle = slugify(item?.title || (item?.original_title || item?.original_name));
//     const movie_id = item.id.toString();
//       paths = [...paths,
//         { params: { movie_name: slugifyTitle,  movie_id }, }
//       ]
//     // params: { movie_name: "transformers:-rise-of-the-beasts", movie_id: { movie_id: "667538" } },
//   });
// console.log("paths", paths);
//   // We'll pre-render only these paths at build time.
//   // { fallback: blocking } will server-render pages
//   // on-demand if the path doesn't exist.
//   return paths;
//   // { paths, fallback: "blocking" };
// }

// export async function getStaticPaths() {
//   const posts = await getPosts(); // Fetch list of blog posts
//   const paths = posts.map((post) => ({
//     params: { slug: post.slug },
//   }));

//   return { paths, fallback: false }; // You can set fallback to true if you want to enable fallback rendering
// }

//getServerSideProps getStaticProps
export async function getServerSideProps(context) {
  // const session = await getSession(context);
  // const { id } = context.query;
  const id = context.params.movie_id;
  const request = await tmdbMovieApiList.getMovieById({ movie_id: id, append_to_response:"videos" })
  
  const movieCast = await tmdbMovieApiList.getMovieCast({ movie_id: id });

  const response = await tmdbMovieApiList.getMovieRecommendationsById({ movie_id: id });

  return {
    props: {
      // session,
      result: request,
      recommendedMovie: response,
      movieCast
    },
    // revalidate: 10,
  };
}

function Movie({ result, recommendedMovie, movieCast }) {
  // const [session] = useSession();
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const router = useRouter();
  const [showPlayer, setShowPlayer] = useState(false);
  const [posterLink, setposterLink] = useState(
    `${BASE_URL}${result.poster_path}`
  );

  useEffect(() => {
    // scroll.scrollToTop({ smooth: true });
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
      <MovieSummary result={result} movieCast={movieCast?.cast} />
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
