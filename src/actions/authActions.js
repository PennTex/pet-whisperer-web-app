import * as types from './actionTypes';
import authService from '../services/AuthService';

export function initialLoginCheck() {
  return dispatch => {
    if(authService.loggedIn()){
      dispatch(loginSuccess());
    }
  };
}

export function login() {
  return dispatch => {
    authService.login();

    authService.on('logged_in', () => {
      dispatch(loginSuccess());
    });

    authService.on('profile_updated', (profile) => {
      dispatch(profileUpdated(profile));
    });
  };
}

export function logout() {
  return dispatch => {
    authService.logout();

    authService.on('logged_out', () => {
      dispatch(logoutSuccess());
    });
  };
}

export function loginSuccess() {
  return {
    type: types.LOGIN_SUCCESS
  };
}

export function logoutSuccess() {
  window.location.replace(config.AUTH0_CALLBACK_URL);

  return {
    type: types.LOGOUT_SUCCESS
  };
}

export function profileUpdated(profile) {
  return {
    type: types.PROFILE_UPDATED,
    profile
  }
}