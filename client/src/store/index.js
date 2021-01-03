import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../components/auth/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
