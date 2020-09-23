import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Dashboard from './components/layout/Dashboard';
import Login from './components/layout/Login';
import Pokemon from './components/pokemon/Pokemon';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar></NavBar>
        <div className="container">
          <Switch>
            <Route extac path="/" component={Login} />
            <Route extac path="/dashboard/" component={Dashboard}/>
            <Route extac path="/pokemon/:pokemonIndex" component={Pokemon}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
