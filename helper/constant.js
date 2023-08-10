export default {
    DAY2MOVIE_URL: process.env.DAY2MOVIE_LINK,
    TMDB_API_KEY: process.env.API_KEY,
    TMDB: {
        API_BASE_URL: "https://api.themoviedb.org/3",
        // API_KEY: "10682f9f7e873f9fefa9c47949aca414",
        API_KEY: process.env.API_KEY,
        AUTH_KEY: process.env.TMDB_AUTH_KEY,
        IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/',
        PAGE_LIMIT : 20,
    },
    TMDB_CAT : {
        tendingAllByWeek: 'trending/all/week',
        DISCOVER_MOVIE: 'discover/movie',
        popularMovies: 'movie/popular',
        nowPlaying: 'movie/now_playing'
    },
    DATE_FORMAT: {
        API_DATE:"YYYY-MM-DD"
    },

}