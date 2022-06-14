import { createSlice } from '@reduxjs/toolkit';

interface Auth {
  isLoggedIn: boolean;
  isLoginFailed: boolean;
  emsi_access_token: string;
  user: { [k: string]: any };
}

export const authInit: Auth = {
  isLoggedIn: false,
  isLoginFailed: false,
  emsi_access_token: '',
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
    addEMSIToken(state, action) {
      state.emsi_access_token = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.isLoginFailed = false;
      state.emsi_access_token = '';
      state.user = null as any;
    },
    loginError(state) {
      state.isLoggedIn = false;
      state.isLoginFailed = true;
      state.emsi_access_token = '';
      state.user = null as any;
    },
  }
});

export const {
  login,
  logout,
  loginError,
  addEMSIToken
} = authSlice.actions;

export default authSlice.reducer;