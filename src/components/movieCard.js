import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {INCREASE_POINT, DECREASE_POINT, DELETE_MEDIA} from './../redux/actions/types'

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import StarIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Dialog from './../components/dialog';

export const MovieCard = (props) => {
  const device = useSelector(state => state.SETTINGS.deviceType)
  const movies = useSelector(state => state.MOVIES.moviesList)

  const dispatch = useDispatch()
  const [isHover, setIsHover] = useState(false)
  const [index, setIndex] = useState()
  const [deleteReq, setDeleteReq] = useState(false)
  
  const current = useSelector(state => state.SETTINGS.currentPage)

  useEffect(() => {
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].movie_name === props.movie.movie_name) {
        setIndex(i)
      }
    }
  }, [current, movies, props])

  const upVote = () => {
    dispatch({type: INCREASE_POINT, payload: index})
  }

  const downVote = () => {
    dispatch({type: DECREASE_POINT, payload: index})
  }

  const handleDelete = () => {
    setDeleteReq(true)
  }

  const modalResult = (result) => {
    setDeleteReq(false)
    if (result) {
      dispatch({type: DELETE_MEDIA, payload: index})
    }
  }

  return (
    <Card variant="outlined" className="movies">
      <CardContent className="movie-card">
        <Grid container spacing={3} className="grid">
            <Grid item xs={device === "mobile" ? 12 : 8} className="mc-first">
              <Typography variant="h5" onClick={handleDelete} className="movie-name" onMouseOut={() => setIsHover(false)} onMouseOver={() => setIsHover(true)} color="textSecondary">
                {props.movie.movie_name}({props.movie.movie_year}) {device === "mobile" ? <DeleteOutlineOutlinedIcon /> : isHover ? <DeleteOutlineOutlinedIcon /> : null}
              </Typography>
              <Typography variant="h6">
                <strong>Tür: </strong>{props.movie.movie_type}
              </Typography>
            </Grid>
            <Grid item xs={device === "mobile" ? 6 : 3} className="mc-second">
              <StarIcon className="movie-star" />
              <Typography variant="body1">
                {props.movie.movie_point}
              </Typography>
            </Grid>
            <Grid item xs={device === "mobile" ? 6 : 1} className="mc-third">
              <div className="votes">
                <IconButton size="small" onClick={upVote}>
                  <ThumbUpIcon className="up-vote" fontSize="inherit"/>
                </IconButton>
                <IconButton size="small" onClick={downVote}>
                  <ThumbDownIcon className="down-vote" color="error" fontSize="inherit"/>
                </IconButton>
              </div>
            </Grid>
        </Grid>
      </CardContent>
      <Dialog type="error" delete={deleteReq} title="Sil" description={`${props.movie.movie_name} Silmek istediğinize emin misiniz?`} modalResult={modalResult}/>
    </Card>
  );
}