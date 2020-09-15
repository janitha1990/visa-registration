import React from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { createUser } from "../store/users/actions";
import { RouteComponentProps } from "react-router";
import DatePicker, { DayValue } from "react-modern-calendar-datepicker";
import { Card } from "../components/UI/Card";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { IUser } from "../store/users/actionTypes";

type Props = RouteComponentProps;
const Register: React.FC<Props> = ({ history }) => {
  const [user, setUserData] = React.useState<IUser>({});

  const handleFormData = (e: React.FormEvent<HTMLInputElement>) => {
    setUserData({
      ...user,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const [day, setDay] = React.useState<DayValue>(null);
  const handleDatePickerChange = (day: DayValue) => {
    setDay(day);
    setUserData({
      ...user,
      expiryDate: day,
    });
  };

  const handleFileChange = (files: FileList) => {
    const fileReader = new FileReader();
    fileReader.addEventListener(
      "load",
      () => {
        setUserData({
          ...user,
          imgData: fileReader.result?.toString(),
        });
      },
      false
    );
    if (files.length > 0) {
      fileReader.readAsDataURL(files[0]);
    }
  };

  const dispatch: Dispatch<any> = useDispatch();
  const onCreateUser = React.useCallback((user: IUser) => dispatch(createUser(user)), [dispatch]);
  // const onGetUser = React.useCallback((user: IUser) => dispatch(getUser(user.id)), [dispatch]);

  const submitUserInfo = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateUser(user);
    history.push("/login");
  };

  return (
    <div className="wrapper">
      <div className="registerForm">
        <h1>Register Form</h1>
        <p className="p1">Enter your details to register</p>
        <form onSubmit={submitUserInfo}>
          <div className="formGroup">
            <label htmlFor="firstname">First Name</label>
            <input placeholder="Enter first name" id="firstName" onChange={handleFormData} />
          </div>
          <div className="formGroup">
            <label htmlFor="lastname">Last Name</label>
            <input placeholder="Enter last name" id="lastName" onChange={handleFormData} />
          </div>
          <div className="formGroup">
            <label htmlFor="passportNo">Passport No</label>
            <input placeholder="Enter Passport No" id="passportNo" onChange={handleFormData} />
          </div>
          <div className="formGroup">
            <label htmlFor="expiryDate">Expiry Date</label>
            <DatePicker value={day} onChange={(day) => handleDatePickerChange(day)} inputPlaceholder="Select a date" />
          </div>
          <div className="formGroup">
            <label htmlFor="passportPicture">Passport Picture</label>
            <input type="file" onChange={(e) => handleFileChange(e.target.files)} />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter password" id="password" onChange={handleFormData} />
          </div>
          <Card cardUser={user} />
          <div className="formGroup">
            <button type="submit" className="formGroup__btn" disabled={!user.firstName || !user.lastName || !user.passportNo || !user.expiryDate || !user.imgData || !user.password ? true : false}>
              Register
            </button>
          </div>
        </form>
      </div>

      <Card cardUser={user} />
    </div>
  );
};

export default Register;
