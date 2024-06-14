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
  PictureFilled,
  LinkOutlined,
  CameraOutlined,
  SmileOutlined,
  ExclamationOutlined,
  EllipsisOutlined,
  LikeOutlined,
  
} from "@ant-design/icons";
import { Col, Row, Input, Flex, Typography, Popover } from "antd";
const { Title } = Typography;
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import './GroupZaloManagementDetails.css'; 

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
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
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

  const addEmoji = (emoji) => {
    setInputValue(inputValue + emoji.native);
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
              height: "65vh",
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
            <div className="chat-input-container chat-input-container-top">
              <div style={{ marginLeft: "5px" }}></div>
              <PictureFilled className="icon"/>
              <CameraOutlined className="icon"/>
              <LinkOutlined className="icon" />
              <ClockCircleOutlined className="icon" />
              <ExclamationOutlined className="icon" />
              <EllipsisOutlined className="icon" />
              
            </div>

            <form onSubmit={handleSubmit}>
              <Input
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type a message"
                className="chat-input chat-input-bottom"

                bordered={false}
                suffix={
                  <div style={{ display: "flex", gap: "10px", alignItems: 'center' }}>
                    <Popover
                      content={<Picker data={data} onEmojiSelect={addEmoji} theme="light" />}
                      trigger="click"
                      visible={emojiPickerVisible}
                      onVisibleChange={() => setEmojiPickerVisible(!emojiPickerVisible)}
                    >
                      <SmileOutlined
                        style={{ cursor: "pointer", fontSize: "25px" }}
                        onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
                      />
                    </Popover>
                    {inputValue.trim() ? (
                      <SendOutlined
                        onClick={() => handleSendMessage(inputValue)}
                        style={{
                          cursor: "pointer",
                          fontSize: "25px",
                          marginRight: "5px",
                        }}
                      />
                    ) : (
                      <LikeOutlined
                        onClick={handleLike}
                        style={{ cursor: "pointer", fontSize: "25px" }}
                      />
                    )}
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

