import React, { useState } from "react";
import { Image, Tabs, Input, Button, Row, Col, Flex, Form } from "antd";
// import "antd/dist/reset.css"; // Reset Ant Design styles
import Logo from "../../assets/Logo.png";
import image7 from "../../assets/image 7.png"; // Import the additional image
import { Link } from "react-router-dom";

const URL = "https://65f40c0f105614e654a1c922.mockapi.io/tRgis";
const App = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Check if password length is at least 5 characters
      if (values.password.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
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
    <div>
      <Flex vertical align="center">
        <Flex vertical>
          <h1
            style={{
              fontSize: "30px",
              color: "#1890ff",
              marginBottom: "-1px",
            
            }}
          >
            Sign Up
          </h1>
          <span>Please fill your details to create your account</span>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Full Name"
              name="fullName"
              initialValues={{ remember: true }}
              style={{ marginTop: "40px" }}
              rules={[
                {
                  required: true,
                  message: "Please input your full name!",
                },
              ]}
            >
              <Input placeholder="Enter your full name" allowClear />
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
              <Input placeholder="youremail@example.com" allowClear />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
                {
                  min: 8,
                  message: "Password must be at least 8 characters long.",
                },
              ]}
            >
              <Input.Password placeholder="••••••••" allowClear />
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
              <Button type="primary" htmlType="submit" block>
                Sign up
              </Button>
            </Form.Item>

            <Form.Item>
              <Flex vertical align="center">
                <div>
                  <span>Already have an account?</span>{" "}
                  <Link to="/">Sign in</Link>
                </div>
              </Flex>
            </Form.Item>


          </Form>

        </Flex>

      </Flex>
    </div>
  );
};

export default App;
