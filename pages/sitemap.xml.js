// import { Post } from "../models/Post";
import Constant from "../utils/constant";
const generateSiteMap = (data) => {

    const posts=[];

    for (const i in data) {
      data[i].original_title || data[i].original_name ? posts.push(data[i]): null;
    }

  const checkTvOrMovieFromTitle = (original_title, original_name) => {
    if (original_title) {
      return "movie";
    } else if (original_name) {
      return "series";
    }
  };

  const reformatTitle = (title) => {
    return title.replace(/ /g, "-").toLowerCase();
  };

    return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${Constant.DAY2MOVIE_URL}</loc>
    </url>
    ${posts && posts.map(item => {
        return `<url>
        <loc>
          ${Constant.DAY2MOVIE_URL}/${checkTvOrMovieFromTitle(item.original_title, item.original_name)}/${checkTvOrMovieFromTitle(item.original_title, item.original_name) == "movie" ? reformatTitle(item.original_title) : reformatTitle(item.original_name)}/${item.id}
        </loc>
      </url>`;
    }).join('')}
  </urlset>
  `;
};

function SiteMap() { }

export const getServerSideProps = async ({ res }) => {
  const [
    trendingShowRes,
    popularMoviesRes,
    popularShowsRes,
    top_ratedMoviesRes,
    top_ratedShowsRes,
  ] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=abb29bea88e171807e8533520836bfce`),
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=10682f9f7e873f9fefa9c47949aca414&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=10682f9f7e873f9fefa9c47949aca414&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=10682f9f7e873f9fefa9c47949aca414&language=hi-IN&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=10682f9f7e873f9fefa9c47949aca414&language=en-US&page=1`
    ),
  ]);
  const [trendingNow, popularMovies, popularShows, top_ratedMovies, top_ratedShows] =
    await Promise.all([
      trendingShowRes.json(),
      popularMoviesRes.json(),
      popularShowsRes.json(),
      top_ratedMoviesRes.json(),
      top_ratedShowsRes.json(),
    ]);
  const data = [...trendingNow.results, ...popularMovies.results,
    // ...popularShows.results,
    ...top_ratedMovies.results,
    ...top_ratedShows.results
  ]
  const sitemap = generateSiteMap(data);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default SiteMap;