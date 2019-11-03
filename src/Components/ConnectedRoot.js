import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ForecastContainer, FavoritesContainer, NavBar } from './../Components';
import { setFavoritesArray } from './../redux/favorites/favoritesActions';
import { setNewLocation, getLocationsWithCoords } from './../redux/location/locationActions';
import { setTemperatureUnit, getTemperatureUnitFromCache } from './../redux/temperatureUnit/temperatureUnitActions';
import { setTheme, getThemeFromCache } from './../redux/theme/themeActions';
import { temperatureUnits, themes } from './../enums';

class ConnectedRoot extends Component {

    componentDidMount = () => {
        this.initFavorites();
        this.initCurrentLocation();
        this.initTemperatureUnit();
        this.initTheme();
    }

    initTheme = () => {
        const cachedTheme = getThemeFromCache();
        let themeToSet;
        if (!cachedTheme){
            themeToSet = themes.light;
        }
        else{
            themeToSet = cachedTheme;
        }
        this.props.setTheme(themeToSet);
    }

    initTemperatureUnit = () => {
        const cachedTemperatureUnit = getTemperatureUnitFromCache();
        let unitToSet;
        if (!cachedTemperatureUnit){
            unitToSet = temperatureUnits.C;
        }
        else{
            unitToSet = cachedTemperatureUnit;
        }
        this.props.setTemperatureUnit(unitToSet);
    }

    initFavorites = () => {
        const cachedFavorites = this.getFavoritesFromCache();
        this.props.setFavoritesArray(cachedFavorites);
    }

    initCurrentLocation = () => {
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition((geoData) => {
                const { latitude, longitude } = geoData.coords;
                console.log(latitude, longitude);
                this.setLocationWithCoords(latitude, longitude);
            });
        }
    }

    setLocationWithCoords = (latitude, longitude) => {
        getLocationsWithCoords(latitude, longitude).then((newLocation) => {
            console.log('new location using geo', newLocation);
            const { Key, LocalizedName, Country } = newLocation;
            const countryName = Country.LocalizedName;
            this.props.setNewLocation(Key, LocalizedName, countryName);
        }).catch((err) => {
            console.log('err', err.response);
        })
    }

    //move to connectedRoot
    getFavoritesFromCache = () => {
        const savedFavorites = localStorage.getItem('favorites');
        if (!savedFavorites || savedFavorites === undefined)
            return [];
        const savedArray = JSON.parse(savedFavorites);
        this.setState({
            favorites: savedArray
        })
        return savedArray;
    }

    getCurrentPage = () => {
        switch (this.props.page.pageName) {
            case 'Forecast':
                return (<ForecastContainer />);
            case 'Favorites':
                return (<FavoritesContainer />)
            default: return null;
        }
    }

    render() {
        const { theme } = this.props.theme;
        return (
            <div className={`connected-root ${theme}`}>
            <NavBar />
            {this.getCurrentPage()}
            </div>
        )
        
        
    }
}


const mapStateToProps = state => {
    return {
        page: state.page,
        favorites: state.favorites,
        theme: state.theme,
    };
};

const mapDispatchToProps = dispatch => ({
    setFavoritesArray: setFavoritesArray(dispatch),
    setNewLocation: setNewLocation(dispatch),
    setTemperatureUnit: setTemperatureUnit(dispatch),
    setTheme: setTheme(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedRoot);