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

export class MedicatePetForm extends React.Component {
  constructor(props) {
    super(props);

    this.petsService = new PetsService({ idToken: this.props.idToken });

    this.state = {}
  }

  _submit(event) {
    event.preventDefault();

    const type = 'medication',
      date = this.date.getDate(),
      time = this.time.state.time,
      note = this.note.getValue()

    this.petsService.createPetActivity(this.props.pet.id, {
      type,
      note
    }).then((activity) => {
      store.dispatch(actions.showNotification(`Activity for ${this.props.pet.name} successfully added.`))
      this.props.afterSuccess(activity);
    })
  }

  render() {
    const styles = {};

    return (
      <form onSubmit={this._submit.bind(this)}>
        <div style={{ maxWidth: 300, margin: "auto" }}>
          <DatePicker
            floatingLabelText="Date"
            ref={(datePicker) => { this.date = datePicker; }}
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
)(MedicatePetForm)