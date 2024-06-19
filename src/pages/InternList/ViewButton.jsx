import React, { useState } from "react";
import { DatePicker, TimePicker, Button, Modal } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const ViewButton = () => {
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
        type="primary"
        onClick={showModal}
        style={{
          background: "white",
          color: "blue",
          border: "1px solid blue",
          borderRadius: "15px",
        }}
      >
        {t("View")}
      </Button>

      <Modal
        open={open}
        title={t("Schedule interview for Intern's ID: xxxx")}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1125}
        footer={[]}
      >
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
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
                #12345128
              </div>
            </div>

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
                Ester Eden
              </div>
            </div>
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
                25/11/2003
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
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
                0978792628
              </div>
            </div>

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
                {t("Back-End")}
              </div>
            </div>
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
                {t("FPT University")}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {t("Adress")}
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
                {t("District 9")}
              </div>
            </div>

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
                abc@example.com
              </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                Link CV
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
                Link CV
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              {t("Rank")}
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
              {t("Intern")}
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ViewButton;
