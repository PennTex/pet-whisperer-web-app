import React from 'react';
import store from '../../store';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Dropzone from 'react-dropzone';
import PetsService from '../../services/PetsService';
import * as actions from '../../actions';
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo';

export default class CreatePetForm extends React.Component {
  constructor(props) {
    super(props);

    this.petsService = new PetsService({ idToken: this.props.auth.getToken() });

    this.state = {
      files: [],
      petInfoByImage: null,
      uploadedImageUrl: '',
      formErrors: {
        name: '',
        type: ''
      }
    }
  }

  _submit(event) {
    event.preventDefault();

    let formErrors = this.state.formErrors;
    let formIsValid = true;

    const name = this.name.getValue(),
      type = this.type.getSelectedValue(),
      birthday = Math.round(this.birthday.getDate().getTime() / 1000),
      image_url = this.state.uploadedImageUrl;

    if (!name) {
      formErrors.name = 'Name is required.';
      formIsValid = false;
    }

    if (!formIsValid) {
      this.setState({
        formErrors
      });

      return;
    }

    this.petsService.createPet({
      type,
      name,
      birthday,
      image_url
    }).then((pet) => {
      store.dispatch(actions.addPetSuccess(pet));

      if (this.props.afterSuccess) {
        this.props.afterSuccess();
      }
    })
  }

  _onDrop(acceptedFiles, rejectedFiles) {
    if (rejectedFiles.length > 0) {
      store.dispatch(actions.showNotification('Image rejected. Must be <1M in size.'))
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
        let determinedPetType = null;

        for (let i = 0, x = data.length; i < x; i++) {
          if (data[i].description === 'dog') {
            determinedPetType = 'dog';
            break;
          } else if (data[i].description === 'cat') {
            determinedPetType = 'cat';
            break;
          } else if (data[i].description === 'bird') {
            determinedPetType = 'bird';
            break;
          }
        }

        const petInfoByImage = determinedPetType ? `Looks like a ${determinedPetType}! We prefilled some form data for you.` : 'Are you sure you uploaded a picture of a Dog, Cat, or Bird?';

        this.setState({
          petInfoByImage
        });

        if (determinedPetType) {
          this.type.setSelectedValue(determinedPetType);
        }
      });
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        margin: 20,
        minHeight: 150,
        borderWidth: 2,
        borderColor: "rgb(102, 102, 102)",
        borderStyle: "dashed",
        borderRadius: 5,
        textAlign: "center"
      }
    };

    const defaultDate = new Date();


    let dropzoneInnerContent = <div><AddAPhoto /><div>Drop pet photo here, or click to select a photo to upload.</div></div>;

    if (this.state.files && this.state.files.length > 0) {
      dropzoneInnerContent = this.state.files.map(
        (file, i) =>
          <img src={file.preview} width="160" key={i} />
      )
    }

    return (
      <form onSubmit={this._submit.bind(this)}>
        <Dropzone name="image_url" maxSize={1000000} onDrop={this._onDrop.bind(this)} style={styles.dropzone} multiple={false} >
          <div>{dropzoneInnerContent}</div>
        </Dropzone>
        <div style={{ maxWidth: 300, margin: "auto" }}>
          {this.state.petInfoByImage}
          <br />
          <TextField
            floatingLabelText="Name"
            ref={(input) => { this.name = input; }}
            errorText={this.state.formErrors.name}
          />
          <br />
          <DatePicker 
            floatingLabelText="Birthday" 
            autoOk={true}
            defaultDate={defaultDate}
            maxDate={defaultDate}
            ref={(datePicker) => { this.birthday = datePicker; }} />
          <br />
          <RadioButtonGroup
            name="type"
            defaultSelected="unknown"
            ref={(radio) => { this.type = radio; }}>
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