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

export class Pet extends React.Component {
  constructor(props) {
    super(props);

    this.petsService = new PetsService({ idToken: props.idToken });

    this.state = {
      expanded: false,
      feedPetModalOpen: false
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
  };

  _handleToggle(event, toggle) {
    this.setState({ expanded: toggle });
  };

  _handleExpand() {
    this.setState({ expanded: true });
  };

  _handleReduce() {
    this.setState({ expanded: false });
  };

  _openFeedPetModal(pet) {
    this.setState({
      feedPetModalOpen: true,
      pet
    });
  }

  _closeFeedPetModal() {
    this.setState({ feedPetModalOpen: false });
  }

  render() {
    const leftColStyle = {
      textAlign: "center"
    };

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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
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
          <FeedPetForm pet={this.state.pet} afterSuccess={this._closeFeedPetModal.bind(this)} />
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