import React, { useState, useEffect } from "react";
import { Modal, Input, Select, Button, Form } from "antd";
import { Toaster, toast } from "react-hot-toast";
import "./CommentPopup.css";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;
const { Option } = Select;

// CommentPopup component
const CommentPopup = ({ isVisible, onClose, intern, onSave, initialPage }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  // Single state object to manage all fields
  const [state, setState] = useState({
    major: intern?.major || "",
    programmingLanguage: intern?.programmingLanguage || "",
    projectOnGitHub: intern?.projectOnGitHub || "",
    position: intern?.position || "",
    rank: intern?.rank || "Intern",
    comment: "",
    selectedOption: initialPage,
  });

  // Effect to set selected option when initial page changes
  useEffect(() => {
    setState((prevState) => ({ ...prevState, selectedOption: initialPage }));
  }, [initialPage]);

  // Function to update any field in the state
  const updateField = (field, value) => {
    setState((prevState) => ({ ...prevState, [field]: value }));
  };

  // Function to handle button click and change selected option
  const handleButtonClick = (index) => {
    updateField("selectedOption", index);
  };

  // Function to handle save action
  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedIntern = {
          ...intern,
          major: values.major,
          programmingLanguage: values.programmingLanguage,
          projectOnGitHub: values.projectOnGitHub,
          position: values.position,
          rank: values.rank,
          comment: values.comment,
        };
        onSave(updatedIntern);
        toast.success("Comments saved successfully!");
        onClose();
      })
      .catch((info) => {
        toast.error("Please fill in all required fields!");
      });
  };

  return (
    <Modal
      title={
        <div id="section-btn">
          {/* Buttons to toggle between different sections */}
          <button
            className="toggle-popup-btn"
            style={{
              borderBottom:
                state.selectedOption === 0
                  ? "2px solid #4889E9"
                  : "2px solid lightgray",
              color: state.selectedOption === 0 ? "black" : "#C7BFBF",
              transition: "border-bottom 0.5s",
            }}
            onClick={() => handleButtonClick(0)}
          >
            {t("View details of Intern")}
          </button>
          <button
            className="toggle-popup-btn"
            style={{
              borderBottom:
                state.selectedOption === 1
                  ? "2px solid #4889E9"
                  : "2px solid lightgray",
              color: state.selectedOption === 1 ? "black" : "#C7BFBF",
              transition: "border-bottom 0.5s",
            }}
            onClick={() => handleButtonClick(1)}
          >
            {t("Comments of CV")}
          </button>
          <button
            className="toggle-popup-btn"
            style={{
              borderBottom:
                state.selectedOption === 2
                  ? "2px solid #4889E9"
                  : "2px solid lightgray",
              color: state.selectedOption === 2 ? "black" : "#C7BFBF",
              transition: "border-bottom 0.5s",
            }}
            onClick={() => handleButtonClick(2)}
          >
            {t("Result of Interview")}
          </button>
        </div>
      }
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      className="comment-popup-modal"
      width={1200}
    >
      {/* Different sections based on selected option */}
      {state.selectedOption === 0 && (
        <div className="detail-popup-comment">
          {/* Section for details of intern */}
          <div className="view-popup-row">
            <label>
              <h4>{t("Intern ID")}</h4>
            </label>
            <Input style={{ height: "32px" }} type="text" value={intern?.internID || ""} readOnly />
          </div>
          <div className="view-popup-row">
            <label>
              <h4>{t("Full Name")}</h4>
            </label>
            <Input style={{ height: "32px" }} type="text" value={intern?.fullName || ""} readOnly />
          </div>
          <div className="view-popup-row">
            <label>
              <h4>{t("Date Of Birth")}</h4>
            </label>
            <Input style={{ height: "32px" }} type="text" value={intern?.dateOfBirth || ""} readOnly />
          </div>
          <div className="view-popup-row">
            <label>
              <h4>{t("Phone Number")}</h4>
            </label>
            <Input style={{ height: "32px" }} type="text" value={intern?.phoneNumber || ""} readOnly />
          </div>
          <div className="view-popup-row">
            <label>
              <h4>{t("Position")}</h4>
            </label>
            <Input
              style={{ height: "32px" }}
              type="text"
              value={intern?.position}
              onChange={(e) => updateField("position", e.target.value)}
            />
          </div>
          <div className="view-popup-row">
            <label>
              <h4>{t("School")}</h4>
            </label>
            <Input style={{ height: "32px" }} type="text" value={intern?.school || ""} readOnly />
          </div>
          <div className="view-popup-row">
            <label>
              <h4>{t("Address")}</h4>
            </label>
            <Input style={{ height: "32px" }} type="text" value={intern?.address || ""} readOnly />
          </div>
          <div className="view-popup-row">
            <label>
              <h4>{t("Email")}</h4>
            </label>
            <Input style={{ height: "32px" }} type="text" value={intern?.email || ""} readOnly />
          </div>
          <div className="view-popup-row">
            <label>
              <h4>Link CV</h4>
            </label>
            <a
              className="view-popup-link"
              href={
                intern?.cvLink ||
                "https://youtu.be/dQw4w9WgXcQ?si=xqVazvMo-5hva6i8"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              Link
            </a>
          </div>
          <div className="view-popup-row">
            <label>
              <h4>{t("Rank")}</h4>
            </label>
            <Input
              style={{ height: "32px" }}
              type="text"
              value={state.rank}
              onChange={(e) => updateField("rank", e.target.value)}
            />
          </div>
        </div>
      )}
      {state.selectedOption === 1 && (
        <div className="comment-section">
          {/* Section for comments of intern */}
          <div className="comment-popup-content">
            <div className="comment-popup-row">
              <label>
                <h4>{t("Major")}</h4>
              </label>

              <Form.Item
                name="major"
                rules={[
                  { required: true, message: t("Please input the major!") },
                ]}
                initialValue={state.major}
              >
                <Input
                  style={{ height: "32px" }}
                  value={state.major}
                  onChange={(e) => updateField("major", e.target.value)}
                />
              </Form.Item>
            </div>
            <div className="comment-popup-row">
              <label>
                <h4>{t("Programming language")}</h4>
              </label>
              <Form.Item
                name="programmingLanguage"
                rules={[
                  {
                    required: true,
                    message: t("Please input the programming language!"),
                  },
                ]}
                initialValue={state.programmingLanguage}
              >
                <Input
                  style={{ height: "32px" }}
                  value={state.programmingLanguage}
                  onChange={(e) =>
                    updateField("programmingLanguage", e.target.value)
                  }
                />
              </Form.Item>
            </div>
            <div className="comment-popup-row">
              <label>
                <h4>{t("Project on GitHub")}</h4>
              </label>
              <Form.Item
                name="projectOnGitHub"
                rules={[
                  {
                    required: true,
                    message: t("Please input the project on GitHub!"),
                  },
                ]}
                initialValue={state.projectOnGitHub}
              >
                <Input
                  style={{ height: "32px" }}
                  value={state.projectOnGitHub}
                  onChange={(e) =>
                    updateField("projectOnGitHub", e.target.value)
                  }
                />
              </Form.Item>

            </div>
            <div className="comment-popup-row">
              <label>
                <h4>{t("Position")}</h4>
              </label>
              <Form.Item
                name="position"
                rules={[
                  { required: true, message: t("Please input the position!") },
                ]}
                initialValue={state.position}
              >
                <Input
                  style={{ height: "32px" }}
                  value={state.position}
                  onChange={(e) => updateField("position", e.target.value)}
                />
              </Form.Item>
            </div>
            <div className="comment-popup-row">
              <label>
                <h4>{t("Rank")}</h4>
              </label>
              <Form.Item
                name="rank"
                rules={[
                  { required: true, message: t("Please select the rank!") },
                ]}
              >
                <Select defaultValue="" style={{ width: "100%", height: "32px" }}>
                  <Option value="Intern">{t("Intern")}</Option>
                  <Option value="Junior">{t("Junior")}</Option>
                  <Option value="Senior">{t("Senior")}</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="comment-popup-row">
              <label>
                <h4>{t("Add Comment")}</h4>
              </label>
              <Form.Item
                name="comment"
                rules={[
                  { required: true, message: t("Please add a comment!") },
                ]}
                initialValue={state.comment}
              >
                <TextArea
                  style={{ height: "32px" }}
                  value={state.comment}
                  onChange={(e) => updateField("comment", e.target.value)}
                  rows={4}
                />
              </Form.Item>
            </div>
          </div>
          <div className="comment-popup-footer">
            {/* Footer buttons to cancel or save comments */}
            <Button onClick={onClose}>{t("Cancel")}</Button>
            <Button type="primary" onClick={handleSave}>
              {t("Save Comments")}
            </Button>
          </div>
        </div>
      )}
      {state.selectedOption === 2 && (
        <Form form={form} className="result-popup-section">
          <div className="result-section">
            <div className="field details">
              <div className="info-2">
                <label>
                  <h4>{t("Programming language")}</h4>
                </label>
                <Form.Item
                  name="programmingLanguage"
                  rules={[
                    {
                      required: true,
                      message: t("Please input the programming language!"),
                    },
                  ]}
                >
                  <Input style={{ height: "32px" }} />
                </Form.Item>
              </div>
              <div className="info-2">
                <label>
                  <h4>{t("Major")}</h4>
                </label>
                <Form.Item
                  name="major"
                  rules={[
                    { required: true, message: t("Please input the major!") },
                  ]}
                >
                  <Input style={{ height: "32px" }} />
                </Form.Item>
              </div>
              <div className="info-2">
                <label>
                  <h4>{t("Which year you are in?")}</h4>
                </label>
                <Form.Item
                  name="year"
                  rules={[
                    { required: true, message: t("Please select your year!") },
                  ]}
                >
                  <Select style={{ width: "100%", height: "32px" }}>
                    <Option value="Sophomore">{t("Sophomore")}</Option>
                    <Option value="Not Sophomore">{t("Not Sophomore")}</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="info-2">
                <label>
                  <h4>{t("Why choose this major?")}</h4>
                </label>
                <Form.Item
                  name="whyMajor"
                  rules={[
                    {
                      required: true,
                      message: t("Please explain why you chose this major!"),
                    },
                  ]}
                >
                  <Input style={{ height: "32px" }} />
                </Form.Item>
              </div>
              <div className="info-2">
                <label>
                  <h4>{t("Why choose to intern at Amazing Tech?")}</h4>
                </label>
                <Form.Item
                  name="whyIntern"
                  rules={[
                    {
                      required: true,
                      message: t(
                        "Please explain why you chose to intern at Amazing Tech!"
                      ),
                    },
                  ]}
                >
                  <Input style={{ height: "32px" }} />
                </Form.Item>
              </div>
              <div className="info-2">
                <label>
                  <h4>{t("How do you know about Amazing Tech?")}</h4>
                </label>
                <Form.Item
                  name="howKnow"
                  rules={[
                    {
                      required: true,
                      message: t(
                        "Please explain how you know about Amazing Tech!"
                      ),
                    },
                  ]}
                >
                  <Input style={{ height: "32px" }} />
                </Form.Item>
              </div>
              <div className="info-2">
                <label>
                  <h4>{t("Do you know the office address?")}</h4>
                </label>
                <Form.Item
                  name="officeAddress"
                  rules={[
                    {
                      required: true,
                      message: t(
                        "Please select if you know the office address!"
                      ),
                    },
                  ]}
                >
                  <Select style={{ width: "100%", height: "32px" }}>
                    <Option value="Yes">{t("Yes")}</Option>
                    <Option value="No">{t("No")}</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="info-2">
                <label>
                  <h4>
                    {t("Do you know about")}{" "}
                    <span style={{ color: "red" }}>{t("UNPAID")}</span>{" "}
                    {t("internships?")}
                  </h4>
                </label>
                <Form.Item
                  name="unpaid"
                  rules={[
                    {
                      required: true,
                      message: t(
                        "Please select if you know about unpaid internships!"
                      ),
                    },
                  ]}
                >
                  <Select style={{ width: "100%", height: "32px" }}>
                    <Option value="Yes">{t("Yes")}</Option>
                    <Option value="No">{t("No")}</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="info-2">
                <label>
                  <h4>
                    {t("What are your desire when interning at Amazing Tech?")}
                  </h4>
                </label>
                <Form.Item
                  name="desire"
                  rules={[
                    {
                      required: true,
                      message: t(
                        "Please explain your desire when interning at Amazing Tech!"
                      ),
                    },
                  ]}
                >
                  <Input style={{ height: "32px" }} />
                </Form.Item>
              </div>
              <div className="info-2">
                <label>
                  <h4>{t("Work online or offline?")}</h4>
                </label>
                <Form.Item
                  name="workMode"
                  rules={[
                    {
                      required: true,
                      message: t(
                        "Please select if you want to work online or offline!"
                      ),
                    },
                  ]}
                >
                  <Select style={{ width: "100%", height: "32px" }}>
                    <Option value="Online">Online</Option>
                    <Option value="Offline">Offline</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="info-2">
                <label>
                  <h4>{t("Are you busy with anything else?")}</h4>
                </label>
                <Form.Item
                  name="busy"
                  rules={[
                    {
                      required: true,
                      message: t(
                        "Please input if you are busy with anything else!"
                      ),
                    },
                  ]}
                >
                  <Input style={{ height: "32px" }} />
                </Form.Item>
              </div>
              <div className="info-2">
                <label>
                  <h4>{t("Communication skill")}</h4>
                </label>
                <Form.Item
                  name="communication"
                  rules={[
                    {
                      required: true,
                      message: t("Please input your communication skill!"),
                    },
                  ]}
                >
                  <Input style={{ height: "32px" }} />
                </Form.Item>
              </div>
            </div>
            <h3>{t("Question of Technology")}</h3>
            <div className="field qot">
              <div className="question">
                <label>
                  <h4>{t("Question")} 1</h4>
                </label>
                <Form.Item
                  name="question1"
                  rules={[
                    {
                      required: true,
                      message: t("Please input the answer for question 1!"),
                    },
                  ]}
                >
                  <Input style={{ height: "32px" }} placeholder={t("Enter intern's answer")} />
                </Form.Item>
              </div>
              <div className="question">
                <label>
                  <h4>{t("Question")} 2</h4>
                </label>
                <Form.Item
                  name="question2"
                  rules={[
                    {
                      required: true,
                      message: t("Please input the answer for question 2!"),
                    },
                  ]}
                >
                  <Input style={{ height: "32px" }} />
                </Form.Item>
              </div>
              <div className="question">
                <label>
                  <h4>{t("Question")} 3</h4>
                </label>
                <Form.Item
                  name="question3"
                  rules={[
                    {
                      required: true,
                      message: t("Please input the answer for question 3!"),
                    },
                  ]}
                >
                  <Input style={{ height: "32px" }} />
                </Form.Item>
              </div>
            </div>
            <h3>{t("Assign Project")}</h3>
            <div className="field ap">
              <div className="pass">
                <label>
                  <h4>{t("Project's Name")}</h4>
                </label>
                <Form.Item
                  name="projectName"
                  rules={[
                    {
                      required: true,
                      message: t("Please input the project name!"),
                    },
                  ]}
                >
                  <Input style={{ height: "32px" }} placeholder={t("Enter intern's answer")} />
                </Form.Item>
              </div>
              <div className="pass">
                <label>
                  <h4>{t("Position")}</h4>
                </label>
                <Form.Item
                  name="projectPosition"
                  rules={[
                    {
                      required: true,
                      message: t("Please input the project position!"),
                    },
                  ]}
                >
                  <Input style={{ height: "32px" }} />
                </Form.Item>
              </div>
              <div className="pass">
                <label>
                  <h4>{t("Group Zalo")}</h4>
                </label>
                <Form.Item
                  name="projectGroupZalo"
                  rules={[
                    {
                      required: true,
                      message: t("Please input the Group Zalo!"),
                    },
                  ]}
                >
                  <Input style={{ height: "32px" }} />
                </Form.Item>
              </div>
            </div>
            <div className="field rs">
              <h2>
                {t("Final result")}:
                <Form.Item
                  name="finalResult"
                  rules={[
                    {
                      required: true,
                      message: t("Please select the final result!"),
                    },
                  ]}
                >
                  <Select defaultValue="Passed" style={{ width: "30%", height: "32px" }}>
                    <Option value="Passed">{t("Passed")}</Option>
                    <Option value="Failed">{t("Failed")}</Option>
                  </Select>
                </Form.Item>
              </h2>
            </div>
            <div className="comment-popup-footer">
              <div
                className="save-btn"
                style={{ marginRight: "1em" }}
                onClick={handleSave}
              >
                {t("Save")}
              </div>
              <Toaster />
            </div>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default CommentPopup;
