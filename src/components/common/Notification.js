import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';
import Snackbar from 'material-ui/Snackbar';

export class Notification extends React.Component {

  _handleRequestClose() {
    store.dispatch(actions.hideNotification());
  }

  render() {
    return (
      <Snackbar
        open={this.props.notification.open}
        message={this.props.notification.message}
        autoHideDuration={4000}
        onRequestClose={this._handleRequestClose}
      />
    );
  }
}

export default connect(
  (store) => ({
    notification: store.notification,
  })
)(Notification)