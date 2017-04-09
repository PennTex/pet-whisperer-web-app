import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

export default class Nav extends React.Component {

  render() {
    const styles = {
      image: {
        position: "relative",
        top: 3,
        marginRight: 5
      }
    }
    return (
      <AppBar
        title={<span><img src="/assets/images/logo.png" width="60" style={styles.image} /> Pet Whisperer</span>}
        showMenuIconButton={false}
        iconElementLeft={<img src="/assets/images/logo.png" />}
        iconElementRight={<FlatButton label="Log out" onClick={this.props.auth.logout} />}
      />)
  }
}