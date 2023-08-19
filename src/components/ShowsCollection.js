import ShowThumbnail from "./ShowThumbnail";

function ShowsCollection({ results, title, series_id, series_name }) {
  return (
    <div className="max-w-[1400px] mx-auto "
    // max-w-[1400px] mx-auto 
    >
      <h2 className="font-semibold m-5">{title}</h2>
      {/* <h2 className="font-semibold m-5 ">{title}</h2> */}
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] smb:grid-cols-[repeat(auto-fit,minmax(155px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]"
        // className="post"
      >
        {results.length>0 && results.map((result) => (
          <ShowThumbnail key={result.id} result={result} isSeriesSeason={title} series_id={series_id} series_name={series_name} />
        ))}
      </div>
    </div>
  );
}

export default ShowsCollection;
