import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import { cancelWeather } from 'api/open-weather-map.js';
import { getWeather } from 'states/weather-actions.js';
import { listPosts } from 'states/post-actions.js';
import PostForm from 'components/PostForm.jsx';
import PostList from 'components/PostList.jsx';

import './Today.css';

function Today(props) {
  const {
    city,
    group,
    description,
    temp,
    unit,
    masking,
    postLoading,
    posts,
    searchText,
  } = useSelector((state) => ({
    ...state.weather,
    unit: state.unit,
    postLoading: state.post.postLoading,
    searchText: state.searchText,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeather(city == 'na'? 'Hsinchu' : city, unit));
    dispatch(listPosts(searchText));

    return () => {
      if (props.weatherLoading) {
        cancelWeather();
      }
    };
  }, [dispatch, unit, searchText]);

  useEffect(() => {
    if (searchText !== props.searchText) {
      dispatch(listPosts(searchText));
    }
  }, [dispatch, searchText]);

  document.body.className = `weather-bg ${group}`;
  document.querySelector('.weather-bg .mask').className = `mask ${masking ? 'masking' : ''}`;

  return (
    <div className='today'>
      <div className='weather'>
        <WeatherForm city={city} defaultUnit={unit} submitAction={getWeather} />
        <WeatherDisplay {...{ group, description, temp, unit, masking }} day='today' />
      </div>
      <div className='posts'>
        <h4 className='label'>
          <i className='fa fa-paper-plane' aria-hidden='true'></i>  Posts
        </h4>
        <PostForm />
        <PostList />
        {postLoading && <Alert color='warning' className='loading'>Loading...</Alert>}
      </div>
    </div>
  );
}

Today.propTypes = {
  city: PropTypes.string,
  code: PropTypes.number,
  group: PropTypes.string,
  description: PropTypes.string,
  temp: PropTypes.number,
  unit: PropTypes.string,
  weatherLoading: PropTypes.bool,
  masking: PropTypes.bool,
  searchText: PropTypes.string,
  postLoading: PropTypes.bool,
  posts: PropTypes.array,
};

export default Today;