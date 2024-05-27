import { Flex, Form, Input, Button, Modal } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";

const SignUpForm = ({ role, dataSet }) => {
  const [wrong, setWrong] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const API_URL = "https://6640ca07a7500fcf1a9ebc23.mockapi.io/api/intern/";

  const handleSignUp = async (values) => {
    const { fullName, email, password, repassword } = values;

    if (password !== repassword) {
      setWrong(true);
      setEmailExists(false);
      return;
    }

    try {
      const { data: users } = await axios.get(API_URL + dataSet);
      const emailAlreadyExists = users.some((user) => user.email === email);

      if (emailAlreadyExists) {
        setEmailExists(true);
        setWrong(false);
        return;
      }

      const response = await axios.post(API_URL + dataSet, {
        fullName,
        email,
        password,
        role,
      });

      setIsModalVisible(true);

      setTimeout(() => {
        window.location.reload();
      }, 3000);

      return response.data;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
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

          <Form
            name="a"
            initialValues={{ remember: true }}
            layout="vertical"
            style={{ marginTop: "40px" }}
            onFinish={handleSignUp}
          >
            <Form.Item
              label="Full Name"
              name="fullName"
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
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="youremail@example.com" allowClear />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="**********" />
            </Form.Item>

            <Form.Item
              label="Re-type password"
              name="repassword"
              rules={[
                {
                  required: true,
                  message: "Please re-type your password!",
                },
              ]}
            >
              <Input.Password placeholder="Re-enter your password" />
            </Form.Item>
            {wrong && (
              <div style={{ color: "red", margin: "-15px 0 10px 0" }}>
                Passwords don't match!
              </div>
            )}
            {emailExists && (
              <div style={{ color: "red", margin: "-15px 0 10px 0" }}>
                Email already existed!
              </div>
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Sign in
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

      <Modal open={isModalVisible} footer={null} closable={false} centered>
        <div style={{ textAlign: "center" }}>
          <CheckCircleOutlined style={{ fontSize: "48px", color: "#52c41a" }} />
          <h2>Signed up successfully</h2>
        </div>
      </Modal>
    </div>
  );
};

export default SignUpForm;
