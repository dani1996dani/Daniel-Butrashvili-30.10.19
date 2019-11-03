import { SET_FAVORITES_ARRAY } from '../types';

const initialState = [];

export default (state = initialState, action) => {
    const { payload } = action;
    switch(action.type){
        case SET_FAVORITES_ARRAY: {
            return [...payload];
        }
        default: return [ ...state ]
    }
}