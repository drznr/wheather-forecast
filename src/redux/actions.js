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