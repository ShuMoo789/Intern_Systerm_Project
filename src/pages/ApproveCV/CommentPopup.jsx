import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, Button } from 'antd';
import './CommentPopup.css';
import FeedBackModal from '../../components/FeedbackModal/FeedbackModel';

const { TextArea } = Input;
const { Option } = Select;

// CommentPopup component
const CommentPopup = ({ isVisible, onClose, intern, onSave, initialPage }) => {
    // State variables for various fields
    const [major, setMajor] = useState(intern?.major || '');
    const [programmingLanguage, setProgrammingLanguage] = useState(intern?.programmingLanguage || '');
    const [projectOnGitHub, setProjectOnGitHub] = useState(intern?.projectOnGitHub || '');
    const [position, setPosition] = useState(intern?.position || '');
    const [rank, setRank] = useState(intern?.rank || 'Intern');
    const [comment, setComment] = useState('');
    const [selectedOption, setSelectedOption] = useState(initialPage);

    // Effect to set selected option when initial page changes
    useEffect(() => {
        setSelectedOption(initialPage)
    }, [initialPage])

    // Function to handle button click and change selected option
    const handleButtonClick = (index) => {
        setSelectedOption(index);
    };

    // Function to handle save action
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

    const [showFeedbackModal, setShowFeedbackModal] = useState(false);

    const handleCloseFeedbackModal = () => {
        setShowFeedbackModal(false);
    };
    return (
        <Modal
            title={
                <div id="section-btn">
                    {/* Buttons to toggle between different sections */}
                    <button
                        className="toggle-popup-btn"
                        style={{
                            borderBottom: selectedOption === 0 ? '2px solid #4889E9' : '2px solid lightgray',
                            color: selectedOption === 0 ? 'black' : '#C7BFBF',
                            transition: 'border-bottom 0.5s',
                        }}
                        onClick={() => handleButtonClick(0)}
                    >
                        View details of Intern
                    </button>
                    <button
                        className="toggle-popup-btn"
                        style={{
                            borderBottom: selectedOption === 1 ? '2px solid #4889E9' : '2px solid lightgray',
                            color: selectedOption === 1 ? 'black' : '#C7BFBF',
                            transition: 'border-bottom 0.5s',
                        }}
                        onClick={() => handleButtonClick(1)}
                    >
                        Comments of CV
                    </button>
                    <button
                        className="toggle-popup-btn"
                        style={{
                            borderBottom: selectedOption === 2 ? '2px solid #4889E9' : '2px solid lightgray',
                            color: selectedOption === 2 ? 'black' : '#C7BFBF',
                            transition: 'border-bottom 0.5s',
                        }}
                        onClick={() => handleButtonClick(2)}
                    >
                        Result of Interview
                    </button>
                </div>}
            visible={isVisible}
            onCancel={onClose}
            footer={null}
            className="comment-popup-modal"
            width={1200}
        >
            {/* Different sections based on selected option */}
            {selectedOption === 0 && (
                <div className="detail-popup-comment">
                    {/* Input fields for details of intern */}
                </div>
            )}
            {selectedOption === 1 && (
                <div className="comment-section">
                    {/* Input fields for comments */}
                </div>
            )}
            {selectedOption === 2 && (
                <div className="popup-wrapper">
                    {/* Input fields for interview results */}
                    <div>
                        <FeedBackModal />

                    </div>
                </div>
            )}
        </Modal>
    );
};

export default CommentPopup;
