import React from "react";
import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import avatar from "../assets/imgs/avatar.png";
import { IUser, IUserState } from "../store/users/actionTypes";
import { logoutUser } from "../store/users/actions";

type Props = RouteComponentProps;
const Dashboard: React.FC<Props> = ({ history }) => {
  const users: readonly IUser[] = useSelector((state: IUserState) => state.users, shallowEqual);
  const profile: IUser = useSelector((state: IUserState) => state.profile, shallowEqual);
  const message = (
    <div className="message">
      <h3>No submissions</h3>
      <Link to="/register" className="btnLink">
        Click to register
      </Link>
    </div>
  );
  const handleShowSumbmission = (id: any) => {
    history.push(`/profile/${id}`);
  };

  const submissions = users.map((user: IUser) => (
    <div className="item" key={user.id} onClick={() => handleShowSumbmission(user.id)}>
      <div className="item__row">
        <div className="item__profie">
          <img src={avatar} />
        </div>
        <h3>
          <span>{user.firstName}</span>
          <span>{user.lastName}</span>
        </h3>
      </div>
      <div className="item__row item__row--flex">
        <div className="item__data">
          <p className="p1">{user.createdDate}</p>
          <p className="p2">Date Sumbitted</p>
        </div>
        <div className="item__data">
          <p className="p1">
            <span className="item__status">Processing</span>
          </p>
          {/* <p className="p2">Status</p> */}
        </div>
      </div>
    </div>
  ));

  const dispatch: Dispatch<any> = useDispatch();
  const onUnsetUser = React.useCallback((id: number) => dispatch(logoutUser(id)), [dispatch]);

  const logOutHandler = () => {
    onUnsetUser(profile.id);
    history.push(`/login`);
  };
  return (
    <div className="wrapper">
      <div className="wrapper__inner">
        <div className="wrapper__head">
          <h1>Dashboard</h1>
          {profile ? (
            <div className="formGroup">
              <button type="submit" className="btnLink" onClick={logOutHandler}>
                Logout
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="list">
          <div className="listWrapper">{users.length === 0 ? message : submissions}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
