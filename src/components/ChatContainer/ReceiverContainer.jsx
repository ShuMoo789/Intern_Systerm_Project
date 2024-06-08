import React, { useState } from "react";

const emojis = ["❤️", "👍", "😆", "😮"];

const ReceiverContainer = ({ message }) => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleEmojiClick = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    setShowEmojiSelector(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <p
        style={{
          padding: 10,
          backgroundColor: "#f5f5f5",
          borderRadius: 20,
          maxWidth: "60%",
          wordWrap: "break-word",
        }}
        onClick={handleEmojiClick}
      >
        {message}
        {selectedEmoji && (
          <span style={{ marginLeft: 5 }}>{selectedEmoji}</span>
        )}
      </p>
      {showEmojiSelector && (
        <div>
          {emojis.map((emoji) => (
            <span
              key={emoji}
              style={{ cursor: "pointer", fontSize: "20px", marginRight: 5 }}
              onClick={() => handleEmojiSelect(emoji)}
            >
              {emoji}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReceiverContainer;
