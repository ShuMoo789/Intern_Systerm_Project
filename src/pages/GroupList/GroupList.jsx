import React, { useEffect, useState } from "react";
import { Row, Col, Input, Button, Table, Checkbox, Space, Select } from "antd";

import {
  UsergroupAddOutlined,
  ExportOutlined,
  EditOutlined,
  DeleteOutlined,
  FolderAddOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import jsonData from "../../data/GroupList.json";
import MainLayout from "../../MainLayout/MainLayout";
import Navigation from "../../components/Navigation/Navigation";
import useViewport from "../../hooks/useViewport";

const { Option } = Select;

const GroupList = () => {
  const [data, setData] = useState(jsonData);
  const [filteredData, setFilteredData] = useState(jsonData);
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 1024;
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
  const inputStyle = { width: isMobile ? "100%" : "300px" };

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

  const handleStatusChange = (value, record) => {
    const updatedData = data.map((item) =>
      item.key === record.key ? { ...item, Status: value } : item
    );
    setData(updatedData);
    setFilteredData(updatedData);
  };

  const handleContractChange = (value, record) => {
    const updatedData = data.map((item) =>
      item.key === record.key ? { ...item, InternshipContract: value } : item
    );
    setData(updatedData);
    setFilteredData(updatedData);
  };

  const statusOptions = [
    { label: "Accepted", value: "Accepted", color: "green" },
    { label: "Pending", value: "Pending", color: "red" },
    { label: "Interviewed", value: "Interviewed", color: "orange" },
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

  const handleOpenCreateGroup = () => {};

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
      key: "CV",
      width: 140,
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
        <Select
          value={text}
          onChange={(value) => handleStatusChange(value, record)}
          style={{ width: 120 }}
        >
          {statusOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              <div
                style={{
                  color: option.color,
                }}
              >
                {option.label}
              </div>
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Internship Contract",
      dataIndex: "InternshipContract",
      key: "InternshipContract",
      width: 160,

      render: (text, record) => (
        <Select
          value={text}
          onChange={(value) => handleContractChange(value, record)}
          style={{ width: 120 }}
        >
          {contractOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              <div style={{ color: option.color }}>{option.label}</div>
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Button",
      key: "Button",
      width: 200,

      render: (_, record) => (
        <Space>
          <Button
            shape="round"
            style={{
              color: "#3498db",
              borderColor: "#3498db",
            }}
          >
            View
          </Button>
          <Button
            shape="round"
            style={{
              color: "#3498db",
              borderColor: "#3498db",
            }}
          >
            Upload File
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div>
        <MainLayout>
          <div style={{ marginBottom: isMobile ? "20px" : 0 }}>
            <Navigation
              titleName="GROUP LIST"
              groupButton={groupButton}
              onSendEmail={handleOpenCreateGroup}
            />
          </div>
          <div>
            <Row>
              <Col span={1}></Col>
              <Col style={{ padding: isMobile ? "0 0 0 20px" : "0" }}>
                <Space
                  style={{
                    marginBottom: 25,
                    width: isMobile ? "100%" : "930px",
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
                    marginBottom: isMobile ? "20px" : 0,
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
                    width: "100%",
                    maxWidth: "1450px",
                    borderRadius: "25px",
                  }}
                >
                  <Table
                    columns={columns}
                    dataSource={filteredData}
                    scroll={{ x: 1500 }}
                    pagination={{ pageSize: 8 }}
                    style={{ width: isMobile ? "96%" : "100%" }}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </MainLayout>
      </div>
    </>
  );
};

export default GroupList;
