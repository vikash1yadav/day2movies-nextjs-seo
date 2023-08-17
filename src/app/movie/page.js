import { getPopularMovies, getTopRatedMovies } from "@/api/movie";
import Home from "..";

//getServerSideProps getStaticProps
export async function getData() {
    // const session = await getSession(context);

    const [
        popularMovies,
        top_ratedMovies,
    ] = await Promise.all([
        getPopularMovies(),
        getTopRatedMovies(),
    ]);

    return {
        props: {
            popularMovies: popularMovies.results,
            top_ratedMovies: top_ratedMovies.results,
        },
        revalidate: 100,
    };
}

export default async function(context){
  const data = await getData(context);

  return <Home {...data?.props}/>;
};