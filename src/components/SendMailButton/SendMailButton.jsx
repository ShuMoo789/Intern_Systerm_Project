import React, { useState } from "react";
import { Button, Modal, Select, Typography, Row, Col, Input, Form } from "antd";
import { MailOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import "./SendMailButton.css";
import { useTranslation } from "react-i18next";
const { TextArea } = Input;



const SendMailButton = () => {
  const {t} = useTranslation()
  const [value, setValue] = useState("");
  const [loadings, setLoadings] = useState([]);
  // Khởi tạo giá trị ban đầu là false  -> ẩn modal;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);

  const handleDropdownVisibleChange = (visible) => {
    setOpen(visible);
  };
  // Hàm được gọi khi muốn hiển thị modal
  const showModal = () => {
    setIsModalOpen(true);
  };
  //các loại email
const email_types = [
  t("Email interview"),
  t("Email result"),
  t("Internship Information"),
];

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Received values:", values);
        // Handle form submission
        setIsModalOpen(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // Hàm được gọi khi muốn ẩn modal
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  // hàm tạo hiệu ứng loading khi người dùng bấm vào nút send email
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

  return (
    <div>
      {/* Button để mở modal */}
      <Button
        className="send-email-btn"
        type="primary"
        onClick={showModal}
        key="submit"
        //type="default"
        icon={<MailOutlined />}
      >
        {t("Send Email")}
      </Button>
      <Modal
        className="sendMail-modal"
        centered
        title={t("Send Email")}
        open={isModalOpen}
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
                  { required: true, message: "Please select type of Email!" },
                ]}
              >
                <Select
                  className="type-email"
                  placeholder={t("Types of email")}
                  onDropdownVisibleChange={handleDropdownVisibleChange}
                  suffixIcon={open ? <UpOutlined /> : <DownOutlined />}
                >
                  {email_types.map((type, index) => {
                    return (
                      <Select.Option key={index} value={type}></Select.Option>
                    );
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
                rules={[{ required: true, message: t("Please enter your mail!") }]}
              >
                <TextArea
                  className="textarea"
                  value={value}
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
    </div>
  );
};

export default SendMailButton;
