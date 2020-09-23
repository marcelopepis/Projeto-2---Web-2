import React, { Component } from 'react';
import './Login.css';

import logo from '../../assets/logo_pokedex.png';

export default class Login extends Component {
  render() {
    return (
      <div className="containerLogin">
      <img src={logo} alt="PokeDex"/>
      <div className="content">
        <p>
          Pokedex Online!
        </p>
        <form>
          <label htmlFor="email">E-MAIL *</label>
          <input type="email" id="email" placeholder="seu e-mail"/>
          <label htmlFor="password">Password *</label>
          <input type="password" id="password" placeholder="sua senha"/>

          <button className="btn" type="submit">Entrar</button>
          <button className="btn" type="submit">Cadastrar</button>
        </form>

      </div>
    </div>
    )
  }
}