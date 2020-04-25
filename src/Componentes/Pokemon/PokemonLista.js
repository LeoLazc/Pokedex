import React, { Component } from "react";
import axios from "axios";
import PokemonTarjeta from "./PokemonTarjeta";

export default class PokemonLista extends Component{

  state = {
    url: "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0",
    pokemon: null
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({pokemon: res.data["results"]});
  }

  render(){
    return (
      <React.Fragment>
        {this.state.pokemon ? (
          <div>
          {this.state.pokemon.map(pokemon => (
            <PokemonTarjeta
              key = {pokemon.name}
              name = {pokemon.name}
              url = {pokemon.url}
             />
          ))}
          </div>
        ) : (
          <div><h3>Rastreando Pokemones</h3></div>
        )}
      </React.Fragment>
    );
  }
}
