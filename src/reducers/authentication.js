import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initailState = {
    login: {
        status: 'INIT'
    },
    status: {
        isLoggedIn: false,
        currentUser: '',
        token: ''
    }
};

export default function authentication(state, action){
    if(typeof state === "undefined")
        state = initailState;

    switch(action.type) {

        case types.AUTH_LOGIN:
            return update(state, {
               login: {
                   result: { $set: 'WAITING' }
               }
            });
        case types.AUTH_LOGIN_SUCCESS:
            var temp = update(state, {
                login: {
                    result: { $set: 'SUCCESS' }
                },
                status: {
                    isLoggedIn: { $set: true },
                    currentUser: { $set: action.username },
                    token: { $set: action.token }
                }
            });
            return temp;
        case types.AUTH_LOGIN_FAILURE:
            return update(state, {
                login: {
                    result: { $set: 'FAILURE' }
                }
            });
        default:
            return state;
    }
}


