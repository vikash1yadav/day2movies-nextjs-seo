import requestTmdbApi from "../helper/api-helper";
import Const from "../helper/constant";

export const getDiscoverMovies = (data) => requestTmdbApi(`${Const.TMDB_CAT_BASED_URL.DISCOVER_MOVIE}`, {
    method: "GET",
    params: data,
});

export const getMovieCast = (data) => {
    const { movie_id, ...payload } = data;
    // https://api.themoviedb.org/3/movie/346698/credits
    return requestTmdbApi(`movie/${movie_id}/credits`, {
        method: "GET",
        params: payload,
    })
}