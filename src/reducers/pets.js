const initialPetsState = [];

const petsReducer = function (state = initialPetsState, action) {
  switch (action.type) {
    case 'DELETE_PET_SUCCESS':
      return state.filter(item => {
        return item.id !== action.petID;
      });      
    case 'ADD_PET_SUCCESS':
      return state.concat([action.pet]);
    case 'GET_PETS_SUCCESS':
      return [].concat(action.pets);
  }

  return state;
}

export default petsReducer;