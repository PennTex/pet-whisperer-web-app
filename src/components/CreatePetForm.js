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
      type: 'dog',
      name: 'Mr. Cuddlebutts',
      birthday: '2016-07-12',
      image_url: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTp19-VD0XBvB4nYN-goPcjAlGxb5M7PPZVvonuCUlqTEq8I5NtyA'
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    console.log(target.type);
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.petsService.createPet({
      type: this.state.type,
      name: this.state.name,
      birthday: this.state.birthday,
      image_url: this.state.image_url
    }).then((pet) => {
      store.dispatch(actions.addPetSuccess(pet));

      if (this.props.afterCreateSuccess) {
        this.props.afterCreateSuccess();
      }
    })
  }

  onDrop(acceptedFiles, rejectedFiles) {
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
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
        minHeight: 200,
        borderWidth: 2,
        borderColor: "rgb(102, 102, 102)",
        borderStyle: "dashed",
        borderRadius: 5
      }
    };
    /*
          <Dropzone onDrop={this.onDrop} style={styles.dropzone}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>*/
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          floatingLabelText="Name"
          id="name" name="name" value={this.state.name} onChange={this.handleInputChange}
        />
        <br />
        <TextField
          floatingLabelText="Birthday"
          type="date" id="birthday" name="birthday" value={this.state.birthday} onChange={this.handleInputChange}
        />
        <br />
        <TextField
          floatingLabelText="Picture"
          type="url" id="image_url" name="image_url" value={this.state.image_url} onChange={this.handleInputChange}
        />
        <br />
        <RadioButtonGroup id="type" name="type" defaultSelected="not_light" value={this.state.type} onChange={this.handleInputChange}>
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