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

const GroupZaloManagement = () => {
  const {t} = useTranslation()
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
      name: t("Add New Intern"),
      icon: <FolderAddOutlined />,
    },
  ];

  const handleOpenCreateGroup = () => {};
  return (
    <>
      <MainLayout>
        <Navigation
          titleName={t("Group Zalo Management")}
          groupButton={groupButton}
          onSendEmail={handleOpenCreateGroup}
        />
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <div className="main-content" style={{ width: "100%" }}>
              <MyComponent />
            </div>
          </Col>
        </Row>
      </MainLayout>
    </>
  );
};

export default GroupZaloManagement;
