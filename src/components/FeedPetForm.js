import React from 'react';
import request from 'request';
import { connect } from 'react-redux';
import store from '../store';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Dropzone from 'react-dropzone';
import PetsService from '../services/PetsService';
import * as actions from '../actions';

export class FeedPetForm extends React.Component {
  constructor(props) {
    super(props);

    this.petsService = new PetsService({ idToken: this.props.idToken });

    this.state = {}
  }

  _submit(event) {
    event.preventDefault();

    const name = this.name.getValue(),
      type = this.type.getSelectedValue(),
      birthday = this.birthday.getDate(),
      image_url = this.state.uploadedImageUrl;

    this.petsService.createPet({
      type,
      name,
      birthday,
      image_url
    }).then((pet) => {
      store.dispatch(actions.addPetSuccess(pet));
    })
  }

  render() {
    const styles = {};

    return (
      <form onSubmit={this._submit.bind(this)}>
        <div style={{ maxWidth: 300, margin: "auto" }}>
          <DatePicker
            floatingLabelText="Date"
            ref={(datePicker) => { this.time = datePicker; }}
          />
          <br />
          <TimePicker
            floatingLabelText="Time"
            ref={(timePicker) => { this.time = timePicker; }}
          />
          <br />
          <TextField
            floatingLabelText="Note"
            hintText="Fed 1 cup dry food."
            multiLine={true}
            ref={(input) => { this.note = input; }}
          />
        </div>

        <FlatButton
          type="submit"
          label="Submit"
          primary={true}
          style={{ float: 'right' }}
        />
        <FlatButton
          label="Close"
          primary={true}
          style={{ float: 'right' }}
          onClick={this.props.afterSuccess}
        />
      </form>);
  }
}

export default connect(
  (store) => ({
    idToken: store.idTokenState
  })
)(FeedPetForm)