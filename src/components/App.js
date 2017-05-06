import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginPage from './Login/LoginPage';
import DashboardPage from './Dashboard/DashboardPage';

const App = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return (<DashboardPage />);
  } else {
    return (<LoginPage />);
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
}

export default connect(mapStateToProps)(App);
