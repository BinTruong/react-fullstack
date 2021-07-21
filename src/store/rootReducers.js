import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// reducer import
import authReducer from './reducers/authSlice';
import adminReducer from './reducers/adminSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer
});
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth', 'admin']
};

export default persistReducer(persistConfig, rootReducer);
