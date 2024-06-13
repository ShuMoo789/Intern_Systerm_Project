import React from "react";
import "./Navigation.css";
import GroupButton from "../GroupButton/GroupButton";
import AccountSetting from "../AccountSetting/AccountSetting";
import useViewport from "../../hooks/useViewport";
import { Input, Avatar } from "antd";
import { UserOutlined, BellOutlined, SettingOutlined } from "@ant-design/icons";
import userImage from "../../assets/user_image.png";

function UserInfo({ name, role, avatarSrc }) {
    return (
        <div className="user-info">
            <div className="avatar-section">
                <Avatar size={54} src={avatarSrc} icon={<UserOutlined />} />
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
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    return (
        <>
            <div className="content-navigation">
                {/* <div className="header-navigation">
          <div className="title-name">
              {props.titleName}
          </div>
          <div className="group-header-navigation">
              {!isMobile ? (<div className="account-setting">
                  <AccountSetting />
              </div>) : (<div className="account-setting-mobile">
                  <AccountSetting />
              </div>)}           
          </div>
      </div>  */}
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
            {/* {isMobile ? 'Search' : 'Search for Information'} */}
            <Input
              placeholder={isMobile ? "Search" : "Search for Information"}
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
