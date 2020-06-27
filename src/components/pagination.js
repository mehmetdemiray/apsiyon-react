import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {CURRENT_PAGE, TOTAL_PAGE} from './../redux/actions/types';
import Pagination from '@material-ui/lab/Pagination';


export const PaginationComponent = (props) => {
  const dispatch = useDispatch()
  const inpage = useSelector(state => state.SETTINGS.inPage)
  const current = useSelector(state => state.SETTINGS.currentPage)
  const total = useSelector(state => state.SETTINGS.totalPage)
  const movies = useSelector(state => state.MOVIES.moviesList)

  useEffect(() => {
    dispatch({type:TOTAL_PAGE, payload:Math.ceil(movies.length/inpage)})
  }, [])

  const handleChange = (e, value) => {
    dispatch({type: CURRENT_PAGE, payload: value})
  }

  return (
    total > 1 ?
      <Pagination onChange={handleChange} className={props.innerclass} count={total} page={current} color="primary" /> : 
      null
  );
}