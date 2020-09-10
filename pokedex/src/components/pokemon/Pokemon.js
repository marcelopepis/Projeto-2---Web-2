import React, { Component } from 'react'
import axios from 'axios';

export default class Pokemon extends Component {
  state = {
    name: '',
    pokemonIndex: '',
    imageURL: '',
    types: [],
    description: '',
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      specialAttack: "",
      specialDefense: ""
    },
    height: "",
    weight: "",
    eggGroup: "",
    abilities: "",
    genderRationMale: "",
    genderRationFemale: "",
    evs: "",
    hatchSteps: "",
  };

  async componentDidMount() {
    const {pokemonIndex} = this.props.match.params;

    const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesURL = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    const pokemonRes = await axios.get(pokemonURL);

    const name = pokemonRes.data.name;
    const imageURL = pokemonRes.data.sprites.front_default;
    let {hp, attack, defense, speed, specialAttack, specialDefense} = '';

    pokemonRes.data.stats.map(stat => {
      switch(stat.stat.name) {
        case 'hp':
          hp = stat['base_stat'];
          break;
        case 'attack':
          attack = stat['base_stat'];
          break;
        case 'defense':
          defense = stat['base_stat'];
          break;
        case 'special-attack':
          specialAttack = stat['base_stat'];
          break;
        case 'special-defense':
          specialDefense = stat['base_stat'];
          break;
      }
    });

    //em centimetros
    const height = pokemonRes.data.height;
    //em kilos
    const weight = pokemonRes.data.weight;

    const types = pokemonRes.data.types.map(type => type.type.name);

    const abilities = pokemonRes.data.abilities.map(ability => {
      return ability.ability.name.toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    });

    const evs = pokemonRes.data.stats.filter(stat => {
      if (stat.effort > 0) {
        return true;
      }
      return false;
    }).map(stat => {
      return `${stat.effort} ${stat.stat.name}`.toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    }).join(', ');


    await axios.get(pokemonSpeciesURL).then(res => {
      let description = '';
      res.data.flavor_text_entries.some(flavor => {
        if(flavor.language.name === 'en'){
          description = flavor.flavor_text;
          return;
        }
      });
      


    });

    

  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
