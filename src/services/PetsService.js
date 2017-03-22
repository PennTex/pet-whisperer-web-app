import rp from 'request-promise';
import * as config from '../config';

export default class PetsService {
  constructor(params) {
    this.idToken = params.idToken;
  }

  getPets() {
    var options = {
      uri: `${config.PET_WHISPERER_API_BASE}/pets`,
      headers: {
        'Authorization': `Bearer ${this.idToken}`
      },
      json: true
    };

    return rp(options);
  }

  createPet(pet) {
    var options = {
      method: "POST",
      uri: `${config.PET_WHISPERER_API_BASE}/pets`,
      headers: {
        'Authorization': `Bearer ${this.idToken}`
      },
      body: pet,
      json: true
    }

    return rp(options);
  }

  deletePet(petID) {
    var options = {
      method: "DELETE",
      uri: `${config.PET_WHISPERER_API_BASE}/pets/${petID}`,
      headers: {
        'Authorization': `Bearer ${this.idToken}`
      },
      json: true
    }

    return rp(options);
  }
}