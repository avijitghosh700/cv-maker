import { createSlice } from '@reduxjs/toolkit';
import { GeneralModel } from '../../store';

export interface LanguageModel {
  bengali: number;
  english: number;
  hindi: number;
}

export const initialState: GeneralModel<LanguageModel> = {
  data: null,
  isSubmitted: false,
}

export const languagesSlice = createSlice({
  name: 'Languages',
  initialState,
  reducers: {
    save(state, action) {
      state.data = {
        bengali: action.payload.bengali,
        english: action.payload.english,
        hindi: action.payload.hindi,
      }
    },
    setSubmitted(state) {
      state.isSubmitted = true;
    },
    resetSubmitted(state) {
      state.isSubmitted = false;
    }
  }
});

export const { save, setSubmitted, resetSubmitted } = languagesSlice.actions;

export default languagesSlice.reducer;