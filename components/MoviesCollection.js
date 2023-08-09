import MovieThumbnail from "./MovieThumbnail";

function MoviesCollection({ results, title }) {
  return (
    <div className=" max-w-[1400px] mx-auto ">
      <h2 className="font-semibold m-5">{title}</h2>      
      <div
        // className="flex flex-row flex-wrap"
        className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(190px,1fr))]"
      >
        {/* post */}
        {/* flex flex-row flex-wrap */}
        {results.length>0 && results.map((result) => (
          <MovieThumbnail key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
}

export default MoviesCollection;
