import { RootState } from '../../../config/store';
import { AllModals } from './layout-slice';

export const selectModal = (state: RootState, modal: AllModals) => {
  // eslint-disable-next-line security/detect-object-injection
  return state.layout.modals[modal];
};
