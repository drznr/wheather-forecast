import axios from 'axios';

export const autoComplete = options => ({
    type: "COMPLETE",
    payload: {
        options: options
    }
});

export const clearAutoComplete = () => ({
    type: "CLEAR"
});

export const changeCityDetails = details => ({
    type: "CHANGE FORECAST",
    payload: {
        details: details
    }
});

export const switchDegreeUnits = () => ({
    type: "CHANGE UNITS"
});

export const toggleCityFromFavorites = (key, name, data) => ({
    type: "TOGGLE FAVORITE",
    payload: {
        key: key,
        name: name,
        wheather: data
    }
});

export const toggleFavoritesIcon = () => ({
    type: "TOGGLE CITY"
});

export const getForecastDetails = (key, name, isFavorite) => {
    return dispatch => {
            axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=bfE7uS3vhGLDHs6EAJTqqsIyAQQkVZG1`)
                .then(res => {
                    res.data = { ...res.data, cityKey: key, cityName: name, isFavorite: isFavorite };
                    return dispatch(changeCityDetails(res.data));
                }).catch(()=> {
                    document.querySelector('.cover').classList.add('active');
                    document.querySelector('.cover_modal').classList.add('active');
                });
    }
}

export const getInfoByCoords = (coords) => {
    return dispatch => {
      axios.get('http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=bfE7uS3vhGLDHs6EAJTqqsIyAQQkVZG1&q=' + coords)
      .then(res=> {
        return dispatch(getForecastDetails(res.data.ParentCity.Key, res.data.ParentCity.LocalizedName, false));
      }).catch(()=> {
       return dispatch(getForecastDetails("215854", "Tel Aviv", false)); 
      });
    }
}

export const getAutoCompData = (q) => {
    return dispatch => {
        axios.get('http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=bfE7uS3vhGLDHs6EAJTqqsIyAQQkVZG1&q=' + q)
        .then(res=> {
            return dispatch(autoComplete(res.data))
        }).catch(()=> {
            document.querySelector('.cover').classList.add('active');
            document.querySelector('.cover_modal').classList.add('active');
        });
    }
}

export const getFavoriteInfo = (key, name) => {
    return dispatch => {
        axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=bfE7uS3vhGLDHs6EAJTqqsIyAQQkVZG1`)
        .then(res=> {
            return dispatch(toggleCityFromFavorites(key, name, res.data[0])) + dispatch(toggleFavoritesIcon());
        }).catch(()=> {
            document.querySelector('.cover').classList.add('active');
            document.querySelector('.cover_modal').classList.add('active');
        })
    }
}