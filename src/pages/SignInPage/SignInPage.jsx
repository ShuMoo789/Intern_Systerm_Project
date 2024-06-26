import { Col, Row, Tabs } from "antd";
import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import SignInForm from "../../components/SignInForm/LoginForm";
import "./SignInPage.css";
import { useTranslation } from "react-i18next";

const { TabPane } = Tabs;

const LoginPage = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const responsiveImageStyle = {
    height: "700px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const hiddenImageStyle = {
    display: "none",
  };

  return (
    <>
      <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
        <Row style={{ margin: "0px 30px 20px 30px" }}>
          <Col xs={24} md={1}></Col>
          <Col xs={24} md={8}>
            <div>
              <Tabs
                defaultActiveKey="1"
                centered
                size="large"
                tabBarStyle={{ color: "grey" }}
                destroyInactiveTabPane={true}
              >
                <TabPane tab={t("Admin")} key="1">
                  <SignInForm
                    header={t("Admin Login")}
                    formName="admin"
                    role="Admin"
                    dataSet="Admins"
                  />
                </TabPane>
                <TabPane tab={t("Human Resources")} key="2">
                  <SignInForm
                    header={t("HR Login")}
                    formName="hr"
                    role="HR"
                    dataSet="HRs"
                  />
                </TabPane>
                <TabPane tab={t("Mentor")} key="3">
                  <SignInForm
                    header={t("Mentor Login")}
                    formName="mentor"
                    role="Mentor"
                    dataSet="Mentors"
                  />
                </TabPane>
                <TabPane tab={t("School")} key="4">
                  <SignInForm
                    header={t("School Login")}
                    formName="school"
                    role="School"
                    dataSet="Schools"
                  />
                </TabPane>
                <TabPane tab={t("Intern")} key="5">
                  <SignInForm
                    header={t("Intern Login")}
                    formName="intern"
                    role="Intern"
                    dataSet="Interns"
                  />
                </TabPane>
              </Tabs>
            </div>
          </Col>
          <Col
            xs={0}
            md={14}
            style={isMobile ? hiddenImageStyle : responsiveImageStyle}
          >
            <img
              className="image-signin"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/769194cc6b501f03568e57e28b6c0656e834e905ae2d3de0cdbbcf291c9e53b3?apiKey=41832340d6f545c2a0509736ad9e1693&"
              alt="Login illustration"
            />
          </Col>
          <Col xs={0} md={1}></Col>
        </Row>
      </div>
    </>
  );
};

export default LoginPage;
