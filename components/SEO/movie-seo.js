import React from 'react'
import Head from "next/head";

function MovieSeo({ movie}) {
  return (
      <Head>
          <title>{`${movie.title} - day2movies`}</title>
          <meta
              name="description"
              content={`${movie.title}, ${movie.overview}`}
          />
          <meta
              property="og:title"
              content={`${movie.title} day2movies - watch movies & series online for free`}
              key="title"
          />
          <meta
              property="og:description"
              content={`${movie.title}, ${movie.overview} day2movies watch movies & series online for free`}
          />
          <meta
              property="og:image"
              content={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta
              property="twitter:url"
              content={`https://day2movies.com/${movie.id}`}
          />
          <meta
              property="twitter:title"
              content={`${movie.title} day2movies - watch movies & series online for free`}
          />
          <meta
              property="twitter:description"
              content={`${movie.title}, ${movie.overview} day2movies watch movies & series online for free`}
          />
          <meta
              property="twitter:image"
              content={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
          />

          <meta property="og:type" content="website" />
          <meta
              property="og:url"
              content={`https://day2movies.com/${movie.id}`}
          />
          <meta
              property="og:title"
              content={`${movie.title} day2movies - watch movies & series online for free`}
          />
          <meta
              property="og:description"
              content={`${movie.title}, ${movie.overview} day2movies watch movies & series online for free`}
          />
          <meta
              property="og:image"
              content={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="628" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
  )
}

export default MovieSeo