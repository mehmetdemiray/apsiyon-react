import React, { useEffect, useState } from 'react';
import {TOTAL_PAGE, CURRENT_PAGE, DELETE_MEDIA} from './../redux/actions/types';
import { useSelector, useDispatch } from 'react-redux';
import {PaginationComponent} from './../components/pagination';

import { Layout } from '../layout';
import { MovieCard } from './../components/movieCard';

export const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.MOVIES.moviesList)
  const sorted = useSelector(state => state.MOVIES.sort)
  const typed = useSelector(state => state.MOVIES.type)
  const inpage = useSelector(state => state.SETTINGS.inPage)
  const current = useSelector(state => state.SETTINGS.currentPage)
  const [dataItems, setDataItems] = useState([])

  useEffect(() => {
    setDataItems(movies)
  }, [movies])

  useEffect(() => {
    let data = movies;
    if (typed !== "Tümü") {
      data = data.filter(d => d.movie_type === typed)
      data = data !== 0 ? data : movies
    } else {
      data = movies
    }

    setDataItems(data)
    // Component içerisinde filtreleme sonucunda yeniden sayfalama yaptırır. 
    // Sayfa bilgisi globalde tutulduğu için store'a gönderiyor
    dispatch({type:TOTAL_PAGE, payload:Math.ceil(data.length/inpage)}) 
     // Mevcut page toplam page'den düşük kalması durumunda 1 döndürür.
    dispatch({type: CURRENT_PAGE, payload: Math.ceil(data.length/inpage) < current  ? 1 : current})
  }, [sorted, typed, current])

  /*
  function sortData(array) {
    if (sorted === "Eklenme Zamanı") {
      setDataItems(array)
    } else if (sorted === "Puana Göre(Artan)") {
      setDataItems(array.sort((a, b) => parseFloat(a.movie_point) - parseFloat(b.movie_point)))
    } else if (sorted === "Puana Göre(Azalan)") {
      setDataItems(array.sort((b, a) => parseFloat(a.movie_point) - parseFloat(b.movie_point)))
    }
  }
*/
  return (
    <Layout>
      <div className="outer-pagi">
        <PaginationComponent innerclass="pagination"/>
      </div>
      {dataItems ? dataItems
        .slice((current - 1) * inpage, current * inpage)
        .map((data, i) => 
        <MovieCard key={i} id={i} movie={data} />
      ) : null }
      <div className="outer-pagi"><PaginationComponent innerclass="pagination bottom" /></div>
    </Layout>
  );
}