import React, { useState } from "react";
import { Layout, Row, Col, Typography, Space, Select, Card } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ClockCircleOutlined } from "@ant-design/icons";
import userImage from "../../assets/user_image.png";
import MainLayout from "../../MainLayout/MainLayout";
import SearchBar from "../../components/SearchBar/SearchBar";

const { Title } = Typography;
const { Header, Sider, Content } = Layout;
const { Option } = Select;

const data2022 = [
  { name: "Week 1", students: 20 },
  { name: "Week 2", students: 40 },
  { name: "Week 3", students: 60 },
  { name: "Week 4", students: 80 },
];

const data2023 = [
  { name: "Week 1", students: 30 },
  { name: "Week 2", students: 60 },
  { name: "Week 3", students: 90 },
  { name: "Week 4", students: 120 },
];

const data2024 = [
  { name: "Week 1", students: 50 },
  { name: "Week 2", students: 100 },
  { name: "Week 3", students: 150 },
  { name: "Week 4", students: 200 },
];

const months = [
  "All Months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const years = ["2022", "2023", "2024"];

const Dashboard = () => {
  const [data, setData] = useState(data2024);
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [selectedYear, setSelectedYear] = useState("2024");

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
    updateData(selectedYear, value);
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
    updateData(value, selectedMonth);
  };

  const updateData = (year, month) => {
    let newData;
    if (year === "2022") {
      newData = data2022;
    } else if (year === "2023") {
      newData = data2023;
    } else if (year === "2024") {
      newData = data2024;
    }

    if (month !== "All Months") {
      newData = newData.map((item) => ({
        ...item,
        students: item.students * (months.indexOf(month) / 12),
      }));
    }

    setData(newData);
  };

  return (
    <>
      <MainLayout>
        <Layout>
          <Header style={{ padding: 0, background: "transparent" }}>
            <Row>
              <Col span={1}></Col>
              <Col span={6}>
                <Title style={{ marginTop: "18px" }}>Dashboard</Title>
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
          <Content style={{ background: "transparent", marginBottom: "50px" }}>
            <Row>
              <Col span={1}></Col>
              <Col>
                <SearchBar
                  customeIcon={<ClockCircleOutlined />}
                  customButton="Schedule Interview"
                />
              </Col>
            </Row>
            <Row
              gutter={16}
              style={{ marginTop: "20px", marginBottom: "40px" }}
            >
              <Col span={2}></Col>
              <Col>
                <Space size={60}>
                  <Card
                    bordered={true}
                    style={{
                      textAlign: "center",
                      borderColor: "purple",
                      width: "210px",
                      height: "190px",
                      borderWidth: 2,
                    }}
                  >
                    <Title level={1}>200</Title>
                    <p>Total students received CV</p>
                  </Card>

                  <Card
                    bordered={true}
                    style={{
                      textAlign: "center",
                      borderColor: "purple",
                      width: "210px",
                      height: "190px",
                      borderWidth: 2,
                    }}
                  >
                    <Title level={1}>150</Title>
                    <p>Total students interviewed</p>
                  </Card>

                  <Card
                    bordered={true}
                    style={{
                      textAlign: "center",
                      borderColor: "purple",
                      width: "210px",
                      height: "190px",
                      borderWidth: 2,
                    }}
                  >
                    <Title level={1}>150</Title>
                    <p>Total students passed</p>
                  </Card>

                  <Card
                    bordered={true}
                    style={{
                      textAlign: "center",
                      borderColor: "purple",
                      width: "210px",
                      height: "190px",
                      borderWidth: 2,
                    }}
                  >
                    <Title level={1}>150</Title>
                    <p>Total students interning</p>
                  </Card>

                  <Card
                    bordered={true}
                    style={{
                      textAlign: "center",
                      borderColor: "purple",
                      width: "210px",
                      height: "190px",
                      borderWidth: 2,
                    }}
                  >
                    <Title level={1}>150</Title>
                    <p>Total students interned</p>
                  </Card>
                </Space>
              </Col>
            </Row>
            <Row style={{ marginBottom: "20px" }}>
              <Col span={1}></Col>
              <Col span={11}>
                <div style={{ textAlign: "center" }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="students" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div style={{ fontWeight: "bold" }}>
                    Number of students interning in January, 2023
                  </div>
                </div>
              </Col>
              <Col span={1}></Col>
              <Col span={10}>
                <Space size="large">
                  <Select
                    defaultValue="All Months"
                    style={{ width: 200 }}
                    onChange={handleMonthChange}
                  >
                    {months.map((month) => (
                      <Option key={month} value={month}>
                        {month}
                      </Option>
                    ))}
                  </Select>
                  <Select
                    defaultValue="2024"
                    style={{ width: 200 }}
                    onChange={handleYearChange}
                  >
                    {years.map((year) => (
                      <Option key={year} value={year}>
                        {year}
                      </Option>
                    ))}
                  </Select>
                </Space>
              </Col>
            </Row>
            <Row>
              <Col span={1}></Col>
              <Col span={11}>
                <div style={{ textAlign: "center" }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="students" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div style={{ fontWeight: "bold" }}>FPT University</div>
                </div>
              </Col>
              <Col span={11}>
                <div style={{ textAlign: "center" }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="students" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div style={{ fontWeight: "bold" }}>FPT University</div>
                </div>
              </Col>
            </Row>
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <div style={{ fontWeight: "bold" }}>
                Number of students interning in year 2023 by schools
              </div>
            </div>
          </Content>
        </Layout>
      </MainLayout>
    </>
  );
};

export default Dashboard;
