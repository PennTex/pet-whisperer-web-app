import { EventEmitter } from 'events'
import Auth0Lock from 'auth0-lock';
import { isTokenExpired } from '../helpers/jwtHelper';

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super();

    this.lock = new Auth0Lock(clientId, domain, {
      closable: false,
      languageDictionary: {
        title: "Pet Whisperer"
      }
    });
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  _doAuthentication(authResult) {
    this.setToken(authResult.idToken);

    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error);
      } else {
        this.setProfile(profile);
      }
    })
  }

  login() {
    this.lock.show();
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.emit('logged_out');
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !isTokenExpired(token);
  }

  setProfile(profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
    this.emit('profile_updated', profile);
  }

  setToken(idToken) {
    localStorage.setItem('id_token', idToken);
    this.lock.hide();
    this.emit('logged_in', idToken);
  }

  getToken() {
    return localStorage.getItem('id_token');
  }
}