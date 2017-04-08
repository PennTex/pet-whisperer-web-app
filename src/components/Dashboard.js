import React from 'react';
import Pet from './Pet';
import { connect } from 'react-redux';
import store from '../store';
import Nav from './Nav';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import CreatePetForm from './CreatePetForm';
import PetsService from '../services/PetsService';
import * as actions from '../actions';
import Notification from './Notification';
import Add from 'material-ui/svg-icons/content/add';
import RefreshIndicator from 'material-ui/RefreshIndicator';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.petsService = new PetsService({ idToken: this.props.auth.getToken() });

    this.state = {
      createPetModalOpen: false,
      loadingPets: false
    }
  }

  componentDidMount() {
    this._getPets();
  }

  _getPets() {
    this.setState({
      loadingPets: true
    });

    this.petsService.getPets()
      .then(pets => {
        if (pets) {
          store.dispatch(actions.getPetsSuccess(pets));
        }
      }).finally(() => {
        this.setState({
          loadingPets: false
        });
      });
  }

  _onSubmit() {
    this.setState({ submitCreatePetForm: true });
  }

  _openCreatPetModal() {
    this.setState({ createPetModalOpen: true });
  }

  _closeCreatPetModal() {
    this.setState({ createPetModalOpen: false });
  }

  render() {

    let petsListStyle = {
      display: this.state.loadingPets ? 'none' : 'initial'
    };
    let refreshStyle = {
      display: 'block',
      margin: 'auto',
      position: 'relative'
    };

    let petsDisplay = (<h2 style={{ textAlign: "center" }}>Add some pets!</h2>);
    
    if (this.props.pets.length > 0) {
      petsDisplay = this.props.pets.map((pet, i) => {
        return <div key={pet.id}><Pet key={pet.id} pet={pet} idToken={this.props.idToken} auth={this.props.auth} /> <br /></div>
      })
    } 

    return (
      <div>
        <Nav auth={this.props.auth}></Nav>
        <div className="col-lg-12">
          <div className="row">
            <FlatButton
              href="#"
              label="New Pet"
              secondary={true}
              data-toggle="modal" data-target="#createPetModal"
              style={{ float: "right", margin: 20 }}
              onClick={this._openCreatPetModal.bind(this)}
            />

            <div style={{ clear: "both" }}></div>

            <div style={{ maxWidth: 700, margin: 'auto' }}>
              <RefreshIndicator
                size={40}
                left={10}
                top={0}
                status={this.state.loadingPets ? 'loading' : 'hide'}
                style={refreshStyle}
              />
              <div style={petsListStyle}>
                {petsDisplay}
              </div>
            </div>
          </div>

          <Dialog
            title="Add Pet"
            modal={false}
            open={this.state.createPetModalOpen}
            onRequestClose={this._closeCreatPetModal.bind(this)}
            autoScrollBodyContent={true}
          >
            <CreatePetForm afterSuccess={this._closeCreatPetModal.bind(this)} auth={this.props.auth} />
          </Dialog>

          <Notification />
        </div>
      </div>);
  }
}

export default connect(
  (store) => ({
    pets: store.petsState
  })
)(Dashboard)