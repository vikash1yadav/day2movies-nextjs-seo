// import { Post } from "../models/Post";
import Constant from "../utils/constant";
import tmdbPayload from "../helper/tmdb-payload";
import { getDiscoverMovies } from "../api/movie";
  
const generateSiteMap = (data) => {
  try {
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

    const posts = [];
    for (const i in data) {
          // ${ Constant.DAY2MOVIE_URL } /${checkTvOrMovieFromTitle(item.original_title, item.original_name)}/${ checkTvOrMovieFromTitle(item.original_title, item.original_name) == "movie" ? reformatTitle(item.title) : reformatTitle(item.original_name) } /${item.id}
      // data[i].original_title || data[i].original_name ? posts.push(data[i]) : null;
      if (data[i].original_title || data[i].original_name) {
        data[i].sitemap_text = `${Constant.DAY2MOVIE_URL}/${checkTvOrMovieFromTitle(data[i]?.original_title, data[i]?.original_name)}/${checkTvOrMovieFromTitle(data[i]?.original_title, data[i]?.original_name) == "movie" ? reformatTitle(data[i]?.title) : reformatTitle(data[i]?.original_name)}/${data[i]?.id}` || `${Constant.DAY2MOVIE_URL}`;
        posts.push(data[i])
      }
    }
    // console.log("posts", posts);
    return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${Constant.DAY2MOVIE_URL}</loc>
    </url>
    ${posts.length>0 && posts.map(item => {
      return `<url>
        <loc>
        ${item?.sitemap_text}
        </loc>
      </url>`;
    }).join('')}
  </urlset>
  `;

  } catch (error) {
    console.log("error", error);
  }
};

function SiteMap() { }

export const getServerSideProps = async ({ res }) => {
  const [
    trendingShowRes,
    popularMoviesRes,
    top_ratedShowsRes,
  ] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=abb29bea88e171807e8533520836bfce`),
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=10682f9f7e873f9fefa9c47949aca414&language=en-US&page=1`
    ),
    // fetch(
    //   `https://api.themoviedb.org/3/movie/top_rated?api_key=10682f9f7e873f9fefa9c47949aca414&language=hi-IN&page=1`
    // )
  ]);
  const [Movies1, MovieList2, MovieList3 = []] =
    await Promise.all([
      getDiscoverMovies({ ...tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD, page: 1 }),
      getDiscoverMovies({ ...tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD, page: 2 }),
      getDiscoverMovies({ ...tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD, page: 3 }),
    ]);
  const [trendingNow, popularMovies, top_ratedMovies,] =
    await Promise.all([
      trendingShowRes.json(),
      popularMoviesRes.json(),
      // top_ratedMoviesRes.json(),
    ]);
  const data = [
    // ...trendingNow.results,
    ...Movies1.results,
    // ...MovieList2.results,
    // ...MovieList3.results,
    // ...popularMovies.results,
    // ...top_ratedMovies.results,
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