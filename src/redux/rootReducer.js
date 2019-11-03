import { combineReducers } from 'redux';

import locationReducer from './location/locationReducer';
import currentConditionsReducer from './currentConditions/currentConditionsReducer';
import pageReducer from './page/pageReducer';
import favoritesReducer from './favorites/favoritesReducer';
import themeReducer from './theme/themeReducer';
import temperatureUnitReducer from './temperatureUnit/temperatureUnitReducer';

export default combineReducers({
    location: locationReducer,
    currentConditions: currentConditionsReducer,
    page: pageReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
    temperatureUnit: temperatureUnitReducer,
});
