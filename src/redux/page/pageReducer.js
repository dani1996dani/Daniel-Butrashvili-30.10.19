import { SET_PAGE } from '../types';
import { pageNames } from './../../enums';

const initialState = {
    pageName: pageNames.Forecast,
};

export default (state = initialState, action) => {
    const { payload } = action;
    switch(action.type){        
        case SET_PAGE: {
            return {
                ...state,
                pageName: payload
            }
        }
        default: return { ...state }
    }
}