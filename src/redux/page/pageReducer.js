import { SET_PAGE } from '../types';

const initialState = {
    pageName: 'Favorites',
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