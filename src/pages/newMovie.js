import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {ADD_MOVIE} from './../redux/actions/types';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SaveIcon from '@material-ui/icons/Save';
import { Layout } from './../layout';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

export const NewMovie = () => {
  const dispatch = useDispatch();
  const [imdbError, setImdbError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({name: "", year: "", point: "", type: ""})

  const checkLink = (e) => {
    let splittedValue = e.target.value.split("/");

    // Some Validations
    if (e.target.value.length !== 0) {
      if (splittedValue[4]) {
        if (splittedValue[4].substring(0,2) === "tt") {
          getMovieFromImdb(splittedValue[4])
          return setImdbError(false)
        } else {
          return setImdbError(true)
        }
      } else if (splittedValue[0]) {
        if (splittedValue[0].substring(0,2) === "tt") {
          getMovieFromImdb(splittedValue[4])
          return setImdbError(false)
        } else {
          return setImdbError(true)
        }
      } else {
        return setImdbError(true)
      }
    } else {
      return setImdbError(false)
    }
  }

  const handleChangeLink = (e) => {
    checkLink(e)
  }
  // Handle Input Changes
  const handleChange = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]: value})
  }

  // Getting Movie From IMDB
  const getMovieFromImdb = (id) => {
    setLoading(true)
    axios.get('http://www.omdbapi.com/?i='+id+'&apikey=d3393eb4')
      .then(res => {
        console.log(res)
        if (res.data.Response === "False") {
          setImdbError(true)
        } else {
          setImdbError(false)
          setValues({name: res.data.Title, year: res.data.Year.substring(0,4), point: Math.round(res.data.imdbRating), type: changeType(res.data.Type)})
        }
      })
    setLoading(false)
  }

  const changeType = (type) => {
    switch (type) {
      case "movie":
        return "Film"
      case "series":
        return "Dizi"
      case "episode":
        return "Episode"
      default:
        return "Film"
    }
  }

  const handleSend = () => {
    console.log(values)
    dispatch({type: ADD_MOVIE, payload: {"movie_name": values.name, "movie_year": values.year, "movie_point": values.point, "movie_type":values.type, "movie_isVoted": "false" }})
  }

  return (
    <Layout>
      <form className="new-movie-form">
          <TextField
            id="outlined-helperText"
            error={imdbError}
            label="IMDB Linki / IMDB ID'si"
            helperText={imdbError ? "Girilen link ya da id hatalı" : null}
            variant="outlined"
            onChange={handleChangeLink}
            fullWidth
            disabled={loading}
          />
          <Grid container spacing={3} style={{marginTop: "30px"}}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
            <RadioGroup aria-label="gender" name="type" value={values.type} onChange={handleChange} row={true}>
              <FormControlLabel value="Film" control={<Radio />} label="Film" />
              <FormControlLabel value="Dizi" control={<Radio />} label="Dizi" />
              <FormControlLabel value="Episode" control={<Radio />} label="Episode" />
            </RadioGroup>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField value={values.name} name="name" onChange={handleChange} label="Film/Dizi Adı" variant="outlined" fullWidth></TextField>
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <TextField value={values.year} name="year" onChange={handleChange} label="Yıl" variant="outlined" fullWidth></TextField>
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <TextField value={values.point} name="point" onChange={handleChange} label="Puan" variant="outlined" fullWidth></TextField>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                fullWidth
                onClick={handleSend}
              >
                Kaydet
              </Button>
            </Grid>
          </Grid>
      </form>
    </Layout>
  );
}