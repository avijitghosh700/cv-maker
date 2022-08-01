import { createSlice } from '@reduxjs/toolkit';
import { GeneralModel } from '../../store';

export interface CertificationsBase {
  certificateName: string;
  instituteName: string;
  startDate: string | any;
  endDate: string | any;
  isPermanent: boolean;
}

export const initialState: GeneralModel<CertificationsBase[]> = {
  data: null,
  isSubmitted: false,
}

export const certificationsSlice = createSlice({
  name: 'Certifications',
  initialState,
  reducers: {
    save(state, action) {
      state.data = [...action.payload.reverse()];
    },
    remove(state, action) {
      const certificate = action.payload as CertificationsBase;

      state.data =
        <CertificationsBase[]>state.data
          ?.filter((cert) =>
            (cert.certificateName !== certificate.certificateName) &&
            (cert.instituteName !== certificate.instituteName)
          );
    },
    setSubmitted(state) {
      state.isSubmitted = true;
    },
    resetSubmitted(state) {
      state.isSubmitted = false;
    }
  }
});

export const { save, remove, setSubmitted, resetSubmitted } = certificationsSlice.actions;

export default certificationsSlice.reducer;