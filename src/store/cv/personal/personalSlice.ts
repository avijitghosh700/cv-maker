import { createSlice } from '@reduxjs/toolkit';

export interface PersonalModel {
  name: string | null;
  email: string | null;
  phone: number | string | null;
  dob: string | null;
  position: string | null;
  summary: string | null;
  linkedin: string | null;
  github: string | null;
}

export const initialState: PersonalModel = {
  name: null,
  email: null,
  phone: null,
  dob: null,
  position: null,
  summary: null,
  linkedin: null,
  github: null,
}

export const personalSlice = createSlice({
  name: 'Personal',
  initialState,
  reducers: {
    save(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.dob = action.payload.dob;
      state.position = action.payload.position;
      state.summary = action.payload.summary;
      state.linkedin = action.payload.linkedin;
      state.github = action.payload.github;
    }
  }
});

export const { save } = personalSlice.actions;

export default personalSlice.reducer;