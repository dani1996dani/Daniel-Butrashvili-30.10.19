import { SET_CURRENT_CONDITIONS } from './../types';

export const setCurrentConditions = dispatcher => (currentConditions) => {
    dispatcher({
        type: SET_CURRENT_CONDITIONS,
        payload: currentConditions,
    });
}