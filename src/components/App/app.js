import React from 'react';
import './app.css';

import PokeAPIService from "../../services/poke-api-service";
import PokemonCard from '../pokemon-card/';
import PokemonDetails from '../pokemon-details';

class App extends React.Component {
  state = {
    chunkSize: 12,
    pokemons: [],
    filteredPokemons: [],
    desplayDetails: null,
    selectedPokemon: null,
    selectedPokemonID: null,
    currentFilter: ''
  };

  constructor() {
    super();
    this.pokeAPIService = new PokeAPIService();
  }

  selectRef = React.createRef();

  componentDidMount() {
    this.getData();
  }

  getData = async() => {
    await this.pokeAPIService.getDataChunk(this.state.chunkSize)
      .then(results => {
        this.setState({
          pokemons: results,
          filteredPokemons: results
        });
      });

      await this.applyFilter();
  }

  showDetails = (pokemon) => {
    this.setState({
      ...this.state,
      desplayDetails: true,
      selectedPokemon: pokemon,
      selectedPokemonID: pokemon.id
    });
  }

  loadMore = async () => {
    await this.setState((prev) => {
      return {
        ...prev,
        chunkSize: prev.chunkSize + 12
      };
    });

    await this.getData();
  }

  updateFilter = async () => {
    await this.setState({
      ...this.state,
      currentFilter: this.selectRef.current.value
    });

    await this.applyFilter();
  }

  applyFilter = async () => {
    const filtered = !this.state.currentFilter
      ? this.state.pokemons
      : [...this.state.pokemons].filter(({ types }) => types.some(element => element === this.state.currentFilter));

    await this.setState({
      ...this.state,
      filteredPokemons: filtered
    });
  }

  render() {
    const { filteredPokemons } = this.state;

    return (
      <React.Fragment>
        <header>
          <h1 className='header'>Pokedex</h1>
        </header>

        <div className='data'>
          <div className='pokemons'>
            <ul className='pokemon-list'>
              {
                filteredPokemons
                  ? filteredPokemons.map(pokemon => <PokemonCard {...pokemon} showDetails={this.showDetails} selectedPokemonID={this.state.selectedPokemonID} key={pokemon.id} />)
                  : null
              }
            </ul>
            <button className='load-more' onClick={this.loadMore}>Load More</button>
          </div>
          <div className='pokemon-details'>
            <div className='filter'>
              <select onChange={this.updateFilter} ref={this.selectRef}>
                <option value="">All</option>
                <option value="normal">Normal</option>
                <option value="fighting">Fighting</option>
                <option value="flying">Flying</option>
                <option value="poison">Poison</option>
                <option value="ground">Ground</option>
                <option value="rock">Rock</option>
                <option value="bug">Bug</option>
                <option value="steel">Steel</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="grass">Grass</option>
                <option value="electric">Electric</option>
                <option value="psychic">Psychic</option>
                <option value="ice">Ice</option>
                <option value="dragon">Dragon</option>
                <option value="dark">Dark</option>
                <option value="fairy">Fairy</option>
                <option value="unknown">Unknown</option>
                <option value="shadow">Shadow</option>
              </select>
            </div>
            {
              this.state.desplayDetails
                ? <PokemonDetails {...this.state.selectedPokemon} />
                : null
            }
          </div>
        </div>

      </React.Fragment>
    );
  };
}

export default App;
