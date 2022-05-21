import { createSlice } from '@reduxjs/toolkit';

export interface ExperienceBase {
  title: string;
  description: string;
}

export interface ExperienceModel {
  experiences: ExperienceBase[] | null;
}

export const initialState: ExperienceModel = {
  experiences: null,
}

export const experienceSlice = createSlice({
  name: 'Experience',
  initialState,
  reducers: {
    save(state, action) {
      state.experiences = [...action.payload.experiences];
    }
  }
});

export const { save } = experienceSlice.actions;

export default experienceSlice.reducer;