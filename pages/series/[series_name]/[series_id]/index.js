import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
// import Header from "../../components/Header";
// import Hero from "../../components/Hero";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import ReactPlayer from "react-player/lazy";
import ShowsCollection from "../../../../components/ShowsCollection";
import ErrorPage from "../../../404";
import MovieSeo from "../../../../components/SEO/movie-seo";
import MovieList2 from "../../../../components/movieList";

function Show({ result, recommendedShow, tvSeasonDetails }) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const router = useRouter();
  const [showPlayer, setShowPlayer] = useState(false);

  const index = result.videos.results.findIndex(
    (element) => element.type === "Trailer"
  );
  if (result.success === false) {
    return (<ErrorPage />);
  }

  const filterStillPath = (episodes) => {
    return episodes.map((episode) =>
      episode.episodes.filter((episode) => episode.still_path !== null)
    );
  };

  return (
    <>
      <div className="relative">
        <MovieSeo movie={result} />
      {/* <Head>
        <title>{result.title || result.original_name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      {/* <Header /> */}
        <section
          className="relative"
        >
          <div className="relative min-h-[calc(100vh-72px)] " >
          <Image
            src={
              `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
              `${BASE_URL}${result.poster_path}`
            }
            layout="fill"
            objectFit="cover"
          />
        </div>
          <div
            className="absolute bottom-10  md:inset-y-auto md:bottom-0 inset-x-4 md:inset-x-12 space-y-6 z-50"
            // inset-y-12 md:inset-y-auto md:bottom-0 inset-x-4 md:inset-x-12 space-y-6 z-50
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {result.title || result.original_name}
          </h1>
          <div className="flex items-center space-x-3 md:space-x-5">
            <button className="text-xs md:text-base bg-[#f9f9f9] text-black flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]">
              <img
                src="/images/play-icon-black.svg"
                alt=""
                className="h-6 md:h-8"
              />
              <span className="uppercase font-medium tracking-wide">Play</span>
            </button>

            <button
              className="text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]"
              onClick={() => setShowPlayer(true)}
            >
              <img
                src="/images/play-icon-white.svg"
                alt=""
                className="h-6 md:h-8"
              />
              <span className="uppercase font-medium tracking-wide">
                Trailer
              </span>
            </button>

            <div className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60">
              <PlusIcon className="h-6" />
            </div>

            <div className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60">
              <img src="/images/group-icon.svg" alt="" />
            </div>
          </div>

          <p className="text-xs md:text-sm">
            {result.release_date || result.first_air_date} •{" "}
            {result.number_of_seasons}{" "}
            {result.number_of_seasons === 1 ? "Season" : "Seasons"} •{" "}
            {result.genres.map((genre) => genre.name + " ")}{" "}
          </p>
          <h4 className="text-sm md:text-lg max-w-4xl">{result.overview}</h4>
        </div>

        {/* Bg Overlay */}
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
        <div id="episodes" className="mb-4 my-lg-2">
          {/* {filterStillPath(tvSeasonDetails).map((episode, index) => (
            <MovieList2
              key={index}
              results={episode}
              title={`${tvSeasonDetails[index].name} `}
            />
          ))} */}
          <MovieList2
            key={index}
            results={tvSeasonDetails[0].episodes}
            title={`${tvSeasonDetails[0].name} `}
          />
        </div>
        <div>
          {result.seasons && <ShowsCollection results={result.seasons} title="Seasons" />}
        </div>
      </div>
      {recommendedShow && <ShowsCollection results={recommendedShow} title="Recommended Shows" />}
    </>
  );
}

export default Show;

export async function getServerSideProps(context) {
  const { series_id } = context.query;
  const apiKey = process.env.API_KEY;

  const generateEndpoint = (id, seasons) => {
    return seasons.map(
      (season) =>
        `https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}?api_key=${apiKey}&language=en-US&append_to_response=videos`
    );
  };

  const getTvSeasonDetails = async (id, seasons) => {
    const generatedEndpoint = await generateEndpoint(id, seasons);
    const requestTvSeasonDetails = await generatedEndpoint.map((endpoint) =>
      fetch(endpoint)
    );
    const responseTvSeasonDetails = await Promise.all(requestTvSeasonDetails);
    const responseTvSeasonDetailsJson = await Promise.all(
      responseTvSeasonDetails.map((response) => response.json())
    );
    return responseTvSeasonDetailsJson;
  };

  let request;
  let tvSeasonDetails;
    await fetch(
    `https://api.themoviedb.org/3/tv/${series_id}?api_key=${apiKey}&language=en-US&append_to_response=videos`
    ).then((response) => response.json()).then(async (responseTvDetails) => {
      request = responseTvDetails;
      return await getTvSeasonDetails(
        responseTvDetails.id,
        responseTvDetails.seasons
      )
    }).then((res) => {
      tvSeasonDetails = res;
  });

  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${series_id}/recommendations?api_key=10682f9f7e873f9fefa9c47949aca414&page=1`
  ).then((res) => res.json());
  return {
    props: {
      result: request,
      recommendedShow: response.results || null,
      tvSeasonDetails
    },
  };
}
