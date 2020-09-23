import React, { Component, useState } from 'react';
import './Login.css';
import api from '../../services/api';

import logo from '../../assets/logo_pokedex.png';



function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {

    event.preventDefault();
    
    const response = await api.post('/sessions', {
      email,
      password
    });
    const { _id } = response.data;

    localStorage.setItem('user', _id);

    history.push('/dashboard');

  }

  async function userLogin(event) {
    event.preventDefault();
    console.log(email);
    console.log(password);
    const response = await api.get(`/sessions?email=${email}&password=${password}`);

    const { _id } = response.data

    console.log(response.data);

    if(response.data._id) {
      localStorage.setItem('user', _id);
      history.push('/dashboard');
    }else {
      const {message} = response.data
      console.log(message);
    }

  }
  

  return (
    <div className="containerLogin">
      <img src={logo} alt="PokeDex"/>
      <div className="content">
        <p>
          <strong>Pokedex Online!</strong>
        </p>
        <form onSubmit={userLogin}>
          <label htmlFor="email">E-MAIL *</label>
          <input type="email" id="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="seu e-mail"/>
          <label htmlFor="password">Password *</label>
          <input type="password" id="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="sua senha"/>

          <button className="btn" type="submit">Entrar</button>
          <button className="btn" onClick={handleSubmit} type="submit">Cadastrar</button>
        </form>

      </div>
    </div>
  );
};

export default Login;