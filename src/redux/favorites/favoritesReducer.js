import { ADD_FAVORITE, REMOVE_FAVORITE, SET_FAVORITES_ARRAY } from '../types';

const initialState = [];

export default (state = initialState, action) => {
    const { payload } = action;
    switch(action.type){        
        case ADD_FAVORITE: {
            return [...payload];
        }
        case REMOVE_FAVORITE: {
            return [...payload];
        }
        case SET_FAVORITES_ARRAY: {
            return [...payload];
        }
        default: return [ ...state ]
    }
}