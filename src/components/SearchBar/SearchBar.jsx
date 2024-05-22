import { Button, Flex, Input, Space, Modal } from "antd";
import {
  UsergroupAddOutlined,
  PlusOutlined,
  FileExcelOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";

const SearchBar = ({ onSubmitIntern }) => {
  const [visible, setVisible] = useState(false);
  const [internData, setInternData] = useState({
    internId: "",
    dateInterview: "",
    timeInterview: "",
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    position: "",
    school: "",
    address: "",
    email: "",
    cv: "",
    comments: "",
    role: "",
    project: "",
    groupZalo: "",
    mentor: "",
    status: "",
    internshipContract: "",
  });

  const showModal = () => {
    setVisible(true);
  };

  const handleSubmit = () => {
    onSubmitIntern(internData);
    setVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInternData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Flex
        style={{
          padding: "25px 30px 25px 20px",
          borderRadius: "25px",
          marginTop: "30px",
          marginBottom: "30px",
          backgroundColor: "#fff",
        }}
      >
        <Input
          placeholder="Search for information"
          style={{
            border: "none",
            minWidth: "400px",
            marginRight: "20px",
            boxShadow: "none",
          }}
        ></Input>
        <Space size={"large"}>
          <Button
            icon={<UsergroupAddOutlined />}
            style={{
              minWidth: 150,
              backgroundColor: "purple",
              color: "white",
              border: "none",
            }}
          >
            Create Group
          </Button>
          <Button
            icon={<FileExcelOutlined />}
            style={{
              minWidth: 150,
              backgroundColor: "green",
              color: "white",
              border: "none",
            }}
          >
            Export Excel
          </Button>
          <Button
            icon={<EditOutlined />}
            style={{
              minWidth: 150,
              backgroundColor: "orange",
              color: "white",
              border: "none",
            }}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            style={{
              minWidth: 150,
              backgroundColor: "red",
              color: "white",
              border: "none",
            }}
          >
            Delete
          </Button>
          <Button
            icon={<PlusOutlined />}
            style={{
              minWidth: 150,
              backgroundColor: "blue",
              color: "white",
              border: "none",
            }}
            onClick={showModal}
          >
            Add New Intern
          </Button>
        </Space>
      </Flex>
      <Modal
        title="Add New Intern"
        open={visible}
        onCancel={() => setVisible(false)}
        width={740}
        footer={[
          <Button
            icon={<PlusOutlined />}
            style={{
              backgroundColor: "blue",
              color: "white",
              border: "none",
              marginRight: "15px",
              marginTop: "15px",
            }}
            onClick={handleSubmit}
          >
            Add New Intern
          </Button>,
        ]}
      >
        <Space size={[28, 40]} wrap>
          <div>
            <div>Intern ID</div>
            <Input
              placeholder="Enter ID"
              size="large"
              value={internData.internId}
              onChange={handleChange}
              name="internId"
            />
          </div>
          <div>
            <div>Full Name</div>
            <Input
              placeholder="Enter name"
              size="large"
              value={internData.fullName}
              onChange={handleChange}
              name="fullName"
            />
          </div>
          <div>
            <div>Phone number</div>
            <Input
              placeholder="Enter phone number"
              size="large"
              value={internData.phoneNumber}
              onChange={handleChange}
              name="phoneNumber"
            />
          </div>
          <div>
            <div>Position</div>
            <Input
              placeholder="Enter position"
              size="large"
              value={internData.position}
              onChange={handleChange}
              name="position"
            />
          </div>
          <div>
            <div>School</div>
            <Input
              placeholder="Enter school"
              size="large"
              value={internData.school}
              onChange={handleChange}
              name="school"
            />
          </div>
          <div>
            <div>Address</div>
            <Input
              placeholder="Enter address"
              size="large"
              value={internData.address}
              onChange={handleChange}
              name="address"
            />
          </div>
          <div>
            <div>Email</div>
            <Input
              placeholder="Enter email"
              size="large"
              value={internData.email}
              onChange={handleChange}
              name="email"
            />
          </div>
          <div>
            <div>Link CV</div>
            <Input
              placeholder="Enter link CV"
              size="large"
              value={internData.cv}
              onChange={handleChange}
              name="cv"
            />
          </div>
          <div>
            <div>Mentor</div>
            <Input
              placeholder="Enter mentor"
              size="large"
              value={internData.mentor}
              onChange={handleChange}
              name="mentor"
            />
          </div>
          <div>
            <div>Project</div>
            <Input
              placeholder="Enter project"
              size="large"
              value={internData.project}
              onChange={handleChange}
              name="project"
            />
          </div>
          <div>
            <div>Group Zalo</div>
            <Input
              placeholder="Enter Group Zalo"
              size="large"
              value={internData.groupZalo}
              onChange={handleChange}
              name="groupZalo"
            />
          </div>
          <div>
            <div>Role</div>
            <Input
              placeholder="Enter role"
              size="large"
              value={internData.role}
              onChange={handleChange}
              name="role"
            />
          </div>
        </Space>
      </Modal>
    </>
  );
};

export default SearchBar;
