import React from 'react';

function MainForecast(props) {  
 
  const favorites = React.createRef();
  if (props.cityDetails.DailyForecasts) {
    var wheatherData = [
      {
        day: new Date(props.cityDetails.DailyForecasts[0].Date).toString().split(' ')[0],
        min: props.cityDetails.DailyForecasts[0].Temperature.Minimum.Value,
        max: props.cityDetails.DailyForecasts[0].Temperature.Maximum.Value,
        desc: props.cityDetails.DailyForecasts[0].Day.IconPhrase,
        icon: props.cityDetails.DailyForecasts[0].Day.Icon
      },
      {
        day: new Date(props.cityDetails.DailyForecasts[1].Date).toString().split(' ')[0],
        min: props.cityDetails.DailyForecasts[1].Temperature.Minimum.Value,
        max: props.cityDetails.DailyForecasts[1].Temperature.Maximum.Value,
        desc: props.cityDetails.DailyForecasts[1].Day.IconPhrase,
        icon: props.cityDetails.DailyForecasts[1].Day.Icon
      },
      {
        day: new Date(props.cityDetails.DailyForecasts[2].Date).toString().split(' ')[0],
        min: props.cityDetails.DailyForecasts[2].Temperature.Minimum.Value,
        max: props.cityDetails.DailyForecasts[2].Temperature.Maximum.Value,
        desc: props.cityDetails.DailyForecasts[2].Day.IconPhrase,
        icon: props.cityDetails.DailyForecasts[2].Day.Icon
      },
      {
        day: new Date(props.cityDetails.DailyForecasts[3].Date).toString().split(' ')[0],
        min: props.cityDetails.DailyForecasts[3].Temperature.Minimum.Value,
        max: props.cityDetails.DailyForecasts[3].Temperature.Maximum.Value,
        desc: props.cityDetails.DailyForecasts[3].Day.IconPhrase,
        icon: props.cityDetails.DailyForecasts[3].Day.Icon
      },
      {
        day: new Date(props.cityDetails.DailyForecasts[4].Date).toString().split(' ')[0],
        min: props.cityDetails.DailyForecasts[4].Temperature.Minimum.Value,
        max: props.cityDetails.DailyForecasts[4].Temperature.Maximum.Value,
        desc: props.cityDetails.DailyForecasts[4].Day.IconPhrase,
        icon: props.cityDetails.DailyForecasts[4].Day.Icon
      }
    ]
  }
  function switchUnits() {
    props.switchUnits();
  };
  function toggleFavorites() {
    props.toggleFavorites();
  }
  if (Object.keys(props.cityDetails).length > 0) { 
    return (
      <div className="forecast">
        <div className="forecast_header">
          <div className="forecast_header_details">
            <p>{props.cityDetails.cityName}</p>
            <p>{wheatherData[0].min}{props.isCelsius ?<span>&#8451;</span>:<span>&#8457;</span>} / {wheatherData[0].max}{props.isCelsius ?<span>&#8451;</span>:<span>&#8457;</span>}</p>
          </div>
          <div>
            <button className="forecast_header_unitsToggle" onClick={switchUnits}>&#8457; /	&#8451;</button>
          </div>
          <div>
            <input type="checkbox" id="toggleFavs" onChange={toggleFavorites} ref={favorites} className="forecast_header_input" checked={props.cityDetails.isFavorite} />
            <label htmlFor="toggleFavs" className="forecast_header_favs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="forecast_header_favs_icon"
              >
                <path d="M12 4.248C8.852-1.154 0 .423 0 7.192 0 11.853 5.571 16.619 12 23c6.43-6.381 12-11.147 12-15.808C24 .4 15.125-1.114 12 4.248z" />
              </svg>
              <p className="forecast_header_favs_msg">in favorites!</p>
            </label>
          </div>
        </div>
        <h3 className="forecast_desc">{props.cityDetails.Headline.Text}</h3>
        <div className="forecast_content">
          <div className="forecast_content_day">
            <p>{wheatherData[0].day}</p>
            <p className="forecast_content_day_desc">{wheatherData[0].desc}</p>
            <p className="forecast_content_day_temp">{wheatherData[0].min}&deg; / {wheatherData[0].max}&deg;</p>
            <img src={`https://vortex.accuweather.com/adc2010/images/slate/icons/${wheatherData[0].icon}.svg`} alt="weather icon" className="forecast_content_day_icon"/>
          </div>
          <div className="forecast_content_day">
            <p>{wheatherData[1].day}</p>
            <p className="forecast_content_day_desc">{wheatherData[1].desc}</p>
            <p className="forecast_content_day_temp">{wheatherData[1].min}&deg; / {wheatherData[1].max}&deg;</p>
            <img src={`https://vortex.accuweather.com/adc2010/images/slate/icons/${wheatherData[1].icon}.svg`} alt="weather icon" className="forecast_content_day_icon"/>
          </div>
          <div className="forecast_content_day">
            <p>{wheatherData[2].day}</p>
            <p className="forecast_content_day_desc">{wheatherData[2].desc}</p>
            <p className="forecast_content_day_temp">{wheatherData[2].min}&deg; / {wheatherData[2].max}&deg;</p>
            <img src={`https://vortex.accuweather.com/adc2010/images/slate/icons/${wheatherData[2].icon}.svg`} alt="weather icon" className="forecast_content_day_icon"/>
          </div>
          <div className="forecast_content_day">
            <p>{wheatherData[3].day}</p>
            <p className="forecast_content_day_desc">{wheatherData[3].desc}</p>
            <p className="forecast_content_day_temp">{wheatherData[3].min}&deg; / {wheatherData[3].max}&deg;</p>
            <img src={`https://vortex.accuweather.com/adc2010/images/slate/icons/${wheatherData[3].icon}.svg`} alt="weather icon" className="forecast_content_day_icon"/>
          </div>
          <div className="forecast_content_day">
            <p>{wheatherData[4].day}</p>
            <p className="forecast_content_day_desc">{wheatherData[4].desc}</p>
            <p className="forecast_content_day_temp">{wheatherData[4].min}&deg; / {wheatherData[4].max}&deg;</p>
            <img src={`https://vortex.accuweather.com/adc2010/images/slate/icons/${wheatherData[4].icon}.svg`} alt="weather icon" className="forecast_content_day_icon"/>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="forecast">
      <img src="/images/loader.gif" alt="loader" className="forecast_loader" />
    </div>
  );
}

export default MainForecast;