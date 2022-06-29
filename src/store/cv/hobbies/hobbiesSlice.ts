import { createSlice } from '@reduxjs/toolkit';
import { GeneralModel } from '../../store';

export interface HobbiesModel {
  hobbies: string;
}

export const initialState: GeneralModel<HobbiesModel> = {
  data: null,
  isSubmitted: false,
}

export const hobbiesSlice = createSlice({
  name: 'Hobbies',
  initialState,
  reducers: {
    save(state, action) {
      state.data = {
        ...action.payload as HobbiesModel,
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

export const { save, setSubmitted, resetSubmitted } = hobbiesSlice.actions;

export default hobbiesSlice.reducer;