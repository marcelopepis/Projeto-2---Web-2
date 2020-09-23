import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';

import Dashboard from './components/layout/Dashboard';
import Login from './components/layout/Login';
import Pokemon from './components/pokemon/Pokemon';

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/dashboard" exact component={Dashboard}/>
        <Route path="/pokemon/:pokemonIndex" component={Pokemon}/>
      </Switch>
    </BrowserRouter>
  )
}