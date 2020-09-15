import { CREATE_USER, LOGIN_USER, LOGOUT_USER, UserActionTypes, IUser } from "./actionTypes";

export function createUser(user: IUser): UserActionTypes {
  user.id = Math.floor(Math.random() * 10);
  user.createdDate = new Date().toDateString();
  return {
    type: CREATE_USER,
    user,
  };
}

export function loginUser(userId: number): UserActionTypes {
  return {
    type: LOGIN_USER,
    userId,
  };
}

export function logoutUser(userId: number): UserActionTypes {
  return {
    type: LOGOUT_USER,
    userId,
  };
}
