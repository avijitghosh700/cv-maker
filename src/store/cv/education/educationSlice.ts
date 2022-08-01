import { createSlice } from '@reduxjs/toolkit';
import { GeneralModel } from '../../store';

export interface EducationBase {
  instituteName: string;
  percentile: string;
  degree: string,
  year: string | any
}

export const initialState: GeneralModel<EducationBase[]> = {
  data: null,
  isSubmitted: false,
}

export const educationSlice = createSlice({
  name: 'Education',
  initialState,
  reducers: {
    save(state, action) {
      state.data = [...action.payload.reverse()];
    },
    remove(state, action) {
      const education = action.payload as EducationBase;

      state.data =
        <EducationBase[]>state.data
          ?.filter((ed) => ed.degree !== education.degree && ed.instituteName !== education.instituteName);
    },
    setSubmitted(state) {
      state.isSubmitted = true;
    },
    resetSubmitted(state) {
      state.isSubmitted = false;
    }
  }
});

export const { save, remove, setSubmitted, resetSubmitted } = educationSlice.actions;

export default educationSlice.reducer;