import React from 'react';

export default class Login extends React.Component {
  componentDidMount() {
    this.props.auth.login();
  }

  render() {
    return null;
  }
}