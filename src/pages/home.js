import React from 'react';
import { useSelector } from 'react-redux';

import { Layout } from '../layout';
import { MovieCard } from './../components/movieCard';

export const Home = () => {
  const movies = useSelector(state => state.MOVIES.moviesList)
  return (
    <Layout>
      
      {movies.map((movie, i) => 
        <MovieCard key={i} movie={movie} />
      )}
    </Layout>
  );
}