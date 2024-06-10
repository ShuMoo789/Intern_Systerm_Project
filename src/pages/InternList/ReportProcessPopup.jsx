import React, { useState } from 'react';
import { Modal, Button, Input, Typography, Row, Col, Form } from 'antd';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Toaster, toast } from 'react-hot-toast';
const { Text } = Typography;

const ReportProcessModal = ({ record }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reportText, setReportText] = useState('');
    const [form] = Form.useForm();
    const { TextArea } = Input;

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSave = () => {
        form.validateFields()
            .then(values => {
                console.log('Report Text:', values.reportText);
                // Perform any necessary operations with the values.reportText value
                // Reset the reportText state
                setReportText('');
                // Close the modal
                setIsModalVisible(false);
                toast.success('Reports saved successfully!');
            })
            .catch(info => {
                console.error('Validation Failed:', info);
            });
    };

    return (
        <>
            <Button onClick={showModal}>
                Report Process
                <EditOutlined />
            </Button>
            <Modal
                width={700}
                title="Report Process"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={
                    <Button type="primary" onClick={handleSave} style={{ backgroundColor: "#771BB8", height: 45, borderRadius: 10 }}>
                        <SaveOutlined /> Save Changes
                    </Button>
                }
            >
                <Form form={form} layout="vertical">
                    <div style={{ paddingBottom: 20 }}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    name="position"
                                    label="Position"
                                    rules={[{ required: true, message: 'Please input the position!' }]}
                                >
                                    <Input placeholder="Front-end" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="project"
                                    label="Project"
                                    rules={[{ required: true, message: 'Please input the project!' }]}
                                >
                                    <Input placeholder="Intern system" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="mentor"
                                    label="Mentor"
                                    rules={[{ required: true, message: 'Please input the mentor!' }]}
                                >
                                    <Input placeholder="Ajmal Abdui" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                    <Form.Item
                        name="reportText"
                        label="Reports"
                        rules={[{ required: true, message: 'Please input the report text!' }]}
                    >
                        <TextArea
                            maxLength={1000}
                            onChange={(e) => setReportText(e.target.value)}
                            placeholder="Complete task 1"
                            style={{
                                height: 150,
                                resize: 'none',
                                paddingBottom: 20,
                            }}
                        />
                    </Form.Item>
                </Form>
                <Toaster />
            </Modal>
        </>
    );
};

export default ReportProcessModal;
