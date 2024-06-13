import React from "react";
import userImage from "../../assets/user_image.png";
import { SettingTwoTone } from "@ant-design/icons";
import "./AccountSetting.css";
import { useNavigate } from "react-router-dom";
import "./AccountSetting.css";
import useViewport from "../../hooks/useViewport";

const AccountSetting = (props) => {
  const viewPort = useViewport()
  const isMobile = viewPort.width <= 1024
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
        <div>
          {!isMobile ? (<div className="user-container">
            <img onClick={handleClickUserImage} src={userImage} alt="user image" className="user-image" />
            <div className="user-info">
              <div className="user-name">Natalie Brogan</div>
              <div className="user-role">Admin</div>
            </div>
            <SettingTwoTone twoToneColor="#DB0D4B" style={{ fontSize: 16 }} />
          </div>) : (<div className="user-container">
            <img onClick={handleClickUserImage} src={userImage} alt="user image" className="user-image" />
            <SettingTwoTone twoToneColor="#DB0D4B" style={{ fontSize: 26 }} />
          </div>)}
        </div>
      )
  );
};

export default AccountSetting;
