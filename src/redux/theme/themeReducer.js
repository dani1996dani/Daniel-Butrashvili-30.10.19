import { SET_THEME } from '../types';
import { themes } from './../../enums';

const initialState = {
    theme: themes.light,
    textColor: 'black',
};

export default (state = initialState, action) => {
    const { payload } = action;
    switch(action.type){        
        case SET_THEME: {
            const { theme, textColor } = payload;
            return {
                ...state,
                theme,
                textColor,
            }
        }
        default: return { ...state }
    }
}