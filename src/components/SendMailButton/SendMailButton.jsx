import React, { useState } from "react";
import { Modal, Select, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Typography, Row, Col, Form, message } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
<<<<<<< HEAD
import './SendMailButton.css'
import { useTranslation } from 'react-i18next';
=======
import "./SendMailButton.css";
import { useTranslation } from "react-i18next";
>>>>>>> 80a15b9332c36ae233adb487b4b67b4278f140e8

const { Option } = Select;
const { TextArea } = Input;

const SendEmailPopup = ({ onClose, openPopup }) => {
<<<<<<< HEAD
    const {t} = useTranslation()
    const [emailType, setEmailType] = useState('');
    const [emailContent, setEmailContent] = useState('');
    const [loadings, setLoadings] = useState([]);
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);

  const [form] = Form.useForm();


  const handleOk = () => {
    form.validateFields()
      .then(values => {
        console.log('Received values:', values);
        // Handle form submission
        onClose()
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
=======
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
        message.success("Send successfully!")
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        message.error("Please fill full input!")
>>>>>>> 80a15b9332c36ae233adb487b4b67b4278f140e8
      });
  };

  // Hàm được gọi khi muốn ẩn modal
  const handleCancel = () => {
<<<<<<< HEAD
    onClose()
=======
    onClose();
>>>>>>> 80a15b9332c36ae233adb487b4b67b4278f140e8
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
<<<<<<< HEAD
        handleOk()
=======
        handleOk();
>>>>>>> 80a15b9332c36ae233adb487b4b67b4278f140e8
        return newLoadings;
      });
    }, 1000);
  };

  const handleDropdownVisibleChange = (visible) => {
    setOpen(visible);
  };

  const email_types = [
    t("Email interview"),
    t("Email result"),
<<<<<<< HEAD
    t("Internship Information")
  ]

  return (
    <Modal
      className='sendMail-modal'
=======
    t("Internship Information"),
  ];

  return (
    <Modal
      className="sendMail-modal"
>>>>>>> 80a15b9332c36ae233adb487b4b67b4278f140e8
      centered
      title={t("Send Email")}
      open={openPopup}
      onCancel={handleCancel}
<<<<<<< HEAD
      okText='Sendmail'
      okButtonProps={{
        disabled: !form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length
=======
      okText="Sendmail"
      okButtonProps={{
        disabled:
          !form.isFieldsTouched(true) ||
          form.getFieldsError().filter(({ errors }) => errors.length).length,
>>>>>>> 80a15b9332c36ae233adb487b4b67b4278f140e8
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
<<<<<<< HEAD
      width={1125}>
=======
      width={1125}
    >
>>>>>>> 80a15b9332c36ae233adb487b4b67b4278f140e8
      <Typography.Paragraph className="desc">
        {t("Choose types of Email")}
      </Typography.Paragraph>
      <Row gutter={16}>
        <Col span={7}>
          {/* chọn loại email */}
<<<<<<< HEAD
          <Form
            form={form}
            layout="vertical"
            name="select-form"
          >
            <Form.Item
              name="select"
              rules={[{ required: true, message: t('Please select type of Email!') }]}
            >
              <Select
                className='type-email'
=======
          <Form form={form} layout="vertical" name="select-form">
            <Form.Item
              name="select"
              rules={[
                { required: true, message: t("Please select type of Email!") },
              ]}
            >
              <Select
                className="type-email"
>>>>>>> 80a15b9332c36ae233adb487b4b67b4278f140e8
                placeholder={t("Types of email")}
                value={emailType}
                onDropdownVisibleChange={handleDropdownVisibleChange}
                suffixIcon={open ? <UpOutlined /> : <DownOutlined />}
              >
                {email_types.map((type, index) => {
<<<<<<< HEAD
                  return <Option key={index} value={type}
                  ></Option>

                })}
              </Select>
            </Form.Item>

=======
                  return <Option key={index} value={type}></Option>;
                })}
              </Select>
            </Form.Item>
>>>>>>> 80a15b9332c36ae233adb487b4b67b4278f140e8
          </Form>
        </Col>
        <Col span={17}>
          {/* Khung text gửi mail */}
<<<<<<< HEAD
          <Form
            form={form}
            layout="vertical"
            name="text-form"
          >
            <Form.Item
              name="text-email"
              rules={[{ required: true, message: 'Please enter your mail!' }]}
=======
          <Form form={form} layout="vertical" name="text-form">
            <Form.Item
              name="text-email"
              rules={[{ required: true, message: "Please enter your mail!" }]}
>>>>>>> 80a15b9332c36ae233adb487b4b67b4278f140e8
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
<<<<<<< HEAD
              >
              </TextArea>
            </Form.Item>
          </Form>

=======
              ></TextArea>
            </Form.Item>
          </Form>
>>>>>>> 80a15b9332c36ae233adb487b4b67b4278f140e8
        </Col>
      </Row>
    </Modal>
  );
<<<<<<< HEAD

=======
>>>>>>> 80a15b9332c36ae233adb487b4b67b4278f140e8
};

export default SendEmailPopup;
