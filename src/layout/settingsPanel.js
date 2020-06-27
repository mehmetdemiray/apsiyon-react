/**
 * SETTINGSPANEL
 * Sağ taraftan açılan kontrol menüsü.
 */

import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {THEME_COLOR, INPAGE} from './../redux/actions/types'

// MODULES
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

// ICONS
import CheckIcon from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export const Settings = () => {
  const dispatch = useDispatch();  

  // USESTATE 
  const [isOpened, setIsOpened] = useState(false);  // Aç / Kapa 
  const [value, setValue] = React.useState(30);
           
  // USESELECTOR
  const colors = useSelector(state => state.SETTINGS.themeTypes)        // store'dan renk seçeneklerini alır.
  const inPage = useSelector(state => state.SETTINGS.inPage)            // store'dan sayfada gösterilecek sayıyı alır.
  const movies = useSelector(state => state.MOVIES.moviesList)          // store'dan film listesini alır. (Uzunluk için) gereksiz!!
  const currentColor = useSelector(state => state.SETTINGS.themeColor)  // store'dan default rengi alır.
  
  // Slider'dan gelen değişiklik store'a!
  const handleInPage = (event, newValue) => {
    setValue(newValue)
    if (value !== newValue) {
      dispatch({type: INPAGE, payload: newValue})
    }
  }
  
  return (
    <div className="settings-drawer">
        <React.Fragment>
            <Card className={isOpened ? 'opened settings-panel' : 'closed settings-panel'} variant="outlined">
              <CardContent>
                <Button className="settings-button" variant="outlined"onClick={() => setIsOpened(!isOpened)}>{isOpened ? <ChevronRightIcon color="error" /> : <SettingsIcon className="rotating" color="primary" />}</Button>
                <Typography className="logo-text">Tema Rengi Seรงiniz</Typography>
                <div className="select-group">
                  {colors.map((color, i) =>
                    <div key={i} className={color +' selector'} onClick={() => dispatch({type: THEME_COLOR, payload: color})}>
                      {color === currentColor ? <CheckIcon /> : null}
                    </div>
                  )}
                </div>
                <br />
                <Typography className="logo-text">Sayfada gösterilecek film sayısı</Typography>
                <Slider
                  value={inPage}
                  valueLabelDisplay="auto"
                  step={1}
                  min={1}
                  onChange={handleInPage}
                  max={movies.length}
                />
              </CardContent>
            </Card>

        </React.Fragment>
    </div>
  );
}