// import SummaryWrapper from "parts/SummaryWrapper";
// import MovieArtwork from "./MovieArtwork";
// import MovieInfo from "./MovieInfo";
// import { W780H1170 } from "config/image-sizes";
// import Trailer from "./MovieInfo/MovieAdSection/Trailer";

const MovieSummary = ({ baseUrl, movie }) => {
  // const { videos } = movie;
  return (
    <>
      {/* <Trailer videos={movie.videos.results} /> */}
      {/* <SummaryWrapper> */}
        {/* <MovieArtwork
          width={W780H1170.WIDTH}
          height={W780H1170.HEIGHT}
          src={`${baseUrl}w${W780H1170.WIDTH}${movie.poster_path}`}
        /> */}
        {/* <MovieInfo baseUrl={baseUrl} movie={movie} /> */}
      {/* </SummaryWrapper> */}
      <p>{movie.overview}</p>
    </>
  );
};

export default MovieSummary;
