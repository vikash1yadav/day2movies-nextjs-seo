import React from "react";
import BasicsSection from "./BasicsSection/index";

const MovieInfo = ({  movie}) => {
  const [innerWidth, setinnerWidth] = React.useState();
  const [cast, setcast] = React.useState([]);
  React.useEffect(() => {
    // window.innerWidth
    setinnerWidth(screen.width);
    setcast(movie.cast);
  }, [movie]);
  console.log("movie d", innerWidth,);

  return <>
    <div className="flex flex-row flex-wrap justify-center my-12 m-2">
      <div className="h-[200px] w-[350px] lg:h-[400px]">
        <img className="rounded-lg h-full"
          src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
          alt={movie.title + ", day2movies , watch latest movie online for free on day2movies"}
          title={movie.title || movie.original_name + " day2movies"} />
      </div>
      <div>
        <BasicsSection movie={movie} heading="Title"
          classNames={{
            root:"text-1xl sm:text-2xl md:text-3xl ",
            content:"text-1xl sm:text-1xl md:text-2xl font-semibold"
        }}
        >  {movie.title || movie.original_name} 
        </BasicsSection>
        <BasicsSection movie={movie} heading="Genre"
          classNames={{
            root:"back",
            content:"text-xs md:text-sm "
          }}
        >
          {movie.genres.map((genre) => genre.name + ", ")}
        </BasicsSection>
        <BasicsSection movie={movie} heading="Realsed"
          classNames={{
            root: "back",
            content: "text-xs md:text-sm"
          }}
        >
          {movie.release_date || movie.first_air_date}
        </BasicsSection>
        <BasicsSection movie={movie} heading="Run Time"
          classNames={{
            root: "back",
            content: "text-xs md:text-sm"
          }}
        >
          {Math.floor(movie.runtime / 60)} hrs {movie.runtime % 60}m {" "}
        </BasicsSection>
        <h4 className="text-sm m-2 md:text-lg max-w-4xl">{movie.overview}</h4>
      </div>

    </div>
  </>
};

export default MovieInfo;
