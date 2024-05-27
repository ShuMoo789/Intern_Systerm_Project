import React, { useEffect, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Input,
  Button,
  Table,
  Checkbox,
  Space,
  Typography,
  Select,
} from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";

const { Title } = Typography;
import userImage from "../../assets/user_image.png";
import jsonData from "../../data/GroupList.json";
import MenuNavigate from "../../components/Menu/MenuNavigate";
import SearchBar from "../../components/SearchBar/SearchBar";

const { Header, Sider, Content } = Layout;
const { Option } = Select;

const GroupList = () => {
  const [data, setData] = useState(jsonData);
  const [filteredData, setFilteredData] = useState(jsonData);
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
  const inputStyle = { width: "300px" };

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

  const columns = [
    {
      title: "",
      dataIndex: "select",
      render: (_, record) => <Checkbox />,
      fixed: "left",
      width: 50,
    },
    {
      title: "Intern ID",
      dataIndex: "InternId",
      key: "InternId",
      fixed: "left",
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
      fixed: "right",
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
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          width={256}
          style={{
            borderRadius: "25px",
            overflow: "hidden",
            backgroundColor: "#fff",
            maxHeight: "93vh",
          }}
        >
          <MenuNavigate />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: "transparent" }}>
            <Row>
              <Col span={1}></Col>
              <Col span={6}>
                <Title style={{ marginTop: "18px" }}>Group List</Title>
              </Col>
              <Col span={6}></Col>
              <Col span={6}>
                <Space>
                  <img
                    src={userImage}
                    style={{
                      display: "block",
                      borderRadius: "50%",
                      width: "55px",
                      height: "55px",
                      marginRight: "20px",
                    }}
                  />
                  <Space direction="vertical">
                    <div style={{ fontWeight: "bold" }}>Natalie Brogan</div>
                    <div style={{ marginTop: "-45px" }}>Admin</div>
                  </Space>
                </Space>
              </Col>
            </Row>
          </Header>
          <Content style={{ background: "transparent" }}>
            <Row>
              <Col span={1}></Col>
              <Col>
                <SearchBar />
              </Col>
            </Row>
            <Row>
              <Col span={1}></Col>
              <Col>
                <Space
                  style={{ marginBottom: 25, maxWidth: "930px" }}
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
                <Space direction="vertical">
                  <Button
                    style={{
                      minWidth: 120,
                    }}
                    icon={<FilterOutlined />}
                    onClick={handleClearFilters}
                  >
                    Clear filter
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#3498db",
                      color: "white",
                      minWidth: 120,
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
                  />
                </div>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default GroupList;
