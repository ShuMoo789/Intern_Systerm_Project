import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Input,
  Button,
  Table,
  Checkbox,
  Space,
  Select,
  Modal,
  Form,
  message,
  Dropdown,
  Menu,
} from "antd";

import {
  UsergroupAddOutlined,
  ExportOutlined,
  EditOutlined,
  DeleteOutlined,
  FolderAddOutlined,
  FilterOutlined,
  SearchOutlined,
  DownOutlined
} from "@ant-design/icons";

import jsonData from "../../data/GroupList.json";
import MainLayout from "../../MainLayout/MainLayout";
import Navigation from "../../components/Navigation/Navigation";
import useViewport from "../../hooks/useViewport";
import "./GroupList.css"

const { Option } = Select;

const GroupList = () => {
  const [data, setData] = useState(jsonData);
  const [filteredData, setFilteredData] = useState(jsonData);
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 1024;
  const [visible, setVisible] = useState(false);

  const [filters, setFilters] = useState({
    InternId: "",
    FullName: "",
    DOB: "",
    PhoneNumber: "",
    Address: "",
    Email: "",
    Major: "",
    Position: "",
    School: "",
    Title: "",
    Project: "",
    GroupZalo: "",
  });

  const inputStyle = {
    width: isMobile ? "92%" : "300px",
  };

  useEffect(() => {
    setData(jsonData);
    setFilteredData(jsonData);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSearch = () => {
    const filtered = data.filter((item) =>
      Object.keys(filters).every(
        (key) =>
          filters[key] === "" ||
          (item[key] &&
            item[key]
              .toString()
              .toLowerCase()
              .includes(filters[key].toString().toLowerCase()))
      )
    );
    setFilteredData(filtered);
  };

  const handleClearFilters = () => {
    setFilters({
      InternId: "",
      FullName: "",
      DOB: "",
      PhoneNumber: "",
      Address: "",
      Email: "",
      Major: "",
      Position: "",
      School: "",
      Title: "",
      Project: "",
      GroupZalo: "",
    });
    setFilteredData(data);
  };

  const handleStatusChange = (value, recordToUpdate) => {
    // Update the status of the record
    recordToUpdate.Status = value;
    // Trigger re-render by updating state or forceUpdate
    setData([...data]); // Assuming data is an array of records
  };

  const handleContractChange = (value, recordToUpdate) => {
    // Update the status of the record
    recordToUpdate.InternshipContract = value;
    // Trigger re-render by updating state or forceUpdate
    setData([...data]); // Assuming data is an array of records
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const statusOptions = [
    { label: "Accepted", value: "Accepted", color: "green" },
    { label: "Pending", value: "Pending", color: "red" },
    { label: "Interviewed", value: "Interviewed", color: "orange" },
  ];

  const inputFields = [
    { title: "Intern ID", placeholder: "#12345128" },
    { title: "Full name", placeholder: "Esther Eden" },
    { title: "Phone number ", placeholder: "090759355" },
    { title: "Position", placeholder: "Back-end" },
    { title: "School", placeholder: "FPT University" },
    { title: "Address", placeholder: "District 9" },
    { title: "Email", placeholder: "abc@gmail.com" },
    { title: "Link CV", placeholder: "Link" },
    { title: "Mentor", placeholder: "Ajmal Abdul" },
    { title: "Project", placeholder: "Intern System" },
    { title: "Group Zalo", placeholder: "FE Intern System" },
    { title: "Role", placeholder: "Leader" },
  ];

  const contractOptions = [
    { label: "Signed", value: "Signed", color: "green" },
    { label: "Pending", value: "Pending", color: "red" },
  ];

  const groupButton = [
    {
      color: "#6537B1",
      name: "Create Group",
      icon: <UsergroupAddOutlined />,
    },
    {
      color: "#41B137",
      name: "Export Excel",
      icon: <ExportOutlined />,
    },
    {
      color: "#FB8632",
      name: "Edit",
      icon: <EditOutlined />,
    },
    {
      color: "#FF3A2E",
      name: "Delete",
      icon: <DeleteOutlined />,
    },
    {
      color: "#4889E9",
      name: "Add New Intern",
      icon: <FolderAddOutlined />,
    },
  ];

  const handleCreateIntern = () => {
    setVisible(true);
  };

  const columns = [
    {
      title: "",
      dataIndex: "select",
      render: (_, record) => <Checkbox />,
      width: 50,
    },
    {
      title: "Intern ID",
      dataIndex: "InternId",
      key: "InternId",
      width: 140,
    },
    {
      title: "Date of Interview",
      dataIndex: "DateInterview",
      key: "DateInterview",
      width: 140,
    },
    {
      title: "Time of Interview",
      dataIndex: "TimeInterview",
      key: "TimeInterview",
      width: 140,
    },
    {
      title: "Full Name",
      dataIndex: "FullName",
      key: "FullName",
      width: 140,
    },
    {
      title: "Date of Birth",
      dataIndex: "DateOfBirth",
      key: "DateOfBirth",
      width: 140,
    },
    {
      title: "Phone Number",
      dataIndex: "PhoneNumber",
      key: "PhoneNumber",
      width: 140,
    },
    {
      title: "Position",
      dataIndex: "Position",
      key: "Position",
      width: 140,
    },
    {
      title: "School",
      dataIndex: "School",
      key: "School",
      width: 140,
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address",
      width: 140,
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      width: 140,
    },
    {
      title: "CV",
      dataIndex: "CV",
      // key: "CV",
      // width: 140,
      render: (text) => (
        <a
          href={text}
          style={{ color: "#0000FF", textDecoration: "underline" }}
        >
          Link
        </a>
      ),
    },
    {
      title: "Comments",
      dataIndex: "Comments",
      key: "Comments",
      width: 140,
    },
    {
      title: "Role",
      dataIndex: "Role",
      key: "Role",
      width: 140,
    },
    {
      title: "Project",
      dataIndex: "Project",
      key: "Project",
      width: 140,
    },
    {
      title: "Group Zalo",
      dataIndex: "GroupZalo",
      key: "GroupZalo",
      width: 140,
    },
    {
      title: "Mentor",
      dataIndex: "Mentor",
      key: "Mentor",
      width: 140,
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      width: 140,

      render: (text, record) => (
        <div style={{ width: 126 }}>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item value="Accepted" onClick={() => handleStatusChange("Accepted", record)}>
                  <span>Accepted</span>
                </Menu.Item>
                <Menu.Item value="Pending" onClick={() => handleStatusChange("Pending", record)}>
                  <span>Pending</span>
                </Menu.Item>
                <Menu.Item value="Interviewed" onClick={() => handleStatusChange("Interviewed", record)}>
                  <span>Interviewed</span>
                </Menu.Item>
              </Menu>
            }
          >
            <Button
              style={{
                backgroundColor:
                  record.Status === "Accepted" ? "#EFF9F1" :
                    record.Status === "Pending" ? "#F8E7EE" :
                      record.Status === "Interviewed" ? "#E8F4FD" : "FFFFFF",
                color:
                  record.Status === "Accepted" ? "#449E3C": 
                    record.Status === "Pending" ? "#B70D52": 
                      record.Status === "Interviewed" ? "#106BA3" : "#333333",
                borderRadius: "50px", // Đặt bo tròn thành hình tròn
                marginLeft: "-8px",
                width: "100%",
                fontSize: "12px",
              }}
            >
              {record.Status}
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      ),
    },
    {
      title: "Internship Contract",
      dataIndex: "InternshipContract",
      key: "InternshipContract",
      width: 160,

      render: (text, record) => (
        <div style={{ width: 126 }}>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item value="Signed" onClick={() => handleContractChange("Signed", record)}>
                  <span>Signed</span>
                </Menu.Item>
                <Menu.Item value="Pending" onClick={() => handleContractChange("Pending", record)}>
                  <span>Pending</span>
                </Menu.Item>
              </Menu>
            }
          >
            <Button
              style={{
                backgroundColor:
                  record.InternshipContract === "Signed" ? "#EFF9F1": 
                    record.InternshipContract === "Pending" ? "#F8E7EE": "FFFFFF",
                color:
                  record.InternshipContract === "Signed" ? "#449E3C" :
                    record.InternshipContract === "Pending" ? "#B70D52": "#333333",
                borderRadius: "50px", // Đặt bo tròn thành hình tròn
                marginLeft: "-8px",
                width: "100%",
                fontSize: "12px",
              }}
            >
              {record.InternshipContract}
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      ),
    },
    {
      title: "Button",
      key: "Button",
      // width: 200,
      render: (_, record) => (
        <div className="grouplist-btns">
          <div className="view">
            {("View")}
          </div>
          <div className="feedbacks">
            {("Upload file")}
          </div>
        </div>
      ),
    },
  ];

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel2 = () => {
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
      message.success("Group created successfully!");
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

  const [modalWidth, setModalWidth] = useState("64%");

  useEffect(() => {
    const updateModalWidth = () => {
      if (window.innerWidth <= 600) {
        setModalWidth("90%");
      } else if (window.innerWidth <= 1024) {
        setModalWidth("75%");
      } else {
        setModalWidth("64%");
      }
    };

    updateModalWidth();
    window.addEventListener("resize", updateModalWidth);

    return () => {
      window.removeEventListener("resize", updateModalWidth);
    };
  }, []);

  const [formValues, setFormValues] = useState(
    inputFields.reduce((acc, field) => ({ ...acc, [field.title]: "" }), {})
  );

  const handleInputChange = (e, title) => {
    setFormValues({ ...formValues, [title]: e.target.value });
  };

  const handleSubmit = () => {
    const allFieldsFilled = Object.values(formValues).every(
      (value) => value.trim() !== ""
    );
    if (allFieldsFilled) {
      handleCancel();
    } else {
      message.error("Please fill all fields");
    }
  };

  return (
    <>
      <div>
        <MainLayout>
          <div style={{ marginBottom: isMobile ? "20px" : 0 }}>
            <Navigation
              titleName="GROUP LIST"
              groupButton={groupButton}
              onSendEmail={showModal}
              onCreateIntern={handleCreateIntern}
            />
          </div>
          <div>
            <Row>
              <Col span={1}></Col>
              <Col span={23}>
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "25px",
                    width: "96%",
                  }}
                >
                  <Space
                    style={{
                      margin: "20px 0 30px 30px ",
                      width: isMobile ? "93%" : "960px",
                      flexDirection: isMobile ? "column" : "row",
                      alignItems: "unset",
                    }}
                    size={[8, 8]}
                    wrap
                  >
                    <Input
                      style={inputStyle}
                      placeholder="Enter intern's ID"
                      name="InternId"
                      value={filters.InternId}
                      onChange={handleFilterChange}
                    />
                    <Input
                      style={inputStyle}
                      placeholder="Enter intern's Full name"
                      name="FullName"
                      value={filters.FullName}
                      onChange={handleFilterChange}
                    />
                    <Input
                      style={inputStyle}
                      placeholder="Enter intern's D.O.B"
                      name="DOB"
                      value={filters.DOB}
                      onChange={handleFilterChange}
                    />
                    <Input
                      style={inputStyle}
                      placeholder="Enter intern's Phone number"
                      name="PhoneNumber"
                      value={filters.PhoneNumber}
                      onChange={handleFilterChange}
                    />
                    <Input
                      style={inputStyle}
                      placeholder="Enter intern's Address"
                      name="Address"
                      value={filters.Address}
                      onChange={handleFilterChange}
                    />
                    <Input
                      style={inputStyle}
                      placeholder="Enter intern's Email"
                      name="Email"
                      value={filters.Email}
                      onChange={handleFilterChange}
                    />
                    <Input
                      style={inputStyle}
                      placeholder="Enter intern's Major"
                      name="Major"
                      value={filters.Major}
                      onChange={handleFilterChange}
                    />
                    <Input
                      style={inputStyle}
                      placeholder="Enter intern's Position"
                      name="Position"
                      value={filters.Position}
                      onChange={handleFilterChange}
                    />
                    <Input
                      style={inputStyle}
                      placeholder="Enter intern's School"
                      name="School"
                      value={filters.School}
                      onChange={handleFilterChange}
                    />
                    <Input
                      style={inputStyle}
                      placeholder="Enter intern's Title"
                      name="Title"
                      value={filters.Title}
                      onChange={handleFilterChange}
                    />
                    <Input
                      style={inputStyle}
                      placeholder="Enter intern's Project"
                      name="Project"
                      value={filters.Project}
                      onChange={handleFilterChange}
                    />
                    <Input
                      style={inputStyle}
                      placeholder="Enter intern's Group Zalo"
                      name="GroupZalo"
                      value={filters.GroupZalo}
                      onChange={handleFilterChange}
                    />
                  </Space>
                  <Space
                    direction="vertical"
                    style={{
                      width: isMobile ? "96%" : "0",
                      marginBottom: isMobile ? "30px" : 0,
                      margin: isMobile ? "0 10px" : "0",
                    }}
                  >
                    <Button
                      style={{
                        width: isMobile ? "100%" : 120,
                      }}
                      icon={<FilterOutlined />}
                      onClick={handleClearFilters}
                    >
                      Clear filter
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "#4889E9",
                        color: "white",
                        width: isMobile ? "100%" : 120,
                      }}
                      icon={<SearchOutlined />}
                      onClick={handleSearch}
                    >
                      Search
                    </Button>
                  </Space>
                  <div
                    style={{
                      overflowX: "auto",
                      width: isMobile ? "100%" : "100%",
                    }}
                  >
                    <Table
                      columns={columns}
                      dataSource={filteredData}
                      scroll={{ x: 1400 }}
                      pagination={{ pageSize: 6 }}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </MainLayout>

        <Modal
          title={<span style={{ fontSize: "25px" }}>Add New Intern</span>}
          open={visible}
          onCancel={handleCancel}
          footer={[
            <Button
              key="addNewIntern"
              type="primary"
              onClick={handleSubmit}
              style={{ margin: "20px 20px 0 0" }}
            >
              Add New Intern
            </Button>,
          ]}
          width={modalWidth}
        >
          <Space
            size={[80, 50]}
            wrap
            style={{
              marginTop: "20px",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {inputFields.map((field, index) => (
              <Space
                key={index}
                direction="vertical"
                size="small"
                style={{ width: "300px" }}
              >
                <label style={{ fontWeight: "bold" }}>{field.title}</label>
                <Input
                  placeholder={field.placeholder}
                  value={formValues[field.title]}
                  onChange={(e) => handleInputChange(e, field.title)}
                  style={{
                    width: "100%",
                    height: "60px",
                    borderRadius: "15px",
                  }}
                />
              </Space>
            ))}
          </Space>
        </Modal>

        <Modal
          title={<h2>Create group</h2>}
          open={isModalOpen}
          onCancel={handleCancel2}
          footer={null}
          style={{
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          <Row justify="center">
            <Col span={8}>
              <div style={{ width: "95%", alignContent: "center" }}>
                {/* Project */}
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
              </div>

              <div style={{ width: "95%", alignContent: "center" }}>
                {/* Group zalo */}
                <p>
                  <b>Mentor</b>
                </p>

                <Input
                  style={{ width: "100%" }}
                  placeholder="Mentor name"
                  value={mentor}
                  onChange={(e) => setMentor(e.target.value)}
                />
                {errors.mentor && (
                  <p style={{ color: "red" }}>{errors.mentor}</p>
                )}
              </div>
            </Col>

            <Col span={8}>
              <div style={{ width: "95%", alignContent: "center" }}>
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
                {errors.project && (
                  <p style={{ color: "red" }}>{errors.project}</p>
                )}
              </div>
            </Col>

            <Col span={8}>
              <div style={{ width: "100%", alignContent: "center" }}>
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
                  <p style={{ color: "red", width: "120%" }}>
                    {errors.groupZalo}
                  </p>
                )}
              </div>
            </Col>
          </Row>
          <div style={{ width: "100%", alignContent: "center" }}>
            <Button
              type="primary"
              onClick={handleCreateGroup}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "auto",
                backgroundColor: "#6537B1",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <span>Create group</span>
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default GroupList;
