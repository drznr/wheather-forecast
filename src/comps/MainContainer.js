import React from 'react';
import MainHeader from './MainHeader';
import {
    clearAutoComplete,
    switchDegreeUnits,
    getForecastDetails,
    getInfoByCoords,
    getAutoCompData,
    getFavoriteInfo
} from '../redux/actions';
import { connect } from "react-redux";
import MainForecast from './MainForecast';

class MainContainer extends React.Component {
    coords = "";

    componentDidMount() {
        // only on first mount
        if (Object.keys(this.props.cityDetails).length === 0) { 
            // set coords according to position
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(position => {
                    this.coords = `${position.coords.latitude},${position.coords.longitude}`;
                });
            }
            // get city data from coords
            setTimeout(() => {
                    this.props.getInfoByCoords(this.coords);
            }, 10);
        }
    }

    shouldComponentUpdate(nextProps) {
        return this.props.favoriteCities === nextProps.favoriteCities;
    }

    setForecast = (cityKey, cityName) => {
        this.props.getForecastDetails(cityKey, cityName, this.props.favoriteCities.some(city => city.key === cityKey));
    }
    autoComplete = (q) => {
        this.props.getAutoCompData(q);
    }

    switchUnits = () => {
        this.props.switchDegreeUnits();
    }

    toggleFavorites = () => {
        if (this.props.isCelsius) this.props.switchDegreeUnits();
        this.props.getFavoriteInfo(this.props.cityDetails.cityKey, this.props.cityDetails.cityName);
    }

    render() {
        return (
            <section>
                <MainHeader
                    autoComplete={this.autoComplete}
                    autoCompleteData={this.props.autoCompleteData}
                    clearAutoComplete={this.props.clearAutoComplete}
                    changeCityDetails={this.setForecast}
                />
                <MainForecast
                    cityDetails={this.props.cityDetails}
                    switchUnits={this.switchUnits}
                    isCelsius={this.props.isCelsius}
                    toggleFavorites={this.toggleFavorites}
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
        clearAutoComplete: () => dispatch(clearAutoComplete()),
        switchDegreeUnits: unit => dispatch(switchDegreeUnits(unit)),
        getForecastDetails: (key, name, isFavorite) => dispatch(getForecastDetails(key, name, isFavorite)),
        getInfoByCoords: (coords) => dispatch(getInfoByCoords(coords)),
        getAutoCompData: (q) => dispatch(getAutoCompData(q)),
        getFavoriteInfo: (key, name) => dispatch(getFavoriteInfo(key, name))
    }
};
const MainComp = connect(mapStateToProps, mapDispatchToProps)(MainContainer);

export default MainComp;