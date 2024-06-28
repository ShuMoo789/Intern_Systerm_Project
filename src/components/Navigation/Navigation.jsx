import React from "react";
import "./Navigation.css";
import GroupButton from "../GroupButton/GroupButton";
import useViewport from "../../hooks/useViewport";
import { Input, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import userImage from "../../assets/user_image.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

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
      <DropdownMenu />
    </div>
  );
}

const Navigation = (props) => {
  const { t } = useTranslation();
  
  
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 1024;

  return (
    <>
      <div className="content-navigation">
        <header className="header-section">
          <h1 className="header-title">{props.titleName}</h1>
          {isMobile ? (
            <DropdownMenu />
          ) : (
            <UserInfo
              name="Natalie Brogan"
              role="Admin"
              avatarSrc={userImage}
            />
          )}
        </header>
        {!props.hideNavigation && (
          <div className="navigation">
            {!props.hideSearch && (
            <div className="search-navigation">
              <Input
                style={{ height: "32px" }}
                className="search-navigation-input"
                placeholder={isMobile ? t("Search") : t("Search for Information")}
                variant="filled"
              />
            </div>)}
            {/* Pass props to GroupButton from InternList */}
            <div className="group-button-navigation">
              <GroupButton
                groupButton={props.groupButton}
                onSendEmail={props.onSendEmail}
                onCreateIntern={props.onCreateIntern}
                onScheduleInterview={props.onScheduleInterview}
                onCreatePosition={props.onCreatePosition}
                checkedCount={props.checkedCount}
                onEdit={props.onEdit}
                onDelete={props.onDelete}
                onExportExcel={props.onExportExcel}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navigation;
