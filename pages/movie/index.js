import Home from "..";

export default Home;

//getServerSideProps getStaticProps
export async function getStaticProps() {
    // const session = await getSession(context);

    const [
        popularMoviesRes,
        popularShowsRes,
        top_ratedMoviesRes,
        top_ratedShowsRes,
    ] = await Promise.all([
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
    const [popularMovies, popularShows, top_ratedMovies, top_ratedShows] =
        await Promise.all([
            popularMoviesRes.json(),
            popularShowsRes.json(),
            top_ratedMoviesRes.json(),
            top_ratedShowsRes.json(),
        ]);

    return {
        props: {
            popularMovies: popularMovies.results,
            // popularShows: popularShows.results,
            top_ratedMovies: top_ratedMovies.results,
            // top_ratedShows: top_ratedShows.results,
        },
        revalidate: 100,
    };
}
