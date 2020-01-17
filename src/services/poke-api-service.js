class PokeAPIService {
  baseURL = 'https://pokeapi.co/api/v2/';
  
  async getDataChunk(amount) {
    let pokemons = [];
    
    await fetch(`${this.baseURL}pokemon/?limit=${amount}`)
      .then(response => response.json())
      .then(({ results }) => results.map(element => element.url))
      .then(async (pokemonURLs) => {
        await Promise.all(pokemonURLs.map(url => this.getSinglePokemonData(url)))
          .then(pokemonList => {
            pokemons = pokemonList;
          });
      });

    return pokemons;
  };

  async getSinglePokemonData(url) {
    const pokemonData = await fetch(url)
      .then(data => data.json());

    return this.mapSinglePokemonData(pokemonData);
  };

  mapSinglePokemonData({ id, name, types, stats, weight, moves, sprites }) {
    return {
      id,
      name,
      weight,
      types: types.map(item => item.type.name),
      attack: stats[4].base_stat,
      defense: stats[3].base_stat,
      hp: stats[5].base_stat,
      spAttack: stats[2].base_stat,
      spDefense: stats[1].base_stat,
      speed: stats[0].base_stat,
      totalMoves: moves.length,
      image: sprites.front_default
    }
  }
};

export default PokeAPIService;