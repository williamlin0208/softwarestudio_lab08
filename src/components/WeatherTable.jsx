import React from 'react';
import PropTypes from 'prop-types';

import './WeatherTable.css';

function WeatherTable (props){
    const {masking, unit, list} = props;
    const weekDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    return (
        <div className={`weather-table ${masking ? 'masking' : ''}`}>
            <div className='d-flex justify-content-around'>
                {list.map((el, i) => (
                    <div key={el.ts} className={i > 2 ? 'hidden-xs-down' : ''}>
                        <span className='day'>
                            {weekDays[(new Date(el.ts * 1000)).getDay()]}:&nbsp;&nbsp;
                        </span>
                        <span className='weather'>
                            {el.temp.toFixed(0)}&ordm;
                        </span>
                        &nbsp;&nbsp;
                        <i className={`owf owf-${el.code}`}></i>
                    </div>
                ))}
            </div>
        </div>
    );
};

WeatherTable.propTypes = {
    masking: PropTypes.bool,
    unit: PropTypes.string,
    list: PropTypes.array
};

export default WeatherTable;