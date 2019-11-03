import { SET_TEMPERATURE_UNIT } from '../types';
import { temperatureUnits } from './../../enums';

const initialState = {
    unit: temperatureUnits.C
};

export default (state = initialState, action) => {
    const { payload } = action;
    switch(action.type){        
        case SET_TEMPERATURE_UNIT: {
            return {
                ...state,
                unit: payload
            }
        }
        default: return { ...state }
    }
}