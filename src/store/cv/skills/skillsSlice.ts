import { createSlice } from '@reduxjs/toolkit';
import { GeneralModel } from '../../store';

export interface SkillsBase {
  value: string,
  [k: string]: any,
}

export const initialState: GeneralModel<SkillsBase[]> = {
  data: null,
  isSubmitted: false,
}

export const skillsSlice = createSlice({
  name: 'Skills',
  initialState,
  reducers: {
    save(state, action) {
      state.data = [ ...action.payload ];
    },
    remove(state, action) {
      state.data && (state.data = state.data.filter((skill) => skill.value !== action.payload.value))
    },
    setSubmitted(state) {
      state.isSubmitted = true;
    },
    resetSubmitted(state) {
      state.isSubmitted = false;
    }
  }
});

export const { save, remove, setSubmitted, resetSubmitted } = skillsSlice.actions;

export default skillsSlice.reducer;