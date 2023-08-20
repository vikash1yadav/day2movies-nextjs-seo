import slugify from "../../../utils/slugify";
import Link from 'next/navigation';
import constant from "@/helper/constant";

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
  // `${(result?.title || result?.original_title)} constant.MOVIE_PAGE.SEO_TITLE`
  const slugifyUrl = `/${result?.media_type==="movie"? "movie":"series"}/${slugify(`${(result?.title || result?.original_title)} ${constant.MOVIE_PAGE.SEO_MOVIE_URL}`)}/${result.id}`;
  return (
    <a
      as={slugifyUrl}
      // href={{
      //   pathname: '/movie/[movie_name]/[movie_id]',
      //   query: {
      //     movie_name: slugify(result?.title || (result?.original_title || result?.original_name)),
      //     movie_id: result.id
      //   },
      // }}
      replace passHref legacyBehavior
     href={slugifyUrl}
    >
      <div
        id="movie-thumbnail"
        // className="postItem"
        // tailwind w-[190px] h-[330px]
        className="flex flex-col bg-[#282c34] text-[white] cursor-pointer m-[5px] p-[5px] rounded-[10px] hover:bg-[white] hover:text-[black]"
      // onClick={() => router.push(`/movie/${result.id}`)}
      // onClick={() => router.push()}
      >
        <div
          className="link no-underline text-inherit"
          to={`/movie/${result.id}`}
        >
          <img
            // postImg
            // tailwind:w-[180px] min-h-[260px]
            className="w-full h-full my-auto min-h-[260px]  object-cover rounded-[7px] hover:scale-105"
            src={`https://image.tmdb.org/t/p/w780/${result.poster_path}`}
            alt={result.title + ", day2movies"}
            title={result.title || result.original_name + " day2movies"}
            loading="lazy"
          />
        </div>
        <div className="postInfo flex flex-col mt-auto">
          <span className="postTitle text-base overflow-hidden text-ellipsis my-[3px]">
            {result.title || result.original_name}
          </span>
          <div className="movieDetails">
            <p className="movieDate">{result.release_date}</p>
            <p className="type">{result.vote_average}</p>
            {/* <p className="hidden">{result.overview}</p> */}
          </div>
        </div>
      </div>
    </a>
  );
}

export default MovieThumbnail;
