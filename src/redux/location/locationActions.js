import { SET_NEW_LOCATION } from '../types';

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