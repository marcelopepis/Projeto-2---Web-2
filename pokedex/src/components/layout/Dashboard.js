import React, { Component } from 'react'
import PokemonList from '../pokemon/PokemonList'

//export default class Dashboard extends Component {
function Dashboard({ history }) {  
  //render() {
    const user = localStorage.getItem('user');
    if(user){
      return (
        <div className="row">
          <div className="col">
            <PokemonList></PokemonList>
          </div>
          
        </div>
      )
    }else{
      history.push('/');
    }
    
  //}
}

export default Dashboard;
