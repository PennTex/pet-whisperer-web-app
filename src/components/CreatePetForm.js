import React from 'react';
import request from 'request';
import { connect } from 'react-redux';
import store from '../store';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Dropzone from 'react-dropzone';
import PetsService from '../services/PetsService';
import * as actions from '../actions';

export class CreatePetForm extends React.Component {
  constructor(props) {
    super(props);

    this.petsService = new PetsService({ idToken: this.props.idToken });

    this.state = {
      files: []
    }
  }

  _submit(event) {
    event.preventDefault();

    this.petsService.createPet({
      type: this.type.getSelectedValue(),
      name: this.name.getValue(),
      birthday: this.birthday.getValue(),
      image_url: this.image_url.getValue()
    }).then((pet) => {
      store.dispatch(actions.addPetSuccess(pet));

      if (this.props.afterCreateSuccess) {
        this.props.afterCreateSuccess();
      }
    })
  }

  onDrop(acceptedFiles, rejectedFiles) {
    this.setState({
      files: acceptedFiles
    });

    this.petsService.imageInfo(acceptedFiles[0])
      .then((data) => {
        console.log('upload data: ', JSON.stringify(data, null, 4));
      })
  }

  render() {
    const styles = {
      block: {
        maxWidth: 250,
      },
      radioButton: {
        marginBottom: 16,
      },
      dropzone: {
        flex: 1,
        margin: 20,
        maxWidth: 150,
        minHeight: 150,
        borderWidth: 2,
        borderColor: "rgb(102, 102, 102)",
        borderStyle: "dashed",
        borderRadius: 5
      }
    };

    let dropzoneInnerContent = <div>Try dropping some files here, or click to select files to upload.</div>;

    if(this.state.files && this.state.files.length > 0) {
      dropzoneInnerContent = this.state.files.map(
        (file, i) => 
          <img src={file.preview} width="120" key={i} /> 
      )
    }

    return (
      <form onSubmit={this._submit.bind(this)}>
        <Dropzone onDrop={this.onDrop.bind(this)} style={styles.dropzone} multiple={false}>
          <div>{dropzoneInnerContent}</div>
        </Dropzone>

        <TextField
          floatingLabelText="Name"
          id="name" name="name" ref={(input) => { this.name = input; }}
        />
        <br />
        <TextField
          floatingLabelText="Birthday"
          type="date" id="birthday" name="birthday" ref={(input) => { this.birthday = input; }}
        />
        <br />
        <TextField
          floatingLabelText="Picture"
          type="url" id="image_url" name="image_url" ref={(input) => { this.image_url = input; }}
        />
        <br />
        <RadioButtonGroup id="type" name="type" defaultSelected="not_light" ref={(radio) => { this.type = radio; }}>
          <RadioButton
            value="dog"
            label="dog"
            style={styles.radioButton}
          />
          <RadioButton
            value="cat"
            label="cat"
            style={styles.radioButton}
          />
          <RadioButton
            value="bird"
            label="bird"
            style={styles.radioButton}
          />
        </RadioButtonGroup>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>);
  }
}

export default connect(
  (store) => ({
    idToken: store.idTokenState
  })
)(CreatePetForm)