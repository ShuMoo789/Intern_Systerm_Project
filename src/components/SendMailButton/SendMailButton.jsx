import React, { useState } from "react";
import { Modal, Select, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Typography, Row, Col, Form, message } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import "./SendMailButton.css";
import { useTranslation } from "react-i18next";

const { Option } = Select;
const { TextArea } = Input;

const SendEmailPopup = ({ onClose, openPopup, typesEmail }) => {
  const { t } = useTranslation();
  const [emailType, setEmailType] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [loadings, setLoadings] = useState([]);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Received values:", values);
        // Handle form submission
        onClose();
        message.success(t("Send successfully!"))
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // Hàm được gọi khi muốn ẩn modal
  const handleCancel = () => {
    onClose();
    form.resetFields();
  };

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        handleOk();
        return newLoadings;
      });
    }, 1000);
  };

  const handleDropdownVisibleChange = (visible) => {
    setOpen(visible);
  };

  const email_types = typesEmail;

  return (
    <Modal
      className="sendMail-modal"
      centered
      title={t("Send Email")}
      open={openPopup}
      onCancel={handleCancel}
      okText="Sendmail"
      okButtonProps={{
        disabled:
          !form.isFieldsTouched(true) ||
          form.getFieldsError().filter(({ errors }) => errors.length).length,
      }}
      destroyOnClose={true}
      // Tạo nút sendmail khi modal xuất hiện
      footer={[
        <Button
          className="send-email-modal"
          key="submit"
          type="default"
          icon={<MailOutlined />}
          //Gọi hàm để tạo hiệu ứng loading cho button
          loading={loadings[1] || false}
          onClick={() => enterLoading(1)}
        >
          {t("Send Email")}
        </Button>,
      ]}
      width={1125}
    >
      <Typography.Paragraph className="desc">
        {t("Choose types of Email")}
      </Typography.Paragraph>
      <Row gutter={16}>
        <Col span={7}>
          {/* chọn loại email */}
          <Form form={form} layout="vertical" name="select-form">
            <Form.Item
              name="select"
              rules={[
                { required: true, message: t("Please select an email type") },
              ]}
            >
              <Select
                className="type-email"
                placeholder={t("Types of email")}
                value={emailType}
                onDropdownVisibleChange={handleDropdownVisibleChange}
                suffixIcon={open ? <UpOutlined /> : <DownOutlined />}
              >
                {email_types.map((type, index) => {
                  return <Option key={index} value={type}></Option>;
                })}
              </Select>
            </Form.Item>
          </Form>
        </Col>
        <Col span={17}>
          {/* Khung text gửi mail */}
          <Form form={form} layout="vertical" name="text-form">
            <Form.Item
              name="text-email"
              rules={[{ required: true, message: t("Please enter your email content") }]}
            >
              <TextArea
                className="textarea"
                value={emailContent}
                onChange={(e) => setValue(e.target.value)}
                placeholder={t("Enter your mail...")}
                autoSize={{
                  minRows: 6,
                  maxRows: 6,
                }}
              ></TextArea>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default SendEmailPopup;
