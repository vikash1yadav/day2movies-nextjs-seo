import ShowThumbnail from "./ShowThumbnail";

function ShowsCollection({ results, title }) {
  return (
    <div className="w-full inset-x-12 mt-4 "
    // max-w-[1400px] mx-auto 
    >
      <h2 className="text-xl sm:text-xl md:text-xl font-bold mx-4">{title}</h2>
      {/* <h2 className="font-semibold m-5 ">{title}</h2> */}
      <div
        className="flex flex-wrap justify-center align-middle justify-items-center"
        // className="post"
      >
        {results.length>0 && results.map((result) => (
          <ShowThumbnail key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
}

export default ShowsCollection;
