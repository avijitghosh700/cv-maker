import { createSlice } from '@reduxjs/toolkit';
import { GeneralModel } from '../../store';

export interface SkillsBase {
  skills: string[];
}

export const initialState: GeneralModel<SkillsBase> = {
  data: null,
  isSubmitted: false,
}

export const skillsSlice = createSlice({
  name: 'Skills',
  initialState,
  reducers: {
    save(state, action) {
      state.data = { ...action.payload };
    },
    setSubmitted(state) {
      state.isSubmitted = true;
    },
    resetSubmitted(state) {
      state.isSubmitted = false;
    }
  }
});

export const { save, setSubmitted, resetSubmitted } = skillsSlice.actions;

export default skillsSlice.reducer;