import { createStore, combineReducers } from 'redux';
import petsReducer from './reducers/pets';
import profileReducer from './reducers/profile';
import idTokenReducer from './reducers/token';
import notificationReducer from './reducers/notification';

const reducers = combineReducers({
  notification: notificationReducer,
  petsState: petsReducer,
  profileState: profileReducer,
  idTokenState: idTokenReducer
});

export default createStore(reducers);
