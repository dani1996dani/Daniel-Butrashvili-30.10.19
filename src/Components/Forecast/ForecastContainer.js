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
import { setCurrentConditions } from './../../redux/currentConditions/currentConditionsActions';

class ForecastContainer extends Component {

    state = {
        searchValue: '',
        cityOptions: [],
        forecastData: [],
        currentConditions: null,
    }

    componentDidMount() {
        console.log('state', this.props.location);
        const { locationKey } = this.props.location;
        this.getForecastForLocation(locationKey);
        this.getCurrentConditionsForLocation(locationKey);
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
        this.getCurrentConditionsForLocation(Key);
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
        axios.get(`${HOST}forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&metric=${metric}`, {}).then((res) => {
            const { data } = res;
            this.setState({
                forecastData: data,
            });
            this.cacheForecast(locationKey, data);
        }).catch((err) => {
            console.log(`for location key ${locationKey}, the ERROR was,`, err.response);
        })
    }

    getCurrentConditionsForLocation = (locationKey) => {
        const cachedCurrentConditions = this.getCachedCurrentConditions(locationKey);
        if (cachedCurrentConditions && cachedCurrentConditions !== undefined){
            // this.setState({
            //     currentConditions: cachedCurrentConditions
            // });
            this.props.setCurrentConditions(cachedCurrentConditions[0]);
            console.log('you just used your own cache for current Conditions!');
            return;
        }
        axios.get(`${HOST}currentconditions/v1/${locationKey}//?apikey=${API_KEY}`, {}).then((res) => {
            const { data } = res;
            console.log('getCurrentConditionsForLocation data for location key',locationKey , data);
            // this.setState({
            //     currentConditions: data,
            // });
            this.props.setCurrentConditions(data[0]);
            this.cacheCurrentConditions(locationKey, data);
        }).catch((err) => {
            console.log(`getCurrentConditionsForLocation: for location key ${locationKey}, the ERROR was,`, err.response);
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

    getCachedCurrentConditions = (locationKey) => {
        const savedData = localStorage.getItem(`${locationKey}${currentConditionsPostfix}`);
        if (!savedData || savedData === undefined)
            return null;
        const currentConditionsData = JSON.parse(savedData);
        const { expirationTimestamp } = currentConditionsData;
        if (expirationTimestamp < Date.now()){
            return null;
        } else {
            return currentConditionsData;
        }
    }

    cacheCurrentConditions = (locationKey, currentConditions) => {
        const dataToSave = {
            ...currentConditions,
            expirationTimestamp: Date.now() + FORECAST_EXPIRATION_TIME_SPAN
        };
        localStorage.setItem(`${locationKey}${currentConditionsPostfix}`, JSON.stringify(dataToSave));
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

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1}}>
                <SearchBar
                    value={this.state.searchValue}
                    onValueChange={this.onValueChange}
                    onValueSelect={this.onValueSelect}
                    options={this.state.cityOptions}
                    renderItem={this.renderSearchItem }
                    filterSearch={this.filterSearchOptions}
                 />
                 <Location location={this.props.location}/>
                <CurrentConditions 
                    currentConditions={this.props.currentConditions}
                />
                <DaysContainer 
                    forecast={this.state.forecastData}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        location: state.location,
        currentConditions: state.currentConditions,
    };
};

const mapDispatchToProps = dispatch => ({
    setNewLocation: setNewLocation(dispatch),
    setCurrentConditions: setCurrentConditions(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForecastContainer);