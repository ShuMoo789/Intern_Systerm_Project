import { Tabs, Col, Row } from "antd";
import React from "react";
import Header from "../../components/header/Header";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import SignUpFormIntern from "../../components/SignUpForm_Intern/SignUpForm";
const { TabPane } = Tabs;

const SignUpPage = () => {
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
                  <SignUpForm role="Admin" dataSet="Admins" />
                </TabPane>
                <TabPane tab="Human Resources" key="2">
                  <SignUpForm role="HR" dataSet="HRs" />
                </TabPane>
                <TabPane tab="Mentor" key="3">
                  <SignUpForm role="Mentor" dataSet="Mentors" />
                </TabPane>
                <TabPane tab="School" key="4">
                  <SignUpForm role="School" dataSet="Schools" />
                </TabPane>
                <TabPane tab="Intern" key="5">
                  <SignUpFormIntern role="Intern" dataSet="Interns" />
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
        </Row>
      </div>
    </>
  );
};

export default SignUpPage;
