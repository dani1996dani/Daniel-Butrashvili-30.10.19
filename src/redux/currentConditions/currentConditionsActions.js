import axios from 'axios';

import { SET_CURRENT_CONDITIONS } from './../types';
import { API_KEY, HOST, FORECAST_EXPIRATION_TIME_SPAN } from './../../settings';
import { currentConditionsPostfix } from './../../localStorage'; 

export const setCurrentConditions = dispatcher => (currentConditions) => {
    dispatcher({
        type: SET_CURRENT_CONDITIONS,
        payload: currentConditions,
    });
}

export const getCurrentConditionsForLocation = (locationKey) => {
    return new Promise((resolve, reject) => {
        const cachedCurrentConditions = getCachedCurrentConditions(locationKey);
        console.log('you just used your own cache for current Conditions!', cachedCurrentConditions);
        if (cachedCurrentConditions && cachedCurrentConditions !== undefined) {
            return resolve(cachedCurrentConditions);
        }
        axios.get(`${HOST}currentconditions/v1/${locationKey}//?apikey=${API_KEY}`, {}).then((res) => {
            const { data } = res;
            console.log('getCurrentConditionsForLocation data for location key', locationKey, data);
            const dataToResolve = data[0];
            cacheCurrentConditions(locationKey, dataToResolve);
            return resolve(dataToResolve);
        }).catch((err) => {
            return reject(err);
        })
    })
}

const cacheCurrentConditions = (locationKey, currentConditions) => {
    const dataToSave = {
        ...currentConditions,
        expirationTimestamp: Date.now() + FORECAST_EXPIRATION_TIME_SPAN
    };
    localStorage.setItem(`${locationKey}${currentConditionsPostfix}`, JSON.stringify(dataToSave));
}


const getCachedCurrentConditions = (locationKey) => {
    const savedData = localStorage.getItem(`${locationKey}${currentConditionsPostfix}`);
    if (!savedData || savedData === undefined)
        return null;
    const currentConditionsData = JSON.parse(savedData);
    const { expirationTimestamp } = currentConditionsData;
    if (expirationTimestamp < Date.now()){
        return null;
    } else {
        return currentConditionsData;
    }
}