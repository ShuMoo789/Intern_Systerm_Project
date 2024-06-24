import React, { useEffect, useState } from "react";
import "../GroupList/GroupList.css";
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
  DownOutlined,
} from "@ant-design/icons";

import jsonData from "../../data/GroupList.json";
import Navigation from "../../components/Navigation/Navigation";
import useViewport from "../../hooks/useViewport";
import "./GroupList.css";
import ViewPopup from "./ViewPopup";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const GroupList = () => {
  const [data, setData] = useState(jsonData);
  const [filteredData, setFilteredData] = useState(jsonData);
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 1300;
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
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
    width: isMobile ? "100%" : "300px",
    height: 32,
    fontSize: "16px",
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
    { label: t("Accepted"), value: "Accepted", color: "green" },
    { label: t("Pending"), value: "Pending", color: "red" },
    { label: t("Interviewed"), value: "Interviewed", color: "orange" },
  ];

  const contractOptions = [
    { label: t("Signed"), value: "Signed", color: "green" },
    { label: t("Pending"), value: "Pending", color: "red" },
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

  const groupButton = [
    {
      color: "#6537B1",
      name: t("Create Group"),
      icon: <UsergroupAddOutlined />,
    },
    {
      color: "#41B137",
      name: t("Export Excel"),
      icon: <ExportOutlined />,
    },
    {
      color: "#FB8632",
      name: t("Edit"),
      icon: <EditOutlined />,
    },
    {
      color: "#FF3A2E",
      name: t("Delete"),
      icon: <DeleteOutlined />,
    },
    {
      color: "#4889E9",
      name: t("Add New Intern"),
      icon: <FolderAddOutlined />,
    },
  ];

  const handleCreateIntern = () => {
    setVisible(true);
  };

  const getBackgroundColor = (status) => {
    switch (status) {
      case "Accepted":
      case "Signed":
        return "#EFF9F1";
      case "Pending":
        return "#F8E7EE";
      case "Interviewed":
        return "#FFEFE6";
      default:
        return "#FFFFFF";
    }
  };

  const getColor = (status) => {
    switch (status) {
      case "Accepted":
      case "Signed":
        return "#449E3C";
      case "Pending":
        return "#B70D52";
      case "Interviewed":
        return "#FF5D02";
      default:
        return "#000000";
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "select",
      render: (_, record) => <Checkbox />,
      width: "auto",
    },
    {
      title: t("Intern ID"),
      dataIndex: "InternId",
      key: "InternId",
      width: "auto",
    },
    {
      title: t("Date of Interview"),
      dataIndex: "DateInterview",
      key: "DateInterview",
      width: "auto",
    },
    {
      title: t("Time of Interview"),
      dataIndex: "TimeInterview",
      key: "TimeInterview",
      width: "auto",
    },
    {
      title: t("Full Name"),
      dataIndex: "FullName",
      key: "FullName",
      width: "auto",
    },
    {
      title: t("Date of Birth"),
      dataIndex: "DateOfBirth",
      key: "DateOfBirth",
      width: "auto",
    },
    {
      title: t("Phone Number"),
      dataIndex: "PhoneNumber",
      key: "PhoneNumber",
      width: "auto",
    },
    {
      title: t("Position"),
      dataIndex: "Position",
      key: "Position",
      width: "auto",
    },
    {
      title: t("School"),
      dataIndex: "School",
      key: "School",
      width: "auto",
    },
    {
      title: t("Address"),
      dataIndex: "Address",
      key: "Address",
      width: "auto",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      width: "auto",
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
      key: "CV",
      width: "auto",
    },
    {
      title: t("Comments"),
      dataIndex: "Comments",
      key: "Comments",
      width: "auto",
      render: (text) => t(text),
    },
    {
      title: t("Role"),
      dataIndex: "Role",
      key: "Role",
      width: "auto",
    },
    {
      title: t("Project"),
      dataIndex: "Project",
      key: "Project",
      width: "auto",
      render: (text) => t(text),
    },
    {
      title: t("Group Zalo"),
      dataIndex: "GroupZalo",
      key: "GroupZalo",
      width: "auto",
      render: (text) => t(text),
    },
    {
      title: t("Mentor"),
      dataIndex: "Mentor",
      key: "Mentor",
      width: "auto",
    },
    {
      title: t("Status"),
      dataIndex: "Status",
      key: "Status",
      width: "auto",

      render: (text, record) => (
        <div style={{ width: 126 }}>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  value="Accepted"
                  onClick={() => handleStatusChange("Accepted", record)}
                >
                  <span>{t("Accepted")}</span>
                </Menu.Item>
                <Menu.Item
                  value="Pending"
                  onClick={() => handleStatusChange("Pending", record)}
                >
                  <span>{t("Pending")}</span>
                </Menu.Item>
                <Menu.Item
                  value="Interviewed"
                  onClick={() => handleStatusChange("Interviewed", record)}
                >
                  <span>{t("Interviewed")}</span>
                </Menu.Item>
              </Menu>
            }
          >
            <Button
              style={{
                backgroundColor:
                  record.Status === "Accepted"
                    ? "#EFF9F1"
                    : record.Status === "Pending"
                      ? "#F8E7EE"
                      : record.Status === "Interviewed"
                        ? "#E8F4FD"
                        : "FFFFFF",
                color:
                  record.Status === "Accepted"
                    ? "#449E3C"
                    : record.Status === "Pending"
                      ? "#B70D52"
                      : record.Status === "Interviewed"
                        ? "#106BA3"
                        : "#333333",
                borderRadius: "50px", // Đặt bo tròn thành hình tròn
                marginLeft: "-8px",
                width: "100%",
                fontSize: "12px",
              }}
            >
              {t(record.Status)}
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      ),
    },
    {
      title: t("Internship Contract"),
      dataIndex: "InternshipContract",
      key: "InternshipContract",
      width: "auto",

      render: (text, record) => (
        <div style={{ width: 126 }}>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  value="Signed"
                  onClick={() => handleContractChange("Signed", record)}
                >
                  <span>{t("Signed")}</span>
                </Menu.Item>
                <Menu.Item
                  value="Pending"
                  onClick={() => handleContractChange("Pending", record)}
                >
                  <span>{t("Pending")}</span>
                </Menu.Item>
              </Menu>
            }
          >
            <Button
              style={{
                backgroundColor:
                  record.InternshipContract === "Signed"
                    ? "#EFF9F1"
                    : record.InternshipContract === "Pending"
                      ? "#F8E7EE"
                      : "FFFFFF",
                color:
                  record.InternshipContract === "Signed"
                    ? "#449E3C"
                    : record.InternshipContract === "Pending"
                      ? "#B70D52"
                      : "#333333",
                borderRadius: "50px", // Đặt bo tròn thành hình tròn
                marginLeft: "-8px",
                width: "100%",
                fontSize: "12px",
              }}
            >
              {t(record.InternshipContract)}
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      ),
    },
    {
      title: t("Button"),
      key: "Button",
      // width: 200,
      render: (_, record) => (
        <Space>
          <ViewPopup></ViewPopup>
        </Space>
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
    if (!role) newErrors.role = t("Role is required");
    if (!groupZalo) newErrors.groupZalo = t("Group Zalo is required");
    if (!project) newErrors.project = t("Project is required");
    if (!mentor) newErrors.mentor = t("Mentor is required");
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

  const handleInputChange = (e, title) => {
    setFormValues({ ...formValues, [title]: e.target.value });
  };

  const [formValues, setFormValues] = useState(
    inputFields.reduce((acc, field) => ({ ...acc, [field.title]: "" }), {})
  );
  const [formErrors, setFormErrors] = useState(
    inputFields.reduce((acc, field) => ({ ...acc, [field.title]: "" }), {})
  );
  const handleSubmit = () => {
    const newErrors = inputFields.reduce((acc, field) => {
      if (!formValues[field.title].trim()) {
        acc[field.title] = `${field.title} is required`;
      }
      return acc;
    }, {});

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      message.error("Please fill in all fields");
    } else {
      setFormValues(
        inputFields.reduce((acc, field) => ({ ...acc, [field.title]: "" }), {})
      );
      setFormErrors(
        inputFields.reduce((acc, field) => ({ ...acc, [field.title]: "" }), {})
      );
      message.success("Intern added successfully");
      handleCancel();
    }
  };

  return (
    <>
      <div>
        <div style={{ marginBottom: isMobile ? "20px" : 0 }}>
          <Navigation
            titleName={t("GROUP LIST")}
            groupButton={groupButton}
            onSendEmail={showModal}
            onCreateIntern={handleCreateIntern}
          />
        </div>
        <div>
          <Row style={{ margin: 20 }}>
            <Col>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "25px",
                  width: "100%",
                }}
              >
                <Space
                  style={{
                    margin: isMobile ? "20px" : "20px 0 24px 20px",
                    width: isMobile ? "96%" : "920px",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: "unset",
                  }}
                  size={[5, 5]}
                  wrap
                >
                  <Input
                    style={inputStyle}
                    placeholder={t("Enter intern's ID")}
                    name="InternId"
                    value={filters.InternId}
                    onChange={handleFilterChange}
                  />
                  <Input
                    style={inputStyle}
                    placeholder={t("Enter intern's Full name")}
                    name="FullName"
                    value={filters.FullName}
                    onChange={handleFilterChange}
                  />
                  <Input
                    style={inputStyle}
                    placeholder={t("Enter intern's D.O.B")}
                    name="DOB"
                    value={filters.DOB}
                    onChange={handleFilterChange}
                  />
                  <Input
                    style={inputStyle}
                    placeholder={t("Enter intern's Phone number")}
                    name="PhoneNumber"
                    value={filters.PhoneNumber}
                    onChange={handleFilterChange}
                  />
                  <Input
                    style={inputStyle}
                    placeholder={t("Enter intern's Address")}
                    name="Address"
                    value={filters.Address}
                    onChange={handleFilterChange}
                  />
                  <Input
                    style={inputStyle}
                    placeholder={t("Enter intern's Email")}
                    name="Email"
                    value={filters.Email}
                    onChange={handleFilterChange}
                  />
                  <Input
                    style={inputStyle}
                    placeholder={t("Enter intern's Major")}
                    name="Major"
                    value={filters.Major}
                    onChange={handleFilterChange}
                  />
                  <Input
                    style={inputStyle}
                    placeholder={t("Enter intern's Position")}
                    name="Position"
                    value={filters.Position}
                    onChange={handleFilterChange}
                  />
                  <Input
                    style={inputStyle}
                    placeholder={t("Enter intern's School")}
                    name="School"
                    value={filters.School}
                    onChange={handleFilterChange}
                  />
                  <Input
                    style={inputStyle}
                    placeholder={t("Enter intern's Title")}
                    name="Title"
                    value={filters.Title}
                    onChange={handleFilterChange}
                  />
                  <Input
                    style={inputStyle}
                    placeholder={t("Enter intern's Project")}
                    name="Project"
                    value={filters.Project}
                    onChange={handleFilterChange}
                  />
                  <Input
                    style={inputStyle}
                    placeholder={t("Enter intern's Group Zalo")}
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
                    margin: isMobile ? "0 20px" : "0",
                  }}
                >
                  <Button
                    className="clear-filter-button"
                    style={{
                      transform: isMobile ? "" : "translate(0, 70%)",
                      width: isMobile ? "100%" : 140,
                    }}
                    icon={<FilterOutlined />}
                    onClick={handleClearFilters}
                  >
                    {t("Clean Filter")}
                  </Button>
                  <Button
                    className="search-filter-button"
                    style={{
                      backgroundColor: "#4889E9",
                      color: "white",
                      transform: isMobile ? "" : "translate(0, 70%)",
                      width: isMobile ? "100%" : 140,
                      marginBottom: isMobile ? "10px" : 0,
                    }}
                    icon={<SearchOutlined />}
                    onClick={handleSearch}
                  >
                    {t("Search")}
                  </Button>
                </Space>
                <div
                  style={{
                    overflowX: "auto",
                    width: isMobile ? "100%" : "100%",
                  }}
                >
                  <Table
                    className="grouplist-table"
                    style={{ margin: "0 20px" }}
                    columns={columns}
                    dataSource={filteredData}
                    scroll={{ x: 3300 }}
                    pagination={{ pageSize: 7 }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <Modal
          className="add-new-intern-modal"
          title={
            <span
              style={{ fontSize: "25px", fontWeight: "bold", marginLeft: 10 }}
            >
              {t("Add New Intern")}
            </span>
          }
          open={visible}
          onCancel={handleCancel}
          footer={[
            <Button
              key="addNewIntern"
              type="primary"
              onClick={handleSubmit}
              style={{
                margin: "10px 10px 0 0",
                height: "50px",
                borderRadius: 10,
              }}
            >
              {t("Add New Intern")}
            </Button>,
          ]}
          width={modalWidth}
        >
          <Row gutter={[16, 16]}>
            {inputFields.map((field, index) => (
              <Col span={8} key={index}>
                <Space
                  direction="vertical"
                  size="small"
                  style={{ width: "100%" }}
                >
                  <label style={{ fontWeight: 600 }}>{field.title}</label>
                  <Input
                    placeholder={field.placeholder}
                    value={formValues[field.title]}
                    onChange={(e) => handleInputChange(e, field.title)}
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "10px",
                    }}
                  />
                  {formErrors[field.title] && (
                    <span style={{ color: "red" }}>
                      {formErrors[field.title]}
                    </span>
                  )}
                </Space>
              </Col>
            ))}
          </Row>
        </Modal>

        <Modal
          title={<h2>{t("Create Group")}</h2>}
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
                <p>
                  <b>{t("Role")}</b>
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
                    { value: "Mentor", label: t("Mentor") },
                    { value: "School", label: t("School") },
                    { value: "Intern", label: t("Intern") },
                  ]}
                  value={role}
                />
                {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}
              </div>

              <div style={{ width: "95%", alignContent: "center" }}>
                <p>
                  <b>{t("Mentor")}</b>
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
                <p>
                  <b>{t("Project")}</b>
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
                <p>
                  <b>{t("Group Zalo")}</b>
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
              <span>{t("Create Group")}</span>
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default GroupList;
