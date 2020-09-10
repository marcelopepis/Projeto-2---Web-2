import React, { Component } from 'react'
import styled from "styled-components"
import {Link} from 'react-router-dom';

const Sprite = styled.img`
  width: 5em;
  height: 5em;
`;

const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  background: #f0f0f0;
  -moz-user-select: none;
  -website-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

const StyleLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus;
  &:hover;
  &:visited;
  &:link;
  &:active {
    text-decoration: none;
  };
`;

export default class PokemonCard extends Component {
  state = {
    name: '',
    imageURL: '',
    pokemonIndex: '',
    height: '',
    imageLoading: true,
    toManyRequests: false
  };

  componentDidMount () {
    const name = this.props.name;
    const url = this.props.url;
    const pokemonIndex = url.split("/")[url.split('/').length - 2];
    const imageURL = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
    this.setState({name: name, imageURL: imageURL, pokemonIndex: pokemonIndex});
  }



  render() {
    

    return (
      <div className="col-md3 col-sm-6 mb-5">
        <StyleLink to={`pokemon/${this.state.pokemonIndex}`}>
          <Card className= "card">
            <h5 className="card-header" style={{background: "#c04848"}} >{this.state.pokemonIndex}</h5>
            <Sprite className="card-img-top rounded mx-auto mt-2"
            onLoad={() => this.setState({imageLoading: false})}
            onError={() => this.setState({toManyRequests: true})}
            
            src= {this.state.imageURL}>

            </Sprite>
            <div className="card-body mx-auto">
              <h6 className="card-title">
                {this.state.name.toLowerCase().split(' ').map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)).join(' ')}
              </h6>
            </div>  
          </Card>
        </StyleLink>
      </div>

    )
  }
}
