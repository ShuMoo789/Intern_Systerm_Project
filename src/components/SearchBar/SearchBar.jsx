import { Button, Flex, Input, Space, Modal, Select, message } from "antd";
import {
  UsergroupAddOutlined,
  PlusOutlined,
  FileExcelOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";

const SearchBar = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [role, setRole] = useState("");
  const [groupZalo, setGroupZalo] = useState("");
  const [project, setProject] = useState("");
  const [mentor, setMentor] = useState("");
  const [groups, setGroups] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await fetch(
        "https://65f40c0f105614e654a1c922.mockapi.io/group"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch groups");
      }
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error("Error fetching groups:", error);
      message.error("Failed to fetch groups");
    }
  };

  const showModal2 = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setErrors({});
  };

  const validateFields = () => {
    const newErrors = {};
    if (!role) newErrors.role = "Role is required";
    if (!groupZalo) newErrors.groupZalo = "Group Zalo is required";
    if (!project) newErrors.project = "Project is required";
    if (!mentor) newErrors.mentor = "Mentor is required";
    return newErrors;
  };

  const handleCreateGroup = async () => {
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      message.error("Please fill in all fields");
      return;
    }

    const newGroup = { role, groupZalo, project, mentor };

    try {
      const response = await fetch(
        "https://65f40c0f105614e654a1c922.mockapi.io/group",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newGroup),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add new group");
      }

      const data = await response.json();
      setGroups([...groups, data]);
      setIsModalOpen(false);

      // Reset form values
      setRole("");
      setGroupZalo("");
      setProject("");
      setMentor("");
      setErrors({});
    } catch (error) {
      console.error("Error adding new group:", error);
      message.error("Failed to add new group");
    }
  };

  const onChangeRole = (value) => {
    setRole(value);
  };

  const onChangeProject = (value) => {
    setProject(value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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
              backgroundColor: "#7d3c98",
              color: "white",
              border: "none",
            }}
            onClick={showModal2}
          >
            Create Group
          </Button>
          <Button
            icon={<FileExcelOutlined />}
            style={{
              minWidth: 150,
              backgroundColor: "#27ae60",
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
              backgroundColor: "#e67e22",
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
              backgroundColor: "#c0392b",
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
              backgroundColor: "#3498db",
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
        title={<h2>Add New Intern</h2>}
        open={visible}
        onCancel={() => setVisible(false)}
        width={740}
        footer={[
          <Button
            icon={<PlusOutlined />}
            style={{
              backgroundColor: "#3498db",
              color: "white",
              border: "none",

              marginTop: "15px",
            }}
            onClick={closeModal}
          >
            Add New Intern
          </Button>,
        ]}
      >
        <Space size={[28, 40]} wrap>
          <div>
            <div>Intern ID</div>
            <Input placeholder="Enter ID" size="large" name="internId" />
          </div>
          <div>
            <div>Full Name</div>
            <Input placeholder="Enter name" size="large" name="fullName" />
          </div>
          <div>
            <div>Phone number</div>
            <Input
              placeholder="Enter phone number"
              size="large"
              name="phoneNumber"
            />
          </div>
          <div>
            <div>Position</div>
            <Input placeholder="Enter position" size="large" name="position" />
          </div>
          <div>
            <div>School</div>
            <Input placeholder="Enter school" size="large" name="school" />
          </div>
          <div>
            <div>Address</div>
            <Input placeholder="Enter address" size="large" name="address" />
          </div>
          <div>
            <div>Email</div>
            <Input placeholder="Enter email" size="large" name="email" />
          </div>
          <div>
            <div>Link CV</div>
            <Input placeholder="Enter link CV" size="large" name="cv" />
          </div>
          <div>
            <div>Mentor</div>
            <Input placeholder="Enter mentor" size="large" name="mentor" />
          </div>
          <div>
            <div>Project</div>
            <Input placeholder="Enter project" size="large" name="project" />
          </div>
          <div>
            <div>Group Zalo</div>
            <Input
              placeholder="Enter Group Zalo"
              size="large"
              name="groupZalo"
            />
          </div>
          <div>
            <div>Role</div>
            <Input placeholder="Enter role" size="large" name="role" />
          </div>
        </Space>
      </Modal>
      <Modal
        title={<h2>Create group</h2>}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            icon={<UsergroupAddOutlined />}
            style={{
              minWidth: 150,
              backgroundColor: "#7d3c98",
              color: "white",
              border: "none",
            }}
            onClick={handleCreateGroup}
          >
            Create group
          </Button>,
        ]}
        style={{
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ width: "33%" }}>
            <p>
              <b>Role</b>
            </p>
            <Select
              showSearch
              placeholder="Select a role"
              optionFilterProp="children"
              onChange={onChangeRole}
              filterOption={filterOption}
              style={{ width: "100%" }}
              options={[
                { value: "Admin", label: "Admin" },
                { value: "Human resources", label: "Human resources" },
                { value: "Mentor", label: "Mentor" },
                { value: "School", label: "School" },
                { value: "Intern", label: "Intern" },
              ]}
              value={role}
            />
            {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}

            {/* Mentor */}
            <p>
              <b>Mentor</b>
            </p>
            <Input
              style={{ width: "100%" }}
              placeholder="Mentor name"
              value={mentor}
              onChange={(e) => setMentor(e.target.value)}
            />
            {errors.mentor && <p style={{ color: "red" }}>{errors.mentor}</p>}
          </div>
          <div
            style={{
              width: "33%",
              paddingLeft: "16px",
              paddingRight: "16px",
              marginLeft: "20px",
            }}
          >
            {/* Project */}
            <p>
              <b>Project</b>
            </p>
            <Select
              showSearch
              placeholder="Select a project"
              optionFilterProp="children"
              onChange={onChangeProject}
              filterOption={filterOption}
              style={{ width: "100%" }}
              options={[{ value: "Project 1", label: "Project 1" }]}
              value={project}
            />
            {errors.project && <p style={{ color: "red" }}>{errors.project}</p>}
          </div>

          <div style={{ width: "33%", paddingLeft: "16px" }}>
            {/* Group zalo */}
            <p>
              <b>Group zalo</b>
            </p>
            <Input
              style={{ width: "100%" }}
              placeholder="FE intern system"
              value={groupZalo}
              onChange={(e) => setGroupZalo(e.target.value)}
            />
            {errors.groupZalo && (
              <p style={{ color: "red" }}>{errors.groupZalo}</p>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SearchBar;
