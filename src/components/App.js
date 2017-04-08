import React from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import * as config from '../config';
import AuthService from '../services/AuthService';

export default class App extends React.Component {
  componentWillMount() {
    this.auth = new AuthService(config.AUTH0_CLIENT_ID, config.AUTH0_DOMAIN, {});

    this.state = {
      isLoggedIn: this.auth.loggedIn()
    };

    this.auth.on('logged_in', () => {
      console.log('logged in', this.auth.loggedIn());
      this.setState({
        isLoggedIn: this.auth.loggedIn()
      });
    });

    this.auth.on('logged_out', () => {
      console.log('logged out', this.auth.loggedIn());
      this.setState({
        isLoggedIn: this.auth.loggedIn()
      });
    });
  }

  render() {
    if (this.state.isLoggedIn) {
      return (<Dashboard auth={this.auth} />);
    } else {
      return (<Login auth={this.auth} />);
    }
  }
}