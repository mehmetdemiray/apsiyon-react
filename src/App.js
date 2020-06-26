import React from 'react';
import { Route, Switch, HashRouter } from "react-router-dom";

import { Home } from './pages/home';
import { NewMovie } from './pages/newMovie';
import { Err404 } from './pages/404';

const App = () => {

  return (
    <React.Fragment>
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Home} /> {/*}Home Page{*/}
          <Route path="/new" exact component={NewMovie} /> {/*}Adding New Movir Page{*/}
          <Route component={Err404} /> {/*}404{*/}
        </Switch>
      </HashRouter>
    </React.Fragment>
  );
}

export default App;

