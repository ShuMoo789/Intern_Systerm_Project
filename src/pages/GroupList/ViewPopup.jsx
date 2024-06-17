import React, { useState } from "react";
import { DatePicker, TimePicker, Button, Modal } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import jsonData from "../../data/GroupList.json";

const ViewPopup = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);

  const [timeDuration, setTimeDuration] = useState("15 minutes");
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDateChange = (date, dateString) => {
    setDate(date);
    console.log(date, dateString);
  };

  const handleTimeChange = (time, timeString) => {
    setStartTime(time);
    console.log(time, timeString);
  };

  return (
    <>
      <Button
        className="view-button"
        onClick={showModal}
        shape="round"
        style={{
          color: "#B22222",
          borderColor: "#B22222",
        }}
      >
        {t("View")}
      </Button>

      <Modal
        open={open}
        title={t("Schedule interview for Intern's ID:")}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1125}
        footer={[]}
      >
        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {/* Intern ID */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {t("Intern ID")}
              </label>
              <div
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: "340px",
                  height: "57px",
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  display: "flex", // Use flexbox
                  alignItems: "center", // Center vertically
                  justifyContent: "flex-start", // Align text to the left
                  textAlign: "left", // Ensure text alignment is left
                }}
              >
                INT001
              </div>
            </div>

            {/* Full name */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {t("Full Name")}
              </label>
              <div
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: "340px",
                  height: "57px",
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  display: "flex", // Use flexbox
                  alignItems: "center", // Center vertically
                  justifyContent: "flex-start", // Align text to the left
                  textAlign: "left", // Ensure text alignment is left
                }}
              >
                John Doe
              </div>
            </div>

            {/* Date of Birth */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {t("Date Of Birth")}
              </label>
              <div
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: "340px",
                  height: "57px",
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  display: "flex", // Use flexbox
                  alignItems: "center", // Center vertically
                  justifyContent: "flex-start", // Align text to the left
                  textAlign: "left", // Ensure text alignment is left
                }}
              >
                1995-03-15
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {/* Phone */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {t("Phone Number")}
              </label>
              <div
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: "340px",
                  height: "57px",
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  display: "flex", // Use flexbox
                  alignItems: "center", // Center vertically
                  justifyContent: "flex-start", // Align text to the left
                  textAlign: "left", // Ensure text alignment is left
                }}
              >
                +1234567890
              </div>
            </div>

            {/* Position */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {t("Position")}
              </label>
              <div
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: "340px",
                  height: "57px",
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  display: "flex", // Use flexbox
                  alignItems: "center", // Center vertically
                  justifyContent: "flex-start", // Align text to the left
                  textAlign: "left", // Ensure text alignment is left
                }}
              >
                {t("Software Engineer Intern")}
              </div>
            </div>

            {/* School */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {t("School")}
              </label>
              <div
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: "340px",
                  height: "57px",
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  display: "flex", // Use flexbox
                  alignItems: "center", // Center vertically
                  justifyContent: "flex-start", // Align text to the left
                  textAlign: "left", // Ensure text alignment is left
                }}
              >
                {t("University of Example")}
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {/* Address */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {t("Address")}
              </label>
              <div
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: "340px",
                  height: "57px",
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  display: "flex", // Use flexbox
                  alignItems: "center", // Center vertically
                  justifyContent: "flex-start", // Align text to the left
                  textAlign: "left", // Ensure text alignment is left
                }}
              >
                {t("123 Example St, Example City")}
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                Email
              </label>
              <div
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: "340px",
                  height: "57px",
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  display: "flex", // Use flexbox
                  alignItems: "center", // Center vertically
                  justifyContent: "flex-start", // Align text to the left
                  textAlign: "left", // Ensure text alignment is left
                }}
              >
                john@example.com
              </div>
            </div>

            {/* CV */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                CV
              </label>
              <div
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: "340px",
                  height: "57px",
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  display: "flex", // Use flexbox
                  alignItems: "center", // Center vertically
                  justifyContent: "flex-start", // Align text to the left
                  textAlign: "left", // Ensure text alignment is left
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                <a>Link</a>
              </div>
            </div>
          </div>

          {/* Row 4 */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {/* Role */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {t("Role")}
              </label>
              <div
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: "340px",
                  height: "57px",
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  display: "flex", // Use flexbox
                  alignItems: "center", // Center vertically
                  justifyContent: "flex-start", // Align text to the left
                  textAlign: "left", // Ensure text alignment is left
                }}
              >
                {t("Developer")}
              </div>
            </div>

            {/* Project */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {t("Project")}
              </label>
              <div
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: "340px",
                  height: "57px",
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  display: "flex", // Use flexbox
                  alignItems: "center", // Center vertically
                  justifyContent: "flex-start", // Align text to the left
                  textAlign: "left", // Ensure text alignment is left
                }}
              >
                {t("Project XYZ")}
              </div>
            </div>

            {/* Group Zalo */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {t("Group Zalo")}
              </label>
              <div
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: "340px",
                  height: "57px",
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  display: "flex", // Use flexbox
                  alignItems: "center", // Center vertically
                  justifyContent: "flex-start", // Align text to the left
                  textAlign: "left", // Ensure text alignment is left
                }}
              >
                {t("Group1")}
              </div>
            </div>
          </div>

          {/* Row 5 */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {/* Mentor */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {t("Mentor")}
              </label>
              <div
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: "340px",
                  height: "57px",
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  display: "flex", // Use flexbox
                  alignItems: "center", // Center vertically
                  justifyContent: "flex-start", // Align text to the left
                  textAlign: "left", // Ensure text alignment is left
                }}
              >
                Jane Smith
              </div>
            </div>

            {/* Status */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {t("Status")}
              </label>
              <div
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: "340px",
                  height: "57px",
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  display: "flex", // Use flexbox
                  alignItems: "center", // Center vertically
                  justifyContent: "flex-start", // Align text to the left
                  textAlign: "left", // Ensure text alignment is left
                }}
              >
                {t("Pending")}
              </div>
            </div>

            {/* Internship Contract */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {t("Internship Contract")}
              </label>
              <div
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: "340px",
                  height: "57px",
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  display: "flex", // Use flexbox
                  alignItems: "center", // Center vertically
                  justifyContent: "flex-start", // Align text to the left
                  textAlign: "left", // Ensure text alignment is left
                }}
              >
                {t("Signed")}
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ViewPopup;
