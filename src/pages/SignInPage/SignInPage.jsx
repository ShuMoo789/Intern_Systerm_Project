import { Col, Row, Tabs } from "antd";
import React from "react";
import Header from "../../components/header/Header";
import SignInForm from "../../components/SignInForm/LoginForm";

const { TabPane } = Tabs;

const LoginPage = () => {
  return (
    <>
      <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
        <Header />
        <Row style={{ margin: "50px 30px 20px 30px" }}>
          <Col span={1}></Col>
          <Col span={8}>
            <div>
              <Tabs
                defaultActiveKey="1"
                centered
                size={"large"}
                tabBarGutter={50}
                tabBarStyle={{ color: "grey" }}
              >
                <TabPane tab="Admin" key="1">
                  <SignInForm
                    header="Admin Login"
                    formName="admin"
                    role="Admin"
                    dataSet="Admins"
                  />
                </TabPane>
                <TabPane tab="Human Resources" key="2">
                  <SignInForm
                    header="HR Login"
                    formName="hr"
                    role="HR"
                    dataSet="HRs"
                  />
                </TabPane>
                <TabPane tab="Mentor" key="3">
                  <SignInForm
                    header="Mentor Login"
                    formName="mentor"
                    role="Mentor"
                    dataSet="Mentors"
                  />
                </TabPane>
                <TabPane tab="School" key="4">
                  <SignInForm
                    header="School Login"
                    formName="school"
                    role="School"
                    dataSet="Schools"
                  />
                </TabPane>
                <TabPane tab="Intern" key="5">
                  <SignInForm
                    header="Intern Login"
                    formName="intern"
                    role="Intern"
                    dataSet="Interns"
                  />
                </TabPane>
              </Tabs>
            </div>
          </Col>
          <Col>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/769194cc6b501f03568e57e28b6c0656e834e905ae2d3de0cdbbcf291c9e53b3?apiKey=41832340d6f545c2a0509736ad9e1693&"
              style={{ height: "700px" }}
            />
          </Col>
          <Col></Col>
        </Row>
      </div>
    </>
  );
};

export default LoginPage;
