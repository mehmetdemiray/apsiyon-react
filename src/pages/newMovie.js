/**
 * PAGE: NEW
 * Route: #/new
 */
import React, { useState } from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {ADD_MOVIE} from './../redux/actions/types';

// MODULES
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Backdrop from '@material-ui/core/Backdrop';
import MuiAlert from '@material-ui/lab/Alert';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert, AlertTitle } from '@material-ui/lab';

// COMPONENTS
import Dialog from './../components/dialog';
import { Layout } from './../layout';

export const NewMovie = () => {
  const dispatch = useDispatch();

  // USEEFFECT
  const movies = useSelector(state => state.MOVIES.moviesList)
  
  // USESTATES
  const [error, setError] = useState(false);
  const [saved, setSaved] = useState(false);
  const [values, setValues] = useState({name: "", year: "", point: "", type: "", imdb: "", id: ""})
  const [loading, setLoading] = useState(false);
  const [imdbLink, setImdbLink] = useState('')
  const [imdbError, setImdbError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Gelen IMDB linkinin basit bir doğrulamasını yapar.
  const checkLink = (e) => {
    let splittedValue = e.target.value.split("/");

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
          getMovieFromImdb(splittedValue[0])
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

  // IMDB inputundan gelen değişkenlerle componenti güncellere
  const handleChangeLink = (e) => {
    checkLink(e)
    setImdbLink(e.target.value)
  }
  // Inputlardan gelen değerlerle componenti günceller.
  const handleChange = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]: value})
  }

  // Child componentten dönen sonuca göre componenti günceller.
  const modalResult = (result) => {
    setSaved(result)
  }
  // Getting Movie From IMDB
  const getMovieFromImdb = (id) => {
    setLoading(true)
    axios.get('http://www.omdbapi.com/?i='+id+'&apikey=d3393eb4')
      .then(res => {
        if (res.data.Response === "False") {
          setImdbError(true)
          setLoading(false)
        } else {
          setImdbError(false)
          setValues({name: res.data.Title, year: parseInt(res.data.Year.substring(0,4)), point: Math.round(res.data.imdbRating), type: changeType(res.data.Type), id: res.data.imdbID})
          setLoading(false)
        }
      })
  }

  // IMDB apisinden gelen type'ları türkçeye döndürür.
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

  // Toast alert basar.
  function AlertX(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  // Son kontrol yapıp global state'e yollar.
  const handleSend = () => {
    if (searchInAray() && validations()) {
      setSaved(true)
      setValues({name: "", year: "", point: "", type: "", imdb: "", id: ""})
      setImdbLink('');
      dispatch({type: ADD_MOVIE, payload: {"movie_name": values.name, "movie_year": values.year, "movie_point": parseInt(values.point), "movie_type":values.type, "movie_isVoted": "false", "movie_id": values.id}})
    }
  }

  /**
   * Aynı isimli film tespit eder. true/false döndürür.
   */
  const searchInAray = () => {
    let obj = movies.find(o => o.movie_name === values.name);
    if (obj === undefined ) {
      setError(false)
      return true
    } else {
      setError(true)
      setErrorMessage("Bu film daha önce eklenmiş")
      return false
    }
  }

  /**
   * Formu validate eder. Hata döndürür.
   */
  const validations = () => {
    if (!values.name || !values.type || !values.point || !values.year || !values.type) {
      setError(true)
      setErrorMessage("Hiçbir alan boş bırakılamaz!")
      return false;
    } else {
      setError(false)
      return(true)
    }
  }

  return (
    <Layout>
      <Snackbar open={error} autoHideDuration={6000} onClose={() => {
        setError(false)
        setErrorMessage("")
      }}>
        <AlertX onClose={() => {
          setError(false)
          setErrorMessage("")
        }} severity="error">
          {errorMessage}
        </AlertX>
      </Snackbar>

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
            value={imdbLink}
          />
          <Alert variant="outlined" severity="info" className="alert">
            <AlertTitle>Bilgi</AlertTitle>
            <p>- IMDB Linki ya da TitleId'si yapıştırılıp otomatik film eklenebilir.</p>
            <p>- IMDB'den film çekildikten sonra manuel düzenleme yapılabilir</p>
            <p>- IMDB linki ya da id'si girilmeden manuel giriş yapılabilir</p>
            <p>- Aynı isimli film girişine izin vermez.</p>
            <p>- Aşağıdaki formun tamamının dolu olması gerekir.</p>
          </Alert>
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
          <Backdrop open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
      </form>
      <Dialog type="success" saved={saved} title="Kaydedildi" description="Film ekleme işlemi başarılı" modalResult={modalResult} />
    </Layout>
  );
}