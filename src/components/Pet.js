import React from 'react';
import request from 'request';
import { connect } from 'react-redux';
import store from '../store';

export default class Pet extends React.Component {
  handleDelete() {
    event.preventDefault();

    request.delete(`http://localhost:8080/pets/${this.props.pet.id}`, {
      headers: {
        'Authorization': `Bearer ${this.props.idToken}`
      },
      json: true
    }, (err, res, body) => {
      if (err) {
        console.log('error', err);
      } else {
        console.log('res', res);
        console.log('body', body);

        store.dispatch({
          type: 'DELETE_PET_SUCCESS',
          pet: this.props.pet
        });
      }
    })
  }

  render() {
    return (
      <div className="col-sm-6 col-md-4">
        <div className="thumbnail">
          <img src={this.props.pet.image_url} alt="..." width="242" height="200" />
          <div className="caption">
            <h3>{this.props.pet.name}</h3>
            <p>Cool {this.props.pet.type} dude</p>
            <p>
              <a href="#" className="btn btn-primary" role="button">Edit</a>
              <a href="#" className="btn btn-danger" role="button" onClick={this.handleDelete.bind(this)}>Delete</a>
            </p>
          </div>
        </div>
      </div>);
  }
}