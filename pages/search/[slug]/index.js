import React,{useEffect, useState} from 'react'
import Router, { useRouter } from "next/router";
import MoviesCollection from "../../../components/MoviesCollection";



function index() {
  const { query: { slug } } = useRouter();
  const [searchResult, setsearchResult] = useState([]);
  
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${slug}&api_key=10682f9f7e873f9fefa9c47949aca414`
    ).then(async(res) => {
      const posts = await res.json();
      const { results } = posts;
      setsearchResult(results);
    })
  }, [slug])
  

  return (
    <div>
      <main className="relative min-h-screen after:bg-home after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1]">
        {/* <Slider results={popularMovies} /> */}
        {/* <Brands /> */}
        <MoviesCollection
          results={searchResult}
          title={`Search results for ${slug}`}
        />
      </main>
    </div>
  );
}

export default index