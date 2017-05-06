import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../actions/authActions';

class LoginPage extends React.Component {
  componentDidMount() {
    this.props.actions.login();
  }

  render() {
    return null;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(LoginPage);
