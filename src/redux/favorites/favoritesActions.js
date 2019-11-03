import { SET_FAVORITES_ARRAY } from '../types';
import { favoritesKey } from './../../localStorage';

export const addFavorite = dispatch => (currentFavorites, locationKey, locationName, countryName) => {
    let arrayToSet;
    if (!currentFavorites || currentFavorites === undefined) {
        arrayToSet = [];
    }
    else {
        arrayToSet = currentFavorites;
    }
    const newLocation = {
        locationKey,
        locationName,
        countryName,
    }
    arrayToSet.push(newLocation);
    cacheFavoriteLocationArray(arrayToSet);

    setFavoritesArray(dispatch)(arrayToSet);
}

export const removeFavorite = dispatch => (currentFavorites, locationKey) => {
    if (!currentFavorites || currentFavorites === undefined) {
        return;
    }

    const arrayToSet = currentFavorites.filter((favoriteLocation) => favoriteLocation.locationKey !== locationKey);
    cacheFavoriteLocationArray(arrayToSet);

    setFavoritesArray(dispatch)(arrayToSet);
}

export const setFavoritesArray = dispatch => (favoritesArray) => {
    dispatch({
        type: SET_FAVORITES_ARRAY,
        payload: favoritesArray,
    })
}

const cacheFavoriteLocationArray = (favoriteArray) => {
    localStorage.setItem(favoritesKey, JSON.stringify(favoriteArray));
}