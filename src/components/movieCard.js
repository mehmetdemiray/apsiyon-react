import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import StarIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';

export const MovieCard = (props) => {
  const [isHover, setIsHover] = useState(false)
  return (
    <Card variant="outlined" className="movies">
      <CardContent className="movie-card">
      <Grid container spacing={3} className="grid">
          <Grid item md={4} sm={12} xs={12} className="mc-first">
            <Typography variant="h5" className="movie-name" onMouseOut={() => setIsHover(false)} onMouseOver={() => setIsHover(true)} color="textSecondary">
              {props.movie.movie_name}({props.movie.movie_year}) {isHover ? <DeleteOutlineOutlinedIcon /> : null}
            </Typography>
          </Grid>
          <Grid item md={4} sm={6} xs={6} className="mc-second">
            <Typography variant="h5">
              <StarIcon className="movie-start" />{props.movie.movie_point}
            </Typography>
          </Grid>
          <Grid item md={4} sm={6} xs={6} className="mc-third">
            <Typography color="textSecondary">
              adjective
            </Typography>
          </Grid>
      </Grid>



      </CardContent>
    </Card>
  );
}