/**
 * SORT BUTTON
 * Sıralama Componenti
 */

import React, {useState} from 'react';
import {SortMovies} from '../redux/actions/sortingAction';

// MODULES
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

// ICONS
import CheckIcon from '@material-ui/icons/Check';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';


import {useSelector, useDispatch} from 'react-redux';

export const SortButton = () => {
  const sortTypes = useSelector(state => state.MOVIES.sortTypes);
  const sorted = useSelector(state => state.MOVIES.sorts);
  const movies = useSelector(state => state.MOVIES.moviesList);

  const [sortOpen, setSortOpen] = useState(false)
  const [sort, setSort] = useState(null);

  const dispatch = useDispatch()
  return (
    <React.Fragment>
      <Button variant="contained" color="primary" endIcon={!sortOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />} aria-controls="sort-menu" aria-haspopup="true" onClick={(e) => {
        setSort(e.currentTarget)
        setSortOpen(!sortOpen)
      }}>
        SIRALA
      </Button>
      <Menu
        id="sort-menu"
        anchorEl={sort}
        keepMounted
        open={Boolean(sort)}
        onClose={() => {
          setSort(null)
          setSortOpen(false)
        }}
      >
        {sortTypes.map((sort, i)=>
          <MenuItem key={i} onClick={() => {
            setSort(null) 
            setSortOpen(false)
            //dispatch({type: SORT, payload: sort})
            dispatch(SortMovies(sort, movies))
          }}>{sort} {sorted === sort ? <CheckIcon /> : null}</MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
}