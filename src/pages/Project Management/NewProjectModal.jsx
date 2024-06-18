import React, { useState } from "react";
import { Modal, Input, DatePicker, Select, Button, message, Form, Menu, Dropdown, Table } from "antd";
import dayjs from "dayjs";
import "./NewProjectModal.css";
import { useTranslation } from "react-i18next";
import {DownOutlined} from "@ant-design/icons"

// Mock API call to create a project
const mockCreateProjectApi = (projectInfo) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a success response
      resolve({ success: true, data: projectInfo });
    }, 1000);
  });
};

const NewProjectModal = ({ open, onClose, create }) => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const success = () => {
    messageApi.open({
      type: "success",
      content: t("Project created successfully"),
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "",
    });
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "",
    });
  };

  // option of status column
  const optionSelect = [
    t("Done"),
    t("In Process"),
  ];

  const [projectInfo, setProjectInfo] = useState({
    title: "",
    position: "",
    technology: "",
    leader: "",
    subLeader: "",
    mentor: "",
    startDate: null,
    releaseDate: null,
    groupZalo: "",
    status: "",
  });

  // Date format for date inputs
  const dateFormat = "YYYY/MM/DD";

  // const handleInputChange = (key, value) => {
  //   setProjectInfo((prev) => ({
  //     ...prev,
  //     [key]: value,
  //   }));
  //   console.log(projectInfo);
  // };

  // const handleDateChange = (type, date) => {
  //   setProjectInfo((prev) => ({
  //     ...prev,
  //     [type]: date,
  //   }));
  //   console.log(projectInfo);
  // };

  // // const createProject = async (projectData) => {
  // //   try {
  // //     const response = await mockCreateProjectApi(projectData);
  // //     if (response.success) {
  // //       success();
  // //       create(response.data);
  // //       onClose();
  // //     } else {
  // //       error("Failed to create project");
  // //     }
  // //   } catch (err) {
  // //     error("Error creating project");
  // //   }
  // // };

  const handleCancel = () => {
    onClose();
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    form
      .validateFields()
      .then((values) => {
        console.log("Received values:", values);
        // Handle form submission
        onClose();
        success();
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleChangestatus = (key, record) => {
    record.status = key;
    setSelectedOption(key);
  };
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <Modal
      title={
        <h3 style={{ margin: "0", fontFamily: "'Quicksand', sans-serif" }}>
          {t("Add New Project")}
        </h3>
      }
      open={open}
      width={1200}
      footer={<Button
            type="primary"
            htmlType="submit"
            className="create-project-btn"
            onClick={handleSubmit}
            style={{height: "3.0em"}}
          >
            {t("Add New Project")}
          </Button>}
      onCancel={handleCancel}
      centered
    >
      {contextHolder}
      <Form
        form={form}
        className="create-new-project-modal"
      >
        <div className="form-info-container">
          <div className="field">
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: t("Please input the project title!"),
                },
              ]}
            >
              <label>
                <h4>{t("Project Title")}</h4>
                <Input type="text" />
              </label>
            </Form.Item>
          </div>
          <div className="field">
            <Form.Item
              name="position"
              rules={[
                { required: true, message: t("Please input the position!") },
              ]}
            >
              <label>
                <h4>{t("Position")}</h4>
                <Input type="text" />
              </label>
            </Form.Item>
          </div>
          <div className="field">
            <Form.Item
              name="technology"
              rules={[
                { required: true, message: t("Please input the technology!") },
              ]}
            >
              <label>
                <h4>{t("Technology")}</h4>
                <Input type="text" />
              </label>
            </Form.Item>
          </div>
          <div className="field">
            <Form.Item
              name="leader"
              rules={[
                { required: true, message: t("Please input the leader!") },
              ]}
            >
              <label>
                <h4>{t("Leader")}</h4>
                <Input type="text" />
              </label>
            </Form.Item>
          </div>
          <div className="field">
            <Form.Item
              name="subLeader"
              rules={[
                { required: true, message: t("Please input the sub leader!") },
              ]}
            >
              <label>
                <h4>{t("Sub Leaders")}</h4>
                <Input type="text" />
              </label>
            </Form.Item>
          </div>
          <div className="field">
            <Form.Item
              name="mentor"
              rules={[
                { required: true, message: t("Please input the mentor!") },
              ]}
            >
              <label>
                <h4>{t("Mentor")}</h4>
                <Input type="text" />
              </label>
            </Form.Item>
          </div>
          <div className="field">
            <h4>{t("Start Date")}</h4>
            <Form.Item
              name="startDate"
              rules={[
                {
                  type: 'object',
                  required: true,
                  message: t('Please select the start date!'),
                },
              ]}
            >
              <DatePicker 
                format={dateFormat}
                style={{ width: "100%", height: "3.4em" }}
              />
            </Form.Item>
          </div>
          <div className="field">
            <h4>{t("Release Date")}</h4>
            <Form.Item
              name="releaseDate"
              dependencies={['startDate']}
              rules={[
                {
                  type: 'object',
                  required: true,
                  message: t('Please select the release date!'),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const startDate = getFieldValue('startDate');
                    if (!value || (startDate && value.isAfter(startDate))) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(t('Release date must be after start date!')));
                  },
                }),
              ]}
            >
              <DatePicker 
                format={dateFormat}
                style={{ width: "100%", height: "3.4em" }}
              />
            </Form.Item>
          </div>
          <div className="field">
            <Form.Item
              name="groupZalo"
              rules={[
                { required: true, message: t("Please input the Group Zalo!") },
              ]}
            >
              <label>
                <h4>{t("Group Zalo")}</h4>
                <Input type="text" />
              </label>
            </Form.Item>
          </div>
          <div className="field">
            <h4>{t("Status")}</h4>
            <Form.Item
              name="status"
              rules={[
                { required: true, message: t("Please select the status!") },
              ]}
            >
              <Select
                style={{ width: "100%", height: "3.4em" }}
              >
                <Select.Option value="done">{t("Done")}</Select.Option>
                <Select.Option value="in process">{t("In Procecss")}</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </div>

      </Form>
    </Modal>
  );
};

export default NewProjectModal;
