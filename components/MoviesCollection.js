import MovieThumbnail from "./MovieThumbnail";

function MoviesCollection({ results, title }) {
  // console.log("results", results);
  return (
    <div className=" max-w-[1400px] mx-auto ">
      <h2 className="font-semibold m-5">{title}</h2>      
      <div className="post">
        {results.map((result) => (
          <MovieThumbnail key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
}

export default MoviesCollection;
