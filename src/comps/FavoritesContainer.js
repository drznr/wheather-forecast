import React from 'react';
import { connect } from "react-redux";
import { getForecastDetails } from '../redux/actions';
import Favorites from './Favorites';

function FavoritesContainer(props) {  

 function setLocationForecast(name, key) {  
    props.getForecastDetails(key, name, true);
    props.history.push("/home");
  } 
  
  return (
    <section>
      <Favorites 
      favoriteCities={props.favoriteCities} 
      isCelsius={props.isCelsius} 
      setLocationForecast={setLocationForecast}
      />
    </section>
  );
}

const mapStateToProps = state => {
  return {
      favoriteCities: state.favoritesReducer.favorites,
      isCelsius: state.forecastReducer.isCelsius
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getForecastDetails: (key, name, isFavorite) => dispatch(getForecastDetails(key, name, isFavorite))
  }
};

const FavComp = connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);

export default FavComp;