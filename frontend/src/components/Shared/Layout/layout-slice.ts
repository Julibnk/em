import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LayoutState = {
  fullPageLoading: boolean;
  navbarCollapsed: boolean;
};

const initialState: LayoutState = {
  navbarCollapsed: false,
  fullPageLoading: false,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    fullPageLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.fullPageLoading = payload;
    },

    setNavbarCollapsed: (state, { payload }: PayloadAction<boolean>) => {
      state.navbarCollapsed = payload;
    },
  },
});

export const { setNavbarCollapsed, fullPageLoading } = layoutSlice.actions;

export default layoutSlice.reducer;
