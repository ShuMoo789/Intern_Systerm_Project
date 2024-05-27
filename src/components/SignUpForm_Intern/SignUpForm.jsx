import React, { useState } from "react";
import { Image, Tabs, Form, Input, Button, Row, Col } from "antd";
import "antd/dist/reset.css"; // Reset Ant Design styles
import Logo from "../../assets/Logo.png";
import image7 from "../../assets/image 7.png"; // Import the additional image
import { Link } from "react-router-dom";
const { TabPane } = Tabs;
const URL = "https://65f40c0f105614e654a1c922.mockapi.io/tRgis";
const items = [
  {
    key: "1",
    label: "Admin",
  },
  {
    key: "2",
    label: "Human resources",
  },
  {
    key: "3",
    label: "Mentor",
  },
  {
    key: "4",
    label: "School",
  },
  {
    key: "5",
    label: "Intern",
  },
];

const onChange = (key) => {
  console.log(key);
};

const App = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Check if password length is at least 5 characters
      if (values.password.length < 5) {
        throw new Error("Password must be at least 5 characters long.");
      }

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Failed to add user.");
      }
      alert("Account added successfully!");
    } catch (error) {
      console.error("Error adding user:", error.message);
      alert("Failed to add user. " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Row justify="center" align="top" style={{ height: "100px" }}>
        <Col span={12}>
          <div className="content-container">
            <div style={{ marginTop: "-20px" }}>
              <Image width={200} src={Logo} className="logo-image" />
            </div>
            <div className="form-container">
              <Tabs items={items} onChange={onChange} />
              <h2 className="sign-up-title">Sign Up</h2>
              <p className="sign-up-description">
                Please fill your detail to create your account.
              </p>
              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                  label="Full Name"
                  name="fullname"
                  rules={[
                    { required: true, message: "Please enter your full name!" },
                  ]}
                >
                  <Input placeholder="Enter your full name" />
                </Form.Item>
                <Form.Item
                  label="Student’s ID"
                  name="studentID"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your student ID!",
                    },
                  ]}
                >
                  <Input placeholder="Enter your student’s ID" />
                </Form.Item>
                <Form.Item
                  label="School"
                  name="school"
                  rules={[
                    { required: true, message: "Please enter your school!" },
                  ]}
                >
                  <Input placeholder="Enter your school" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    { required: true, message: "Please enter your email!" },
                  ]}
                >
                  <Input placeholder="youremail@example.com" />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please enter your password!" },
                    {
                      min: 5,
                      message: "Password must be at least 5 characters long.",
                    },
                  ]}
                >
                  <Input.Password placeholder="••••••••" />
                </Form.Item>
                <Form.Item
                  label="Re-type Password"
                  name="confirm"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please re-enter your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Re-enter your password" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                  >
                    Sign Up
                  </Button>
                  Already have an account? <Link to="/login">Sign in</Link>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="image-container">
            <Image
              src={image7}
              className="additional-image"
              style={{ marginTop: "240px", width: "80%" }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default App;
