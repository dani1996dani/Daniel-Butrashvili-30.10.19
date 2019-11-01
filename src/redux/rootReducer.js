import { combineReducers } from 'redux';

import locationReducer from './location/locationReducer';
import currentConditionsReducer from './currentConditions/currentConditionsReducer';
import pageReducer from './page/pageReducer';

export default combineReducers({
    location: locationReducer,
    currentConditions: currentConditionsReducer,
    page: pageReducer,
});
