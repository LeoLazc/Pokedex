import React, { Component } from "react";
import PokemonLista from "../Pokemon/PokemonLista";

export default class Dashboard extends Component {
  render(){
    return (
      <div className="row">
        <div className="col scrollbar" id="style-3">
          <div className="force-overflow">
            <PokemonLista />
          </div>
        </div>
      </div>
    );
  }
}
