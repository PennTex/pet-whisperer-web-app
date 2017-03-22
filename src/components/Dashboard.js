import React from 'react';
import Pet from './Pet';
import { connect } from 'react-redux';
import store from '../store';
import Nav from './Nav';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import CreatePetForm from './CreatePetForm';
import PetsService from '../services/PetsService';
import * as actions from '../actions';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.petsService = new PetsService({idToken: this.props.idToken});

    this.state = {
      profile: null,
      pets: null,
      createPetModalOpen: false
    }
  }

  componentDidMount() {
    this.props.lock.getProfile(this.props.idToken, function (err, profile) {
      if (err) {
        console.log("Error loading the Profile", err);
      }
      store.dispatch(actions.getProfileSuccess(profile));
    }.bind(this));

    this.petsService.getPets()
      .then(pets => {
        store.dispatch(actions.getPetsSuccess(pets));
      });
  }

  openCreatePetModal() {
    this.setState({ createPetModalOpen: true });
  }

  closeCreatePetModal() {
    this.setState({ createPetModalOpen: false });
  }

  render() {
    const createPetModalActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.closeCreatePetModal.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.closeCreatePetModal.bind(this)}
      />,
    ];

    if (this.props.profile) {
      let petsDisplay = '';

      if (this.props.pets.length > 0) {
        petsDisplay = this.props.pets.map((pet, i) => {
          return <div><Pet key={i} pet={pet} idToken={this.props.idToken} /> <br /></div>
        })
      } else {
        petsDisplay = (<h2 style={{ textAlign: "center" }}>Add some pets!</h2>)
      }

      return (
        <div>
          <Nav lock={this.props.lock}></Nav>
          <div className="col-lg-12">
            <div className="row">
              <FlatButton
                href="#"
                label="New Pet"
                secondary={true}
                icon={<FontIcon className="fa fa-plus-square" />}
                data-toggle="modal" data-target="#createPetModal"
                style={{ float: "right", margin: 20 }}
                onClick={this.openCreatePetModal.bind(this)}
              />

              <div style={{ clear: "both" }}></div>

              {petsDisplay}
            </div>

            <Dialog
              title="Add Pet"
              actions={createPetModalActions}
              modal={false}
              open={this.state.createPetModalOpen}
              onRequestClose={this.closeCreatePetModal.bind(this)}
            >
              <CreatePetForm afterCreateSuccess={this.closeCreatePetModal.bind(this)}/>
            </Dialog>
          </div>
        </div>);
    } else {
      return (<div>Loading...</div>);
    }
  }
}

export default connect(
  (store) => ({
    pets: store.petsState,
    profile: store.profileState,
    idToken: store.idTokenState
  })
)(Dashboard)