import React, { useState } from "react";
import "./TechnologyManagement.css";
import MainLayout from "../../MainLayout/MainLayout";
import Navigation from "../../components/Navigation/Navigation";
import TechNavigation from "../../components/TechNavigation/TechNavigation";
import TechnologyList from "../../components/TechnologyList/TechnologyList";
import {
  ExportOutlined,
  EditOutlined,
  DeleteOutlined,
  FolderAddOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import GroupButton from "../../components/GroupButton/GroupButton";
import { Avatar, Button, message, Popconfirm } from "antd";
import useViewport from "../../hooks/useViewport";
import User_Img from "../../assets/user_image.png";
import { useTranslation } from "react-i18next";

const TechnologyManagement = () => {
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 1024;
  const [activeTab, setActiveTab] = useState("Back-End");

  const { t } = useTranslation();

  // props GroupButton
  // const groupButton = [
  //   {
  //     color: "#41B137",
  //     name: t("Export Excel"),
  //     icon: <ExportOutlined />,
  //   },
  //   {
  //     color: "#FB8632",
  //     name: t("Edit"),
  //     icon: <EditOutlined />,
  //   },
  //   {
  //     color: "#FF3A2E",
  //     name: t("Delete"),
  //     icon: <DeleteOutlined />,
  //   },
  //   {
  //     color: "#4889E9",
  //     name: t("Add New Technology"),
  //     icon: <FolderAddOutlined />,
  //   },
  // ];

  // const confirm = (e) => {
  //   console.log(e);
  //   message.success("Click on Yes");
  // };
  // const cancel = (e) => {
  //   console.log(e);
  //   message.error("Click on No");
  // };

  // Hàm xử lý khi chuyển tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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

  return (
    <div className="content-technology-management">
      <div className="content-navigation-technology-management">
        <header className="header-position">
          <h1 className="header-title">{t("Technology Management")}</h1>
          {isMobile ? (
            <SettingOutlined className="setting-icon" />
          ) : (
            <UserInfo name="Natalie Brogan" role="Admin" avatarSrc={User_Img} />
          )}
        </header>
        <div className="navigation-technology-management">
          <div className="nav-container" style={{ paddingLeft: 30 }}>
            <TechNavigation activeTab={activeTab} onTabClick={handleTabClick} />
          </div>
        </div>
      </div>

      <div className="sub-content-technology-management">
        <div className="group-button-technology-management">

{/* Button with functionality */}
          {/* <Popconfirm
            title="Export folder"
            description="Are you sure to Export this file?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button  type="primary"  style={{ backgroundColor: 'green', borderColor: 'green' }} > <ExportOutlined /> Export Excel</Button>
          </Popconfirm>
          <Popconfirm
            title="Export folder"
            description="Are you sure to Export this file?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" style={{ backgroundColor: 'orange', borderColor: 'orange' }}>  <EditOutlined /> Edit</Button>
          </Popconfirm>
          <Popconfirm
            title="Export folder"
            description="Are you sure to Export this file?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger><DeleteOutlined /> Delete</Button>
          </Popconfirm>
          <Popconfirm
            title="Export folder"
            description="Are you sure to Export this file?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary"><FolderAddOutlined /> Add new Technology</Button>
          </Popconfirm> */}
          {/* this is originnal button list  */}
          {/* <GroupButton groupButton={groupButton} /> */}
        </div>

        <div className="technology-list-container">
          <TechnologyList activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default TechnologyManagement;
