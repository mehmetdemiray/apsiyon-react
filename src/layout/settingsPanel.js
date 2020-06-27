import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {THEME_COLOR} from './../redux/actions/types'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import CardContent from '@material-ui/core/CardContent';
import SettingsIcon from '@material-ui/icons/Settings';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CheckIcon from '@material-ui/icons/Check';

export const Settings = () => {
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useDispatch();

  const colors = useSelector(state => state.SETTINGS.themeTypes)
  const currentColor = useSelector(state => state.SETTINGS.themeColor)

  return (
    <div className="settings-drawer">
        <React.Fragment>
            <Card className={isOpened ? 'opened settings-panel' : 'closed settings-panel'} variant="outlined">
              <CardContent>
                <Button className="settings-button" variant="outlined"onClick={() => setIsOpened(!isOpened)}>{isOpened ? <ChevronRightIcon color="error" /> : <SettingsIcon className="rotating" color="primary" />}</Button>
                <Typography className="logo-text">Tema Rengi Seçiniz</Typography>
                <div className="select-group">
                  {colors.map((color, i) =>
                    <div key={i} className={color +' selector'} onClick={() => dispatch({type: THEME_COLOR, payload: color})}>
                      {color === currentColor ? <CheckIcon /> : null}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

        </React.Fragment>
    </div>
  );
}