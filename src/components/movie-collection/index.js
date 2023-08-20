'use client'
import React, { useEffect, useState } from "react";
import MovieThumbnail from "./MovieThumbnail";
import PaginatedContent from "../scroll-to-bottom";
import ThumbnailSelecton from "./thumbnail-selecton";
import * as moveApi from "@/api/movie";

function MoviesCollection({ results, title, pagenate, ...restProps }) {
  const [movieList, setMovieList] = useState(results.results || []);
  const [currentPage, setPage] = useState(1);
  const [totalPgae, setTotalPage] = useState(results?.total_pages);
  let [loading, setLoading] = useState(false);

  const fetchData = async ({page}) => {
    setLoading(true);
    try {
      const payload = { page, ...results?.defaultApiPayload };
      // payload.certification_country = tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD.certification_country;
      let apiCall = moveApi?.[results?.apiCallMethod] || moveApi?.getPopularMovies;
      const newData = await apiCall(payload);
      setMovieList((prevData) => [...prevData, ...newData.results]);
      setPage(newData.page);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage && currentPage != 1 && currentPage <= totalPgae && currentPage < 500) {
      fetchData({ page: currentPage }); 
    }
  }, [currentPage]);

  // const loadMore = useCallback(() => {
  //   console.log("checking load more", currentPage, { loading });
  //   if (!loading) {
  //     console.log({}, currentPage + 1);
  //     const page = currentPage + 1;
  //     fetchData({ page });
  //   }
  // }, [currentPage])

  const Collection = () =>
    <div className="max-w-[1400px] mx-auto ">
      <h2 className="font-semibold m-5">{title}</h2>
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] smb:grid-cols-[repeat(auto-fit,minmax(155px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]"
      >
        {movieList.length > 0 && movieList.map((result) => (
          <MovieThumbnail key={result.id} result={result} />
        ))}
        {
          loading &&
          <>
            <ThumbnailSelecton />
            <ThumbnailSelecton />
            <ThumbnailSelecton />
            <ThumbnailSelecton />
          </>
        }
      </div>
    </div>;

  return (
    <>
      {pagenate ?
        <PaginatedContent loading={loading} setPage={setPage} >
          <Collection />
        </PaginatedContent> :
        <Collection />}
    </>
)
}

export default MoviesCollection;
