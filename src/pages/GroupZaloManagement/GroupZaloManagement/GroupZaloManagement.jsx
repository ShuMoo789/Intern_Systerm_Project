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

const GroupZaloManagement = () => {
  const groupButton = [
    {
      color: "#6537B1",
      name: "Schedule interview",
      icon: <ClockCircleOutlined />,
    },
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
      name: "Add New Intern",
      icon: <FolderAddOutlined />,
    },
  ];

  const handleOpenCreateGroup = () => {};
  return (
    <>
      <MainLayout>
        <Navigation
          titleName="Group Zalo Management"
          groupButton={groupButton}
          onSendEmail={handleOpenCreateGroup}
        />
        <Row>
          <Col span={1}></Col>
          <Col style={{ margin: "0 0 0 60px" }}>
            <MyComponent />
          </Col>
        </Row>
      </MainLayout>
    </>
  );
};

export default GroupZaloManagement;
