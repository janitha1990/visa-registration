import { IUserState, UserActionTypes, CREATE_USER, LOGIN_USER, LOGOUT_USER } from "./actionTypes";

const initialState: IUserState = {
  users: [],
};

export function userReducer(state = initialState, action: UserActionTypes): IUserState {
  switch (action.type) {
    case CREATE_USER:
      return {
        users: [...state.users, action.user],
      };
    case LOGIN_USER:
      return {
        ...state,
        profile: state.users.filter((user) => user.id == action.userId)[0],
      };
    case LOGOUT_USER:
      return {
        users: state.users
      };
    default:
      return state;
  }
}
