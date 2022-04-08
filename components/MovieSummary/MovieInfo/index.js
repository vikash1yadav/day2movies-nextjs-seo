

import InfoWrapper from 'parts/InfoWrapper';
import Header from 'parts/Header';
// import BasicsSection from './BasicsSection';
import TheGenresSection from './TheGenresSection';
import TheSynopsisSection from './TheSynopsisSection';
import TheCastSection from './TheCastSection';
// import MovieAdSection from './MovieAdSection';
import SIZE_TYPES from 'utils/constants/size-types';
import withTheme from 'utils/hocs/withTheme';

const MovieInfo = ({
  theme,
  baseUrl,
  movie
}) => {
  const [innerWidth, setinnerWidth] = React.useState();
  const [cast, setcast] = React.useState([]);
  React.useEffect(() => {
    // window.innerWidth
    setinnerWidth(screen.width);
    setcast(movie.cast);
  }, [movie]);
console.log("movie d", innerWidth,);
 
  return <>
    <InfoWrapper>
      <Header
        size={SIZE_TYPES.LARGE}
        title={movie.title}
        subtitle={movie.tagline} />
      <BasicsSection
        className='basic-section-bottom-margin'
        voteAverage={movie.vote_average}
        spokenLanguages={movie.spoken_languages}
        runtime={movie.runtime}
        releaseDate={movie.release_date} />
      <TheGenresSection
        className='the-genres-section-bottom-margin'
        genres={movie.genres} />
      <TheSynopsisSection
        className='the-synopsis-section-bottom-margin'
        synopsis={movie.overview || 'There is no synopsis available...'} />
      {movie.cast ? (
      <TheCastSection
      className='cast-section-bottom-margin'
      cast={movie.cast}
      baseUrl={baseUrl} />        
      ):null}

      {/* <MovieAdSection
        websiteUrl={movie.homepage}
        imdbId={movie.imdb_id}
        videos={movie.videos.results} /> */}
    </InfoWrapper>
    <style jsx>{`
      :global(.basic-section-bottom-margin) {
        margin-bottom: 5rem;
      }

      :global(.the-genres-section-bottom-margin) {
        margin-bottom: 3rem;
      }

      :global(.the-synopsis-section-bottom-margin) {
        margin-bottom: 3rem;
      }

      :global(.cast-section-bottom-margin) {
        margin-bottom: 5rem;
      }

      @media ${theme.mediaQueries.smaller} {
        :global(.basic-section-bottom-margin) {
          margin-bottom: 1rem;
          margin-top: 1rem;
        }
      }
    `}</style>
  </>
};

export default withTheme(MovieInfo);
