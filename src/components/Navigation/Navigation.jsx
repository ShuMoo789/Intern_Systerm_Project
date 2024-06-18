import React from "react";
import "./Navigation.css";
import GroupButton from "../GroupButton/GroupButton";
import useViewport from "../../hooks/useViewport";
import { Input, Avatar } from "antd";
import { UserOutlined, BellOutlined, SettingOutlined } from "@ant-design/icons";
import userImage from "../../assets/user_image.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function UserInfo({ name, role, avatarSrc }) {
  return (
    <div className="user-info">
      <div className="avatar-section">
        <Link to="/Profile">
          <Avatar
            style={{ border: "1px solid #67A943" }}
            size={54}
            src={avatarSrc}
            icon={<UserOutlined />}
          />
        </Link>
        <div className="user-details">
          <p className="username">{name}</p>
          <p className="role">{role}</p>
        </div>
      </div>

      <SettingOutlined className="setting-icon" />
    </div>
  );
}

const Navigation = (props) => {
  {
    /*Project-Management*/
  }
  const {t} = useTranslation()
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 1024;

  return (
    <>
      <div className="content-navigation">
        <header className="header-section">
          <h1 className="header-title">{props.titleName}</h1>
          {isMobile ? (
            <SettingOutlined className="setting-icon" />
          ) : (
            <UserInfo
              name="Natalie Brogan"
              role="Admin"
              avatarSrc={userImage}
            />
          )}
        </header>
        <div className="navigation">
          <div className="search-navigation">
            <Input
              className="search-navigation-input"
              placeholder={isMobile ? t("Search") : t("Search for Information")}
              variant="filled"
            />
          </div>
          {/* Pass props to GroupButton from InternList */}
          <div className="group-button-navigation">
            <GroupButton
              groupButton={props.groupButton}
              onSendEmail={props.onSendEmail}
              onCreateIntern={props.onCreateIntern}
              onScheduleInterview={props.onScheduleInterview}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Navigation;
