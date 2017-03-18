import React from 'react';
import { connect } from 'react-redux';
import * as config from '../config';

export class Nav extends React.Component {
  logout() {
    localStorage.removeItem('userToken');
    this.props.lock.logout({
      client_id: config.AUTH0_CLIENT_ID,
      returnTo: 'http://localhost:5000'
    })
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Pet Whisperer</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li><span className="navbar-text">Hey, {this.props.profile.nickname}</span></li>
              <li><a href="#" onClick={this.logout.bind(this)}>Log out</a></li>
            </ul>
          </div>
        </div>
      </nav>)
  }
}

export default connect(
  (store) => ({
    pets: store.petsState,
    profile: store.profileState
  })
)(Nav)