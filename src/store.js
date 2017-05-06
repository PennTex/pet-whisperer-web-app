import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import petsReducer from './reducers/pets';
import profileReducer from './reducers/profile';
import authReducer from './reducers/auth';

const reducers = combineReducers({
  pets: petsReducer,
  profile: profileReducer,
  auth: authReducer
});

export default createStore(
  reducers,
  applyMiddleware(thunk)
);
