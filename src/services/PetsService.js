import rp from 'request-promise';
import * as config from '../config';
import Promise from 'bluebird';

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
    };

    return rp(options);
  }

  imageInfo(file) {
    return new Promise((resolve, reject) => {
      const api_key = 'AIzaSyBO_P6lhW5xZbwqfgTZlpC9aKAiN-HeNKQ';
      var reader = new window.FileReader()

      reader.onloadend = (e) => {
        const options = {
          method: 'POST',
          uri: `https://vision.googleapis.com/v1/images:annotate?key=${api_key}`,
          json: true,
          body: {
            requests: [
              {
                image: {
                  content: e.target.result.replace("data:image/jpeg;base64,", "")
                },
                features: [
                  {
                    type: 'LABEL_DETECTION'
                  }
                ]
              }
            ]
          }
        }

        rp(options)
          .then(data => {
            resolve(data.responses[0].labelAnnotations);
          }).catch(err => {
            reject(err)
          });
      }

      reader.onerror = (err) => {
        reject(err);
      }

      reader.readAsDataURL(file);
    });
  }
}