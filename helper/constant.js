// require('dotenv').config();
export default {
    DAY2MOVIE_URL: process.env.DAY2MOVIE_LINK,
    TMDB_API_KEY: process.env.API_KEY,
    TMDB: {
        API_BASE_URL: "https://api.themoviedb.org/3",
        // API_KEY: "10682f9f7e873f9fefa9c47949aca414",
        API_KEY: process.env.API_KEY || "10682f9f7e873f9fefa9c47949aca414",
        AUTH_KEY: process.env.TMDB_AUTH_KEY,
        IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
        PAGE_LIMIT : 20,
    },
    STREAM_SERVER: {
        GD_STREAM_BASE_URL: "https://databasegdriveplayer.xyz/player.php",
        YOUTUBE_BASE_URL:"https://www.youtube.com/watch",
    },
    TMDB_CAT_BASED_URL : {
        tendingAllByWeek: 'trending/all/week',
        DISCOVER_MOVIE: 'discover/movie',
        popularMovies: 'movie/popular',
        nowPlaying: 'movie/now_playing',
        MOVIE: "movie/"
    },
    DATE_FORMAT: {
        API_DATE:"YYYY-MM-DD"
    },

}