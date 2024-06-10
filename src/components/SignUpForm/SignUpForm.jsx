import { Flex, Form, Input, Button, Modal } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../translation/LanguageContext";

const SignUpForm = ({ role, dataSet }) => {
  const { t, i18n } = useTranslation();
  const [wrong, setWrong] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const currentLanguage = useLanguage();
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

  useEffect(() => {
    form.setFields([
      {
        name: "fullName",
        errors: form
          .getFieldError("fullName")
          .map(() => t("Please input your full name!")),
      },
      {
        name: "email",
        errors: form
          .getFieldError("email")
          .map(() => t("Please input your email!")),
      },
      {
        name: "password",
        errors: form
          .getFieldError("password")
          .map(() => t("Please input your password!")),
      },
      {
        name: "repassword",
        errors: form
          .getFieldError("repassword")
          .map(() => t("Please re-type your password!")),
      },
    ]);
  }, [currentLanguage, t]);

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
            {t("Sign Up")}
          </h1>
          <span>{t("Please fill your details to create your account")}</span>

          <Form
            form={form}
            name="a"
            initialValues={{ remember: true }}
            layout="vertical"
            style={{ marginTop: "40px" }}
            onFinish={handleSignUp}
          >
            <Form.Item
              label={t("Full Name")}
              name="fullName"
              rules={[
                {
                  required: true,
                  message: t("Please input your full name!"),
                },
              ]}
            >
              <Input placeholder={t("Enter your full name")} allowClear />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: t("Please input your email!"),
                },
                {
                  type: "email",
                  message: t("The input is not a valid email!"),
                },
              ]}
              validateTrigger="onFinish"
            >
              <Input placeholder="youremail@example.com" allowClear />
            </Form.Item>

            <Form.Item
              label={t("Password")}
              name="password"
              rules={[
                {
                  required: true,
                  message: t("Please input your password!"),
                },
              ]}
            >
              <Input.Password placeholder="**********" />
            </Form.Item>

            <Form.Item
              label={t("Re-type password")}
              name="repassword"
              rules={[
                {
                  required: true,
                  message: t("Please re-type your password!"),
                },
              ]}
            >
              <Input.Password placeholder={t("Re-enter your password")} />
            </Form.Item>
            {wrong && (
              <div style={{ color: "red", margin: "-15px 0 10px 0" }}>
                {t("Passwords don't match!")}
              </div>
            )}
            {emailExists && (
              <div style={{ color: "red", margin: "-15px 0 10px 0" }}>
                {t("Email already existed!")}
              </div>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.2)",
                }}
              >
                {t("Sign Up")}
              </Button>
            </Form.Item>
            <Form.Item>
              <Flex vertical align="center">
                <div>
                  <span>{t("Already have an account?")}</span>{" "}
                  <Link to="/SignIn">{t("Sign In")}</Link>
                </div>
              </Flex>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>

      <Modal open={isModalVisible} footer={null} closable={false} centered>
        <div style={{ textAlign: "center" }}>
          <CheckCircleOutlined style={{ fontSize: "48px", color: "#52c41a" }} />
          <h2>{t("Signed up successfully")}</h2>
        </div>
      </Modal>
    </div>
  );
};

export default SignUpForm;
