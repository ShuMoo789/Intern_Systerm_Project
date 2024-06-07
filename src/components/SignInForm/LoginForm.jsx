import { Flex, Form, Input, Button, Checkbox } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginForm = ({ header, formName, role, dataSet }) => {
  const [wrong, setWrong] = useState(false);
  const API_URL = "https://6640ca07a7500fcf1a9ebc23.mockapi.io/api/intern/";

  const handleLogin = async (values) => {
    const { email, password } = values;
    try {
      const { data: users } = await axios.get(API_URL + dataSet);

      const user = users.find(
        (user) =>
          user.email === email &&
          user.password === password &&
          user.role === role
      );
      if (user) {
        console.log("Login successful", user);
      } else {
        setWrong(true);
        console.error("Login failed: Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <>
      <Flex vertical align="center">
        <Flex vertical>
          <h1
            style={{ fontSize: "30px", color: "#1890ff", marginBottom: "-1px" }}
          >
            {header}
          </h1>
          <span>Please fill your details to access your account</span>

          <Form
            name={formName}
            initialValues={{ remember: true }}
            layout="vertical"
            style={{ marginTop: "40px" }}
            onFinish={handleLogin}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
              placeholder
            >
              <Input placeholder="youremail@example.com" allowClear />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="**********" />
            </Form.Item>
            {wrong && (
              <div style={{ color: "red", margin: "-15px 0 10px 0" }}>
                Email or Password is incorrect
              </div>
            )}
            <Form.Item>
              <Flex justify="space-between">
                <Checkbox>Remember me</Checkbox>
                <Link to="/pwdreset" style={{ color: "red" }}>
                  Forgot password?
                </Link>
              </Flex>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Sign in
              </Button>
            </Form.Item>
            <Form.Item>
              <Link to="/signup">
                <Button type="default" block>
                  Sign up
                </Button>
              </Link>
            </Form.Item>

            <Form.Item>
              <div type="" align="center">
                OR LOGIN WITH
              </div>
            </Form.Item>

            <Form.Item>
              <Link to="/signup">
                <Button
                  type="default"
                  block
                  style={{
                    margin: "0px 0 0px 0",
                    boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.2)",
                  }}
                >
                  <img
                    src="https://th.bing.com/th/id/OIP.HgH-NjiOdFOrkmwjsZCCfAHaHl?rs=1&pid=ImgDetMain"
                    style={{ width: "15px", height: "15px" }}
                  />
                  GOOGLE
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </>
  );
};

export default LoginForm;
