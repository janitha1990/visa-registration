import React from "react";
import { Dispatch } from "redux";
import { Link } from "react-router-dom";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ICredentials, IUser, IUserState } from "../store/users/actionTypes";
import { loginUser } from "../store/users/actions";

type Props = RouteComponentProps;

const Login: React.FC<Props> = ({ history }) => {
  const [credentials, setCredentials] = React.useState<ICredentials>({});
  const [user, setUserData] = React.useState<IUser>({});
  const handleFormData = (e: React.FormEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const users: readonly IUser[] = useSelector((state: IUserState) => state.users, shallowEqual);

  const dispatch: Dispatch<any> = useDispatch();
  const onSetUser = React.useCallback((id: number) => dispatch(loginUser(id)), [dispatch]);

  const loginHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    let result: IUser | null = checkAuthentication();
    if (result) {
      onSetUser(result.id);
      history.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };
  const checkAuthentication = () => {
    let result = null;
    if (users.length !== 0) {
      users.map((elm) => {
        if (elm["passportNo"] == credentials.passportNo && elm["password"] == credentials.password) {
          result = elm;
        }
      });
    }
    return result;
  };
  return (
    <div className="loginForm">
      <h1>Login Page</h1>
      <form onSubmit={loginHandler}>
        <div className="formGroup">
          <label htmlFor="passportNo">Passport No</label>
          <input placeholder="Enter passport no" id="passportNo" onChange={handleFormData} />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="" id="password" onChange={handleFormData} />
        </div>
        <div className="formGroup">
          <button type="submit" className="formGroup__btn" onClick={loginHandler} disabled={!credentials.passportNo || !credentials.password ? true : false}>
            Login
          </button>
        </div>
      </form>
      <p className="subtitle">
        Not registered yet? Click <Link to="/register"> here to register </Link>
      </p>
    </div>
  );
};

export default Login;
