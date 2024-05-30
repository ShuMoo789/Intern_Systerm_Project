import React from "react";
import userImage from "../../assets/user_image.png";
import { SettingTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./AccountSetting.css";

const AccountSetting = (props) => {
  const navigate = useNavigate()
  const handleClickUserImage = () => {
    navigate('/profile')
  }
  return (
    props.disabled 
    ? 
    (
      <div></div>
    )
    :
    (
      <div className="user-container">
        <img onClick={handleClickUserImage} src={userImage} alt="user image" className="user-image" />
        <div className="user-info">
          <div className="user-name">Natalie Brogan</div>
          <div className="user-role">Admin</div>
        </div>
        <SettingTwoTone twoToneColor="#DB0D4B" />
      </div>
    )
  );
};

export default AccountSetting;
