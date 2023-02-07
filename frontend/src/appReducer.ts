export enum AppActionType {
  LOADING = 'LOADING',
}

export interface AppState {
  loading: boolean;
}

export const initialState: AppState = {
  loading: false,
};

export type AppAction = {
  type: AppActionType.LOADING;
  payload: boolean;
};

export const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case AppActionType.LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};
