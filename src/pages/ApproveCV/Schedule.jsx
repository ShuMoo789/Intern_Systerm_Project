import React, { useState, useEffect } from "react";
import {
  DatePicker,
  Button,
  Modal,
  TimePicker,
  Input,
  Select,
  message,
  Form,
} from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Toaster, toast } from "react-hot-toast";
import "./Schedule.css";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
const { TextArea } = Input;

// Options for various dropdowns
const optionsDuration = [
  { value: "15 minutes", label: t("15 minutes") },
  { value: "30 minutes", label: t("30 minutes") },
  { value: "45 minutes", label: t("45 minutes") },
  { value: "1 hour", label: t("1 hour") },
];

const optionsInterviewType = [
  { value: "Online", label: "Online" },
  { value: "Offline", label: "Offline" },
];

const optionsInterviewer = [
  { value: "Nguyen Van A", label: "Nguyen Van A" },
  { value: "Interviewer B", label: "Interviewer B" },
  { value: "Interviewer C", label: "Interviewer C" },
];

const optionsRank = [
  {
    value: "Intern/Senior/Junior",
    label: "Intern/Senior/Junior",
    disabled: true,
  },
  { value: "Intern", label: "Intern" },
  { value: "Senior", label: "Senior" },
  { value: "Junior", label: "Junior" },
];

const optionsPositions = [
  { value: "Back-End", label: "Back-End" },
  { value: "Front-End", label: "Front-End" },
  { value: "BA", label: "BA" },
];
const optionsEmailType = [
  { value: "Types of email", label: t("Types of email"), disabled: true },
  { value: "Email interview", label: t("Email interview") },
  { value: "Email result", label: t("Email result") },
  { value: "Internship information", label: t("Internship information") },
];

