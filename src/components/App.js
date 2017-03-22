import React from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import { connect } from 'react-redux';
import store from '../store';
import * as config from '../config';

export class App extends React.Component {
  componentWillMount() {
    this.createLock();
    this.getIdToken();
  }

  createLock() {
    this.lock = new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_DOMAIN);
  }

  getIdToken() {
    var idToken = localStorage.getItem('userToken');
    var authHash = this.lock.parseHash(window.location.hash);

    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
        localStorage.setItem('userToken', authHash.id_token);
      }

      if (authHash.error) {
        console.log("Error signing in", authHash);
      }
    }

    store.dispatch({
      type: 'ID_TOKEN_SUCCESS',
      idToken: idToken
    });
  }

  render() {
    if (this.props.idToken) {
      this.lock.hide();
      return (<Dashboard lock={this.lock} />);
    } else {
      return (<Login lock={this.lock} />);
    }
  }
}

export default connect(
  (store) => ({
    idToken: store.idTokenState
  })
)(App)