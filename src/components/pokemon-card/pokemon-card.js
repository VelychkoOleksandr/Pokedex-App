import React from 'react';
import './pokemon-card.css';

const PokemonCard = (props) => {
  const { id, name, types, image, selectedPokemonID } = props;

  return (
    <li 
      className={
        selectedPokemonID === id
        ? 'pokemon-card selected'
        : 'pokemon-card'}
        onClick={() => {
          props.showDetails({ ...props });
        }}>
      <div className='pokemon-image'>
        <img src={image} alt={name} />
      </div>

      <div className='name'>
        <h3 className='name'>{name}</h3>
      </div>

      <div className='types-list'>
        {
          types.map(type => <span className={type} key={`${Math.random() * id} `}> 
            {type}
          </span>)
        }
      </div>
    </li>
  );
};

export default PokemonCard;

