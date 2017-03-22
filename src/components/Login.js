import React from 'react';

export default class Login extends React.Component {
  componentDidMount() {
    this.props.lock.show({
      closable: false
    });
  }

  render() {
    return null;
  }
}