import React from 'react';
import store from '../store';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Dropzone from 'react-dropzone';
import PetsService from '../services/PetsService';
import * as actions from '../actions';
import { dateTimeMerge } from '../helpers/dateHelper';

export default class MedicatePetForm extends React.Component {
  constructor(props) {
    super(props);

    this.petsService = new PetsService({ idToken: this.props.auth.getToken() });
    this.time = this.date = new Date();

    this.state = {}
  }

  _handleDateChange(event, date) {
    this.date = date;
  }

  _handleTimeChange(event, date) {
    this.time = date;
  }


  _submit(event) {
    event.preventDefault();

    const date = dateTimeMerge(this.date, this.time);

    const type = 'medication',
      at = Math.round(date.getTime() / 1000),
      note = this.note.getValue();

    this.petsService.createPetActivity(this.props.pet.id, {
      type,
      at,
      note
    }).then((activity) => {
      store.dispatch(actions.showNotification(`Activity for ${this.props.pet.name} successfully added.`))
      this.props.afterSuccess(activity);
    })
  }

  render() {
    const styles = {};
    this.time = this.date = new Date();

    return (
      <form onSubmit={this._submit.bind(this)}>
        <div style={{ maxWidth: 300, margin: "auto" }}>
          <DatePicker
            floatingLabelText="Date"
            autoOk={true}
            defaultDate={this.date}
            maxDate={this.date}
            onChange={this._handleDateChange.bind(this)}
          />
          <br />
          <TimePicker
            floatingLabelText="Time"
            autoOk={true}
            defaultTime={this.time}
            onChange={this._handleTimeChange.bind(this)}

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