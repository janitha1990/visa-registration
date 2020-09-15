import React from "react";
import { Link } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { RouteComponentProps } from "react-router";

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
  const users: readonly IUser[] = useSelector((state: UserState) => state.users, shallowEqual);

  const loginHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (checkAuthentication()) {
      history.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };
  const checkAuthentication = () => {
    let result = false;
    if (users.length !== 0) {
      users.map((elm) => {
        if (elm["passportNo"] == credentials.passportNo && elm["password"] == credentials.password) {
          result = true;
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
          <button type="submit" className="formGroup__btn" onClick={loginHandler}>
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
