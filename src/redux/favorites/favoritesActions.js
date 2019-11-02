import { ADD_FAVORITE, REMOVE_FAVORITE, SET_FAVORITES_ARRAY } from '../types';

export const addFavorite = dispatch => (currentFavorites, locationKey, locationName) => {
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
    }
    arrayToSet.push(newLocation);
    cacheFavoriteLocationArray(arrayToSet);

    dispatch({
        type: ADD_FAVORITE,
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
        type: REMOVE_FAVORITE,
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