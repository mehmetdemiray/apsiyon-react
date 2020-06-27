import React from 'react';
import { Route, Switch, HashRouter } from "react-router-dom";

import { Home } from './pages/home';
import { Err404 } from './pages/404';
import { NewMovie } from './pages/newMovie';

export default function App() {
  return (
    <React.Fragment>
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Home} /> {/*}Home Page{*/}
          <Route path="/new" exact component={NewMovie} /> {/*}Adding New MoviwPage{*/}
          <Route component={Err404} /> {/*}404{*/}
        </Switch>
      </HashRouter>
    </React.Fragment>
  );
}

