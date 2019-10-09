import { combineReducers } from "redux";
import autoCompleteReducer from '../reducers/autoCompleteReducer';
import forecastReducer from '../reducers/forecastReducer';
import favoritesReducer from '../reducers/favoritesReducer';

export default combineReducers({autoCompleteReducer, forecastReducer, favoritesReducer});