import { createContext, useContext, useReducer, Dispatch } from 'react';
import { Nullable } from './core/Shared/Nullable';
import {
  initialState as appInitialState,
  reducer as appReducer,
  AppState,
  AppAction,
} from './appReducer';
import {
  AuthActions,
  AuthState,
  initialState as authInitialState,
  reducer as authReducer,
} from './core/Auth/authReducer';
import { MasterdataRepository } from './core/Shared/Masterdata/MasterdataRepository';

interface Props {
  children: React.ReactElement;
  masterdataRepository: MasterdataRepository;
}

interface AppContext {
  appState: AppState;
  appDispatch: Dispatch<AppAction>;
  authState: AuthState;
  authDispatch: Dispatch<AuthActions>;
  masterdataRepository: MasterdataRepository;
}

export const AppContext = createContext<Nullable<AppContext>>(null);

export const AppContextProvider = ({
  children,
  masterdataRepository,
}: Props) => {
  const [appState, appDispatch] = useReducer(appReducer, appInitialState);
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  return (
    <AppContext.Provider
      value={{
        appState,
        appDispatch,
        authState,
        authDispatch,
        masterdataRepository,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined || context === null) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }

  return { ...context };
};
