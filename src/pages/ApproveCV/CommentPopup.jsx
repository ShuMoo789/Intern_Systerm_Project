import React from 'react';
import { Modal, Button, Input } from 'antd';


const { TextArea } = Input;

function CommentPopup({ isVisible, onClose, intern, onSave }) {
    const handleSave = () => {
        // Add logic to handle comment save
        onSave(intern.internID);
    };

    return (
        <Modal
            title={`Comment on ${intern?.fullName}'s CV`}
            visible={isVisible}
            onCancel={onClose}
            footer={[
                <Button key="back" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSave}>
                    Save Comment
                </Button>,
            ]}
        >
            <TextArea placeholder="Write your comment here..." rows={4} />
        </Modal>
    );
}

export default CommentPopup;
