import React, { useState } from "react";
import { Modal, Input, DatePicker, Select, Button, message, Form } from "antd";
import dayjs from "dayjs";
import "./NewProjectModal.css";

// Mock API call to create a project
const mockCreateProjectApi = (projectInfo) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate a success response
            resolve({ success: true, data: projectInfo });
        }, 1000);
    });
};

const NewProjectModal = ({ open, onClose }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: "success",
            content: "Project created successfully",
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
        {
            value: "inProcessed",
            label: "In processed",
        },
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

    const handleInputChange = (key, value) => {
        setProjectInfo((prev) => ({
            ...prev,
            [key]: value,
        }));
        console.log(projectInfo);
    };

    const handleDateChange = (type, date) => {
        setProjectInfo((prev) => ({
            ...prev,
            [type]: date,
        }));
        console.log(projectInfo);
    };

    const createProject = async (projectData) => {
        try {
            const response = await mockCreateProjectApi(projectData);
            if (response.success) {
                success();
                // create(response.data);
                onClose();
            } else {
                error("Failed to create project");
            }
        } catch (err) {
            error("Error creating project");
        }
    };

    const handleSubmit = async (values) => {
        console.log("Submitting project info:", values);
        // await createProject(values); // Assuming `create` is the function to create a project
        success();
        onClose(); // Close the modal after submission
    };

    return (
        <Modal
            title={
                <h3
                    style={{
                        margin: "0",
                        fontFamily: "'Quicksand', sans-serif",
                    }}
                >
                    Add New Project
                </h3>
            }
            open={open}
            width={1200}
            footer={null}
            onCancel={onClose}
            centered
        >
            {contextHolder}
            <Form
                onFinish={handleSubmit}
                initialValues={{
                    ...projectInfo,
                    startDate: projectInfo.startDate
                        ? dayjs(projectInfo.startDate)
                        : null,
                    releaseDate: projectInfo.releaseDate
                        ? dayjs(projectInfo.releaseDate)
                        : null,
                }}
                className="create-new-project-modal"
            >
                <div className="form-info-container">
                    <div className="field">
                        <Form.Item
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the project title!",
                                },
                            ]}
                        >
                            <label>
                                <h4>Project title</h4>
                                <Input type="text" />
                            </label>
                        </Form.Item>
                    </div>
                    <div className="field">
                        <Form.Item
                            name="position"
                            rules={[
                                {
                                    required: false,
                                    message: "Please input the position!",
                                },
                            ]}
                        >
                            <label>
                                <h4>Position</h4>
                                <Input type="text" />
                            </label>
                        </Form.Item>
                    </div>
                    <div className="field">
                        <Form.Item
                            name="technology"
                            rules={[
                                {
                                    required: false,
                                    message: "Please input the technology!",
                                },
                            ]}
                        >
                            <label>
                                <h4>Technology</h4>
                                <Input type="text" />
                            </label>
                        </Form.Item>
                    </div>
                    <div className="field">
                        <Form.Item
                            name="leader"
                            rules={[
                                {
                                    required: false,
                                    message: "Please input the leader!",
                                },
                            ]}
                        >
                            <label>
                                <h4>Leader</h4>
                                <Input type="text" />
                            </label>
                        </Form.Item>
                    </div>
                    <div className="field">
                        <Form.Item
                            name="subLeader"
                            rules={[
                                {
                                    required: false,
                                    message: "Please input the sub leader!",
                                },
                            ]}
                        >
                            <label>
                                <h4>Sub Leaders</h4>
                                <Input type="text" />
                            </label>
                        </Form.Item>
                    </div>
                    <div className="field">
                        <Form.Item
                            name="mentor"
                            rules={[
                                {
                                    required: false,
                                    message: "Please input the mentor!",
                                },
                            ]}
                        >
                            <label>
                                <h4>Mentor</h4>
                                <Input type="text" />
                            </label>
                        </Form.Item>
                    </div>
                    <div className="field">
                        <Form.Item
                            name="startDate"
                            getValueProps={(i) => ({ value: dayjs(i) })}
                            rules={[
                                {
                                    type: "object",
                                    required: false,
                                    message: "Please input the start date!",
                                },
                            ]}
                        >
                            <label>
                                <h4>Start Date</h4>
                                <DatePicker
                                    format={dateFormat}
                                    style={{ width: "100%", height: "3.4em" }}
                                />
                            </label>
                        </Form.Item>
                    </div>
                    <div className="field">
                        <Form.Item
                            name="releaseDate"
                            getValueProps={(i) => ({ value: dayjs(i) })}
                            rules={[
                                {
                                    type: "object",
                                    required: false,
                                    message: "Please input the release date!",
                                },
                            ]}
                        >
                            <label>
                                <h4>Release Date</h4>
                                <DatePicker
                                    format={dateFormat}
                                    style={{ width: "100%", height: "3.4em" }}
                                />
                            </label>
                        </Form.Item>
                    </div>
                    <div className="field">
                        <Form.Item
                            name="groupZalo"
                            rules={[
                                {
                                    required: false,
                                    message: "Please input the group Zalo!",
                                },
                            ]}
                        >
                            <label>
                                <h4>Group Zalo</h4>
                                <Input type="text" />
                            </label>
                        </Form.Item>
                    </div>
                    <div className="field">
                        <Form.Item
                            name="status"
                            rules={[
                                {
                                    required: false,
                                    message: "Please select the status!",
                                },
                            ]}
                        >
                            <label>
                                <h4>Status</h4>
                                <Select
                                    options={optionSelect}
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        margin: "7px 0",
                                    }}
                                />
                            </label>
                        </Form.Item>
                    </div>
                </div>
                <div className="button-container">
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="create-project-btn"
                    >
                        Add Project
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default NewProjectModal;
