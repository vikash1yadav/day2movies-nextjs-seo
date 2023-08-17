import requestTmdbApi from "../helper/api-helper";
import Const from "../helper/constant";

export const getTvSeriesSearchResult = (data) => {
    return requestTmdbApi("search/tv", {
        method: "GET",
        params: data,
    })
}