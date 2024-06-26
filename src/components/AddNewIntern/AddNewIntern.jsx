import React, { useState} from "react";
import { Modal, Input, Button, Space } from "antd";
import { FolderAddOutlined } from "@ant-design/icons";
import { Row, Col, Form, message } from "antd";
import "./AddNewIntern.css";
import { useTranslation } from "react-i18next";

const EditPopup = ({ onClose, openPopup }) => {
  const { t } = useTranslation();

  const inputFields = [
    { title: "Intern ID", placeholder: "#12345128" },
    { title: "Full Name", placeholder: "Esther Eden" },
    { title: "Phone Number", placeholder: "090759355" },
    { title: "Position", placeholder: "Back-end" },
    { title: "School", placeholder: "FPT University" },
    { title: "Address", placeholder: "District 9" },
    { title: "Email", placeholder: "abc@gmail.com" },
    { title: "CV", placeholder: "Link" },
    { title: "Mentor", placeholder: "Ajmal Abdul" },
    { title: "Project", placeholder: "Intern System" },
    { title: "Group Zalo", placeholder: "FE Intern System" },
    { title: "Role", placeholder: "Leader" },
];

const [formErrors, setFormErrors] = useState(
    inputFields.reduce((acc, field) => ({ ...acc, [field.title]: "" }), {})
);

const [formValues, setFormValues] = useState(
    inputFields.reduce((acc, field) => ({ ...acc, [field.title]: "" }), {})
);

const handleInputChange = (e, title) => {
    setFormValues({ ...formValues, [title]: e.target.value });
};
  const [form] = Form.useForm();
  // Hàm được gọi khi muốn ẩn modal
  const handleCancel = () => {
    onClose();
    form.resetFields();
  };

  const handleSubmit = () => {
    const newErrors = inputFields.reduce((acc, field) => {
        if (!formValues[field.title].trim()) {
            acc[field.title] = t(`Please enter your ${field.title}!`);
        }
        return acc;
    }, {});

    if (Object.keys(newErrors).length > 0) {
        setFormErrors(newErrors);
        
    } else {
        setFormValues(
            inputFields.reduce(
                (acc, field) => ({ ...acc, [field.title]: "" }),
                {}
            )
        );
        setFormErrors(
            inputFields.reduce(
                (acc, field) => ({ ...acc, [field.title]: "" }),
                {}
            )
        );
        message.success(t("Intern added successfully"));
        handleCancel();
    }
};

  return (
    <div>
        <Modal
            className="add-new-intern-modal"
            title={
                <span
                    style={{
                        fontSize: "25px",
                        fontWeight: "bold",
                        marginLeft: 10,
                    }}
                >
                    {t("Add New Intern")}
                </span>
            }
            open={openPopup}
            onCancel={handleCancel}
            footer={[
                <Button
                    key="addNewIntern"
                    type="primary"
                    onClick={handleSubmit}
                    style={{
                        margin: "10px 10px 0 0",
                        height: "50px",
                        borderRadius: 10,
                    }}
                    icon={<FolderAddOutlined />}
                >
                    {t("Add New Intern")}
                </Button>,
            ]}
            destroyOnClose={true}
            width={1125}
        >
            <Form>
                <Row gutter={[16, 16]}>
                    {inputFields.map((field, index) => (
                        <Col span={8} key={index}>
                            <Space
                                direction="vertical"
                                size="small"
                                style={{ width: "100%" }}
                            >
                                <label style={{ fontWeight: 600 }}>
                                    {t(field.title)}
                                </label>
                                <Input
                                    className="table-fill-addnewintern"
                                    placeholder={field.placeholder}
                                    value={formValues[field.title]}
                                    onChange={(e) =>
                                        handleInputChange(e, field.title)
                                    }
                                />
                                {formErrors[field.title] && (
                                    <span style={{ color: "red" }}>
                                        {formErrors[field.title]}
                                    </span>
                                )}
                            </Space>
                        </Col>
                    ))}
                </Row>
            </Form>
            
        </Modal>
    </div>

  );
};

export default EditPopup;
