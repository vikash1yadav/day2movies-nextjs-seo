// import { getSession, useSession } from "next-auth/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import Header from "../../components/Header";
// import Hero from "../../components/Hero";
// import HomeIcon from "/public/icons/home.svg";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import ReactPlayer from "react-player/lazy";
import MoviesCollection from "../../components/MoviesCollection";
// import MovieSummary from "../../components/MovieSummary";
import MovieSeo from "../../components/SEO/movie-seo";
import MovieList2 from "../../components/movieList";

export async function getStaticPaths() {
  const popularMoviesRes = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=10682f9f7e873f9fefa9c47949aca414&language=en-US&page=1`
  );
  const popularMovies = await popularMoviesRes.json();
  // const posts = await res.json();
  // console.log(popularMovies);
  // Get the paths we want to pre-render based on posts
  const paths = popularMovies.results.map((post) => ({
    params: { id: post.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

export async function getStaticProps(context) {
  // const session = await getSession(context);
  // const { id } = context.query;
  const id = context.params.id;

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
    setposterLink(
      `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
        `${BASE_URL}${result.poster_path}`
    );
  }, [result]);

  if (result.success === false) {
    // router.push(`/`);
    return (
      <h1 className="text-3xl items-center">
        Not found!!
        {/* <HomeIcon fill="currentColor" width="1.125em" /> */}
      </h1>
    );
  }

  const index = result.videos.results.findIndex(
    (element) => element.type === "Trailer"
  );

  const movie = result;
  const baseUrl=""

  return (
    <>
      <MovieSeo movie={result} />
      <div className="flex w-full h-full">
        <section className="h-full w-screen max-h-[70vh]">
          <div className="flex flex-row md:h-[350px] sm:h-[150px] lg:h-[70vh]">
            <img src={posterLink} 
              className="w-full blur-[2px]  object-cover"
            />
            <div className="absolute z-50  border-red cursor-pointer left-[40%] top-[200px] lg:left-[50%] lg:top-[40%] inset-y-28 justify-center"
              onClick={() => setShowPlayer(true)}
            >
              <button
                className="text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] flex items-center justify-center py-2.5 px-6 rounded-full"    
              >
                <img
                  src="/images/play-icon-white.svg"
                  alt=""
                  className="h-6 md:h-8"
                />
                <span className="uppercase font-medium tracking-wide">
                 
                </span>
              </button>
            </div>
          </div>
          {showPlayer && (
            <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-50"></div>
          )}

          <div
            className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
              showPlayer ? "opacity-100 z-50" : "opacity-0"
            }`}
          >
            <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
              <span className="font-semibold">Play Trailer</span>
              <div
                className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
                onClick={() => setShowPlayer(false)}
              >
                <XIcon className="h-5" />
              </div>
            </div>
            <div className="relative pt-[56.25%]">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${result.videos?.results[index]?.key}`}
                width="100%"
                height="100%"
                style={{ position: "absolute", top: "0", left: "0" }}
                controls={true}
                playing={showPlayer}
              />
            </div>
          </div>
        </section>
      </div>
      <div className="flex flex-col m-4">
        <h1 className="text-3xl m-2 sm:text-4xl md:text-5xl font-bold">
          {result.title || result.original_name}
        </h1>
        <p className="text-xs m-2 md:text-sm">
          {result.release_date || result.first_air_date} •{" "}
          {Math.floor(result.runtime / 60)}h {result.runtime % 60}m •{" "}
          {result.genres.map((genre) => genre.name + " ")}{" "}
        </p>
        <h4 className="text-sm m-2 md:text-lg max-w-4xl">{result.overview}</h4>
      </div>
      <MovieList2
        results={recommendedMovie.results}
        title="Recommended Movies"
      />
    </>
  );
}

export default Movie;
