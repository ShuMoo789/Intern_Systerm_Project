import React, { useState } from "react"
import './TechnologyManagement.css'
import MainLayout from '../../MainLayout/MainLayout'
import Navigation from "../../components/Navigation/Navigation";
import TechNavigation from "../../components/TechNavigation/TechNavigation";
import TechnologyList from "../../components/TechnologyList/TechnologyList";
import {
  ExportOutlined,
  EditOutlined,
  DeleteOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import GroupButton from "../../components/GroupButton/GroupButton";
import AccountSetting from "../../components/AccountSetting/AccountSetting";
import useViewport from "../../hooks/useViewport";
import { useTranslation } from "react-i18next";


const TechnologyManagement = () => {
  const {t} = useTranslation();
  const viewPort = useViewport()
  const isMobile = viewPort.width <= 1024
  const [activeTab, setActiveTab] = useState('Back-End');

  // Hàm xử lý khi chuyển tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
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
  return (
    <MainLayout>
      <div className="content-technology-management">
        <div className="content-navigation-technology-management">
          <div className="header-navigation-technology-management">
            <div className="title-name-technology-management">
              {t("TECHNOLOGY MANAGEMENT")}
            </div>
            {/* if mobile, width of AccountSetting will change */}
            {!isMobile ? (<div className="account-setting-technology-management">
              <AccountSetting />
            </div>) : (<div className="account-setting-technology-management-mobile">
              <AccountSetting />
            </div>)}
          </div>
          <div className="navigation-technology-management">
            <div className="nav-container" style={{ paddingLeft: 30 }}>
              <TechNavigation activeTab={activeTab} onTabClick={handleTabClick} />
            </div>
          </div>
        </div>

        <div className="sub-content-technology-management">
          <div className="group-button-technology-management">
            <GroupButton groupButton={groupButton} />
          </div>

          <div className="technology-list-container">
            <TechnologyList activeTab={activeTab} />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default TechnologyManagement