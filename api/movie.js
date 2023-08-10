import requestTdbmApi from "../helper/api-helper";
import Const from "../helper/constant";

export const getDiscoverMovies = (data) => requestTdbmApi(`${Const.TMDB_CAT.DISCOVER_MOVIE}`, {
    method: "GET",
    params: data,
});
