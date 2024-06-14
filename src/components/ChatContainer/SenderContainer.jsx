import { Avatar, Image } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import './SenderContainer.css';

const emojis = ["❤️", "👍", "😆", "😮"];

const SenderContainer = ({ avatar, message }) => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [showEmojiIcon, setShowEmojiIcon] = useState(false);
  const [emojiPickerActive, setEmojiPickerActive] = useState(false);

  const handleEmojiClick = () => {
    setShowEmojiSelector(!showEmojiSelector);
    setEmojiPickerActive(!emojiPickerActive);
  };

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    setShowEmojiSelector(false);
    setEmojiPickerActive(false);
  };

  const handleMouseEnter = () => {
    setShowEmojiIcon(true);
  };

  const handleMouseLeave = () => {
    if (!emojiPickerActive) {
      setShowEmojiIcon(false);
      setShowEmojiSelector(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Avatar
        size={50}
        src={
          <Image
            src={avatar}
            style={{
              objectFit: "cover",
              width: 45,
              height: 45,
              borderRadius: "100%",
            }}
            preview={false}
          />
        }
      />
      <div
        style={{
          padding: 10,
          backgroundColor: "#f5f5f5",
          borderRadius: 10,
          maxWidth: "60%",
          marginLeft: 10,
          fontSize: "20px",
          position: "relative",
        }}
      >


        {message}
        {selectedEmoji && (
          <span className="selected-emoji">{selectedEmoji}</span>
        )}
        {showEmojiIcon && (
          <SmileOutlined
            style={{
              fontSize: "20px",
              position: "absolute",
              bottom: 10,
              right: -30,
              cursor: "pointer",
            }}
            onClick={handleEmojiClick}
          />
        )}
        {showEmojiSelector && (
          <div className="icon-selector">
            {emojis.map((emoji) => (
              <span
                key={emoji}
                style={{ cursor: "pointer", fontSize: "35px" }}
                onClick={() => handleEmojiSelect(emoji)}
              >
                {emoji}
              </span>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default SenderContainer;
