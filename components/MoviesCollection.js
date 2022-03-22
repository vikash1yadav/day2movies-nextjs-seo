import MovieThumbnail from "./MovieThumbnail";

function MoviesCollection({ results, title }) {
  return (
    <div className="relative flex flex-col space-y-2 my-10 px-8 max-w-[1400px] mx-auto">
      <h2 className="font-semibold">{title}</h2>
      {/* <div className="flex scrollbar-hide p-2 -m-2 overflow-y-hidden space-x-6  overflow-x-scroll">
        {results.map((result) => (
          <MovieThumbnail key={result.id} result={result} />
        ))}
      </div> */}
      <div className="post">
        {results.map((result) => (
          <MovieThumbnail key={result.id} result={result} />
        ))}
      </div>
      
    </div>
  );
}

export default MoviesCollection;
