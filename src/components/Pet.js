import React from 'react';
import request from 'request';
import { connect } from 'react-redux';
import store from '../store';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PetsService from '../services/PetsService';
import FeedPetForm from './FeedPetForm';
import MedicatePetForm from './MedicatePetForm';
import * as actions from '../actions';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Restaurant from 'material-ui/svg-icons/maps/restaurant';
import Healing from 'material-ui/svg-icons/image/healing';
import ActionInfo from 'material-ui/svg-icons/action/info';
import RefreshIndicator from 'material-ui/RefreshIndicator';

export class Pet extends React.Component {
  constructor(props) {
    super(props);

    this.petsService = new PetsService({ idToken: this.props.auth.getToken() });

    this.state = {
      expanded: false,
      feedPetModalOpen: false,
      medicatePetModalOpen: false,
      activityInfoModalOpen: false,
      activities: [],
      loadingActivities: false,
    };
  }

  componentDidMount() {
    this._getActivities();
  }

  _getActivities() {
    this.setState({
      loadingActivities: true
    });

    return this.petsService.getPetActivities(this.props.pet.id)
      .then((activities) => {
        this.setState({
          activities
        });
      }).finally(() => {
        this.setState({
          loadingActivities: false
        });
      });
  }

  _handleDelete() {
    event.preventDefault();
    if (!window.confirm(`Are you sure you want to delete ${this.props.pet.name}?`)) {
      return;
    }

    this.petsService.deletePet(this.props.pet.id)
      .then(() => {
        this.props.onDeleteSuccess(this.props.pet.id);
      });
  }

  _handleExpandChange(expanded) {
    this.setState({ expanded: expanded });
  }
  _handleToggle(event, toggle) {
    this.setState({ expanded: toggle });
  };

  _handleReduce() {
    this.setState({ expanded: false });
  };

  _openActivityInfoModal(activity) {
    this.setState({
      activityInfoModalOpen: true,
      activity
    });
  }

  _closeActivityInfoModal() {
    this.setState({
      activityInfoModalOpen: false
    });
  }

  _openFeedPetModal() {
    this.setState({
      feedPetModalOpen: true,
    });
  }

  _closeFeedPetModal() {
    this.setState({ feedPetModalOpen: false });
  }

  _openMedicatePetModal() {
    this.setState({
      medicatePetModalOpen: true,
    });
  }

  _closeMedicatePetModal() {
    this.setState({ medicatePetModalOpen: false });
  }

  _addActivitySuccess(activity) {
    this._closeFeedPetModal();
    this._closeMedicatePetModal();

    let activities = this.state.activities.concat();
    activities.unshift(activity);

    this.setState({
      activities
    });
  }

  render() {
    const leftColStyle = {
      textAlign: "center"
    };

    let petsListStyle = {
      display: this.state.loadingActivities ? 'none' : 'initial'
    };

    let refreshStyle = {
      display: 'block',
      margin: 'auto',
      position: 'relative'
    };

    const activityModalActions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this._closeActivityInfoModal.bind(this)}
      />
    ];

    let activities = (<h2 style={{ textAlign: "center" }}>No activities yet.</h2>);

    if (this.state.activities.length > 0) {
      activities = this.state.activities.map((activity, i) => {
        let activityIcon = <span />;

        if (activity.type === 'feed') {
          activityIcon = <Avatar icon={<Restaurant />} style={{ backgroundColor: '#81C784' }} />;
        } else if (activity.type === 'medication') {
          activityIcon = <Avatar icon={<Healing />} style={{ backgroundColor: '#E57373' }} />;
        }

        return (<ListItem
          key={i}
          leftAvatar={activityIcon}
          rightIcon={<ActionInfo />}
          primaryText={activity.note ? activity.note : ''}
          secondaryText="Apr 7, 2017"
          onTouchTap={() => this._openActivityInfoModal(activity)}
        />)
      })
    }

    return (
      <div>
        <Card expanded={this.state.expanded} onExpandChange={this._handleExpandChange.bind(this)}>
          <CardHeader
            title={this.props.pet.name}
            subtitle={this.props.pet.type}
            avatar={this.props.pet.image_url}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardMedia
            expandable={true}
            overlay={<CardTitle title={this.props.pet.name} />}
          >
            <img src={this.props.pet.image_url} />
          </CardMedia>
          <CardTitle title="Activities" subtitle={"Some things " + this.props.pet.name + " has done."} expandable={true} />
          <CardText expandable={true}>
            <RefreshIndicator
              size={40}
              left={10}
              top={0}
              status={this.state.loadingActivities ? 'loading' : 'hide'}
              style={refreshStyle}
            />
            <List style={petsListStyle}>
              {activities}
            </List>
          </CardText>
          <CardActions>
            <FlatButton label="Feed" onTouchTap={this._openFeedPetModal.bind(this)} />
            <FlatButton label="Medication" onTouchTap={this._openMedicatePetModal.bind(this)} />
            <FlatButton label="Delete" onTouchTap={this._handleDelete.bind(this)} />
          </CardActions>
        </Card>

        <Dialog
          title={`Feed ${this.props.pet.name}`}
          open={this.state.feedPetModalOpen}
          onRequestClose={this._closeFeedPetModal.bind(this)}
          autoScrollBodyContent={true}
        >
          <FeedPetForm pet={this.props.pet} afterSuccess={this._addActivitySuccess.bind(this)} auth={this.props.auth} />
        </Dialog>

        <Dialog
          title={`Medicate ${this.props.pet.name}`}
          open={this.state.medicatePetModalOpen}
          onRequestClose={this._closeMedicatePetModal.bind(this)}
          autoScrollBodyContent={true}
        >
          <MedicatePetForm pet={this.props.pet} afterSuccess={this._addActivitySuccess.bind(this)} auth={this.props.auth} />
        </Dialog>

        <Dialog
          actions={activityModalActions}
          open={this.state.activityInfoModalOpen}
          onRequestClose={this._closeActivityInfoModal.bind(this)}
          autoScrollBodyContent={true}
        >
          <p>Some more info and stuff.</p>
        </Dialog>

      </div>
    );
  }
}

export default connect(
  null,
  (dispatch) => ({
    onDeleteSuccess: (petID) => dispatch(
      actions.deletePetSuccess(petID)
    )
  })
)(Pet)