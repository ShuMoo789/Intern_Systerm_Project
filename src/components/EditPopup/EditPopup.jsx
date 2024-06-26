import React, { useState } from "react";
import { Modal, Input, Button, DatePicker, Upload } from "antd";
import { SaveOutlined, UploadOutlined } from "@ant-design/icons";
import { Typography, Row, Col, Form, message } from "antd";
import "./EditPopup.css";
import { useTranslation } from "react-i18next";
import dayjs from 'dayjs';

const EditPopup = ({ onClose, openPopup }) => {
  const { t } = useTranslation();
  const [loadings, setLoadings] = useState([]);
  const [value, setValue] = useState("");

  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Received values:", values);
        // Handle form submission
        onClose();
        message.success(t("Save successfully!"))
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

  const [fileList, setFileList] = useState([]);

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <div>
        <Modal
            title={t("View details of Intern")}
            open={openPopup}
            onCancel={handleCancel}
            okButtonProps={{
                disabled:
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length).length,
            }}
            footer={[
                <Button
                    className="save-btn-edit"
                    key="submit"
                    type="primary"
                    icon={<SaveOutlined />}
                    //Gọi hàm để tạo hiệu ứng loading cho button
                    loading={loadings[1] || false}
                    onClick={() => enterLoading(1)}
                >
                {t("Save")}
                </Button>,
            ]}
            width={900}
        >   
            
          {/* Khung text gửi mail */}
            <Form 
                form={form} 
                layout="vertical" 
                name="text-form"
                initialValues={{
                    internID: "#12345128",
                    fullname: "Esther Eden",
                    date: dayjs('16-07-2001','DD-MM-YYYY'),
                    phone: "090759355",
                    position: "Back-end",
                    school: "FPT University",
                    address: "District 9",
                    email: "abc@gmail.com",
                    mentor:"Ajmal Abdul",
                    project:"Intern System",
                    zalo:"FE Intern System",
                    role:"Leader",
                    link: [
                    {
                        name: 'Link',
                        url: 'https://amazingtech.vn/',
                    }
                ]
                }}
            >
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Typography>{t("Intern ID")}</Typography>
                    <Form.Item
                        name="internID" 
                        rules={[{ required: true, message: t("Please enter your Intern ID!") }]}
                    >
                        <Input
                            className="table-fill-edit"
                            value={value}
                            onChange={(e) => setValue(e.target.defaultValue)}
                        ></Input>
                    </Form.Item>
                </Col>
                <Col span={8}>
                <Typography>{t("Full Name")}</Typography>
                    <Form.Item
                        name="fullname" 
                        rules={[{ required: true, message: t("Please enter your Full Name!") }]}
                    >
                        <Input
                            value={value}
                            onChange={(e) => setValue(e.target.defaultValue)}
                        ></Input>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Typography>{t("Date Of Birth")}</Typography>
                    <Form.Item
                        name="date"
                        rules={[{ required: true, message: 'Please select a date!' }]}
                    >
                        <DatePicker
                            format="DD-MM-YYYY"
                            width="100%"
                        />   
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Typography>{t("Phone Number")}</Typography>
                    <Form.Item
                        name="phone" 
                        rules={[{ required: true, message: t("Please enter your Phone Number!") }]}
                    >
                        <Input
                            value={value}
                            onChange={(e) => setValue(e.target.defaultValue)}
                        ></Input>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Typography>{t("Position")}</Typography>
                    <Form.Item
                        name="position" 
                        rules={[{ required: true, message: t("Please enter your Position!") }]}
                    >
                        <Input
                            value={value}
                            onChange={(e) => setValue(e.target.defaultValue)}
                        ></Input>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Typography>{t("School")}</Typography>
                    <Form.Item
                        name="school" 
                        rules={[{ required: true, message: t("Please enter your School!") }]}
                    >
                        <Input
                            value={value}
                            onChange={(e) => setValue(e.target.defaultValue)}
                        ></Input>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Typography>{t("Address")}</Typography>
                    <Form.Item
                        name="address" 
                        rules={[{ required: true, message: t("Please enter your Address!") }]}
                    >
                        <Input
                            value={value}
                            onChange={(e) => setValue(e.target.defaultValue)}
                        ></Input>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Typography>{t("Email")}</Typography>
                    <Form.Item
                        name="email" 
                        rules={[{ required: true, message: t("Please enter your Email!") }]}
                    >
                        <Input
                            value={value}
                            onChange={(e) => setValue(e.target.defaultValue)}
                        ></Input>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Typography>{t("Mentor")}</Typography>
                    <Form.Item
                        name="mentor" 
                        rules={[{ required: true, message: t("Please enter your Mentor!") }]}
                    >
                        <Input
                            value={value}
                            onChange={(e) => setValue(e.target.defaultValue)}
                        ></Input>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Typography>{t("Project")}</Typography>
                    <Form.Item
                        name="project" 
                        rules={[{ required: true, message: t("Please enter your Project!") }]}
                    >
                        <Input
                            value={value}
                            onChange={(e) => setValue(e.target.defaultValue)}
                        ></Input>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Typography>{t("Group Zalo")}</Typography>
                    <Form.Item
                        name="zalo" 
                        rules={[{ required: true, message: t("Please enter your Group Zalo!") }]}
                    >
                        <Input
                            value={value}
                            onChange={(e) => setValue(e.target.defaultValue)}
                        ></Input>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Typography>{t("Role")}</Typography>
                    <Form.Item
                        name="role" 
                        rules={[{ required: true, message: t("Please enter your Role!") }]}
                    >
                        <Input
                            value={value}
                            onChange={(e) => setValue(e.target.defaultValue)}
                        ></Input>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Typography>{t("CV")}</Typography>
                    <Form.Item
                        name="link" 
                        rules={[{ required: true, message: t("Please enter your CV!") }]}
                        valuePropName="fileList"
                        getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
                        
                    >
                        <Upload 
                            style={{ textDecoration: "underline" }}
                            {...props}
                            maxCount={1}
                        >
                            <Button 
                                className="btn-upload"
                                icon={<UploadOutlined />                   
                            }>
                                {t("Upload")}
                            </Button>
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>
            </Form>          
        </Modal>
    </div>

  );
};

export default EditPopup;
