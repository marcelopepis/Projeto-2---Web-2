import React, { Component } from 'react'
import axios from 'axios';



const type_colors = {
  bug: 'B1C12e',
  dark: '4f3a2d',
  dragon: '755edf',
  eletric: 'fcbc17',
  fairy: 'f4b1f4',
  fighting: '823551d',
  fire: 'e73B0c',
  flying: 'a3b3f7',
  ghost: '6060b2',
  grass: '74c236',
  ground: 'd3b357',
  ice: 'a3e7fd',
  normal: 'c8c4bc',
  poison: '934594',
  psychic: 'ed4882',
  rock: 'b9a156',
  steel: 'b5b5c3',
  water: '3295f6'
};



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
    eggGroups: "",
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
      
      const femaleRate = res.data['gender_rate'];
      const genderRationFemale = 12.5 * femaleRate;

      const genderRationMale = 12.5 * (8 - femaleRate);

      const catchRate = Math.round((100/255) * res.data['capture_rate']);

      const eggGroups = res.data['egg_groups'].map(group => {
        return group.name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
      }).join(", ");


      const hatchSteps = (255 * (res.data['hatch_counter']) + 1);

      this.setState({
        description,
        genderRationFemale,
        genderRationMale,
        catchRate,
        eggGroups,
        hatchSteps
      })

    });

    this.setState({
      imageURL,
      pokemonIndex,
      name,
      types,
      stats: {
        hp,
        attack,
        defense,
        specialAttack,
        specialDefense,
      },
      height,
      weight,
      abilities,
      evs
    });    

  }
  render() {
    return (
      <div className="col">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-5">
                <h5>
                  {this.state.pokemonIndex}
                </h5>
              </div>
              <div className="col-7">
                <div className="float-right">
                  {this.state.types.map(type => (
                    <span key={type} className = "badge badge-primary badge-pill mr-1" style = {{backgroundColor: `#${type_colors[type]}`, color: "white"}}>
                      
                      {type.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row align-items-center" >
              <div className="col-md-3">
                <img src={this.state.imageURL} className="card-img-top rounded mx-auto mt-2"/>
              </div>
              <div className="col-md-9">
                <h4 className = "mx-auto" >
                  {this.state.name.toLowerCase().split().map(s => s.charAt(0).toLocaleUpperCase() + s.substring(1)).join(' ')}
                </h4>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">HP</div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div className="progress-bar" role="progressBar" style={{width: `${this.state.stats.hp}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        <small>{this.state.stats.hp}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">Ataque</div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div className="progress-bar" role="progressBar" style={{width: `${this.state.stats.attack}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        <small>{this.state.stats.attack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">Defesa</div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div className="progress-bar" role="progressBar" style={{width: `${this.state.stats.defense}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        <small>{this.state.stats.defense}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">Ataque Especial</div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div className="progress-bar" role="progressBar" style={{width: `${this.state.stats.specialAttack}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        <small>{this.state.stats.specialAttack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">Defesa Especial</div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div className="progress-bar" role="progressBar" style={{width: `${this.state.stats.specialDefense}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        <small>{this.state.stats.specialDefense}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-1">
                <div className="col">
                  <p className="p2">{this.state.description}</p>
                </div>
              </div>
            </div>
          </div>
          <hr/>
          <div className="card-body">
            <h5 className="card-title text-center">Profile</h5>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                  <h6 className="float-right">Altura:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6 className="float-left">
                      {this.state.height * 10} cm
                    </h6>
                  </div>
                </div>                
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                  <h6 className="float-right">Peso:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6 className="float-left">
                      {this.state.weight} kl
                    </h6>
                  </div>
                </div>                
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                  <h6 className="float-right">Catch Rate:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6 className="float-left">
                      {this.state.catchRate}
                    </h6>
                  </div>
                </div>                
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                  <h6 className="float-right">Gender Ratio:</h6>
                  </div>
                  <div className="col-md-6">
                    <div className="progress">
                      <div className="progress-bar" style={{
                        width: `${this.state.genderRationFemale}%`,
                        backgroundColor: '#c2185b'
                      }}
                      aria-valuenow= "15"
                      aria-valuemin= "0"
                      aria-valuemax= "100">
                      <small>{this.state.genderRationFemale}%</small>
                      </div>
                      <div className="progress-bar" style={{
                        width: `${this.state.genderRationMale}%`,
                        backgroundColor: '#1976d2'
                      }}
                      aria-valuenow= "30"
                      aria-valuemin= "0"
                      aria-valuemax= "100">
                      <small>{this.state.genderRationMale}%</small>
                      </div>
                    </div>
                  </div> 
                </div>                 
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="float-right">Egg Group</h6>
                  </div>
                  <div className="col-md-6">
                    <h6 className="float-right">{this.state.eggGroups}</h6>
                  </div>
                </div>
            </div>                
            </div>      
            </div>
          </div>
        </div>
    )
  }
}
