import React, { useState } from 'react';
import { Modal, Button, Input, Typography, Row, Col } from 'antd';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ReportProcessModal = ({ record }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reportText, setReportText] = useState('');

    const { TextArea } = Input;
    const onChange = (e) => {
        console.log('Change:', e.target.value);
    };
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
        // Perform any necessary operations with the reportText value
        console.log('Report Text:', reportText);

        // Reset the reportText state
        setReportText('');

        // Close the modal
        setIsModalVisible(false);
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
                    <Button type="primary" onClick={handleSave} style={{ backgroundColor: "#771BB8", height: 45, borderRadius: 10, marginRight: 50 }}>
                        <SaveOutlined /> Save Changes
                    </Button>
                }
            >
                <div style={{ paddingBottom: 20 }}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <h5>Position</h5>
                            <Input placeholder="Front-end" />
                        </Col>
                        <Col span={8}>
                            <h5>Project</h5>
                            <Input placeholder="Intern system" />
                        </Col>
                        <Col span={8}>
                            <h5>Mentor</h5>
                            <Input placeholder="Ajmal Abdui" />
                        </Col>
                    </Row>
                </div>
                <h5>Reports</h5>
                <TextArea


                    maxLength={1000}
                    onChange={onChange}
                    placeholder="Complete task 1"
                    style={{
                        height: 150,
                        resize: 'none',
                        paddingBottom: 20,
                    }}
                />
            </Modal>
        </>
    );
};

export default ReportProcessModal;