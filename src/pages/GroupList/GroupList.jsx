import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Row,
  Col,
  Flex,
  Input,
  Button,
  Table,
  Checkbox,
  Space,
  Typography,
} from "antd";

const { Title } = Typography;
import userImage from "../../assets/user_image.png";
import jsonData from "../../data/GroupList.json";
import MenuNavigate from "../../components/Menu/MenuNavigate";
import SearchBar from "../../components/SearchBar/SearchBar";

const { Header, Sider, Content } = Layout;

const GroupList = () => {
  const [data, setData] = useState(jsonData);

  useEffect(() => {
    setData(jsonData);
  }, []);

  const handleFormSubmit = (formData) => {
    setData((prevData) => [...prevData, formData]);
  };

  const columns = [
    {
      title: "",
      dataIndex: "select",
      render: (_, record) => <Checkbox />,
      fixed: "left",
    },
    {
      title: "Intern ID",
      dataIndex: "InternId",
      key: "InternId",
      fixed: "left",
    },
    {
      title: "Date of Interview",
      dataIndex: "DateInterview",
      key: "DateInterview",
    },
    {
      title: "Time of Interview",
      dataIndex: "TimeInterview",
      key: "TimeInterview",
    },
    {
      title: "Full Name",
      dataIndex: "FullName",
      key: "FullName",
    },
    {
      title: "Date of Birth",
      dataIndex: "DateOfBirth",
      key: "DateOfBirth",
    },
    {
      title: "Phone Number",
      dataIndex: "PhoneNumber",
      key: "PhoneNumber",
    },
    {
      title: "Position",
      dataIndex: "Position",
      key: "Position",
    },
    {
      title: "School",
      dataIndex: "School",
      key: "School",
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "CV",
      dataIndex: "CV",
      key: "CV",
    },
    {
      title: "Comments",
      dataIndex: "Comments",
      key: "Comments",
      render: (text) => <div style={{ overflow: "hidden" }}>{text}</div>,
    },
    {
      title: "Role",
      dataIndex: "Role",
      key: "Role",
    },
    {
      title: "Project",
      dataIndex: "Project",
      key: "Project",
    },
    {
      title: "Group Zalo",
      dataIndex: "GroupZalo",
      key: "GroupZalo",
    },
    {
      title: "Mentor",
      dataIndex: "Mentor",
      key: "Mentor",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
    },
    {
      title: "Internship Contract",
      dataIndex: "InternshipContract",
      key: "InternshipContract",
    },
    {
      title: "Button",
      key: "Button",
      fixed: "right",
      render: (_, record) => (
        <Flex justify="space-around">
          <Button shape="round" style={{ marginRight: "10px" }}>
            View
          </Button>
          <Button shape="round">Upload File</Button>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          width={256}
          style={{
            borderRadius: "25px",
            overflow: "hidden",
            backgroundColor: "#fff",
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
                <Flex>
                  <img
                    src={userImage}
                    style={{
                      display: "block",
                      borderRadius: "50%",
                      width: "55px",
                      height: "55px",
                      marginTop: "18px",
                      marginRight: "20px",
                    }}
                  />
                  <Space direction="vertical">
                    <div style={{ fontWeight: "bold" }}>Natalie Brogan</div>
                    <div style={{ marginTop: "-40px" }}>Admin</div>
                  </Space>
                </Flex>
              </Col>
            </Row>
          </Header>
          <Content
            style={{
              background: "transparent",
            }}
          >
            <Row>
              <Col span={1}></Col>
              <Col>
                <SearchBar onSubmitIntern={handleFormSubmit} />
              </Col>
            </Row>
            <Row>
              <Col span={1}></Col>
              <Col>
                <div
                  style={{
                    overflowX: "auto",
                    width: "1450px",
                    borderRadius: "25px",
                  }}
                >
                  <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: true }}
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
