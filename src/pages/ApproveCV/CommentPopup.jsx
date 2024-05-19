// CommentPopup.jsx
import React, { useState } from 'react';
import { Modal, Input, Select, Button } from 'antd';
import './CommentPopup.css';

const { TextArea } = Input;
const { Option } = Select;

const CommentPopup = ({ isVisible, onClose, intern, onSave }) => {
    const [major, setMajor] = useState(intern?.major || '');
    const [programmingLanguage, setProgrammingLanguage] = useState(intern?.programmingLanguage || '');
    const [projectOnGitHub, setProjectOnGitHub] = useState(intern?.projectOnGitHub || '');
    const [position, setPosition] = useState(intern?.position || '');
    const [rank, setRank] = useState(intern?.rank || 'Intern');
    const [comment, setComment] = useState('');

    const handleSave = () => {
        const updatedIntern = {
            ...intern,
            major,
            programmingLanguage,
            projectOnGitHub,
            position,
            rank,
            comment
        };
        onSave(updatedIntern);
    };

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
                    <Input value={major} onChange={(e) => setMajor(e.target.value)} />
                </div>
                <div className="comment-popup-row">
                    <label>Programming language</label>
                    <Input value={programmingLanguage} onChange={(e) => setProgrammingLanguage(e.target.value)} />
                </div>
                <div className="comment-popup-row">
                    <label>Project on GitHub</label>
                    <Input value={projectOnGitHub} onChange={(e) => setProjectOnGitHub(e.target.value)} />
                </div>
                <div className="comment-popup-row">
                    <label>Position</label>
                    <Input value={position} onChange={(e) => setPosition(e.target.value)} />
                </div>
                <div className="comment-popup-row">
                    <label>Rank</label>
                    <Select value={rank} onChange={setRank}>
                        <Option value="Intern">Intern</Option>
                        <Option value="Senior">Senior</Option>
                        <Option value="Junior">Junior</Option>
                    </Select>
                </div>
                <div className="comment-popup-row">
                    <label>Add Comment</label>
                    <TextArea rows={2} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Click to add more comment" />
                </div>
            </div>
            <div className="comment-popup-footer">
                <Button onClick={onClose}>Cancel</Button>
                <Button type="primary" onClick={handleSave}>Save Comments</Button>
            </div>
        </Modal>
    );
};

export default CommentPopup;
