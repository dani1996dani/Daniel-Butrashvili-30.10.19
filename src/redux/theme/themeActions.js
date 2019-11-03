import { SET_THEME } from '../types';
import { themes } from './../../enums';

const themeCacheKey = 'theme';

export const setTheme = dispatcher => (theme) => {
    cacheTheme(theme);
    const textColor = theme === themes.light ? 'black' : 'white';
    dispatcher({
        type: SET_THEME,
        payload: {
            theme,
            textColor,
        }
    })
}

const cacheTheme = (theme) => {
    localStorage.setItem(themeCacheKey, theme);
}

export const getThemeFromCache = () => {
    const stringValue = localStorage.getItem(themeCacheKey);
    if (!stringValue)
        return null;
    return stringValue;
} 