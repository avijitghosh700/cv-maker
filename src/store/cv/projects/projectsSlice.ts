import { createSlice } from '@reduxjs/toolkit';
import { GeneralModel } from '../../store';

export interface ProjectsBase {
  name: string;
  description: string;
}

export const initialState: GeneralModel<ProjectsBase[]> = {
  data: null,
  isSubmitted: false,
}

export const projectsSlice = createSlice({
  name: 'Projects',
  initialState,
  reducers: {
    save(state, action) {
      state.data = [...action.payload];
    },
    remove(state, action) {
      const project = action.payload as ProjectsBase;

      state.data =
        <ProjectsBase[]>state.data
          ?.filter((proj) => proj.name !== project.name);
    },
    setSubmitted(state) {
      state.isSubmitted = true;
    },
    resetSubmitted(state) {
      state.isSubmitted = false;
    }
  }
});

export const { save, remove, setSubmitted, resetSubmitted } = projectsSlice.actions;

export default projectsSlice.reducer;