import React, { useState } from "react";
import {
  Button,
  Modal,
  Select,
  Typography,
  Row,
  Col,
  Input,
  message,
} from "antd";
import { MailOutlined } from "@ant-design/icons";
import "./SendMailButton.css";
const { TextArea } = Input;

//các loại email
const email_types = [
  "Email interview",
  "Email result",
  "Internship Information",
];

const SendMailButton = () => {
  const [value, setValue] = useState("");
  const [loadings, setLoadings] = useState([]);
  // Khởi tạo giá trị ban đầu là false  -> ẩn modal;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hàm được gọi khi muốn hiển thị modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  // Hàm được gọi khi muốn ẩn modal
  const handleCancel = () => {
    setIsModalOpen(false);
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
        message.success("Send Mail Success");
        handleOk();
        return newLoadings;
      });
    }, 500);
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
        Send Mail
      </Button>
      <Modal
        centered
        title="Send Email"
        open={isModalOpen}
        onCancel={handleCancel}
        okText="Sendmail"
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
            Send Email
          </Button>,
        ]}
        width={1125}
      >
        <Typography.Paragraph className="desc">
          Choose types of Email
        </Typography.Paragraph>
        <Row gutter={16}>
          <Col span={7}>
            {/* chọn loại email */}
            <Select className="type-email" placeholder="Types of email">
              {email_types.map((type, index) => {
                return <Select.Option key={index} value={type}></Select.Option>;
              })}
            </Select>
          </Col>
          <Col span={17}>
            {/* Khung text gửi mail */}
            <TextArea
              className="textarea"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter your mail..."
              autoSize={{
                minRows: 6,
                maxRows: 6,
              }}
            >
              {" "}
            </TextArea>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default SendMailButton;
