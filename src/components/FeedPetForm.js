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

export default class FeedPetForm extends React.Component {
  constructor(props) {
    super(props);

    this.petsService = new PetsService({ idToken: this.props.auth.getToken() });

    this.state = {}
  }

  _submit(event) {
    event.preventDefault();

    const type = 'feed',
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
            autoOk={true}
            ref={(datePicker) => { this.date = datePicker; }}
          />
          <br />
          <TimePicker
            floatingLabelText="Time"
            autoOk={true}
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