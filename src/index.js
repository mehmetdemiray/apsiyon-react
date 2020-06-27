import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import "@babel/polyfill";

import React from 'react';
import {render} from 'react-dom';
import App from './App';
import { Provider } from "react-redux"; // React Redux
import store from "./redux/store";      // Redux Store
import './assets/scss/styles.scss';

const target = document.querySelector('#root')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  target
)