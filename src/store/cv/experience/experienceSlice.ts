import { createSlice } from '@reduxjs/toolkit';

export interface ExperienceBase {
  companyName: string;
  position: string;
  responsibilities: string;
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
    },
    remove(state, action) {
      const experience = action.payload as ExperienceBase;
      
      state.experiences = <ExperienceBase[]>state.experiences?.filter((exp) => ((exp.companyName !== experience.companyName) && (exp.position !== experience.position)));
    }
  }
});

export const { save, remove } = experienceSlice.actions;

export default experienceSlice.reducer;