import React from 'react';

export default class Pet extends React.Component {
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
              <a href="#" className="btn btn-danger" role="button">Delete</a>
            </p>
          </div>
        </div>
      </div>);
  }
}