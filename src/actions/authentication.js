/**
 * Created by Administrator on 2016-12-17.
 */
import axios from 'axios';

import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE
} from './ActionTypes';

export function loginRequest(username, password) {
    return (dispatch) => {
        dispatch(login());

        return axios.post('/api/account/signin', { username, password })
            .then((response) => {
            dispatch(loginSuccess(username));
            }).catch((error) => {
            dispatch(loginFailure());
            });
    }
}
export function login() {
    return {
        type : AUTH_LOGIN
    };
}
export function loginSuccess(username) {
    return {
        type : AUTH_LOGIN_SUCCESS,
        username
    };
}
export function loginFailure() {
    return {
        type : AUTH_LOGIN_FAILURE
    };
}