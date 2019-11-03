import { SET_TEMPERATURE_UNIT } from '../types';

const temperatureUnitStorageKey = 'unit';


export const setTemperatureUnit = dispatch => (temperatureUnit) => {
    cacheTemperatureUnit(temperatureUnit);
    dispatch({
        type: SET_TEMPERATURE_UNIT,
        payload: temperatureUnit
    });
};

const cacheTemperatureUnit = (temperatureUnit) => {
    localStorage.setItem(temperatureUnitStorageKey, temperatureUnit);
}

export const getTemperatureUnitFromCache = () => {
    const stringValue = localStorage.getItem(temperatureUnitStorageKey);
    if (!stringValue)
        return null;
    return stringValue;
} 
