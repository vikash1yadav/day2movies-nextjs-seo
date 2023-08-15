import slugify from "../utils/slugify";
import Link from 'next/link';

function MovieThumbnail({ result }) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  // const router = useRouter();
  const checkTvOrMovieFromTitle = (original_title, original_name) => {
    if (original_title) {
      return "movie";
    } else if (original_name) {
      return "series";
    }
  };
  const slugifyUrl = `/${checkTvOrMovieFromTitle(result.original_title, result.original_name)}/${checkTvOrMovieFromTitle(result.original_title, result.original_name) == "movie" ? slugify(result.original_title) : slugify(result.original_name)}/${result.id}`;
  return (
    <div
      // className="postItem"
      // tailwind w-[190px] h-[330px]
      className=" bg-[#282c34] text-[white] cursor-pointer m-[5px] p-[5px] rounded-[10px] hover:bg-[white] hover:text-[black]"
      // onClick={() => router.push(`/movie/${result.id}`)}
      // onClick={() => router.push()}
    >
      <Link href={slugifyUrl}>
      <div
        className="link"
        to={`/movie/${result.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          // postImg
          // tailwind:w-[180px] h-[260px]
          className="w-full h-full object-cover rounded-[7px] hover:scale-105"
          src={`https://image.tmdb.org/t/p/w780/${result.poster_path}`}
          alt={result.title + ", day2movies , watch latest movie online for free on day2movies"}
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
      </Link>
    </div>
  );
}

export default MovieThumbnail;
