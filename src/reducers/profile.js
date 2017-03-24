const initialProfileState = {};

const profileReducer = function (state = initialProfileState, action) {
  switch (action.type) {
    case 'GET_PROFILE_SUCCESS':
      return Object.assign({}, state, action.profile);
  }

  return state;
}

export default profileReducer;