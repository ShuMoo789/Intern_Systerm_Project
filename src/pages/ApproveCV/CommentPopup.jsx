// CommentPopup.jsx
import React from 'react';
import { Modal, Input, Select, Button } from 'antd';
import './CommentPopup.css';

const { TextArea } = Input;
const { Option } = Select;

const CommentPopup = ({ isVisible, onClose, intern, onSave }) => {
    return (
        <Modal
            title="Comments of CV"
            visible={isVisible}
            onCancel={onClose}
            footer={null}
            className="comment-popup-modal"
        >
            <div className="comment-popup-content">
                <div className="comment-popup-row">
                    <label>Major</label>
                    <Input value={intern?.major} readOnly />
                </div>
                <div className="comment-popup-row">
                    <label>Programming language</label>
                    <Input value={intern?.programmingLanguage} readOnly />
                </div>
                <div className="comment-popup-row">
                    <label>Project on GitHub</label>
                    <Input value={intern?.projectOnGitHub || "Cannot open link GitHub"} readOnly />
                </div>
                <div className="comment-popup-row">
                    <label>Position</label>
                    <Input value={intern?.position} readOnly />
                </div>
                <div className="comment-popup-row">
                    <label>Rank</label>
                    <Select defaultValue={intern?.rank || "Intern"}>
                        <Option value="Intern">Intern</Option>
                        <Option value="Senior">Senior</Option>
                        <Option value="Junior">Junior</Option>
                    </Select>
                </div>
                <div className="comment-popup-row">
                    <label>Add Comment</label>
                    <TextArea rows={2} placeholder="Click to add more comment" />
                </div>
            </div>
            <div className="comment-popup-footer">
                <Button onClick={onClose}>Cancel</Button>
                <Button type="primary" onClick={() => onSave(intern?.internID)}>Save Comments</Button>
            </div>
        </Modal>
    );
};

export default CommentPopup;
