import React, {useState} from 'react';
import {TYPE} from './../redux/actions/types';
import Popover from '@material-ui/core/Popover';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {useSelector, useDispatch} from 'react-redux';

export const TypesButton = () => {
  const dispatch = useDispatch()
  const movieTypes = useSelector(state => state.MOVIES.movieTypes);
  const typeRedux = useSelector(state => state.MOVIES.type);

  const [typeOpen, setTypeOpen] = useState(false)
  const [type, setType] = useState(null);

  const handleChange = (e) => {
    setTypeOpen(false);
    dispatch({type: TYPE, payload: e.target.value})
  }

  return (
    <React.Fragment>
      <Button variant="contained" color="primary" endIcon={!typeOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />} aria-controls="type-menu" aria-haspopup="true" onClick={(e) => {
        setType(e.currentTarget)
        setTypeOpen(!typeOpen)
      }}>
        TÜRLER
      </Button>

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
    </React.Fragment>
  );
}