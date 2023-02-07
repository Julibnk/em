import { Nullable } from '../Shared/Nullable';
import { User } from '../User/User';

export interface AuthState {
  authorized: boolean;
  jwt: string;
  user: Nullable<User>;
}

export const initialState: AuthState = {
  authorized: false,
  jwt: '',
  user: null,
};

export enum AuthActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export type AuthActions =
  | {
      type: AuthActionType.LOGIN;
      payload: {
        jwt: string;
        user: User;
      };
    }
  | {
      type: AuthActionType.LOGOUT;
    };

export const reducer = (state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return {
        authorized: true,
        jwt: action.payload.jwt,
        user: action.payload.user,
      };
    case AuthActionType.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
