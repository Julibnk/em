import { EntityId, PayloadAction } from '@reduxjs/toolkit';

// Reducers compartidos entre diferentes slices

// Guarda el id de un elemento seleccionado
export const setSelectedId = (
  state: {
    selectedId: EntityId | undefined;
  },
  action: PayloadAction<EntityId | undefined>
) => {
  typeof action.payload === 'undefined'
    ? (state.selectedId = undefined)
    : (state.selectedId = action.payload);
};
