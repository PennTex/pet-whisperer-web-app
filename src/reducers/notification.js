const initialNotificationState = {
  message: '',
  open: false
};

const notificationReducer = function (state = initialNotificationState, action) {
  switch (action.type) {
    case 'SHOW':
      return Object.assign({}, state, { 
        message: action.message,
        open: true
      });
    case 'HIDE':
      return Object.assign({}, state, { 
        message: '',
        open: false
      });
  }

  return state;
}

export default notificationReducer;