import MovieThumbnail from "./MovieThumbnail";

function MoviesCollection({ results, title }) {
  return (
    <div className=" max-w-[1400px] mx-auto ">
      <h2 className="font-semibold m-5">{title}</h2>      
      <div className="post">
        {/* flex flex-row flex-wrap */}
        {results.map((result) => (
          <MovieThumbnail key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
}

export default MoviesCollection;
