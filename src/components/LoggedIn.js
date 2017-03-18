import React from 'react';
import * as config from '../config';
import Pet from './Pet';
import CreatePet from './CreatePet';
import request from 'request';
import { connect } from 'react-redux';
import store from '../store';

export class LoggedIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: null,
      pets: null
    }
  }

  logout() {
    localStorage.removeItem('userToken');
    this.props.lock.logout({
      client_id: config.AUTH0_CLIENT_ID,
      returnTo: 'http://localhost:5000'
    })
  }

  componentDidMount() {
    this.props.lock.getProfile(this.props.idToken, function (err, profile) {
      if (err) {
        console.log("Error loading the Profile", err);
      }
      this.setState({ profile: profile });
    }.bind(this));

    request.get('http://localhost:8080/pets', {
      headers: {
        'Authorization': `Bearer ${this.props.idToken}`
      },
      json: true
    }, (err, res, body) => {
      if (err) {
        console.log('error', err);
      } else {
        store.dispatch({
          type: 'PET_LIST_SUCCESS',
          pets: body
        });
      }
    })
  }

  render() {
    if (this.state.profile) {
      let pets = '';

      if (this.props.pets) {
        pets = this.props.pets.map((pet, i) => {
          return <Pet key={i} pet={pet} idToken={this.props.idToken} />
        })
      }

      return (
        <div className="col-lg-12">
          <span className="pull-right">{this.state.profile.nickname} <a href="#" onClick={this.logout.bind(this)}>Log out</a></span>
          <h1>Welcome to Pet Whisperer</h1>

          <div className="row">
            {pets}
          </div>

          <h2>Add New Pet</h2>
          <CreatePet idToken={this.props.idToken} />
        </div>);
    } else {
      return (<div>Loading...</div>);
    }
  }
}

export default connect(
  (store) => ({
    pets: store.petsState
  })
)(LoggedIn)