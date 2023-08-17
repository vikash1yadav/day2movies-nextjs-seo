import Show from ".";

export async function getData(context) {
  const { series_id } = context.params;
  const apiKey = constant.TMDB.API_KEY;

  const generateEndpoint = (id, seasons) => {
    return seasons.map(
      (season) =>
        `https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}?api_key=${apiKey}&language=en-US&append_to_response=videos`
    );
  };

  const getTvSeasonDetails = async (id, seasons) => {
    const generatedEndpoint = await generateEndpoint(id, seasons);
    const requestTvSeasonDetails = await generatedEndpoint.map((endpoint) =>
      fetch(endpoint)
    );
    const responseTvSeasonDetails = await Promise.all(requestTvSeasonDetails);
    const responseTvSeasonDetailsJson = await Promise.all(
      responseTvSeasonDetails.map((response) => response.json())
    );
    return responseTvSeasonDetailsJson;
  };

  let request;
  let tvSeasonDetails;
    await fetch(
    `https://api.themoviedb.org/3/tv/${series_id}?api_key=${apiKey}&language=en-US&append_to_response=videos`
    ).then((response) => response.json()).then(async (responseTvDetails) => {
      request = responseTvDetails;
      return await getTvSeasonDetails(
        responseTvDetails.id,
        responseTvDetails.seasons
      )
    }).then((res) => {
      tvSeasonDetails = res;
  });

  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${series_id}/recommendations?api_key=10682f9f7e873f9fefa9c47949aca414&page=1`
  ).then((res) => res.json());
  return {
    props: {
      result: request,
      recommendedShow: response.results || null,
      tvSeasonDetails
    },
  };
}


export default async function(context){
  console.log("context", context);
  const data = await getData(context).then((res)=> res);
  return <Show  {...data?.props}/>
};