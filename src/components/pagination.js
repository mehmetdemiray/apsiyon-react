/**
 * PAGINATION
 * Çoklu amaçlar için kullanılabilir pagination componenti
 */

import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {CURRENT_PAGE, TOTAL_PAGE} from './../redux/actions/types';

// MODULES
import Pagination from '@material-ui/lab/Pagination';

/**
 * Kapsayıcı komponentinden veri alır.
 * Store'u günceller.
 */
export const PaginationComponent = (props) => {
  const dispatch = useDispatch()
  const total = useSelector(state => state.SETTINGS.totalPage)
  const movies = useSelector(state => state.MOVIES.moviesList)
  const inpage = useSelector(state => state.SETTINGS.inPage)
  const current = useSelector(state => state.SETTINGS.currentPage)

  // dispatch, inpage ve movies.length'e göre tetiklenir.
  // toplam sayfa hesaplaması yapar. store'u günceller
  useEffect(() => {
    dispatch({type:TOTAL_PAGE, payload:Math.ceil(movies.length/inpage)})
  }, [dispatch, inpage, movies.length])

  // sayfa değişimini CURRENT_PAGE olarak store'a iletir.
  const handleChange = (e, value) => {
    dispatch({type: CURRENT_PAGE, payload: value})
  }

  // Sayfa sayısı 1'den küçükse göstermez.
  return (
    total > 1 ?
      <Pagination onChange={handleChange} className={props.innerclass} count={total} page={current} color="primary" /> : 
      null
  );
}