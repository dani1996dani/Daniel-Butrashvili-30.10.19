import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import axios from 'axios';

import {SearchBar} from './../Search';
import { HOST, API_KEY, FORECAST_EXPIRATION_TIME_SPAN } from './../../settings';
import { setNewLocation } from './../../redux/location/locationActions';
import DaysContainer from './DaysContainer';
import CurrentConditions from './CurrentConditions';
import Location from './Location';
import { getStoredItem,setItemInStorage, currentConditionsPostfix } from './../../localStorage';
import { setCurrentConditions, getCurrentConditionsForLocation } from './../../redux/currentConditions/currentConditionsActions';
import { addFavorite, removeFavorite } from './../../redux/favorites/favoritesActions';

class ForecastContainer extends Component {

    state = {
        searchValue: '',
        cityOptions: [],
        forecastData: [],
        currentConditions: null,
        currentConditionsErrored: false,
        forecastError: false,
    }

    componentDidMount() {
        const { locationKey } = this.props.location;
        this.getForecastForLocation(locationKey);
        this.handleGettingConditionsForLocation(locationKey);
    }

    handleGettingConditionsForLocation = (locationKey) => {
        let didError;
        getCurrentConditionsForLocation(locationKey).then((conditions) => {
            this.props.setCurrentConditions(conditions);
            didError = false;
        }).catch((err) => {
            didError = true;
        }).finally(() => {
            this.setState({
                currentConditionsErrored: didError
            });
        })
    }

    onValueChange = (value) => {
        this.setState({
            searchValue: value,
        })
        this.getAutoCompleteSuggestions(value);
        console.log('forecast value CHANGE:', value);
    };

    onValueSelect = (value) => {
        console.log('forecast value SELECT:', value);
        const { Key, LocalizedName, Country } = value;
        this.setState({
            searchValue: LocalizedName
        });

        this.props.setNewLocation(Key, LocalizedName, Country.LocalizedName);
        this.getForecastForLocation(Key);
        this.handleGettingConditionsForLocation(Key);
        console.log('this.props.location', this.props.location);
    }

    getAutoCompleteSuggestions = debounce((query) => {
        axios.get(`${HOST}locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}`).then((res) => {
            const { data } = res;
            console.log('data', data);
            this.setState({
                cityOptions: data,
            });
        }).catch((err) => {
        })
    }, 400, { trailing: true });

    getForecastForLocation = (locationKey, metric = true) => {
        const cachedForecast = this.getCachedForecast(locationKey);
        if (cachedForecast && cachedForecast !== undefined){
            this.setState({
                forecastData: cachedForecast
            });
            console.log('you just used your own cache!');
            return;
        }
        //if null was returned from the cache, that means that the forecast is too old or doesn't exist, so we need to go get a new one from the server
        let forecastErrored = false;
        axios.get(`${HOST}forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&metric=${metric}`, {}).then((res) => {
            const { data } = res;
            forecastErrored = false;
            this.setState({
                forecastData: data,
            });
            this.cacheForecast(locationKey, data);
        }).catch((err) => {
            console.log(`for location key ${locationKey}, the ERROR was,`, err.response);
            forecastErrored = true;
        }).finally(() => {
            this.setState({
                forecastErrored,
            })
        })
    }

    getCachedForecast = (locationKey) => {
        const savedData = localStorage.getItem(locationKey);
        if (!savedData || savedData === undefined)
            return null;
        const forecastData = JSON.parse(savedData);
        const { expirationTimestamp } = forecastData;
        if (expirationTimestamp < Date.now()){
            return null;
        } else {
            return forecastData;
        }
    }

    cacheForecast = (locationKey, forecast) => {
        const dataToSave = {
            ...forecast,
            expirationTimestamp: Date.now() + FORECAST_EXPIRATION_TIME_SPAN
        };
        localStorage.setItem(locationKey, JSON.stringify(dataToSave));
    }

    renderSearchItem = (value, isSelected, index) => {
        const className = isSelected ? 'autocomplete-label selected' : 'autocomplete-label';
        const { LocalizedName, Country } = value;
        return (
            <div key={index} className={className} onMouseDown={() => {
                this.onValueSelect(value);
            }} >
                <span>{LocalizedName}, {Country.LocalizedName}</span>
            </div>
        )
    }

    filterSearchOptions = (cityOptions, value) => {
        if (!cityOptions || cityOptions === undefined || cityOptions.length === 0)
            return [];
        const filteredOptions = cityOptions.filter((option) => {
            return option.LocalizedName.toLowerCase().includes(value.toLowerCase())
        })  
        return filteredOptions;
    }

    isLocationFavorite = (locationKey) => {
        const savedFavorites = this.props.favorites;
        // console.log('savedFavorites', savedFavorites);
        if (!savedFavorites)
            return false;
        for (let i = 0; i < savedFavorites.length; i++){
            const currentFavorite = savedFavorites[i];
            if (currentFavorite.locationKey === locationKey)
                return true;
        }
        return false;
    }

    render() {
        const { location } = this.props;
        const { locationKey, locationName } = location;
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1}}>
                <SearchBar
                    value={this.state.searchValue}
                    onValueChange={this.onValueChange}
                    onValueSelect={this.onValueSelect}
                    options={this.state.cityOptions}
                    renderItem={this.renderSearchItem }
                    filterSearch={this.filterSearchOptions}
                    pattern={"[A-Za-z_]"}
                    patternError={"Only English Letters are Allowed"}
                 />
                 <Location 
                    location={location}
                    isFavorite={this.isLocationFavorite(locationKey)}
                    onFavorite={() => {this.props.addFavorite(this.props.favorites, locationKey, locationName);}}
                    onUnFavorite={() => {this.props.removeFavorite(this.props.favorites, locationKey)}}
                    />
                <CurrentConditions 
                    currentConditions={this.props.currentConditions}
                    didError={this.state.currentConditionsErrored}
                />
                <DaysContainer 
                    forecast={this.state.forecastData}
                    didError={this.state.forecastErrored}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        location: state.location,
        currentConditions: state.currentConditions,
        favorites: state.favorites,
    };
};

const mapDispatchToProps = dispatch => ({
    setNewLocation: setNewLocation(dispatch),
    setCurrentConditions: setCurrentConditions(dispatch),
    addFavorite: addFavorite(dispatch),
    removeFavorite: removeFavorite(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForecastContainer);