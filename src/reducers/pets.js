import initialState from './initial';
import * as types from '../actions/actionTypes';

const petsReducer = function (state = initialState.pets, action) {
  switch (action.type) {
    case types.DELETE_PET_SUCCESS:
      return state.filter(item => {
        return item.id !== action.petID;
      });      
    case types.ADD_PET_SUCCESS:
      return state.concat([action.pet]);
    case types.GET_PETS_SUCCESS:
      return [].concat(action.pets);
  }

  return state;
}

export default petsReducer;