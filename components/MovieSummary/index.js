import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import ReactPlayer from "react-player/lazy";
import MovieInfo from "./MovieInfo";


const MovieSummary = ({ result }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const router = useRouter();
  const [showPlayer, setShowPlayer] = useState(false);
  const [posterLink, setposterLink] = useState(
    `${BASE_URL}${result.poster_path}`
  );
  const index = result.videos.results.findIndex(
    (element) => element.type === "Trailer"
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

  return (
    <>
      <div className="flex w-full h-full">
        <section className="h-full w-screen max-h-[70vh]">
          <div className="flex flex-row h-[100%] md:h-[350px] sm:h-[350px] lg:h-[70vh]">
            <img src={posterLink}
              className="w-full hover:opacity-75 hover:bg-[#0F0F0F] object-cover"
            />
            <div className="absolute z-50  cursor-pointer left-[45%] top-[160px] sm:top-[200px] lg:left-[50%] lg:top-[40%] justify-center"
              onClick={() => setShowPlayer(true)}
            >
              <button
                className="text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] flex items-center justify-center py-3 px-3 rounded-full"
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
            className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${showPlayer ? "opacity-100 z-50" : "opacity-0"
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
      <MovieInfo movie={result} />
    </>
  );
};

export default MovieSummary;
