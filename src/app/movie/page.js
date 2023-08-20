import { getPopularMovies, getTopRatedMovies } from "@/api/movie";
import Home from "..";

//getServerSideProps getStaticProps
export async function getData() {
    // const session = await getSession(context);

    const [
        popularMovies,
    ] = await Promise.all([
        getPopularMovies(),
        // getTopRatedMovies(),
    ]);
    popularMovies.apiCallMethod = 'getPopularMovies';
    popularMovies.defaultApiPayload = {};
    return {
        props: {
            popularMovies: popularMovies,
        },
        revalidate: 100,
    };
}

export default async function(context){
  const data = await getData(context);

  return <Home {...data?.props}/>;
};