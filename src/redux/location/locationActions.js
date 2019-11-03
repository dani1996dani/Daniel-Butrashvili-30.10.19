import { SET_NEW_LOCATION } from '../types';
import axios from 'axios';
import { API_KEY, HOST } from './../../settings';

export const setNewLocation = dispatch => (locationKey, locationName, locationCountryName) => {
    dispatch({
        type: SET_NEW_LOCATION,
        payload: {
            locationKey,
            locationName,
            locationCountryName
        }
    });
}

export const getLocationsWithCoords = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
        axios.get(`${HOST}locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${latitude},${longitude}`).then((res) => {
            const { data } = res;
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        })
    })
}