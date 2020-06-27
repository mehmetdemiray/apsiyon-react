/**
 * HEADER
 */

import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

// MODULES
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

// ICONS
import Add from '@material-ui/icons/Add';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

// COMPONENTS
import {TypesButton} from './../components/typesButton';
import {SortButton} from './../components/sortButton';

export const Header = () => {
  const device = useSelector(state => state.SETTINGS.deviceType);
  const [page] = useState(window.location.hash) // Path değişimlerini gözlemleyip tetiklettirmek için.
  const [pathname] = useState('#/new')          // New sayfasının path'ini karşılaştırmak JSX'de kolay olsun diye.  

  return (
    <header>
      <AppBar position="fixed" className="navigation">
        <Container maxWidth="lg">
          <Toolbar className="header-content">
              {device !== "mobile" && page !== pathname ?
                <div className="h-left">     
                  <React.Fragment>
                    <TypesButton />
                    <SortButton />
                  </React.Fragment>
                </div> : ""
              }
              <Typography variant="h6" className={device === "mobile" ? "logo-text relative" : "logo-text"}>{page === pathname ? "Yeni Film Ekleme" : "Film Listesi"}</Typography>
              {page !== pathname ? 
                <Button disabled={page !== pathname ? false : true} className={device === "mobile" && page === pathname ? "none" : ""} variant="contained" color="primary" startIcon={<Add />} component={Link} to="/new">Yeni Kayıt</Button> : 
                <Button variant="contained" color="primary" startIcon={<ChevronLeft />} component={Link} to="/">Listeye Dön</Button>
              }
          </Toolbar>
        </Container>
        {device === "mobile" ?
          <Container>
              <div className="mobile-header">
                <TypesButton size="small"/>
                <SortButton size="small"/>
              </div>
          </Container> : null
        }
      </AppBar>
    </header>
  );
}