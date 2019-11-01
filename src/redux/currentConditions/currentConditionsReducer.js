import { SET_CURRENT_CONDITIONS } from './../types';

const initialState = {
    
};

export default (state = initialState, action) => {
    const { payload } = action;
    switch(action.type){        
        case SET_CURRENT_CONDITIONS: {
            return {
                ...state,
                ...payload
            }
        }
        default: return { ...state }
    }
}