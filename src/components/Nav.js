import React from 'react';
import { connect } from 'react-redux';
import * as config from '../config';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

export class Nav extends React.Component {
  logout() {
    localStorage.removeItem('userToken');
    this.props.lock.logout({
      client_id: config.AUTH0_CLIENT_ID,
      returnTo: 'http://localhost:5000'
    })
  }

  render() {
    return (
      <AppBar
        title="Pet Whisperer"
        showMenuIconButton={false}
        iconElementRight={<FlatButton label="Log out" onClick={this.logout.bind(this)} />}
      />)
  }
}

export default connect(
  (store) => ({
    pets: store.petsState,
    profile: store.profileState
  })
)(Nav)
