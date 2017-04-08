import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

export default class Nav extends React.Component {
  render() {
    return (
      <AppBar
        title="Pet Whisperer"
        showMenuIconButton={false}
        iconElementRight={<FlatButton label="Log out" onClick={this.props.auth.logout} />}
      />)
  }
}