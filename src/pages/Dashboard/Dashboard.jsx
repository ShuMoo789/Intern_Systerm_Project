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

import MenuNavigate from "../../components/Menu/MenuNavigate";
import SearchBar from "../../components/SearchBar/SearchBar";

const { Header, Sider, Content } = Layout;
const { Option } = Select;

const Dashboard = () => {
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
          <Content style={{ background: "transparent" }}>
            <Row>
              <Col span={1}></Col>
              <Col>
                <SearchBar />
              </Col>
            </Row>
            <Row>
              <Col span={1}></Col>
              <Col></Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
