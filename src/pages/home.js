import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Layout } from '../layout';
import { MovieCard } from './../components/movieCard';

export const Home = () => {
  const movies = useSelector(state => state.MOVIES.moviesList)
  const sorted = useSelector(state => state.MOVIES.sort)
  const typed = useSelector(state => state.MOVIES.type)
  const [dataItems, setDataItems] = useState([])

  useEffect(() => {
    setDataItems(movies);
  }, [movies])

  useEffect(() => {
    setDataItems(typed !== "Tümü" ? movies.filter(movie => movie.movie_type === typed) : movies);
  }, [typed, sorted])
  
  return (
    <Layout>
      {dataItems.map((data, i) => 
        <MovieCard key={i} id={i} movie={data} />
      )}
    </Layout>
  );
}