import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (defaultMiddleware) => defaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;