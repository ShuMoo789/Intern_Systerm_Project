import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, Button } from 'antd';
import './CommentPopup.css';
import { useTranslation } from 'react-i18next';
const { TextArea } = Input;
const { Option } = Select;

// CommentPopup component
const CommentPopup = ({ isVisible, onClose, intern, onSave, initialPage }) => {
    // State variables for various fields
    const { t } = useTranslation();
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
    },[initialPage])

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
                        {t("View details of Intern")} 
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
                        {t("Comments of CV")}
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
                        {t("Result of Interview")}
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
                    {/* Section for detials of intern */}
                    <div className="view-popup-row">
                        <label><h4>{t("Intern ID")}</h4></label>
                        <Input type="text" />
                    </div>
                    <div className="view-popup-row">
                        <label><h4>{t("Full Name")}</h4></label>
                        <Input type="text" />
                    </div>
                    <div className="view-popup-row">
                        <label><h4>{t("Date Of Birth")}</h4></label>
                        <Input type="text" />
                    </div>
                    <div className="view-popup-row">
                        <label><h4>{t("Phone Number")}</h4></label>
                        <Input type="text" />
                    </div>
                    <div className="view-popup-row">
                        <label><h4>{t("Position")}</h4></label>
                        <Input type="text" />
                    </div>
                    <div className="view-popup-row">
                        <label><h4>{t("School")}</h4></label>
                        <Input type="text" />
                    </div>
                    <div className="view-popup-row">
                        <label><h4>{t("Address")}</h4></label>
                        <Input type="text" />
                    </div>
                    <div className="view-popup-row">
                        <label><h4>Email</h4></label>
                        <Input type="text" />
                    </div>
                    <div className="view-popup-row">
                        <label><h4>Link CV</h4></label>
                        <a
                            className="view-popup-link"
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Link
                        </a>
                    </div>
                    <div className="view-popup-row">
                        <label><h4>{t("Rank")}</h4></label> <br />
                        <Input type="text" value="Intern" />
                    </div>
                </div>
            )}
            {selectedOption === 1 && (
                <div className="comment-section">
                    {/* Section for comments of intern */}
                    <div className="comment-popup-content">
                        <div className="comment-popup-row">
                            <label><h4>{t("Major")}</h4></label>
                            <Input value={major} onChange={(e) => setMajor(e.target.value)} />
                        </div>
                        <div className="comment-popup-row">
                            <label><h4>{t("Programming language")}</h4></label>
                            <Input value={programmingLanguage} onChange={(e) => setProgrammingLanguage(e.target.value)} />
                        </div>
                        <div className="comment-popup-row">
                            <label><h4>{t("Project on GitHub")}</h4></label>
                            <Input value={projectOnGitHub} onChange={(e) => setProjectOnGitHub(e.target.value)} />
                        </div>
                        <div className="comment-popup-row">
                            <label><h4>{t("Position")}</h4></label>
                            <Input value={position} onChange={(e) => setPosition(e.target.value)} />
                        </div>
                        <div className="comment-popup-row">
                            <label><h4>{t("Rank")}</h4></label>
                            <Select value={rank} onChange={setRank}>
                                <Option value="Intern">Intern</Option>
                                <Option value="Senior">Senior</Option>
                                <Option value="Junior">Junior</Option>
                            </Select>
                        </div>
                        <div className="comment-popup-row">
                            <label><h4>{t("Add Comment")}</h4></label>
                            <TextArea rows={2} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Click to add more comment" />
                        </div>
                    </div>
                    <div className="comment-popup-footer">
                        {/* Footer buttons to cancel or save comments */}
                        <Button onClick={onClose}>{t("Cancel")}</Button>
                        <Button type="primary" onClick={handleSave}>{t("Save Comments")}</Button>
                    </div>  
                </div>
            )}
            {selectedOption === 2 && (
                <div className="result-popup-section">
                    <div className="result-section">
                        {/* Section for interview results */}
                        <div className="field details">
                            <div className="info">
                                <label><h4>{t("Programming language")}</h4></label> 
                                <Input />
                            </div>
                            <div className="info">
                                <label><h4>{t("Major")}</h4></label>
                                <Input />
                            </div>
                            <div className="info">
                                <label><h4>{t("Which year you are in?")}</h4></label>
                                <Input />
                            </div>
                            <div className="info">
                                <label><h4>{t("Why choose this major?")}</h4></label>
                                <Input />
                            </div>
                            <div className="info">
                                <label><h4>{t("Why choose to intern at Amazing Tech?")}</h4></label>
                                <Input />
                            </div>
                            <div className="info">
                                <label><h4>{t("How do you know about Amazing Tech?")}</h4></label>
                                <Input />
                            </div>
                            <div className="info">
                                <label><h4>{t("Do you know the office address?")}</h4></label>
                                <Select style={{ width: "100%" }}>
                                    <Option value="Yes">Yes</Option>
                                    <Option value="No">No</Option>
                                </Select>
                            </div>
                            <div className="info">
                                <label><h4>{t("Do you know about")} <span style={{ color: "red" }}>{t("UNPAID")}</span> {t("internships?")}</h4></label>
                                <Select style={{ width: "100%" }}>
                                    <Option value="Yes">{t("Yes")}</Option>
                                    <Option value="No">{t("No")}</Option>
                                </Select>
                            </div>
                            <div className="info">
                                <label><h4>{t("What are your desire when interning at Amazing Tech?")}</h4></label>
                                <Input />
                            </div>
                            <div className="info">
                                <label><h4>{t("Work online or offline?")}</h4></label>
                                <Select style={{ width: "100%" }}>
                                    <Option value="Online">Online</Option>
                                    <Option value="Offline">Offline</Option>
                                </Select>
                            </div>
                            <div className="info">
                                <label><h4>{t("Are you busy with anything else?")}</h4></label>
                                <Input />
                            </div>
                            <div className="info">
                                <label><h4>{t("Communication skill")}</h4></label>
                                <Input />
                            </div>
                        </div>
                        <h3>{t("Question of Technology")}</h3>
                        <div className="field qot">
                            <div className="question">
                                <label><h4>{t("Question 1")}</h4></label>
                                <Input placeholder={t("Enter intern's answer")} />
                            </div>
                            <div className="question">
                                <label><h4>{t("Question 2")}</h4></label>
                                <Input />
                            </div>
                            <div className="question">
                                <label><h4>{t("Question 3")}</h4></label>
                                <Input />
                            </div>
                        </div>
                        <h3>{t("Assign Project")}</h3>
                        <div className="field ap">
                            <div className="pass">
                                <label><h4>{t("Project's Name")}</h4></label>
                                <Input placeholder={t("Enter intern's answer")} />
                            </div>
                            <div className="pass">
                                <label><h4>{t("Position")}</h4></label>
                                <Input />
                            </div>
                            <div className="pass">
                                <label><h4>{t("Group Zalo")}</h4></label>
                                <Input />
                            </div>
                        </div>
                        <div className="field rs">
                            <h2>{t("Final result:")}
                                <Select defaultValue="Passed" style={{ marginLeft: "3em" }}>
                                    <Option value="Passed">{t("Passed")}</Option>
                                    <Option value="Failed">{t("Failed")}</Option>
                                </Select>
                            </h2>
                        </div>
                        <div className="comment-popup-footer">
                            {/* Footer buttons to save result */}
                            <div className="save-btn">{t("Save")}</div>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default CommentPopup;
