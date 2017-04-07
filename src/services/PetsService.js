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

  createPetActivity(petId, activity) {
    var options = {
      method: "POST",
      uri: `${config.PET_WHISPERER_API_BASE}/pets/${petId}/activities`,
      headers: {
        'Authorization': `Bearer ${this.idToken}`
      },
      body: activity,
      json: true
    }

    return rp(options)
      .then(response => {
        return Promise.resolve(response.data);
      });;;
  }

  getPetActivities(petId) {
    var options = {
      method: "GET",
      uri: `${config.PET_WHISPERER_API_BASE}/pets/${petId}/activities`,
      headers: {
        'Authorization': `Bearer ${this.idToken}`
      },
      json: true
    }

    return rp(options)
      .then(response => {
        let activities = response.data;

        console.log('before sort', activities);

        activities.sort(function (a, b) {
          return b.created_at - a.created_at;
        });

        console.log('after sort', activities);

        return Promise.resolve(activities);
      });;
  }

  uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    return $.ajax({
      url: `${config.PET_WHISPERER_API_BASE}/images`,
      headers: {
        'Authorization': `Bearer ${this.idToken}`
      },
      data: formData,
      type: 'POST',
      contentType: false,
      processData: false,
    });
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
                  content: e.target.result.replace("data:image/jpeg;base64,", "").replace("data:image/png;base64,", "")
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
          });
      }

      reader.onerror = (err) => {
        reject(err);
      }

      reader.readAsDataURL(file);
    });
  }
}