import * as React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { IUser, IUserState } from "../store/users/actionTypes";
type Props = RouteComponentProps<{ id?: string }>;

export const Profile: React.FC<Props> = ({ match }) => {
  const users: readonly IUser[] = useSelector((state: IUserState) => state.users, shallowEqual);

  const user = users.find(({ id }) => id === Number(match.params.id)) as IUser;

  return (
    <div className="userProfile">
      <div className="userProfile__wrap">
        <Link to="/dashboard" className="btnLink">
          Back
        </Link>
        <h1>My Submission</h1>
        <div className="userProfile__row">
          <div className="userProfile__img">
            <img src={user.imgData} />
          </div>
          <h3>
            <span>{user.firstName}</span>
            <span>{user.lastName}</span>
          </h3>
        </div>
        <div className="userProfile__row">
          <p className="p1">{user.passportNo}</p>
          <p className="p2">Passport No</p>
        </div>
        <div className="userProfile__row">
          <p className="p1">{user.expiryDate ? `${user.expiryDate.day}/${user.expiryDate.month}/${user.expiryDate.year}` : "XX/X/XXXX"}</p>
          <p className="p2">Expiry Date</p>
        </div>
        <div className="userProfile__row">
          <p className="p1">{user.createdDate}</p>
          <p className="p2">Date Submitted</p>
        </div>
        <div className="userProfile__row">
          <p className="p1">Processing</p>
          <p className="p2">Status</p>
        </div>
      </div>
    </div>
  );
};
