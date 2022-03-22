import Image from "next/image";
import { useRouter } from "next/router";

function MovieThumbnail({ result }) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const router = useRouter();

  return (
    // <div
    //   className="flex min-w-[250px] min-h-[170px] md:min-w-[330px] md:min-h-[210px] rounded-lg overflow-hidden shadow-xl cursor-pointer border-[3px] border-[#f9f9f9] border-opacity-10  hover:border-opacity-80 hover:shadow-2xl transform hover:scale-105 transition duration-300"
    //   onClick={() => router.push(`/movie/${result.id}`)}
    // >
    //   <Image
    //     src={
    //       `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
    //       `${BASE_URL}${result.poster_path}`
    //     }
    //     width={330}
    //     height={210}
    //     objectFit="cover"
    //     className="rounded-lg"
    //   />
    //             <div className="absolute inset-y-1 md:bottom-1 background-blur inset-x-4 md:inset-x-12 space-y-6 z-50">
    //     <h1 className="text-xl sm:text-xl md:text-xl font-bold">
    //     {/* md:inset-y-1 */}
    //           {result.title || result.original_name}
    //     </h1>
    //     <p style={{display:'none'}}>{result.overview}</p>
    //       </div>
    // </div>
    <div
      className="postItem"
      onClick={() => router.push(`/movie/${result.id}`)}
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
            <p style={{ display: "none" }}>{result.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieThumbnail;
