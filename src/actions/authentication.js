import axios from 'axios';
import config from '../../config/config';

import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE
} from './ActionTypes';


export function loginRequest(username, password) {
    return (dispatch) => {
        dispatch(login());
        return axios.post(`${config.API_URL}/user/login`, {
            username: username,
            password:password
        }).then((response) => {
            let token = response.data.token;
            dispatch(loginSuccess(username, token));
            }).catch((error) => {
            dispatch(loginFailure());
            });
    };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(username, token) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username,
        token
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}