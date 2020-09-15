import * as React from "react";
import avatar from "../../assets/imgs/avatar.png";
import { IUser } from "../../store/users/actionTypes";
type Props = {
  cardUser: IUser;
};
export const Card: React.FC<Props> = ({ cardUser }) => {
  return (
    <div className="previewCard">
      <div className="previewCard__inner">
        <div className="previewCard__head">
          <div className="previewCard__pic">
            <img src={cardUser["imgData"] ? cardUser["imgData"] : avatar} />
          </div>
          <div className="previewCard__right">
            <h3>
              <span>{cardUser["firstName"] ? cardUser["firstName"] : "John"}</span>
              <span>{cardUser["lastName"] ? cardUser["lastName"] : "Doe"}</span>
            </h3>
          </div>
        </div>
        <div className="previewCard__body">
          <div className="previewCard__row">
            <div className="previewCard__block">
              <p className="p1">{cardUser["passportNo"] ? cardUser["passportNo"] : "XXXXXXX"}</p>
              <p className="p2">Passport No</p>
            </div>
            <div className="previewCard__block">
              <p className="p1">{cardUser.expiryDate ? `${cardUser.expiryDate.day}/${cardUser.expiryDate.month}/${cardUser.expiryDate.year}` : "XX/X/XXXX"}</p>
              <p className="p2">Expiry Date</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
