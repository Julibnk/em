import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as useReduxDispatch,
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from 'react-redux';

import authReducer from '../Auth/auth-slice';
import layoutReducer from '../components/Shared/Layout/layout-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

//Custom useDispatch and useSelector
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
