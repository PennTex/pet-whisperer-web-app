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
import * as actions from '../actions';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Restaurant from 'material-ui/svg-icons/maps/restaurant';
import ActionInfo from 'material-ui/svg-icons/action/info';

export class Pet extends React.Component {
  constructor(props) {
    super(props);

    this.petsService = new PetsService({ idToken: props.idToken });

    this.state = {
      expanded: false,
      feedPetModalOpen: false,
      activityInfoModalOpen: false,
      activities: []
    };
  }

  _handleDelete() {
    event.preventDefault();

    this.petsService.deletePet(this.props.pet.id)
      .then(() => {
        this.props.onDeleteSuccess(this.props.pet.id);
      });
  }

  _handleExpandChange(expanded) {
    this.setState({ expanded: expanded });

    if (expanded) {
      this.petsService.getPetActivities(this.props.pet.id)
        .then((activities) => {
          activities.sort(function (a, b) {
            a = a.created_at;
            b = b.created_at;

            if (a > b) return -1;
            if (b < a) return 1;
            return 0;
          });

          this.setState({ activities });
        });
    }
  };

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

  _addActivitySuccess(activity) {
    this._closeFeedPetModal();

    this.setState({
      activities: this.state.activities.concat([activity])
    });
  }

  _closeFeedPetModal() {
    this.setState({ feedPetModalOpen: false });
  }

  render() {
    const leftColStyle = {
      textAlign: "center"
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
        return (<ListItem
          key={i}
          leftAvatar={<Avatar icon={<Restaurant />} />}
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
            <List>
              {activities}
            </List>
          </CardText>
          <CardActions>
            <FlatButton label="Feed" onTouchTap={this._openFeedPetModal.bind(this)} />
            <FlatButton label="Medication" onTouchTap={this._openFeedPetModal.bind(this)} />
            <FlatButton label="Delete" onTouchTap={this._handleDelete.bind(this)} />
          </CardActions>
        </Card>

        <Dialog
          title={`Feed ${this.props.pet.name}`}
          modal={false}
          open={this.state.feedPetModalOpen}
          onRequestClose={this._closeFeedPetModal.bind(this)}
          autoScrollBodyContent={true}
        >
          <FeedPetForm pet={this.props.pet} afterSuccess={this._addActivitySuccess.bind(this)} />
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