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
  CameraOutlined,
  LinkOutlined,
  SmileOutlined,
  ExclamationOutlined,
  EllipsisOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { Col, Row, Input, Flex, Typography } from "antd";
const { Title } = Typography;

import SenderContainer from "../../components/ChatContainer/SenderContainer";
import ReceiverContainer from "../../components/ChatContainer/ReceiverContainer";
import { useTranslation } from "react-i18next";

const GroupZaloManagementDetails = () => {
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

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const iconStyle = { fontSize: "40px" };

  const handleSendMessage = (message) => {
    if (message.trim()) {
      setMessages([...messages, { text: message, reaction: null }]);
      setInputValue("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleLike = () => {
    handleSendMessage("👍");
  };

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
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
              height: "75vh",
              width: "92%",
              backgroundColor: "white",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
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
                    50 {t("members")}
                  </Title>
                </div>
                <div style={{ flex: "0 0 auto" }}>
                  <SearchOutlined />
                  <a href="" style={{ marginRight: "20px" }}>
                    {t("View in Zalo")}
                  </a>
                </div>
              </Flex>

              <SenderContainer
                message={t("Are you done with the work? Reply soon")}
                avatar="https://picsum.photos/200/300"
              />
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
            <div
              style={{
                display: "flex",
                backgroundColor: "#dad6d6",
                border: "1px solid black",
                height: "60px",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div style={{ marginLeft: "5px" }}></div>
              <CameraOutlined style={iconStyle} />
              <LinkOutlined style={iconStyle} />
              <SmileOutlined style={iconStyle} />
              <ClockCircleOutlined style={iconStyle} />
              <ExclamationOutlined style={iconStyle} />
              <EllipsisOutlined style={iconStyle} />
            </div>

            <form onSubmit={handleSubmit}>
              <Input
                value={inputValue}
                onChange={handleInputChange}
                placeholder={t("Type a message")}
                style={{
                  flex: 1,
                  marginBottom: "40px",
                  backgroundColor: "#dad6d6",
                  borderRadius: 0,
                  height: "60px",
                  borderTop: "0",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  borderLeft: "1px solid black",
                  paddingLeft: "25px",
                }}
                bordered={false}
                suffix={
                  <div style={{ display: "flex", gap: "10px" }}>
                    <LikeOutlined
                      onClick={handleLike}
                      style={{ cursor: "pointer", fontSize: "25px" }}
                    />
                    <SendOutlined
                      onClick={() => handleSendMessage(inputValue)}
                      style={{
                        cursor: "pointer",
                        fontSize: "25px",
                        marginRight: "5px",
                      }}
                    />
                  </div>
                }
              />
            </form>
          </Col>
        </Row>
      </MainLayout>
    </>
  );
};

export default GroupZaloManagementDetails;
