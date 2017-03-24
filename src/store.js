import { createStore, combineReducers } from 'redux';
import petsReducer from './reducers/pets';
import profileReducer from './reducers/profile';
import idTokenReducer from './reducers/token';

const reducers = combineReducers({
  petsState: petsReducer,
  profileState: profileReducer,
  idTokenState: idTokenReducer
});

export default createStore(reducers);
