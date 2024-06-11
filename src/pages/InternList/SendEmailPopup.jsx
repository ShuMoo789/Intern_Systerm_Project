// SendEmailPopup.jsx
import React, { useState } from 'react';
import { Modal, Select, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import './SendEmailPopup.css';
import { useTranslation } from 'react-i18next';

const { Option } = Select;
const { TextArea } = Input;

const SendEmailPopup = ({ onClose, onSend, openPopup }) => {
    const [emailType, setEmailType] = useState('');
    const [emailContent, setEmailContent] = useState('');
    const {t} = useTranslation()
    const handleSend = () => {
        const emailData = {
            type: emailType,
            content: emailContent
        };
        onSend(emailData);
    };

    return (
        <Modal
            title={t("Send Email")}
            open={openPopup}
            onCancel={onClose}
            footer={null}
            className="send-email-popup-modal"
        >
            <div className="send-email-popup-content">
                <div className="send-email-popup-row">
                    <label>{t("Choose types of Email")}</label>
                    <Select
                        value={emailType}
                        onChange={setEmailType}
                        placeholder="Types of Email"
                        style={{ width: '100%' }}
                    >
                        <Option value="Email interview">{t("Email interview")}</Option>
                        <Option value="Email result">{t("Email result")}</Option>
                        <Option value="Internship information">{t("Internship information")}</Option>
                        <Option value="Additional Profile">{t("Additional Profile")}</Option>
                        <Option value="Return Profile">{t("Return Profile")}</Option>
                    </Select>
                </div>
                <div className="send-email-popup-row">
                    <TextArea
                        rows={4}
                        placeholder={t("Enter your mail...")}
                        value={emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                    />
                </div>
            </div>
            <div className="send-email-popup-footer">
                <Button type="primary" icon={<MailOutlined />} onClick={handleSend}>
                    {t("Send Email")}
                </Button>
            </div>
        </Modal>
    );
};

export default SendEmailPopup;
