import React, {useState} from 'react';
import {SORT} from './../redux/actions/types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {useSelector, useDispatch} from 'react-redux';

export const SortButton = (props) => {
  const sortTypes = useSelector(state => state.MOVIES.sortTypes);
  const sortRedux = useSelector(state => state.MOVIES.sort);

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
            dispatch({type: SORT, payload: sort})
          }}>{sort}</MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
}