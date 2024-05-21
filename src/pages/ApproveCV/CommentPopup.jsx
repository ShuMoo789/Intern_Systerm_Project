// CommentPopup.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, Button } from 'antd';
import './CommentPopup.css';

const { TextArea } = Input;
const { Option } = Select;

const CommentPopup = ({ isVisible, onClose, intern, onSave, initialPage }) => {
    const [major, setMajor] = useState(intern?.major || '');
    const [programmingLanguage, setProgrammingLanguage] = useState(intern?.programmingLanguage || '');
    const [projectOnGitHub, setProjectOnGitHub] = useState(intern?.projectOnGitHub || '');
    const [position, setPosition] = useState(intern?.position || '');
    const [rank, setRank] = useState(intern?.rank || 'Intern');
    const [comment, setComment] = useState('');
    const [selectedOption, setSelectedOption] = useState(initialPage);

    useEffect(() => {
        setSelectedOption(initialPage)
    },[initialPage])

    const handleButtonClick = (index) => {
        setSelectedOption(index);
    };

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
            title={ 
            <div id="section-btn">
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
            onClose={() => setSelectedOption(0)}
            footer={null}
            className="comment-popup-modal"
            width={1200}
        >
            {selectedOption === 0 && (
                <div className="detail-popup-comment">
                    hi
                </div>
            )}
            {selectedOption === 1 && (
                <div className="comment-section">
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
                </div>
            )}
            {selectedOption === 2 && (
                <div className="popup-wrapper">
                    <div className="result-section">
                        <div className="field details">
                            <div className="info">
                                <h4>Programming language</h4>
                                <Input />
                            </div>
                            <div className="info">
                                <h4>Major</h4>
                                <Input />
                            </div>
                            <div className="info">
                                <h4>Which year you are in?</h4>
                                <Input />
                            </div>
                            <div className="info">
                                <h4>Why choose this major?</h4>
                                <Input />
                            </div>
                            <div className="info">
                                <h4>Why choose to intern at Amazing Tech?</h4>
                                <Input />
                            </div>
                            <div className="info">
                                <h4>How do you know about Amazing Tech?</h4>
                                <Input />
                            </div>
                            <div className="info">
                                <h4>Do you know the office address?</h4>
                                <Select style={{width: "100%"}}>
                                    <Option value="Yes">Yes</Option>
                                    <Option value="No">No</Option>
                                </Select>
                            </div>
                            <div className="info">
                                <h4>Do you know about <span style={{color: "red"}}>UNPAID</span> internships?</h4>
                                <Select style={{width: "100%"}}>
                                    <Option value="Yes">Yes</Option>
                                    <Option value="No">No</Option>
                                </Select>
                            </div>
                            <div className="info">
                                <h4>What are your desire when interning at Amazing Tech?</h4>
                                <Input />
                            </div>
                            <div className="info">
                                <h4>Work online or offline?</h4>
                                <Select style={{width: "100%"}}>
                                    <Option value="Online">Online</Option>
                                    <Option value="Offline">Offline</Option>
                                </Select>
                            </div>
                            <div className="info">
                                <h4>Are you busy with anything else?</h4>
                                <Input />
                            </div>
                            <div className="info">
                                <h4>Communication skill</h4>
                                <Input />
                            </div>
                        </div>
                        <h3>Question of Technology</h3>
                        <div className="field qot">
                            <div className="question">
                                <h4>Question 1</h4>
                                <Input placeholder="Enter intern's answer"/>
                            </div>
                            <div className="question">
                                <h4>Question 2</h4>
                                <Input />
                            </div>
                            <div className="question">
                                <h4>Question 3</h4>
                                <Input />
                            </div>
                        </div>
                        <h3>Assign Project</h3>
                        <div className="field ap">
                            <div className="pass">
                                <h4>Project's Name</h4>
                                <Input placeholder="Enter intern's answer"/>
                            </div>
                            <div className="pass">
                                <h4>Position</h4>
                                <Input />
                            </div>
                            <div className="pass">
                                <h4>Group Zalo</h4>
                                <Input />
                            </div>
                        </div>
                        <div className="field rs">
                            <h2>Final result: 
                                <Select defaultValue="Passed" style={{marginLeft: "3em"}}>
                                    <Option value="Passed">Passed</Option>
                                    <Option value="Failed">Failed</Option>
                                </Select>
                            </h2>
                        </div>
                        <div className="comment-popup-footer">
                            <div className="save-btn">Save Comments</div>
                        </div>
                    </div>
                </div>
            )}
            
        </Modal>
    );
};

export default CommentPopup;
                            