import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import axios from 'axios';

import {SearchBar} from './../Search';
import { HOST, API_KEY } from './../../settings';
import { setNewLocation } from './../../redux/location/locationActions';
import DaysContainer from './DaysContainer';

class ForecastContainer extends Component {

    state = {
        searchValue: '',
        cityOptions: [],
        forecastData: [],
    }

    componentDidMount() {
        console.log('state', this.props.location);
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
        axios.get(`${HOST}forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&metric=${metric}`, {}).then((res) => {
            const { data } = res;
            // console.log(`for location key ${locationKey}, the data is:`, data);
            this.setState({
                forecastData: data,
            })
        }).catch((err) => {
            console.log(`for location key ${locationKey}, the ERROR was ${err.response}`);
        })

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
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <SearchBar
                    value={this.state.searchValue}
                    onValueChange={this.onValueChange}
                    onValueSelect={this.onValueSelect}
                    options={this.state.cityOptions}
                    renderItem={this.renderSearchItem }
                    filterSearch={this.filterSearchOptions}
                 />
                <p className='city-title' style={{margin: 0, marginTop: 16}}>{this.props.location.locationName}</p>
                <p className='country-title' style={{margin: 0}}>{this.props.location.locationCountryName}</p>
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
    };
};

const mapDispatchToProps = dispatch => ({
    setNewLocation: setNewLocation(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForecastContainer);