import React from 'react';
import request from 'request';

export default class CreatePet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'dog',
      name: 'Mr. Cuddle Butts',
      birthday: '2016-07-12',
      image_url: 'https://cdn.pixabay.com/photo/2016/02/19/15/46/dog-1210559_1280.jpg'
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    request.post('http://localhost:8080/pets', {  
      headers: {
        'Authorization': `Bearer ${this.props.idToken}`
      },
      body: {
        type: this.state.type,
        name: this.state.name,
        birthday: this.state.birthday,
        image_url: this.state.image_url
      },
      json: true
    }, function (err, res, body) {
      if(err) {
        console.log('error', err);
      } else {
        console.log('res', res);
        console.log('body', body);
      }
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group row">
          <label htmlFor="type" className="col-sm-2 col-form-label">Type</label>
          <div className="col-sm-10">
            <select className="form-control" id="type" name="type" value={this.state.type} onChange={this.handleInputChange}>
              <option>dog</option>
              <option>cat</option>
              <option>bird</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input className="form-control" type="text" id="name" name="name" value={this.state.name} onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="birthday" className="col-sm-2 col-form-label">Birthday</label>
          <div className="col-sm-10">
            <input className="form-control" type="date" id="birthday" name="birthday" value={this.state.birthday} onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="image_url" className="col-sm-2 col-form-label">Picture</label>
          <div className="col-sm-10">
            <input className="form-control" type="url" id="image_url" name="image_url" value={this.state.image_url} onChange={this.handleInputChange} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>);
  }
}