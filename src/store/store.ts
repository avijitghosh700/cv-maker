import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import personalReducer from './cv/personal/personalSlice';
import experienceReducer from './cv/experience/experienceSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    personal: personalReducer,
    experience: experienceReducer,
  },
  middleware: (defaultMiddleware) => defaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;