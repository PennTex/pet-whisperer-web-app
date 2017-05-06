import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../actions/authActions';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

class Nav extends React.Component {

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
        iconElementRight={<FlatButton label="Log out" onClick={this.props.actions.logout} />}
      />)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Nav);
