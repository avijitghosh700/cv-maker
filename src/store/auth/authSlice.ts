import { createSlice } from '@reduxjs/toolkit';

interface Auth {
  isLoggedIn: boolean;
  isLoginFailed: boolean;
  user: { [k: string]: any };
}

export const authInit: Auth = {
  isLoggedIn: false,
  isLoginFailed: false,
  user: null as any,
}

export const authSlice = createSlice({
  name: 'Auth',
  initialState: authInit,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.isLoginFailed = false;
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.isLoginFailed = false;
      state.user = null as any;
    },
    loginError(state) {
      state.isLoggedIn = false;
      state.isLoginFailed = true;
      state.user = null as any;
    },
  }
});

export const {
  login,
  logout,
  loginError,
} = authSlice.actions;

export default authSlice.reducer;