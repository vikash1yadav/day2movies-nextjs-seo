import { getTrendingAllByWeek } from "@/api/movie";
import Home from "..";
import { getPopularShow } from "@/api/tv-series";
import tmdbPayload from "@/helper/tmdb-payload";
export async function getData() {
    // const session = await getSession(context);

    const payload = {
        certification_country: tmdbPayload.BOLLYWOOD_RECENT_YEAR_PAYLOAD.certification_country
    }
    const [
        trendingNow,
        popularShows,
    ] = await Promise.all([
        getTrendingAllByWeek(),
        getPopularShow(payload),
    ]);
    popularShows.apiCallMethod = "getPopularShow";
    popularShows.defaultApiPayload = payload;


    return {
        props: {
            trendingNow: trendingNow,
            popularShows
        },
        revalidate: 100,
    };
}


export default async function(){
    const data= await getData();
    return <Home {...data?.props}/>;
};
