import { SET_FAVORITES_ARRAY } from '../types';

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

    dispatch({
        type: SET_FAVORITES_ARRAY,
        payload: arrayToSet
    });
}

export const removeFavorite = dispatch => (currentFavorites, locationKey) => {
    if (!currentFavorites || currentFavorites === undefined) {
        return;
    }

    const arrayToSet = currentFavorites.filter((favoriteLocation) => favoriteLocation.locationKey !== locationKey);
    cacheFavoriteLocationArray(arrayToSet);

    dispatch({
        type: SET_FAVORITES_ARRAY,
        payload: arrayToSet,
    })
}

export const setFavoritesArray = dispatch => (favoritesArray) => {
    dispatch({
        type: SET_FAVORITES_ARRAY,
        payload: favoritesArray,
    })
}

const cacheFavoriteLocationArray = (favoriteArray) => {
    localStorage.setItem('favorites', JSON.stringify(favoriteArray));
}