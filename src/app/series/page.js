import { getTrendingAllByWeek } from "@/api/movie";
import Home from "..";
export async function getData() {
    // const session = await getSession(context);

    const [
        trendingNow,
        popularShowsRes,
        top_ratedShowsRes,
    ] = await Promise.all([
        getTrendingAllByWeek(),
        fetch(
            `https://api.themoviedb.org/3/tv/popular?api_key=10682f9f7e873f9fefa9c47949aca414&page=1`
        ),
        fetch(
            `https://api.themoviedb.org/3/tv/top_rated?api_key=10682f9f7e873f9fefa9c47949aca414&page=1`
        ),
    ]);
    const [ popularShows, top_ratedShows] =
        await Promise.all([
            popularShowsRes.json(),
            top_ratedShowsRes.json(),
        ]);

    return {
        props: {
            trendingNow: trendingNow.results,
            popularShows: popularShows.results,
            top_ratedShows: top_ratedShows.results,
        },
        revalidate: 100,
    };
}


export default async function(){
    const data= await getData();
    return <Home {...data?.props}/>;
};
