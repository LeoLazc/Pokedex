import React, {Component} from "react";
import axios from 'axios';

const TYPE_COLORS = {
  bug: 'B1C12E',
  dark: '4F3A2D',
  dragon: '755EDF',
  electric: 'FCBC17',
  fairy: 'F4B1F4',
  fighting: '823551D',
  fire: 'E73B0C',
  flying: 'A3B3F7',
  ghost: '6060B2',
  grass: '74C236',
  ground: 'D3B357',
  ice: 'A3E7FD',
  normal: 'C8C4BC',
  poison: '934594',
  psychic: 'ED4882',
  rock: 'B9A156',
  steel: 'B5B5C3',
  water: '329SF6'
}

export default class Pokemon extends Component{
  state = {
    name: '',
    pokemonIndex: '',
    imageUrlFront: '',
    imageUrlShiny: '',
    types: [],
    description: '',
    stats: {
      hp: '',
      attack: '',
      defense: '',
      speed: '',
      specialAttack: '',
      specialDefense: ''
    },
    height: '',
    weight: '',
    eggGroup: '',
    abilities: '',
    genderRatioMale: '',
    genderRatioFemale: '',
    evs: '',
    hatchSteps: ''
  };

  async componentDidMount() {
    const {pokemonIndex} = this.props.match.params;
    //url para pokemones
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;
    //informacion del pokemones
    const pokemonRes = await axios.get(pokemonUrl);
    const name = pokemonRes.data.name;
    const imageUrlFront = `https://projectpokemon.org/images/normal-sprite/${name}.gif`;
    const imageUrlShiny = `https://projectpokemon.org/images/shiny-sprite/${name}.gif`;

    let {hp, attack, defense, speed, specialAttack, specialDefense} = '';
    pokemonRes.data.stats.map(stat => {
      switch(stat.stat.name){
        case 'hp': hp = stat['base_stat']; break;
        case 'attack': attack = stat['base_stat']; break;
        case 'defense': defense = stat['base_stat']; break;
        case 'speed': speed = stat['base_stat']; break;
        case 'special-attack': specialAttack = stat['base_stat']; break;
        case 'special-defense': specialDefense = stat['base_stat']; break;

      }
    });

    const height = Math.round((pokemonRes.data.height * 0.328084 + 0.0001) * 100) / 100;
    const weight = Math.round((pokemonRes.data.weight * 0.220462 + 0.1) * 100) / 100;
    let types = pokemonRes.data.types.map(type => type.type.name);
    const abilities = pokemonRes.data.abilities.map(ability => {
      return ability.ability.name.toLowerCase().split("-").map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(" ");
    });
    const evs = pokemonRes.data.stats.filter(stat =>{
      if (stat.effort > 0) {
        return true;
      }
      else{ return false; }
    }).map(stat =>{
      return `${stat.effort} ${stat.stat.name}`.toLowerCase().split("-").map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(" ");
    }).join(', ');

    await axios.get(pokemonSpeciesUrl).then(res =>{
      let description = '';
      res.data.flavor_text_entries.some(flavor =>{
        if (flavor.language.name === 'es') {
          description = flavor.flavor_text;
          return;
        }
      });
      const femaleRate = res.data['gender_rate'];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);
      const catchRate = Math.round((100/255) * res.data['capture_rate']);
      const eggGroup = res.data['egg_groups'].map(group =>{
        return group.name.toLowerCase().split("-").map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(" ");
      })
      .join(', ');
      const hatchSteps = 255 * (res.data['hatch_counter'] + 1);
      this.setState({
        description,
        genderRatioFemale,
        genderRatioMale,
        catchRate,
        eggGroup,
        hatchSteps
      });
    });


