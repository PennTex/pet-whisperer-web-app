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
      files: [],
      petInfoByImage: null,
      uploadedImageUrl: ''
    }
  }

  _submit(event) {
    event.preventDefault();

    this.petsService.createPet({
      type: this.type.getSelectedValue(),
      name: this.name.getValue(),
      birthday: this.birthday.getDate(),
      image_url: this.state.uploadedImageUrl
    }).then((pet) => {
      store.dispatch(actions.addPetSuccess(pet));

      if (this.props.afterCreateSuccess) {
        this.props.afterCreateSuccess();
      }
    })
  }

  _onDrop(acceptedFiles, rejectedFiles) {
    if (rejectedFiles.length > 0) {
      store.dispatch(actions.showNotification('Image rejected. Must be <100K in size.'))
      return;
    }

    this.setState({
      files: acceptedFiles,
      petInfoByImage: 'Analyzing your pet...'
    });

    this.petsService.uploadImage(acceptedFiles[0])
      .then((image_url) => {
        this.setState({
          uploadedImageUrl: image_url
        });
      });

    this.petsService.imageInfo(acceptedFiles[0])
      .then((data) => {
        data.forEach(item => {
          if (item.description === "dog") {
            this.setState({
              petInfoByImage: 'Looks like a dog! We prefilled some form data for you.'
            });
            this.type.setSelectedValue('dog');
          } else if (item.description === "cat") {
            this.setState({
              petInfoByImage: 'Looks like a cat! We prefilled some form data for you.'
            });
            this.type.setSelectedValue('cat');
          } else if (item.description === "bird") {
            this.setState({
              petInfoByImage: 'Looks like a bird! We prefilled some form data for you.'
            });
            this.type.setSelectedValue('bird');
          }
        });
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

    if (this.state.files && this.state.files.length > 0) {
      dropzoneInnerContent = this.state.files.map(
        (file, i) =>
          <img src={file.preview} width="160" key={i} />
      )
    }

    return (
      <form onSubmit={this._submit.bind(this)}>
        <Dropzone name="image_url" maxSize={100000} onDrop={this._onDrop.bind(this)} style={styles.dropzone} multiple={false} >
          <div>{dropzoneInnerContent}</div>
        </Dropzone>
        {this.state.petInfoByImage}
        <br />
        <TextField
          floatingLabelText="Name"
          id="name" name="name" ref={(input) => { this.name = input; }}
        />
        <br />
        <DatePicker id="birthday" name="birthday" floatingLabelText="Birthday" ref={(datePicker) => { this.birthday = datePicker; }} />
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