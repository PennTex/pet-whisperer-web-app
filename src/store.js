import { createStore, combineReducers } from 'redux';

const initialPetsState = [];
const petsReducer = function (state = initialPetsState, action) {
  switch (action.type) {
    case 'DELETE_PET_SUCCESS':
      return state.filter(item => {
        return item.id !== action.pet.id;
      });
    case 'ADD_PET_SUCCESS':
      return state.concat([action.pet]);
    case 'PET_LIST_SUCCESS':
      return [].concat(action.pets);
  }

  return state;
}

const initialProfileState = {};
const profileReducer = function (state = initialPetsState, action) {
  switch (action.type) {
    case 'PROFILE_GET_SUCCESS':
      return Object.assign({}, state, action.profile);

  }

  return state;
}

const reducers = combineReducers({
  petsState: petsReducer,
  profileState: profileReducer
});

export default createStore(reducers);
