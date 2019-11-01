import { SET_NEW_LOCATION } from '../types';

const initialState = {
    locationKey: '234984',
    locationName: 'Tel Aviv',
    locationCountryName: 'Israel',
};

export default (state = initialState, action) => {
    const { payload } = action;
    switch(action.type){        
        case SET_NEW_LOCATION: {
            const { locationKey, locationName, locationCountryName } = payload;
            return {
                ...state,
                locationKey,
                locationName,
                locationCountryName,
            }
        }
        default: return { ...state }
    }
}