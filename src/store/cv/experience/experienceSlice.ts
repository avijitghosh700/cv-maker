import { createSlice } from '@reduxjs/toolkit';
import { GeneralModel } from '../../store';

export interface ExperienceBase {
  companyName: string;
  position: string;
  startDate: string | any;
  endDate: string | any;
  yrOfExp: string;
  responsibilities: string;
  current: boolean;
}

export const initialState: GeneralModel<ExperienceBase[]> = {
  data: null,
  isSubmitted: false,
}

export const experienceSlice = createSlice({
  name: 'Experience',
  initialState,
  reducers: {
    save(state, action) {
      state.data = [...action.payload];
    },
    remove(state, action) {
      const experience = action.payload as ExperienceBase;

      state.data = <ExperienceBase[]>state.data?.filter((exp) => ((exp.companyName !== experience.companyName) && (exp.position !== experience.position)));
    },
    setSubmitted(state) {
      state.isSubmitted = true;
    },
    resetSubmitted(state) {
      state.isSubmitted = false;
    }
  }
});

export const { save, remove, setSubmitted, resetSubmitted } = experienceSlice.actions;

export default experienceSlice.reducer;