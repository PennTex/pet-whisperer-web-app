import React from 'react';
import Pet from './Pet';
import CreatePet from './CreatePet';
import request from 'request';
import { connect } from 'react-redux';
import store from '../store';
import Nav from './Nav';

export class LoggedIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: null,
      pets: null
    }
  }

  componentDidMount() {
    this.props.lock.getProfile(this.props.idToken, function (err, profile) {
      if (err) {
        console.log("Error loading the Profile", err);
      }
      store.dispatch({
        type: 'PROFILE_GET_SUCCESS',
        profile: profile
      });
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
    if (this.props.profile) {
      let pets = '';

      if (this.props.pets) {
        pets = this.props.pets.map((pet, i) => {
          return <Pet key={i} pet={pet} idToken={this.props.idToken} />
        })
      }

      return (
        <div>
          <Nav lock={this.props.lock}></Nav>
          <div className="col-lg-12">
            <div className="row">
              {pets}
            </div>

            <h2>Add New Pet</h2>
            <CreatePet idToken={this.props.idToken} />
          </div>
        </div>);
    } else {
      return (<div>Loading...</div>);
    }
  }
}

export default connect(
  (store) => ({
    pets: store.petsState,
    profile: store.profileState
  })
)(LoggedIn)