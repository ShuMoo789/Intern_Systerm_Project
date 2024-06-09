import { Flex, Form, Input, Button, Checkbox } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../translation/LanguageContext";
const LoginForm = ({ header, formName, role, dataSet }) => {
  const [wrong, setWrong] = useState(false);
  const API_URL = "https://6640ca07a7500fcf1a9ebc23.mockapi.io/api/intern/";
  const { t } = useTranslation()
  const currentLanguage = useLanguage()
  const [form] = Form.useForm()
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
  useEffect(() => {
    form.setFields([
    {
      name: 'email',
      errors: form.getFieldError('email').map(() => t("Please input your email!")),
    },
    {
      name: 'password',
      errors: form.getFieldError('password').map(() => t("Please input your password!")),
    },
  ])
  }, [currentLanguage, t])
  return (
    <>
      <Flex vertical align="center">
        <Flex vertical>
          <h1
            style={{ fontSize: "30px", color: "#1890ff", marginBottom: "-1px" }}
          >
            {header}
          </h1>
          <span>{t("Please fill your details to access your account")}</span>

          <Form
            form={form}
            name={formName}
            initialValues={{ remember: true }}
            layout="vertical"
            style={{ marginTop: "40px" }}
            onFinish={handleLogin}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: t("Please input your email!") }]}
              placeholder
            >
              <Input placeholder="youremail@example.com" allowClear />
            </Form.Item>

            <Form.Item
              label={t("Password")}
              name="password"
              rules={[
                { required: true, message: t("Please input your password!") },
              ]}
            >
              <Input.Password placeholder="**********" />
            </Form.Item>
            {wrong && (
              <div style={{ color: "red", margin: "-15px 0 10px 0" }}>
                {t('Email or Password is incorrect')}
              </div>
            )}
            <Form.Item>
              <Flex justify="space-between">
                <Checkbox>{t("Remember me")}</Checkbox>
                <Link to="/pwdreset" style={{ color: "red" }}>
                  {t("Forgot password?")}
                </Link>
              </Flex>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {t("Sign In")}
              </Button>
            </Form.Item>
            <Form.Item>
              <Link to="/signup">
                <Button type="default" block>
                  {t("Sign Up")}
                </Button>
              </Link>
            </Form.Item>

            <Form.Item>
              <div type="" align="center">
                {t("OR LOGIN WITH")}
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
