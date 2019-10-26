import React from 'react';

function Favorites(props) { 

  function selectCity(e) {
    props.setLocationForecast(e.target.dataset.city, e.target.dataset.key);
  }
  return (
    <div className="favorites">
      {
        props.favoriteCities.length > 0 ?
        props.favoriteCities.map((city, index) => 
        <div key={index} className="favorites_city" data-city={city.name} data-key={city.key} onClick={selectCity}>
          <h6 className="favorites_city_name">{city.name}</h6>
          <p className="favorites_city_temp">{!props.isCelsius ? <span>{city.wheather.Temperature.Imperial.Value}&#8457;</span> : <span>{Math.round(city.wheather.Temperature.Metric.Value)}&#8451;</span>}</p>
          <img src={`https://vortex.accuweather.com/adc2010/images/slate/icons/${city.wheather.WeatherIcon}.svg`} alt="weather icon" className="favorites_city_icon"/>
          <div className="favorites_city_desc">{city.wheather.WeatherText}</div>
        </div>)
        : 
        ""
      }
    </div>
  );
}

export default Favorites;