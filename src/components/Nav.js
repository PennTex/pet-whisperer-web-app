import React from 'react';
import { connect } from 'react-redux';
import * as config from '../config';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

export class Nav extends React.Component {
  _logout() {
    localStorage.removeItem('userToken');
    
    this.props.lock.logout({
      client_id: config.AUTH0_CLIENT_ID,
      returnTo: config.AUTH0_CALLBACK_URL
    })
  }

  render() {
    return (
      <AppBar
        title="Pet Whisperer"
        showMenuIconButton={false}
        iconElementRight={<FlatButton label="Log out" onClick={this._logout.bind(this)} />}
      />)
  }
}

export default connect()(Nav)
