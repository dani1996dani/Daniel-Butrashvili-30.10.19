import { SET_PAGE } from '../types';

export const setPage = dispatch => (pageName) => {
    dispatch({
        type: SET_PAGE,
        payload: pageName
    });
}