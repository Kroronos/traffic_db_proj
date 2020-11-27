import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';

import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import App from './App';
import ExplorationPage from './components/pages/ExplorationPage';
import SourcesPage from './components/pages/SourcesPage';

import { Navbar } from './components/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <Router>
    <div>
      <Navbar></Navbar>
      <Route exact path='/' component={App} />
      <Route path="/explore" component={ExplorationPage} />
      <Route path="/sources" component={SourcesPage} />
  </div>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
