import { Avatar, Image } from "antd";
import React from "react";

const emojis = ["❤️", "👍", "😆", "😮"];

const SenderContainer = ({ avatar, message }) => {
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
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
      }}
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
      <p
        style={{
          padding: 10,
          backgroundColor: "#f5f5f5",
          borderRadius: 10,
          maxWidth: "60%",
          marginLeft: 10,
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

export default SenderContainer;
