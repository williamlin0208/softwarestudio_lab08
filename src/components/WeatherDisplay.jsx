import React from 'react';
import PropTypes from 'prop-types';

import './WeatherDisplay.css';

function WeatherDisplay(props) {
    const { masking, group, day, description, temp, unit } = props;

    return (
        <div className={`weather-display ${masking ? 'masking' : ''}`}>
            <img src={`images/w-${group}.png`}/>
            <p className='description'>{`${day}: ${description}`}</p>
            <h1 className='temp'>
                <span className='display-3'>{temp.toFixed(0)}&ordm;</span>
                &nbsp;{(unit === 'metric') ? 'C' : 'F'}
            </h1>
        </div>
    );
}

WeatherDisplay.propTypes = {
    masking: PropTypes.bool,
    group: PropTypes.string,
    day: PropTypes.string,
    description: PropTypes.string,
    temp: PropTypes.number,
    unit: PropTypes.string
};

export default WeatherDisplay;