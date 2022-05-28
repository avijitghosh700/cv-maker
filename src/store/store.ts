import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import personalReducer from './cv/personal/personalSlice';
import experienceReducer from './cv/experience/experienceSlice';
import educationReducer from './cv/education/educationSlice';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducers = combineReducers({
  auth: authReducer,
  personal: personalReducer,
  experience: experienceReducer,
  education: educationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (defaultMiddleware) => defaultMiddleware({
    serializableCheck: false,
  }),
});

export interface GeneralModel<T> {
  data: T | null;
  isSubmitted?: boolean;
}

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
export default store;