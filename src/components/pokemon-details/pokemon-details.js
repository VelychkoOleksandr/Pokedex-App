import React from 'react';
import './pokemon-details.css';

const PokemonDetails = (props) => {

  return (
    <div className='details-card'>
      <div className='wrapper'>
        <div className='image'>
          <img src={props.image} alt={props.name} />
        </div>

        <div className='title'>
          <h3>{props.name} #
          {
              props.id < 100
                ? props.id < 10
                  ? '00'
                  : '0'
                : null
            }
            {props.id}</h3>
        </div>

        <div className='attributes'>
          <ul>
            <li className='attribute'>
              <div className='stat'>Type</div>
              <div className='value type'>
                {
                  props.types.length > 1
                    ? props.types.join(' &\n')
                    : props.types
                }
              </div>
            </li>

            <li className='attribute'>
              <div className='stat'>Attack</div>
              <div className='value'>{props.attack}</div>
            </li>

            <li className='attribute'>
              <div className='stat'>Defense</div>
              <div className='value'>{props.defense}</div>
            </li>

            <li className='attribute'>
              <div className='stat'>HP</div>
              <div className='value'>{props.hp}</div>
            </li>

            <li className='attribute'>
              <div className='stat'>SP Attack</div>
              <div className='value'>{props.spAttack}</div>
            </li>

            <li className='attribute'>
              <div className='stat'>SP Defense</div>
              <div className='value'>{props.spDefense}</div>
            </li>

            <li className='attribute'>
              <div className='stat'>Speed</div>
              <div className='value'>{props.speed}</div>
            </li>

            <li className='attribute'>
              <div className='stat'>Weight</div>
              <div className='value'>{props.weight}</div>
            </li>

            <li className='attribute'>
              <div className='stat'>Total moves</div>
              <div className='value'>{props.totalMoves}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;