const Sheldule = ({ onClose, openPopup }) => {
  const { t } = useTranslation();
  const [timeDuration, setTimeDuration] = useState(optionsDuration[0]);
  const [interviewType, setInterviewType] = useState(optionsInterviewType[0]);
  const [interviewer, setInterviewer] = useState(optionsInterviewer[0]);
  const [emailType, setEmailType] = useState(optionsEmailType[0]);
  const [rank, setRank] = useState(optionsRank[0]);
  const [position, setPosition] = useState(optionsPositions[0]);

  const [loadings, setLoadings] = useState([false]);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Received values:", values);
      // Handle form submission
      onClose();
      form.resetFields();
      message.success("Send Mail Success");
    } catch (error) {
      console.log("Validate Failed:", error);
    }
  };

  const handleCancel = () => {
    onClose();
    form.resetFields();
  };

  const onChange = (date, dateString) => {
    // Handle the date change here
    console.log(date, dateString);
  };

  // hàm tạo hiệu ứng loading khi người dùng bấm vào nút send email
  const enterLoading = async (index) => {
    try {
      await handleOk();
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
      });
      setTimeout(() => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = false;
          return newLoadings;
        });
      }, 1000);
    } catch (error) {
      console.log("Failed to submit:", error);
    }
  };
  return (
    <>
      <Modal
        title={t("Schedule interview for Intern's ID: xxxx")}
        open={openPopup}
        onCancel={handleCancel}
        okButtonProps={{
          disabled:
            !form.isFieldsTouched(true) ||
            form.getFieldsError().filter(({ errors }) => errors.length).length,
        }}
        destroyOnClose={true}
        width={1125}
        height={997}
        footer={[
          <Button
            key="submit"
            type="primary"
            icon={<ClockCircleOutlined />}
            style={{ background: "#6537B1" }}
            loading={loadings[1] || false}
            onClick={() => enterLoading(1)}
          >
            {t("Set Schedule")}
          </Button>,

          <Toaster />,
        ]}
      >
        <Form form={form} layout="vertical">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {/* DATE picker */}
            <div
              style={{
                flex: "0 0 33.33%",
                boxSizing: "border-box",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {t("Date")}
              </div>

              <Form.Item
                name="date"
                rules={[{ required: true, message: t("Please select a date") }]}
              >
                <DatePicker
                  format={{
                    format: "DD/MM/YYYY",
                    type: "mask",
                  }}
                  style={{
                    width: "330px",
                    height: "32px",
                    padding: "8px",
                    border: "1px solid #ccc",
                    boxSizing: "border-box",
                    fontSize: "14px",
                  }}
                />
              </Form.Item>
            </div>
            {/* START TIME */}
            <div
              style={{
                flex: "0 0 33.33%",
                boxSizing: "border-box",
                marginBottom: "20px",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {t("Start Time")}
              </label>

              <Form.Item
                name="startTime"
                rules={[
                  { required: true, message: t("Please select a start time") },
                ]}
              >
                <TimePicker
                  style={{
                    width: "330px",
                    height: "32px",
                    padding: "8px",
                    border: "1px solid #ccc",
                  }}
                  use12Hours
                  onChange={onChange}
                />
              </Form.Item>
            </div>

            {/* TIME DURATION */}
            <div
              style={{
                flex: "0 0 33.33%",
                boxSizing: "border-box",
                marginBottom: "20px",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {t("Time Duration")}
              </label>

              <Form.Item
                name="timeDuration"
                rules={[
                  {
                    required: true,
                    message: t("Please select a time duration"),
                  },
                ]}
              >
                <Select
                  value={timeDuration}
                  onChange={setTimeDuration}
                  options={optionsDuration}
                  style={{
                    width: "330px",
                    height: "32px", // ...
                    font: "bold",
                  }}
                />
              </Form.Item>
            </div>
          </div>

          {/* ROW 2 */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {/* TYPE OF interview */}
            <div
              style={{
                flex: "0 0 33.33%",
                boxSizing: "border-box",
                marginBottom: "20px",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {t("Types of Interviews")}
              </label>

              <Form.Item
                name="interviewType"
                rules={[
                  {
                    required: true,
                    message: t("Please select an interview type"),
                  },
                ]}
              >
                <Select
                  value={interviewType}
                  onChange={setInterviewType}
                  options={optionsInterviewType}
                  style={{
                    width: "330px",
                    height: "32px",
                  }}
                />
              </Form.Item>
            </div>

            {/* INTERVIEWER */}
            <div
              style={{
                flex: "0 0 33.33%",
                boxSizing: "border-box",
                marginBottom: "20px",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {t("Interviewer")}
              </label>

              <Select
                className="position-select"
                style={{
                  position: "absolute",
                  width: "122px",
                  height: "32px",
                  textAlign: "center",
                  textAlignLast: "center",
                  zIndex: 2,
                }}
                value={position}
                onChange={setPosition}
                options={optionsPositions}
              />

              <Form.Item
                name="interviewer"
                rules={[
                  {
                    required: true,
                    message: t("Please select an interviewer"),
                  },
                ]}
              >
                <Select
                  value={interviewer}
                  onChange={setInterviewer}
                  options={optionsInterviewer}
                  style={{
                    width: "330px",
                    height: "32px",
                    textAlign: "right",
                    textAlignLast: "right",
                  }}
                />
              </Form.Item>
            </div>

            {/* LINK GOOGLE MEET */}
            <div
              style={{
                flex: "0 0 33.33%",
                boxSizing: "border-box",
                marginBottom: "20px",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {t("Link Google Meet/Address")}
              </label>
              <Form.Item
                name="link"
                rules={[
                  {
                    required: true,
                    message: t("Please enter a link or address"),
                  },
                ]}
              >
                <Input
                  style={{
                    width: "330px",
                    height: "32px",
                  }}
                />
              </Form.Item>
            </div>
          </div>

          {/* ROW 3  SEND EMAIL */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                flex: "0 0 33.33%",
                boxSizing: "border-box",
                marginBottom: "20px",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {t("Send Email")}
              </label>

              <Form.Item
                name="sendEmail"
                rules={[
                  { required: true, message: t("Please select an email type") },
                ]}
              >
                <Select
                  value={emailType}
                  onChange={setEmailType}
                  options={optionsEmailType}
                  style={{
                    width: "330px",
                    height: "32px",
                  }}
                />
              </Form.Item>
            </div>

            {/* RANK */}
            <div
              style={{
                flex: "0 0 33.33%",
                boxSizing: "border-box",
                marginBottom: "20px",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {t("Rank")}
              </label>
              <Form.Item
                name="rank"
                rules={[{ required: true, message: t("Please select a rank") }]}
              >
                <Select
                  value={rank}
                  onChange={setRank}
                  options={optionsRank}
                  style={{
                    width: "330px",
                    height: "32px",
                  }}
                />
              </Form.Item>
            </div>
          </div>

          {/* ROW 4 : to and bcc */}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {/* TO email andress */}
            <div
              style={{
                flex: "0 50%",
                boxSizing: "border-box",
                marginBottom: "20px",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {t("To")}:
              </label>
              <Form.Item
                name="to"
                rules={[
                  {
                    required: true,
                    message: t("Please enter a 'To' email address"),
                  },
                  {
                    type: "email",
                    message: t("Please enter a valid email address"),
                  },
                ]}
              >
                <Input
                  type="email"
                  style={{
                    width: "510px",
                    height: "32px",
                    padding: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </Form.Item>
            </div>

            {/* BCC address */}
            <div
              style={{
                flex: "0 50%",
                boxSizing: "border-box",
                marginBottom: "20px",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                Bcc:
              </label>
              <Form.Item
                name="BCC"
                rules={[
                  {
                    required: true,
                    message: t("Please enter a 'Bcc' email address"),
                  },
                  {
                    type: "email",
                    message: t("Please enter a valid email address"),
                  },
                ]}
              >
                <Input
                  type="email"
                  style={{
                    width: "510px",
                    height: "32px",
                    padding: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </Form.Item>
            </div>
          </div>

          {/* type of email ROW 5  */}
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
                {t("Choose types of Email")}
              </label>
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <Form.Item
                  name="emailType"
                  rules={[
                    {
                      required: true,
                      message: t("Please select an email type"),
                    },
                  ]}
                >
                  <Select
                    value={emailType}
                    onChange={setEmailType}
                    options={optionsEmailType}
                    style={{
                      width: "300px",
                      height: "32px",
                    }}
                  />
                </Form.Item>
              </div>
            </div>

            <div style={{ marginTop: "25px" }}>
              <Form.Item
                name="emailContent"
                rules={[
                  {
                    required: true,
                    message: t("Please enter your email content"),
                  },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder={t("Enter your mail")}
                  style={{
                    width: "759px",
                    height: "196px",
                  }}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Sheldule;
