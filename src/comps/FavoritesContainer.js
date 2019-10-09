import React from 'react';
import { connect } from "react-redux";
import { changeCityDetails } from '../redux/actions';
import Favorites from './Favorites';

function FavoritesContainer(props) {  

 async function setLocationForecast(name, key) {  
    try {
      const resp = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=bfE7uS3vhGLDHs6EAJTqqsIyAQQkVZG1`);
      let data = await resp.json();
      data = { ...data, cityName: name, cityKey: key, isFavorite: props.favoriteCities.some(city => city.key === key) };
      props.changeCityDetails(data);
      props.history.push("/home");
    } catch {
      document.querySelector('.cover').classList.add('active');
      document.querySelector('.cover_modal').classList.add('active');
    }
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
      changeCityDetails: details => dispatch(changeCityDetails(details))
  }
};

const FavComp = connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);

export default FavComp;