import React from 'react';
import MainHeader from './MainHeader';
import { autoComplete, clearAutoComplete, changeCityDetails, switchDegreeUnits, toggleCityFromFavorites, toggleFavoritesIcon } from '../redux/actions';
import { connect } from "react-redux";
import MainForecast from './MainForecast';

class MainContainer extends React.Component {
    coords = "";
    isCelsius = false;

    async componentDidMount() {
        // set coords according to position
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                this.coords = `${position.coords.latitude},${position.coords.longitude}`;
            });
        }
        // only on first mount - get city data from coords
        setTimeout(async () => {
            if (Object.keys(this.props.cityDetails).length === 0) {
                try {
                    if (this.coords) {
                        const resp = await fetch('http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=bfE7uS3vhGLDHs6EAJTqqsIyAQQkVZG1&q=' + this.coords);
                        const data = await resp.json();
                        this.setForecast(data.ParentCity.Key, data.ParentCity.LocalizedName);
                    } else this.setForecast("215854", "Tel Aviv");
                } catch {
                    this.setForecast("215854", "Tel Aviv");
                }
            }
        }, 0);
    }

    shouldComponentUpdate(nextProps) {
        return this.props.favoriteCities === nextProps.favoriteCities;
    }

    async setForecast(cityKey, cityName) {
        try {
            const resp = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=bfE7uS3vhGLDHs6EAJTqqsIyAQQkVZG1`);
            let data = await resp.json();
            data = { ...data, cityName: cityName, cityKey: cityKey, isFavorite: this.props.favoriteCities.some(city => city.key === cityKey) };
            this.props.changeCityDetails(data);
        } catch {
            document.querySelector('.cover').classList.add('active');
            document.querySelector('.cover_modal').classList.add('active');
        }

    }
    autoComplete = async (q) => {
        try {
            const resp = await fetch('http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=bfE7uS3vhGLDHs6EAJTqqsIyAQQkVZG1&q=' + q);
            const data = await resp.json();
            this.props.autoComplete(data);
        } catch {
            document.querySelector('.cover').classList.add('active');
            document.querySelector('.cover_modal').classList.add('active');
        }
    }

    switchUnits() {
        this.props.switchDegreeUnits();
    }

    async toggleFavorites() {
        try {
            const resp = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${this.props.cityDetails.cityKey}?apikey=bfE7uS3vhGLDHs6EAJTqqsIyAQQkVZG1`);
            const data = await resp.json();
            this.props.toggleFavoritesIcon();
            this.props.toggleCityFromFavorites(this.props.cityDetails.cityKey, this.props.cityDetails.cityName, data[0]);
        } catch {
            document.querySelector('.cover').classList.add('active');
            document.querySelector('.cover_modal').classList.add('active');
        }
    }

    render() {
        return (
            <section>
                <MainHeader
                    autoComplete={this.autoComplete}
                    autoCompleteData={this.props.autoCompleteData}
                    clearAutoComplete={this.props.clearAutoComplete}
                    changeCityDetails={this.setForecast.bind(this)}
                />
                <MainForecast
                    cityDetails={this.props.cityDetails}
                    switchUnits={this.switchUnits.bind(this)}
                    isCelsius={this.props.isCelsius}
                    toggleFavorites={this.toggleFavorites.bind(this)}
                />
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        autoCompleteData: state.autoCompleteReducer.autoCompleteOptions,
        cityDetails: state.forecastReducer.cityInfo,
        isCelsius: state.forecastReducer.isCelsius,
        favoriteCities: state.favoritesReducer.favorites
    };
};
const mapDispatchToProps = dispatch => {
    return {
        autoComplete: data => dispatch(autoComplete(data)),
        clearAutoComplete: () => dispatch(clearAutoComplete()),
        changeCityDetails: details => dispatch(changeCityDetails(details)),
        switchDegreeUnits: unit => dispatch(switchDegreeUnits(unit)),
        toggleCityFromFavorites: (city, name, wheather) => dispatch(toggleCityFromFavorites(city, name, wheather)),
        toggleFavoritesIcon: () => dispatch(toggleFavoritesIcon())
    }
};
const MainComp = connect(mapStateToProps, mapDispatchToProps)(MainContainer);

export default MainComp;