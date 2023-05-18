import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
  toggleForm,
  input,
  toggleTemp,
  selectUnit,
} from 'states/weather-actions.js';

import './WeatherForm.css';

const WeatherForm = ({city, submitAction, defaultUnit }) => {
  const [formToggle, setFormToggle] = useState(false);
  const [tempToggle, setTempToggle] = useState(false);
  const inputEl = useRef(null);
  const dispatch = useDispatch();

  const { inputValue, unit } = useSelector((state) => state.weatherForm);

  useEffect(() => {
    dispatch(selectUnit(defaultUnit));
  }, [defaultUnit, dispatch]);

  useEffect(() => {
    if (inputValue !== '') {
      dispatch(input(inputValue));
    }
  }, [inputValue, dispatch]);

  const handleFormToggle = () => {
    setFormToggle(!formToggle);
  };

  const handleInputChange = (e) => {
    dispatch(input(e.target.value));
  };

  const handleMetricUnit = () => {
    dispatch(selectUnit('metric'));
  };

  const handleImperialUnit = () => {
    dispatch(selectUnit('imperial'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    inputEl.current.blur();
    if (inputValue && inputValue.trim()) {
      dispatch(submitAction(inputValue, unit));
      setFormToggle(false);
    } else {
      dispatch(input(city));
    }
  };

  const handleTempToggle = () => {
    setTempToggle(!tempToggle);
    dispatch(toggleTemp());
  };

  const unitString = unit === 'metric' ? 'C' : 'F';

  return (
    <div className={`weather-form ${formToggle ? 'form' : ''}`}>
      {formToggle ? (
        <Form className="form-inline justify-content-center" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="city"
            innerRef={inputEl}
            value={inputValue ? inputValue : ''}
            onChange={handleInputChange}
          />
          &nbsp;
          <ButtonDropdown type="buttom" isOpen={tempToggle} toggle={handleTempToggle}>
            <DropdownToggle type="button" caret color="secondary">
              &ordm; {unitString}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem type="button" onClick={handleMetricUnit}>
                &ordm; C
              </DropdownItem>
              <DropdownItem type="button" onClick={handleImperialUnit}>
                &ordm; F
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
          &nbsp;
          <Button color="info">Check</Button>
        </Form>
      ) : (
        <Button className="btn-form" outline color="secondary" onClick={handleFormToggle}>
          <i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;{city}
        </Button>
      )}
    </div>
  );
};

WeatherForm.propTypes = {
  submitAction: PropTypes.func.isRequired,
  defaultUnit: PropTypes.string.isRequired,
};

export default WeatherForm;