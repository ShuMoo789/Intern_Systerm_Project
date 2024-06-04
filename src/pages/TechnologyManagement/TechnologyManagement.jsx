import React from "react"
import './TechnologyManagement.css'
import MainLayout from '../../MainLayout/MainLayout'
import Navigation from "../../components/Navigation/Navigation";
import {
  ExportOutlined,
  EditOutlined,
  DeleteOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import GroupButton from "../../components/GroupButton/GroupButton";
import AccountSetting from "../../components/AccountSetting/AccountSetting";

// props GroupButton
const groupButton = [
  {
    color: "#41B137",
    name: "Export Excel",
    icon: <ExportOutlined />,
  },
  {
    color: "#FB8632",
    name: "Edit",
    icon: <EditOutlined />,
  },
  {
    color: "#FF3A2E",
    name: "Delete",
    icon: <DeleteOutlined />,
  },
  {
    color: "#4889E9",
    name: "Add New Technology",
    icon: <FolderAddOutlined />,
  },
];

const TechnologyManagement = () => {
  return (
    <MainLayout>
      <div className="content-technology-management">
        <div className="content-navigation-technology-management">
          <div className="header-navigation-technology-management">
            <div className="title-name-technology-management">
              TECHNOLOGY MANAGEMENT
            </div>
            <div className="account-setting-technology-management">
              <AccountSetting />
            </div>
          </div>
          <div className="navigation-technology-management">
            {/* code tab ở đây */}
          </div>
        </div>

        <div className="sub-content-technology-management">
          <div className="group-button-technology-management">
            <GroupButton groupButton={groupButton} />
          </div>
          <div className="table-intern-list">

          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default TechnologyManagement