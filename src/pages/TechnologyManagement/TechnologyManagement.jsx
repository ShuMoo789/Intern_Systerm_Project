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
import { Avatar } from "antd";
import useViewport from "../../hooks/useViewport";
import User_Img from "../../assets/user_image.png";
import { useTranslation } from "react-i18next";
import DeletePopup from "../../components/DeletePopup/DeletePopup.jsx";
import ExportExcel from "../../components/ExportExcelPopup/ExportExcelPopup.jsx";

const TechnologyManagement = () => {
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 1024;
  const [activeTab, setActiveTab] = useState("Back-End");

  const { t } = useTranslation();

  // props GroupButton
  const groupButton = [
    {
      color: "#41B137",
      name: t("Export Excel"),
      icon: <ExportOutlined />,
    },
    {
      color: "#FB8632",
      name: t("Edit"),
      icon: <EditOutlined />,
    },
    {
      color: "#FF3A2E",
      name: t("Delete"),
      icon: <DeleteOutlined />,
    },
    {
      color: "#4889E9",
      name: t("Add New Technology"),
      icon: <FolderAddOutlined />,
    },
  ];

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

  const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);
  const handleOpenDelete = () => {
    setDeletePopupVisible(true);
  };

  const handleCloseDeletePopup = () => {
    setDeletePopupVisible(false);
  };

  const [isExportExcelVisible, setExportExcelVisible] = useState(false);
  const handleOpenExportExcel = () => {
    setExportExcelVisible(true);
  };

  const handleCloseExportExcel = () => {
    setExportExcelVisible(false);
  };

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
          <GroupButton
            groupButton={groupButton}
            onDelete={handleOpenDelete}
            onExportExcel={handleOpenExportExcel}
          />
          {/*Render Delete Popup */}
          <DeletePopup
            onClose={handleCloseDeletePopup}
            openPopup={isDeletePopupVisible}
          />
          {/*Render ExportExcel Popup */}
          <ExportExcel
            onClose={handleCloseExportExcel}
            openPopup={isExportExcelVisible}
          />
        </div>

        <div className="technology-list-container">
          <TechnologyList activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default TechnologyManagement;
