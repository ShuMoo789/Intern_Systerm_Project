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
} from "@ant-design/icons";
import { Col, Row, Input, Typography } from "antd";

const { TextArea } = Input;
const emojis = ["❤️", "👍", "😆", "😮"];

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
  const [focusedMessageIndex, setFocusedMessageIndex] = useState(null);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, reaction: null }]);
      setInputValue("");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addReaction = (index, emoji) => {
    const newMessages = [...messages];
    newMessages[index].reaction = emoji;
    setMessages(newMessages);
    setFocusedMessageIndex(null); // Hide emoji selector after selecting an emoji
  };

  const renderEmojiSelector = (index) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "10px",
      }}
    >
      {emojis.map((emoji) => (
        <span
          key={emoji}
          style={{ cursor: "pointer", fontSize: "20px" }}
          onClick={() => addReaction(index, emoji)}
        >
          {emoji}
        </span>
      ))}
    </div>
  );

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
              minHeight: "1000px",
              width: "92%",
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "20px",
            }}
          >
            <Row
              style={{
                marginBottom: "20px",
                padding: "10px",
              }}
            >
              <Col span={8}></Col>
              <Col span={8}></Col>
              <Col span={8}>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    tabIndex={0}
                    style={{
                      display: "flex",
                      padding: "10px",
                      borderRadius: "18px",
                      marginBottom: "10px",
                      backgroundColor: "#f5f5f5",
                      flexDirection: "column",
                    }}
                    onFocus={() => setFocusedMessageIndex(index)}
                    onBlur={() => setFocusedMessageIndex(null)}
                  >
                    <TextArea
                      value={message.text}
                      autoSize
                      bordered={false}
                      style={{
                        backgroundColor: "transparent",
                        pointerEvents: "none",
                        padding: 0,
                      }}
                    />
                    {focusedMessageIndex === index &&
                      renderEmojiSelector(index)}
                  </div>
                ))}
              </Col>
            </Row>
            <div style={{ display: "flex" }}>
              <Input
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type a message"
                onPressEnter={handleSendMessage}
                style={{ flex: 1 }}
                addonAfter={
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
