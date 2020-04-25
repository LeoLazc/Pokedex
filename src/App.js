import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./Componentes/Layout/NavBar"
import Pokemon from './Componentes/Pokemon/Pokemon';

export default class App extends Component {
  render(){
    return (
      <Router>
        <div className = "App">
          <NavBar />
          <Switch>
            <Route exact path="/:pokemonIndex" component={Pokemon}/>
          </Switch>
        </div>

      </Router>

    );
  }
}
