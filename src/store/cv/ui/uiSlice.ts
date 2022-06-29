import { createSlice } from '@reduxjs/toolkit';

export interface UIModel {
  printable: boolean;
}

export const initialState: UIModel = {
  printable: false,
}

export const uiSlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setPrintable(state) {
      state.printable = true;
    },
    unsetPrintable(state) {
      state.printable = false;
    },
  }
});

export const { setPrintable, unsetPrintable } = uiSlice.actions;
export default uiSlice.reducer;