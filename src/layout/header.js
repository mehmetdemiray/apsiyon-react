import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SORT, TYPE} from './../redux/actions/types';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterListIcon from '@material-ui/icons/FilterList';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Add from '@material-ui/icons/Add';
import Container from '@material-ui/core/Container';
import history from './../history';

export const Header = () => {
  const [page] = useState(history.location.hash)
  const [pathname] = useState('#/new')
  const [typeOpen, setTypeOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const [sort, setSort] = useState(null);
  const [type, setType] = useState(null);
  const device = useSelector(state => state.SETTINGS.deviceType);

  const sortTypes = useSelector(state => state.MOVIES.sortTypes);
  const sortRedux = useSelector(state => state.MOVIES.sort);
  const movieTypes = useSelector(state => state.MOVIES.movieTypes);
  const typeRedux = useSelector(state => state.MOVIES.type);

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setTypeOpen(false);
    dispatch({type: TYPE, payload: e.target.value})
  }

  const sortMenu = (
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
  )

  const typeMenu = (
    <Popover
      id="type-menu"
      open={typeOpen}
      anchorEl={type}
      onClose={() => {setTypeOpen(false)}}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <RadioGroup aria-label="gender" name="type" value={typeRedux} className="header-sorts" onChange={handleChange}>
        {movieTypes.map((movieType, i)=>
          <FormControlLabel key={i} labelPlacement="start" value={movieType} control={<Radio />} label={movieType} />
        )}
      </RadioGroup>

    </Popover>
  )

  return (
    <header>
      <AppBar position="static" className="navigation">
        <Container maxWidth="lg">
          <Toolbar className="header-content">
            {page !== pathname ? 
              <div className="h-left">
                {device !== "mobile" ?
                  <React.Fragment>
                    <Button variant="contained" color="primary" endIcon={!typeOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />} aria-controls="type-menu" aria-haspopup="true" onClick={(e) => {
                      setType(e.currentTarget)
                      setTypeOpen(!typeOpen)
                    }}>
                      TÜRLER
                    </Button>

                      {typeMenu}
    
                    <Button variant="contained" color="primary" endIcon={!sortOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />} aria-controls="sort-menu" aria-haspopup="true" onClick={(e) => {
                      setSort(e.currentTarget)
                      setSortOpen(!sortOpen)
                    }}>
                      SIRALA
                    </Button>
                    {sortMenu}
                  </React.Fragment> :
                  <IconButton><FilterListIcon /></IconButton>
                }
              </div> : 
              device !== "mobile" ?
                <Button variant="contained" color="primary" startIcon={<ChevronLeft />} component={Link} to="/">Listeye Dön</Button>:
                <IconButton component={Link} to="/"><ChevronLeft /></IconButton>
            }

            <Typography variant="h6" className="logo-text">Case Study</Typography>
            {device !== "mobile" ?
              <Button disabled={page !== pathname ? false : true} variant="contained" color="primary" startIcon={<Add />} component={Link} to="/new">Yeni Kayıt</Button>:
              <IconButton disabled={page !== pathname ? false : true} component={Link} to="/new"><Add /></IconButton>
            }
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
}