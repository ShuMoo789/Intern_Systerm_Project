import React, { useState } from "react";

import {
  ClockCircleOutlined,
  ExportOutlined,
  EditOutlined,
  DeleteOutlined,
  FolderAddOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Col, Row, Input, Typography } from "antd";
import MainLayout from "../../../MainLayout/MainLayout";
import Navigation from "../../../components/Navigation/Navigation";
import MyComponent from "../../SelectFilter/SelectFilter";
import { useTranslation } from "react-i18next";
import DeletePopup from "../../../components/DeletePopup/DeletePopup.jsx"
import ExportExcel from "../../../components/ExportExcelPopup/ExportExcelPopup.jsx"
const GroupZaloManagement = () => {
  const { t } = useTranslation();
  const groupButton = [
    {
      color: "#6537B1",
      name: t("Schedule interview"),
      icon: <ClockCircleOutlined />,
    },
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
      name: t("Add New Group"),
      icon: <FolderAddOutlined />,
    },
  ];

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
    <>
      <Navigation
        titleName={t("Group Zalo Management")}
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
      <Row style={{ margin:"0px 20px"}}>
          <MyComponent />
      </Row>
    </>
  );
};

export default GroupZaloManagement;
