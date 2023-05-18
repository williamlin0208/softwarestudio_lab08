import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider,useDispatch } from 'react-redux';
import { createLogger } from 'redux-logger';

import Main from 'components/Main.jsx';
import { unit, weather, weatherForm, forecast } from 'states/weather-reducers.js';
import {
    post, postForm, postItem//TODO
} from 'states/post-reducers.js';
import 'bootstrap/dist/css/bootstrap.css';

const loggerMiddleware = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        unit, weather, weatherForm, forecast, post, postForm, postItem//TODO
    }),
    composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware))
);

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('root')
);