import { createSlice } from '@reduxjs/toolkit';

export interface PersonalModel {
  fname: string | null;
  lname: string | null;
  email: string | null;
  phone: number | string | null;
  dob: string | null;
  position: string | null;
  summary: string | null;
  linkedin: string | null;
  github: string | null;
}

export const initialState: { data: PersonalModel; isSubmitted: boolean } = {
  data: {
    fname: null,
    lname: null,
    email: null,
    phone: null,
    dob: null,
    position: null,
    summary: null,
    linkedin: null,
    github: null,
  },
  isSubmitted: false,
}

export const personalSlice = createSlice({
  name: 'Personal',
  initialState,
  reducers: {
    save(state, action) {
      state.data.fname = action.payload.fname;
      state.data.lname = action.payload.lname;
      state.data.email = action.payload.email;
      state.data.phone = action.payload.phone;
      state.data.dob = action.payload.dob;
      state.data.position = action.payload.position;
      state.data.summary = action.payload.summary;
      state.data.linkedin = action.payload.linkedin;
      state.data.github = action.payload.github;
    },
    setSubmitted(state) {
      state.isSubmitted = true;
    },
    resetSubmitted(state) {
      state.isSubmitted = false;
    }
  }
});

export const { save, setSubmitted, resetSubmitted } = personalSlice.actions;

export default personalSlice.reducer;