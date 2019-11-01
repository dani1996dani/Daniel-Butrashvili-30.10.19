import { combineReducers } from 'redux';

import locationReducer from './location/locationReducer';
import currentConditionsReducer from './currentConditions/currentConditionsReducer';

export default combineReducers({
    location: locationReducer,
    currentConditions: currentConditionsReducer,
});
