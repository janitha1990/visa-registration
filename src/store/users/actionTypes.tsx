export const CREATE_USER = "CREATE_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export interface ICredentials {
  passportNo?: string;
  password?: string;
}

export interface IUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  passportNo?: string;
  password?: string;
  expiryDate?: any;
  imgData?: string;
  createdDate?: string;
}
export interface IUserState {
  users?: IUser[];
  profile?: IUser;
}

interface ICreateUserAction {
  type: typeof CREATE_USER;
  user: IUser;
}

interface ILoginUserAction {
  type: typeof LOGIN_USER;
  userId: number;
}

interface ILogoutUserAction {
  type: typeof LOGOUT_USER;
  userId: number;
}
export type UserActionTypes = ICreateUserAction | ILoginUserAction | ILogoutUserAction;
