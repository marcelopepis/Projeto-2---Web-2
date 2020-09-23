import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Dashboard from './components/layout/Dashboard';
import Login from './components/layout/Login';
import Pokemon from './components/pokemon/Pokemon';
import Routes from './routes';

function App() {
  return (
      <div className="App">
        <NavBar></NavBar>
        <div className="container">
          <Routes />
        </div>
      </div>
  );
}

export default App;
