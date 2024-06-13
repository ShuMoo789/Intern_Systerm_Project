import React, { useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import './ReceiverContainer.css';

const emojis = ["❤️", "👍", "😆", "😮"];

const ReceiverContainer = ({ message }) => {
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
        justifyContent: "flex-end",
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
      
        
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="boxchat">
        {message}
        {selectedEmoji && (
          <span className="selected-emoji2">{selectedEmoji}</span>
        )}
        {showEmojiIcon && (
          <SmileOutlined
            style={{
              fontSize: "20px",
              position: "absolute",
              bottom: 10,
              left: -30,
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

export default ReceiverContainer;
