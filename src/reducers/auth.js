import initialState from './initial';
import * as types from '../actions/actionTypes';

const authReducer = function (state = initialState.auth, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {isLoggedIn: true});   
    case types.LOGOUT_SUCCESS:
      return Object.assign({}, state, {isLoggedIn: false});   
  }

  return state;
}

export default authReducer;