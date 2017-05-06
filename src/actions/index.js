import * as types from './actionTypes';

export function loadPets() {
  return function (dispatch, getState) {
    petsService = new PetsService({ idToken: this.props.auth.getToken() });

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


    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      throw (error);
    });
  };
}


export function deletePetSuccess(petID) {
  return {
    type: types.DELETE_PET_SUCCESS,
    petID
  };
}

export function addPetSuccess(pet) {
  return {
    type: types.ADD_PET_SUCCESS,
    pet
  };
}

export function getPetsSuccess(pets) {
  return {
    type: types.GET_PET_SUCCESS,
    pets
  };
}

export function getProfileSuccess(profile) {
  return {
    type: types.GET_PROFILE_SUCCESS,
    profile
  };
}