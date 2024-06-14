import React, { useState } from 'react';
import { Modal, Select, Input, Button, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import './SendEmailPopup.css';
import { useTranslation } from 'react-i18next';

const { Option } = Select;
const { TextArea } = Input;

const SendEmailPopup = ({ onClose, onSend, openPopup }) => {
    const [emailType, setEmailType] = useState('');
    const [emailContent, setEmailContent] = useState('');
    const [typeError, setTypeError] = useState('');
    const [contentError, setContentError] = useState('');
    const {t} = useTranslation()
    const handleSend = () => {
        let valid = true;

        if (!emailType) {
            setTypeError(t("You haven't chosen what type of email"));
            valid = false;
        } else {
            setTypeError('');
        }

        if (!emailContent) {
            setContentError(t("You haven't entered any content"));
            valid = false;
        } else {
            setContentError('');
        }

        if (valid) {
            const emailData = {
                type: emailType,
                content: emailContent,
            };
            onSend(emailData);
            message.success('Saved');
            onClose();
        }
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
                        placeholder="Type of Email"
                        style={{ width: '100%' }}
                        status={typeError ? 'error' : ''}
                    >
                        <Option value="Email interview">{t("Email interview")}</Option>
                        <Option value="Email result">{t("Email result")}</Option>
                        <Option value="Internship information">{t("Internship information")}</Option>
                        <Option value="Additional Profile">{t("Additional Profile")}</Option>
                        <Option value="Return Profile">{t("Return Profile")}</Option>
                    </Select>
                    {typeError && <div className="error-message">{typeError}</div>}
                </div>
                <div className="send-email-popup-row">
                    <TextArea
                        rows={4}
                        placeholder={t("Enter your mail...")}
                        value={emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                        status={contentError ? 'error' : ''}
                    />
                    {contentError && <div className="error-message">{contentError}</div>}
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
