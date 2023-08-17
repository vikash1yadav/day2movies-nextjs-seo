import Home from "..";

export default Home;

export async function getStaticProps() {
    // const session = await getSession(context);

    const [
        trendingShowRes,
        popularShowsRes,
        top_ratedShowsRes,
    ] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=abb29bea88e171807e8533520836bfce`),
        fetch(
            `https://api.themoviedb.org/3/tv/popular?api_key=10682f9f7e873f9fefa9c47949aca414&page=1`
        ),
        fetch(
            `https://api.themoviedb.org/3/tv/top_rated?api_key=10682f9f7e873f9fefa9c47949aca414&page=1`
        ),
    ]);
    const [trendingNow, popularShows, top_ratedShows] =
        await Promise.all([
            trendingShowRes.json(),
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
