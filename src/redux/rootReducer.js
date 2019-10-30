import { combineReducers } from 'redux';

import locationReducer from './location/locationReducer';

export default combineReducers({
    location: locationReducer,
});
