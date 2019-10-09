import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './comps/Navbar';
import FavoritesContainer from './comps/FavoritesContainer';
import Error404 from './comps/Error404';
import MainContainer from './comps/MainContainer';
import Modal from './comps/Modal';

function App() {

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Modal />
        <Switch>
          <Route exact path="/" component={MainContainer} />
          <Route path="/home" component={MainContainer} />
          <Route path="/favorites" component={FavoritesContainer} />
          <Route component={Error404} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
