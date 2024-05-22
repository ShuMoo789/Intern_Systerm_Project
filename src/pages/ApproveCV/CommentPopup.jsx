import React, { useState, useEffect } from "react";
import { Modal, Input, Button } from "antd";
import "./CommentPopup.css";

const { TextArea } = Input;

const CommentPopup = ({ isVisible, onClose, intern, onSave, initialPage }) => {
  const [major, setMajor] = useState(intern?.major || "");
  const [programmingLanguage, setProgrammingLanguage] = useState(
    intern?.programmingLanguage || ""
  );
  const [projectOnGitHub, setProjectOnGitHub] = useState(
    intern?.projectOnGitHub || ""
  );
  const [position, setPosition] = useState(intern?.position || "");
  const [rank, setRank] = useState(intern?.rank || "Intern");
  const [comment, setComment] = useState("");
  const [selectedOption, setSelectedOption] = useState(initialPage);

  useEffect(() => {
    setSelectedOption(initialPage);
  }, [initialPage]);

  const handleButtonClick = (index) => {
    setSelectedOption(index);
  };

  const handleSave = () => {
    const updatedIntern = {
      ...intern,
      major,
      programmingLanguage,
      projectOnGitHub,
      position,
      rank,
      comment,
    };
    onSave(updatedIntern);
  };

  return (
    <Modal
      title={
        <div id="section-btn">
          <button
            className="toggle-popup-btn"
            style={{
              borderBottom:
                selectedOption === 0 ? "2px solid #4889E9" : "2px solid lightgray",
              color: selectedOption === 0 ? "black" : "#C7BFBF",
              transition: "border-bottom 0.5s",
            }}
            onClick={() => handleButtonClick(0)}
          >
            View details of Intern
          </button>
          <button
            className="toggle-popup-btn"
            style={{
              borderBottom:
                selectedOption === 1 ? "2px solid #4889E9" : "2px solid lightgray",
              color: selectedOption === 1 ? "black" : "#C7BFBF",
              transition: "border-bottom 0.5s",
            }}
            onClick={() => handleButtonClick(1)}
          >
            Comments of CV
          </button>
          <button
            className="toggle-popup-btn"
            style={{
              borderBottom:
                selectedOption === 2 ? "2px solid #4889E9" : "2px solid lightgray",
              color: selectedOption === 2 ? "black" : "#C7BFBF",
              transition: "border-bottom 0.5s",
            }}
            onClick={() => handleButtonClick(2)}
          >
            Result of Interview
          </button>
        </div>
      }
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
      className="comment-popup-modal"
      width={1200}
    >
      {selectedOption === 0 && (
        <div>
          <form>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                  Intern ID
                </label>
                <div
                  style={{
                    width: "260px",
                    height: "57px",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    boxSizing: "border-box",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    textAlign: "left",
                  }}
                >
                  #12345128
                </div>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                  Full Name
                </label>
                <div
                  style={{
                    width: "260px",
                    height: "57px",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    boxSizing: "border-box",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    textAlign: "left",
                  }}
                >
                  Ester Eden
                </div>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                  Date Of Birth
                </label>
                <div
                  style={{
                    width: "260px",
                    height: "57px",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    boxSizing: "border-box",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    textAlign: "left",
                  }}
                >
                  25/11/2003
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                  Phone Number
                </label>
                <div
                  style={{
                    width: "260px",
                    height: "57px",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    boxSizing: "border-box",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    textAlign: "left",
                  }}
                >
                  -378792628
                </div>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                  Position
                </label>
                <div
                  style={{
                    width: "260px",
                    height: "57px",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    boxSizing: "border-box",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    textAlign: "left",
                  }}
                >
                  Back-End
                </div>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                  School
                </label>
                <div
                  style={{
                    width: "260px",
                    height: "57px",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    boxSizing: "border-box",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    textAlign: "left",
                  }}
                >
                  FPT UNIVERSITY
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                  Address
                </label>
                <div
                  style={{
                    width: "260px",
                    height: "57px",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    boxSizing: "border-box",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    textAlign: "left",
                  }}
                >
                  District 9
                </div>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                  Email
                </label>
                <div
                  style={{
                    width: "260px",
                    height: "57px",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    boxSizing: "border-box",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    textAlign: "left",
                  }}
                >
                  abc@example.com
                </div>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                  Link CV
                </label>
                <div
                  style={{
                    width: "260px",
                    height: "57px",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    boxSizing: "border-box",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    textAlign: "left",
                  }}
                >
                  {/* Link CV content */}
                </div>
              </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                Rank
              </label>
              <div
                style={{
                  width: "260px",
                  height: "57px",
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  textAlign: "left",
                }}
              >
                Intern
              </div>
            </div>
          </form>
        </div>
      )}
      {selectedOption === 1 && (
        <div className="comment-section">
          {/* Input fields for comments */}
          <TextArea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder="Enter your comments"
          />
        </div>
      )}
      {selectedOption === 2 && (
        <div className="popup-wrapper">
          {/* Input fields for interview results */}
        </div>
      )}
    </Modal>
  );
};

export default CommentPopup;
