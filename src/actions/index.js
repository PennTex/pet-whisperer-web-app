export function deletePetSuccess(petID) {
  return { 
    type: 'DELETE_PET_SUCCESS', 
    petID 
  };
}

export function addPetSuccess(pet) {
  return { 
    type: 'ADD_PET_SUCCESS', 
    pet 
  };
}

export function getPetsSuccess(pets) {
  return { 
    type: 'GET_PETS_SUCCESS', 
    pets 
  };
}

export function getProfileSuccess(profile) {
  return { 
    type: 'GET_PROFILE_SUCCESS', 
    profile 
  };
}