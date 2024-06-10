import React, { useState, useEffect } from "react";
import {

    DatePicker,
    Button,
    Modal,
    TimePicker,
    Input,
    Select,
    message,

  
} from "antd";

import { ClockCircleOutlined } from "@ant-design/icons";
import "./Schedule.css";

const { TextArea } = Input;

const optionsDuration = [

    { value: "15 minutes", label: "15 minutes" },
    { value: "30 minutes", label: "30 minutes" },
    { value: "45 minutes", label: "45 minutes" },
    { value: "1 hour", label: "1 hour" },
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
    { value: "Positions", label: "Positions", disabled: true },
    { value: "Back-End", label: "Back-End" },
    { value: "Front-End", label: "Front-End" },
    { value: "BA", label: "BA" },
];
const optionsEmailType = [
    { value: "Types of email", label: "Types of email", disabled: true },
    { value: "Email interview", label: "Email interview" },
    { value: "Email result", label: "Email result" },
    { value: "Internship information", label: "Internship information" },
];

const Sheldule = () => {
    const [open, setOpen] = useState(false);
    const [loadings, setLoadings] = useState([false]);
    const [timeDuration, setTimeDuration] = useState(optionsDuration[0]);
    const [interviewType, setInterviewType] = useState(optionsInterviewType[0]);
    const [interviewer, setInterviewer] = useState(optionsInterviewer[0]);
    const [emailType, setEmailType] = useState(optionsEmailType[0]);
    const [rank, setRank] = useState(optionsRank[0]);
    const [position, setPosition] = useState(optionsPositions[0]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };
    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const onChange = (date, dateString) => {
        // Handle the date change here
        console.log(date, dateString);
    };

    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                message.success("Send Mail Success");
                handleOk();
                return newLoadings;
            });
        }, 1000);
    };

    return (
        <>
            <Button
                type="primary"
                onClick={showModal}
                style={{ background: "#7d3c98" }}
            >
                <ClockCircleOutlined />
                Schedule interview
            </Button>

            <Modal
                open={open}
                title="Schedule interview for Intern's ID: xxxx"
                onOk={handleOk}
                onCancel={handleCancel}
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
                        Set Schedule
                    </Button>,
                ]}
            >
                <form onSubmit={handleSubmit}>
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
                            <div
                                style={{
                                    display: "block",
                                    fontWeight: "bold",
                                    marginBottom: "5px",
                                }}
                            >
                                Date
                            </div>

                            <DatePicker
                                format={{
                                    format: "YYYY-MM-DD",
                                    type: "mask",
                                }}
                                style={{
                                    width: "330px",
                                    height: "57px",
                                    padding: "8px",
                                    border: "1px solid #ccc",

                                    boxSizing: "border-box", // Add this line
                                    fontSize: "14px", // Adjust font size if needed
                                }}
                            />
                        </div>

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
                                Start Time
                            </label>

                            <TimePicker
                                style={{
                                    width: "330px",
                                    height: "57px",
                                    padding: "8px",
                                    border: "1px solid #ccc",
                                }}
                                use12Hours
                                onChange={onChange}
                            />
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
                                Time Duration
                            </label>

                            <Select
                                value={timeDuration}
                                onChange={setTimeDuration}
                                options={optionsDuration}
                                style={{
                                    width: "330px",
                                    height: "57px",
                                    opacity: 0.5,
                                    font: "bold",
                                }}
                            />
                        </div>
                    </div>

                    {/* SECOND ROUND */}
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
                                Types of Interviews
                            </label>

                            <Select
                                value={interviewType}
                                onChange={setInterviewType}
                                options={optionsInterviewType}
                                style={{
                                    width: "330px",
                                    height: "57px",
                                }}
                            />
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
                                Interviewer
                            </label>

                            <Select
                                className="position-select"
                                style={{
                                    position: "absolute",
                                    width: "122px",
                                    height: "57px",

                                    textAlign: "center",
                                    textAlignLast: "center",
                                    zIndex: 2,
                                }}
                                value={position}
                                onChange={setPosition}
                                options={optionsPositions}
                            ></Select>
                            <Select
                                value={interviewer}
                                onChange={setInterviewer}
                                options={optionsInterviewer}
                                style={{
                                    width: "330px",
                                    height: "57px",

                                    textAlign: "right",
                                    textAlignLast: "right",
                                }}
                            />
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
                                Link Google Meet/Address
                            </label>
                            <Input
                                style={{
                                    width: "330px",
                                    height: "57px",
                                }}
                            />
                        </div>
                    </div>

                    {/* SEND EMAIL */}
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
                                Send Email
                            </label>

                            <Select
                                value={interviewType}
                                onChange={setInterviewType}
                                options={optionsInterviewType}
                                style={{
                                    width: "330px",
                                    height: "57px",
                                }}
                            />
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
                                Rank
                            </label>
                            <Select
                                value={rank}
                                onChange={setRank}
                                options={optionsRank}
                                style={{
                                    width: "330px",
                                    height: "57px",
                                }}
                            />
                        </div>
                    </div>

                    {/* to and bcc */}

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
                                To:
                            </label>
                            <Input
                                type="email"
                                style={{
                                    width: "510px",
                                    height: "57px",
                                    padding: "8px",
                                    border: "1px solid #ccc",
                                }}
                            />
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
                            <Input
                                type="email"
                                style={{
                                    width: "510px",
                                    height: "57px",
                                    padding: "8px",
                                    border: "1px solid #ccc",
                                }}
                            />
                        </div>
                    </div>

                    {/* type of email */}
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
                                Choose types of Email
                            </label>
                            <div
                                style={{ display: "flex", gap: "10px", alignItems: "center" }}
                            >
                                <Select
                                    value={emailType}
                                    onChange={setEmailType}
                                    options={optionsEmailType}
                                    style={{
                                        width: "300px",
                                        height: "57px",
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: "25px" }}>
                            <TextArea
                                rows={4}
                                placeholder="Enter your mail"
                                style={{
                                    width: "759px",
                                    height: "196px",
                                }}
                            />
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default Sheldule;
