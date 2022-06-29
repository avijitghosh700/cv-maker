import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './auth/authSlice';
import personalReducer from './cv/personal/personalSlice';
import experienceReducer from './cv/experience/experienceSlice';
import educationReducer from './cv/education/educationSlice';
import projectsSlice from './cv/projects/projectsSlice';
import skillsSlice from './cv/skills/skillsSlice';
import certificationsSlice from './cv/certifications/certificationsSlice';
import languagesSlice from './cv/languages/languagesSlice';
import hobbiesSlice from './cv/hobbies/hobbiesSlice';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducers = combineReducers({
  auth: authReducer,
  personal: personalReducer,
  experience: experienceReducer,
  projects: projectsSlice,
  skills: skillsSlice,
  education: educationReducer,
  certifications: certificationsSlice,
  languages: languagesSlice,
  hobbies: hobbiesSlice,
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