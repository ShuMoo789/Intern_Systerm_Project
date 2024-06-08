import React, { useState } from "react";
import MainLayout from "../../MainLayout/MainLayout";
import Navigation from "../../components/Navigation/Navigation";
import {
  ClockCircleOutlined,
  ExportOutlined,
  EditOutlined,
  DeleteOutlined,
  FolderAddOutlined,
  SendOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Col, Row, Input, Flex, Typography } from "antd";
const { Title } = Typography;

import SenderContainer from "../../components/ChatContainer/SenderContainer";
import ReceiverContainer from "../../components/ChatContainer/ReceiverContainer";

const GroupZaloManagementDetails = () => {
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

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, reaction: null }]);
      setInputValue("");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

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
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
              height: "75vh",
              width: "92%",
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "20px",
              overflowY: "auto",
            }}
          >
            <div style={{ flex: "1 1 auto" }}>
              <Flex
                justify="space-between"
                style={{
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <div />
                <div
                  style={{
                    flex: "1 1 auto",
                    textAlign: "center",
                  }}
                >
                  <Title level={2} style={{ margin: 0 }}>
                    Designer_FU_SP24
                  </Title>
                  <Title level={5} style={{ margin: 0 }}>
                    50 members
                  </Title>
                </div>
                <div style={{ flex: "0 0 auto" }}>
                  <SearchOutlined />
                  <a href="" style={{ marginRight: "20px" }}>
                    View in Zalo
                  </a>
                </div>
              </Flex>

              {messages.map((message, index) => (
                <div key={index}>
                  <ReceiverContainer message={message.text} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={1}></Col>
          <Col
            style={{
              width: "92%",
            }}
          >
            <div style={{ flex: "0 0 auto", marginTop: 20 }}>
              <Input
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type a message"
                onPressEnter={handleSendMessage}
                style={{ flex: 1 }}
                suffix={
                  <SendOutlined
                    onClick={handleSendMessage}
                    style={{ cursor: "pointer", color: "#1890ff" }}
                  />
                }
              />
            </div>
          </Col>
        </Row>
      </MainLayout>
    </>
  );
};

export default GroupZaloManagementDetails;
