import { createStore, combineReducers } from 'redux';

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

const initialProfileState = {};
const profileReducer = function (state = initialPetsState, action) {
  switch (action.type) {
    case 'GET_PROFILE_SUCCESS':
      return Object.assign({}, state, action.profile);
  }

  return state;
}

const initialIdTokenState = null;
const idTokenReducer = function (state = initialIdTokenState, action) {
  switch (action.type) {
    case 'ID_TOKEN_SUCCESS':
      return action.idToken;
  }

  return state;
}

const reducers = combineReducers({
  petsState: petsReducer,
  profileState: profileReducer,
  idTokenState: idTokenReducer
});

export default createStore(reducers);
