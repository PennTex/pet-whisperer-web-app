const initialIdTokenState = null;

const idTokenReducer = function (state = initialIdTokenState, action) {
  switch (action.type) {
    case 'ID_TOKEN_SUCCESS':
      return action.idToken;
  }

  return state;
}

export default idTokenReducer;