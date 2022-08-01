import { createSlice } from '@reduxjs/toolkit';
import { UploadFile } from 'antd/lib/upload/interface';
import { GeneralModel } from '../../store';

export interface PersonalModel {
  avatar?: UploadFile | null;
  fname: string | null;
  lname: string | null;
  email: string | null;
  phone: number | string | null;
  dob: string | null;
  position: string | null;
  summary: string | null;
  linkedin: string | null;
  github: string | null;
}

export const initialState: GeneralModel<PersonalModel> = {
  data: null,
  isSubmitted: false,
}

export const personalSlice = createSlice({
  name: 'Personal',
  initialState,
  reducers: {
    save(state, action) {
      state.data = {
        avatar: action.payload.avatar,
        fname: action.payload.fname,
        lname: action.payload.lname,
        email: action.payload.email,
        phone: action.payload.phone,
        dob: action.payload.dob,
        position: action.payload.position,
        summary: action.payload.summary,
        linkedin: action.payload.linkedin,
        github: action.payload.github,
      }
    },
    setSubmitted(state) {
      state.isSubmitted = true;
    },
    resetSubmitted(state) {
      state.isSubmitted = false;
    },
    resetAvatar(state) {
      state.data = {
        ...state.data as PersonalModel,
        avatar: null,
      }
    }
  }
});

export const { save, setSubmitted, resetSubmitted, resetAvatar } = personalSlice.actions;

export default personalSlice.reducer;