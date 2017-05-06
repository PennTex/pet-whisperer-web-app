import { EventEmitter } from 'events'
import Auth0Lock from 'auth0-lock';
import { isTokenExpired } from '../helpers/jwtHelper';
import cookies from 'js-cookie';
import * as config from '../config';

class AuthService extends EventEmitter {
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
    this._setToken(authResult.idToken);

    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error);
      } else {
        this._setProfile(profile);
      }
    })
  }

  login() {
    this.lock.show();
  }

  logout() {
    cookies.remove('id_token', {
      domain: config.COOKIE_DOMAIN
    });
    cookies.remove('profile', {
      domain: config.COOKIE_DOMAIN
    });
    this.emit('logged_out');
  }

  loggedIn() {
    const token = this._getToken();
    return !!token && !isTokenExpired(token);
  }

  _setProfile(profile) {
    cookies.set('profile', JSON.stringify(profile), {
      expires: 7,
      domain: config.COOKIE_DOMAIN
    });
    this.emit('profile_updated', profile);
  }

  _setToken(idToken) {
    cookies.set('id_token', idToken, {
      expires: 7,
      domain: config.COOKIE_DOMAIN
    });

    this.lock.hide();
    this.emit('logged_in', idToken);
  }

  _getToken() {
    return cookies.get('id_token');
  }
}

let authService = new AuthService(config.AUTH0_CLIENT_ID, config.AUTH0_DOMAIN);
export default authService
