import { SET_NEW_LOCATION } from '../types';

const initialState = {
    locationKey: '234984',
    locationName: 'Tel aviv',
};

export default (state = initialState, action) => {
    const { payload } = action;
    switch(action.type){        
        case SET_NEW_LOCATION: {
            const { locationKey, locationName } = payload;
            return {
                ...state,
                locationKey,
                locationName,
            }
        }
        default: return { ...state }
    }
}