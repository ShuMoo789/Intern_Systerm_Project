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
import {
  ClockCircleOutlined,
  ExportOutlined,
  EditOutlined,
  DeleteOutlined,
  FolderAddOutlined,
  SendOutlined,
} from "@ant-design/icons";
import MainLayout from "../../MainLayout/MainLayout";
import Navigation from "../../components/Navigation/Navigation";
import useViewport from "../../hooks/useViewport";

const { Title } = Typography;
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

  const groupButton = [
    {
      color: "#6537B1",
      name: "Schedule interview",
      icon: <ClockCircleOutlined />,
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

  const viewPort = useViewport();
  const isMobile = viewPort.width <= 1024;

  const handleOpenCreateGroup = () => {};

  return (
    <>
      <MainLayout>
        <Navigation
          titleName="Group Zalo Management"
          groupButton={groupButton}
          onSendEmail={handleOpenCreateGroup}
        />
        <Row style={{ marginTop: "20px", marginBottom: "40px" }}>
          <Col xs={0} sm={2}></Col>
          <Col xs={24} sm={20}>
            <Space
              size={[64, 16]}
              wrap
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
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
          <Col xs={0} sm={2}></Col>
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
          <Col span={3}></Col>
          <Col>
            <Space
              size="large"
              direction={isMobile ? "vertical" : "horizontal"}
            >
              <Select
                defaultValue="All Months"
                style={{ width: "100%" }}
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
                style={{ width: "100%" }}
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
      </MainLayout>
    </>
  );
};

export default Dashboard;
