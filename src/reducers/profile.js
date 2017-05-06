import initialState from './initial';

const profileReducer = function (state = initialState.profile, action) {
  switch (action.type) {
    case 'GET_PROFILE_SUCCESS':
      return Object.assign({}, state, action.profile);
  }

  return state;
}

export default profileReducer;