    this.setState({
      name,
      pokemonIndex,
      imageUrlFront,
      imageUrlShiny,
      types,
      stats:{
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense,
      },
      height,
      weight,
      abilities,
      evs
    });

  }

  render(){
    return(
      <div className="pokemones">
        <div className="container">
          <div className="card shadow pt-3">
            <div className="row mb-4">
              <div className="col-6" style={{textAlign: "center"}}>
                <h2>{this.state.name.toLowerCase().split(" ").map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(" ")}</h2>
                <div className="row">
                  <div className="col-6">
                    <img
                      src={this.state.imageUrlFront}
                      className=" rounded mx-auto mt-4 ml-3"
                    />
                    <p>Normal</p>
                  </div><div className="col-6">
                    <img
                      src={this.state.imageUrlShiny}
                      className=" rounded mx-auto mt-4 mr-3"
                    />
                    <p>Shiny</p>
                  </div>
                </div>
                <div className="row mt2 text-left">
                  <div className="col-12">
                    <p className="ml-5">{this.state.description}</p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                {this.state.types.map(type => (
                  <span
                    key={type}
                    className="badge badge-primary badge-pill ml-1 mt-3"
                    style={{
                      backgroundColor: `#${TYPE_COLORS[type]}`,
                      color: "white"
                    }}>
                    {type.toLowerCase().split(" ").map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(" ")}
                  </span>
                ))}
                <div className="row mt-5 aling-items-center">
                  <div className="col-3">Salud</div>
                  <div className="col-8 pt-1">
                    <div className="progress">
                      <div
                      className="progress-bar bg-dark"
                      role="progressBar"
                      style={{width: `${this.state.stats.hp}%`}}
                      aria-valuenow='25'
                      aria-valuemin='0'
                      aria-valuemax='100'
                      >
                      <small>{this.state.stats.hp}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-1 aling-items-center">
                  <div className="col-3">Ataque</div>
                  <div className="col-8 pt-1">
                    <div className="progress">
                      <div
                      className="progress-bar bg-dark"
                      role="progressBar"
                      style={{width: `${this.state.stats.attack}%`}}
                      aria-valuenow='25'
                      aria-valuemin='0'
                      aria-valuemax='100'
                      >
                      <small>{this.state.stats.attack}</small>
                      </div>
                    </div>
                  </div>
                </div><div className="row mt-1 aling-items-center">
                  <div className="col-3">Defensa</div>
                  <div className="col-8 pt-1">
                    <div className="progress">
                      <div
                      className="progress-bar bg-dark"
                      role="progressBar"
                      style={{width: `${this.state.stats.defense}%`}}
                      aria-valuenow='25'
                      aria-valuemin='0'
                      aria-valuemax='100'
                      >
                      <small>{this.state.stats.defense}</small>
                      </div>
                    </div>
                  </div>
                </div><div className="row mt-1 aling-items-center">
                  <div className="col-3">Velocidad</div>
                  <div className="col-8 pt-1">
                    <div className="progress">
                      <div
                      className="progress-bar bg-dark"
                      role="progressBar"
                      style={{width: `${this.state.stats.speed}%`}}
                      aria-valuenow='25'
                      aria-valuemin='0'
                      aria-valuemax='100'
                      >
                      <small>{this.state.stats.speed}</small>
                      </div>
                    </div>
                  </div>
                </div><div className="row mt-1 aling-items-center">
                  <div className="col-3">Ataque especial</div>
                  <div className="col-8 pt-1">
                    <div className="progress">
                      <div
                      className="progress-bar bg-dark"
                      role="progressBar"
                      style={{width: `${this.state.stats.specialAttack}%`}}
                      aria-valuenow='25'
                      aria-valuemin='0'
                      aria-valuemax='100'
                      >
                      <small>{this.state.stats.specialAttack}</small>
                      </div>
                    </div>
                  </div>
                </div><div className="row mt-1 aling-items-center">
                  <div className="col-3">Def. especial</div>
                  <div className="col-8 pt-1">
                    <div className="progress">
                      <div
                      className="progress-bar bg-dark"
                      role="progressBar"
                      style={{width: `${this.state.stats.specialDefense}%`}}
                      aria-valuenow='25'
                      aria-valuemin='0'
                      aria-valuemax='100'
                      >
                      <small>{this.state.stats.specialDefense}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="detras">
              <div className="card-footer pb-1 text-center">
                <h6>Profile</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
