import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MovieInfo from "./MovieInfo";

const MovieSummary = ({ result }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const VIDEO_BASE_URL = `https://databasegdriveplayer.xyz/player.php?imdb=${result.imdb_id}&?tmdb=${result.id}`;
  // https://databasegdriveplayer.xyz/player.php?tmdb=19404}]
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
    setShowPlayer(false);
    setposterLink(
      `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
      `${BASE_URL}${result.poster_path}`
    );
  }, [result]);

  const thumbnailImageStyle = { backgroundImage: `url(${posterLink})` };
  return (
    <>
      <div className="flex w-full h-full">
        <section className="w-screen lg:h-[75vh] md:h-[70vh] sm:h-[300px]">
          {showPlayer ? 
            <div className="h-full">
              <iframe
                src={VIDEO_BASE_URL}
                // frameborder="0"
                className="w-full h-full"
                allowfullscreen="allowfullscreen"
                sandbox='allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation'
              />
            </div> :
            <div
              // tail sm:h-[300px] md:h-[350px] tab-xs:h-[350px] lg:h-[75vh]
              className={`releative bg-center bg-no-repeat bg-cover flex flex-row h-full`}
              style={thumbnailImageStyle}
            >
              {/* <img src={posterLink}
                className="w-full hover:opacity-75 hover:bg-[#0F0F0F] object-cover"
              /> */}
              <div className="w-full h-full cursor-pointer flex justify-center items-center "
                onClick={() => setShowPlayer(true)}
              >
                <div
                  className=" bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] p-3 rounded-full"
                >
                  <img
                    src="/images/play-icon-white.svg"
                    alt=""
                    className="h-6 md:h-8"
                  />
                </div>
              </div>
            </div>   
        }
        </section>
      </div>
      <MovieInfo movie={result} />
    </>
  );
};

export default MovieSummary;
