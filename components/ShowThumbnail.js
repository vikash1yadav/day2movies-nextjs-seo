import Image from "next/image";
import { useRouter } from "next/router";

function ShowThumbnail({ result }) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const router = useRouter();

  const checkTvOrMovieFromTitle = (original_title, original_name) => {
    if (original_title) {
      return "movie";
    } else if (original_name) {
      return "series";
    }
  };

  const reformatTitle = (title) => {
    return title.replaceAll(" ", "-").toLowerCase();
  };
  return (
    <>
    <div
        className={`flex m-1 
               rounded-lg overflow-hidden shadow-xl cursor-pointer border-[3px]
        border-[#f9f9f9] border-opacity-10  hover:border-opacity-80 hover:shadow-2xl
         transform hover:scale-105 transition duration-300`}
        // min-w-[20vw]
        // md:min-w-[200px] md:min-h-[330px]
          // className="flex min-w-[250px] min-h-[170px] md:min-w-[330px] md:min-h-[210px] rounded-lg overflow-hidden shadow-xl cursor-pointer border-[3px] border-[#f9f9f9] border-opacity-10  hover:border-opacity-80 hover:shadow-2xl transform hover:scale-105 transition duration-300"
          onClick={() => router.push(`/show/${result.id}`)}
        >

      <Image
        src={
          `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
          `${BASE_URL}${result.poster_path}`
        }
        width={190}
        height={330}
            objectFit="cover"
            // layout="fill"
          className="rounded-lg  aspect-[4/3]"
          />
          <div
            className="absolute bottom-2  md:inset-y-auto md:bottom-2 background-blur inset-x-1 md:inset-x-2 space-y-4 z-50"

          >
            <h2 className="font-bold">
              {(result.title || result.original_name )|| `${result.name}. ${ result.episode_count} Episodes` }
              </h2>
          </div>
          
        </div>

      {/* <div
        className="postItem"
        onClick={() => router.push(`/${checkTvOrMovieFromTitle(result.original_title, result.original_name)}/${checkTvOrMovieFromTitle(result.original_title, result.original_name) == "movie" ? reformatTitle(result.original_title) : reformatTitle(result.original_name)}/${result.id}`)}
      >
        <div
          className="link"
          to={`/movie/${result.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            className="postImg"
            src={`https://image.tmdb.org/t/p/w780/${result.poster_path}`}
            // alt={content.title + ", day2movies , watch latest movie online for free on day2movies"}
            title={result.title || result.original_name + " day2movies"}
          />

          <div className="postInfo">
            <span className="postTitle">
              {result.title || result.original_name}
            </span>
            <div className="movieDetails">
              <p className="movieDate">{result.release_date}</p>
              <p className="type">{result.vote_average}</p>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default ShowThumbnail;
