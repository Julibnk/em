export enum MessageFileModalActions {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
  LOADING = 'LOADING',
}

export interface MessageFileModalState {
  loading: boolean;
  opened: boolean;
}

export const initialState: MessageFileModalState = {
  loading: false,
  opened: false,
};

export type MessageFileModalAction =
  | {
      type: MessageFileModalActions.OPEN | MessageFileModalActions.CLOSE;
    }
  | { type: MessageFileModalActions.LOADING; payload: boolean };

export const messageFileModalReducer = (
  state: MessageFileModalState,
  action: MessageFileModalAction
): MessageFileModalState => {
  switch (action.type) {
    case MessageFileModalActions.OPEN:
      return {
        ...initialState,
        opened: true,
      };

    case MessageFileModalActions.CLOSE:
      return initialState;

    case MessageFileModalActions.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
  }
};
