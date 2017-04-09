import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

export default class Nav extends React.Component {

  render() {
    const styles = {
      image: {
        position: "relative",
        top: 3,
        marginleft: 5
      }
    }
    return (
      <AppBar
        title={<span><img src="/assets/images/logo.png" width="110" style={styles.image} /></span>}
        showMenuIconButton={false}
        iconElementLeft={<img src="/assets/images/logo.png" />}
        iconElementRight={<FlatButton label="Log out" onClick={this.props.auth.logout} />}
      />)
  }
}