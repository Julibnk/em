import { createSlice, createEntityAdapter, EntityId } from '@reduxjs/toolkit';

import { setSelectedId as helperSetSelectedId } from '../shared/helpers/reducers';

import { Message } from '../Message/Message';

export const messageAdapter = createEntityAdapter<Message>();

type InitialState = {
  selectedId: EntityId | undefined;
};

const initialState = messageAdapter.getInitialState({
  selectedId: undefined,
} as InitialState);

const templateSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setSelectedId: helperSetSelectedId,
  },
});

export const { setSelectedId } = templateSlice.actions;

export default templateSlice.reducer;
