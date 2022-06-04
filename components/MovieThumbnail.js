import Image from "next/image";
import { useRouter } from "next/router";

function MovieThumbnail({ result }) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const router = useRouter();

  return (
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
    </div>
  );
}

export default MovieThumbnail;
