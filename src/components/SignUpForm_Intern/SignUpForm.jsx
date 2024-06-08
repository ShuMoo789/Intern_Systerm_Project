import React, { useState, useEffect } from "react";
import { Image, Tabs, Input, Button, Row, Col, Flex, Form } from "antd";
// import "antd/dist/reset.css"; // Reset Ant Design styles
import Logo from "../../assets/Logo.png";
import image7 from "../../assets/image 7.png"; // Import the additional image
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../translation/LanguageContext";
const URL = "https://65f40c0f105614e654a1c922.mockapi.io/tRgis";
const SignUpFormIntern = () => {
  const [loading, setLoading] = useState(false);
  const { t , i18n } = useTranslation()
  const [form] = Form.useForm()
  const currentLanguage = useLanguage()
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
  useEffect(() => {
    form.setFields([
      {
        name: 'fullName',
        errors: form.getFieldError('fullName').map(() => t("Please input your full name!")),
      },
      { 
        name: 'studentID',
        errors: form.getFieldError('studentID').map(() => t("Please enter your student ID!")),
      },
      {
        name: 'school',
        errors: form.getFieldError('school').map(() => t("Please enter your school!")),
      },
      {
        name: 'email',
        errors: form.getFieldError('email').map(() => t("Please enter your email!")),
      },
      {
        name: 'password',
        errors: form.getFieldError('password').map(() => t("Please enter your password!")),
      },
      {
        name: 'confirm',
        errors: form.getFieldError('confirm').map(() => t("Please re-enter your password!")),
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
            {t('Sign Up')}
          </h1>
          <span>{t('Please fill your details to create your account')}</span>

          <Form layout="vertical" onFinish={onFinish} form={form}>
            <Form.Item
              label={t("Full Name")}
              name="fullName"
              initialValues={{ remember: true }}
              style={{ marginTop: "40px" }}
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
              label={t("Student’s ID")}
              name="studentID"
              rules={[
                {
                  required: true,
                  message: t("Please enter your student ID!"),
                },
              ]}
            >
              <Input placeholder={t("Enter your student’s ID")} />
            </Form.Item>

            <Form.Item
              label={t("School")}
              name="school"
              rules={[{ required: true, message: t("Please enter your school!") }]}
            >
              <Input placeholder={t("Enter your school")} />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: t("The input is not valid E-mail!"),
                },
                { required: true, message: t("Please enter your email!") },
              ]}
            >
              <Input placeholder="youremail@example.com" allowClear />
            </Form.Item>

            <Form.Item
              label={t("Password")}
              name="password"
              rules={[
                { required: true, message: t("Please enter your password!") },
                {
                  min: 8,
                  message: t("Password must be at least 8 characters long."),
                },
              ]}
            >
              <Input.Password placeholder="••••••••" allowClear />
            </Form.Item>

            <Form.Item
              label={t("Re-type password")}
              name="confirm"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: t("Please re-enter your password!"),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        t("The two passwords that you entered do not match!")
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder={t("Re-enter your password")} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {t('Sign Up')}
              </Button>
            </Form.Item>

            <Form.Item>
              <Flex vertical align="center">
                <div>
                  <span>{t('Already have an account?')}</span>{" "}
                  <Link to="/SignIn">{t('Sign In')}</Link>
                </div>
              </Flex>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </div>
  );
};

export default SignUpFormIntern;
