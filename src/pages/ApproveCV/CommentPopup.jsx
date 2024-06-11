import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, Button, Form } from 'antd';
import { Toaster, toast } from 'react-hot-toast';
import './CommentPopup.css';

const { TextArea } = Input;
const { Option } = Select;

// CommentPopup component
const CommentPopup = ({ isVisible, onClose, intern, onSave, initialPage }) => {
    const [form] = Form.useForm();
    // Single state object to manage all fields
    const [state, setState] = useState({
        major: intern?.major || '',
        programmingLanguage: intern?.programmingLanguage || '',
        projectOnGitHub: intern?.projectOnGitHub || '',
        position: intern?.position || '',
        rank: intern?.rank || 'Intern',
        comment: '',
        selectedOption: initialPage,
    });

    // Effect to set selected option when initial page changes
    useEffect(() => {
        setState((prevState) => ({ ...prevState, selectedOption: initialPage }));
    }, [initialPage]);

    // Function to update any field in the state
    const updateField = (field, value) => {
        setState((prevState) => ({ ...prevState, [field]: value }));
    };

    // Function to handle button click and change selected option
    const handleButtonClick = (index) => {
        updateField('selectedOption', index);
    };

    // Function to handle save action
    const handleSave = () => {
        form.validateFields()
            .then(values => {
                const updatedIntern = {
                    ...intern,
                    major: values.major,
                    programmingLanguage: values.programmingLanguage,
                    projectOnGitHub: values.projectOnGitHub,
                    position: values.position,
                    rank: values.rank,
                    comment: values.comment,
                };
                onSave(updatedIntern);
                toast.success('Comments saved successfully!');
                onClose();
            })
            .catch(info => {

            });
    };

    return (
        <Modal
            title={
                <div id="section-btn">
                    {/* Buttons to toggle between different sections */}
                    <button
                        className="toggle-popup-btn"
                        style={{
                            borderBottom: state.selectedOption === 0 ? '2px solid #4889E9' : '2px solid lightgray',
                            color: state.selectedOption === 0 ? 'black' : '#C7BFBF',
                            transition: 'border-bottom 0.5s',
                        }}
                        onClick={() => handleButtonClick(0)}
                    >
                        View details of Intern
                    </button>
                    <button
                        className="toggle-popup-btn"
                        style={{
                            borderBottom: state.selectedOption === 1 ? '2px solid #4889E9' : '2px solid lightgray',
                            color: state.selectedOption === 1 ? 'black' : '#C7BFBF',
                            transition: 'border-bottom 0.5s',
                        }}
                        onClick={() => handleButtonClick(1)}
                    >
                        Comments of CV
                    </button>
                    <button
                        className="toggle-popup-btn"
                        style={{
                            borderBottom: state.selectedOption === 2 ? '2px solid #4889E9' : '2px solid lightgray',
                            color: state.selectedOption === 2 ? 'black' : '#C7BFBF',
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
            {state.selectedOption === 0 && (
                <div className="detail-popup-comment">
                    {/* Section for details of intern */}
                    <div className="view-popup-row">
                        <label><h4>Intern ID</h4></label>
                        <Input type="text" value={intern?.internID || ''} readOnly />
                    </div>
                    <div className="view-popup-row">
                        <label><h4>Full Name</h4></label>
                        <Input type="text" value={intern?.fullName || ''} readOnly />
                    </div>
                    <div className="view-popup-row">
                        <label><h4>Date Of Birth</h4></label>
                        <Input type="text" value={intern?.dateOfBirth || ''} readOnly />
                    </div>
                    <div className="view-popup-row">
                        <label><h4>Phone Number</h4></label>
                        <Input type="text" value={intern?.phoneNumber || ''} readOnly />
                    </div>
                    <div className="view-popup-row">
                        <label><h4>Position</h4></label>
                        <Input type="text" value={intern?.position} onChange={(e) => updateField('position', e.target.value)} />
                    </div>
                    <div className="view-popup-row">
                        <label><h4>School</h4></label>
                        <Input type="text" value={intern?.school || ''} readOnly />
                    </div>
                    <div className="view-popup-row">
                        <label><h4>Address</h4></label>
                        <Input type="text" value={intern?.address || ''} readOnly />
                    </div>
                    <div className="view-popup-row">
                        <label><h4>Email</h4></label>
                        <Input type="text" value={intern?.email || ''} readOnly />
                    </div>
                    <div className="view-popup-row">
                        <label><h4>Link CV</h4></label>
                        <a
                            className="view-popup-link"
                            href={intern?.cvLink || 'https://youtu.be/dQw4w9WgXcQ?si=xqVazvMo-5hva6i8'}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Link
                        </a>
                    </div>
                    <div className="view-popup-row">
                        <label><h4>Rank</h4></label>
                        <Input type="text" value={state.rank} onChange={(e) => updateField('rank', e.target.value)} />
                    </div>
                </div>
            )}
            {state.selectedOption === 1 && (
                <div className="comment-section">
                    {/* Section for comments of intern */}
                    <div className="comment-popup-content">
                        <div className="comment-popup-row">
                            <label><h4>Major</h4></label>
                            <Input value={state.major} onChange={(e) => updateField('major', e.target.value)} />
                        </div>
                        <div className="comment-popup-row">
                            <label><h4>Programming language</h4></label>
                            <Input value={state.programmingLanguage} onChange={(e) => updateField('programmingLanguage', e.target.value)} />
                        </div>
                        <div className="comment-popup-row">
                            <label><h4>Project on GitHub</h4></label>
                            <Input value={state.projectOnGitHub} onChange={(e) => updateField('projectOnGitHub', e.target.value)} />
                        </div>
                        <div className="comment-popup-row">
                            <label><h4>Position</h4></label>
                            <Input value={state.position} onChange={(e) => updateField('position', e.target.value)} />
                        </div>
                        <div className="comment-popup-row">
                            <label><h4>Rank</h4></label>
                            <Select value={state.rank} onChange={(value) => updateField('rank', value)}>
                                <Option value="Intern">Intern</Option>
                                <Option value="Senior">Senior</Option>
                                <Option value="Junior">Junior</Option>
                            </Select>
                        </div>
                        <div className="comment-popup-row">
                            <label><h4>Add Comment</h4></label>
                            <TextArea rows={2} value={state.comment} onChange={(e) => updateField('comment', e.target.value)} placeholder="Click to add more comment" />
                        </div>
                    </div>
                    <div className="comment-popup-footer">
                        {/* Footer buttons to cancel or save comments */}
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" onClick={handleSave}>Save Comments</Button>
                    </div>
                </div>
            )}
            {state.selectedOption === 2 && (
                <Form form={form} className="result-popup-section">
                    <div className="result-section">
                        <div className="field details">
                            <div className="info">
                                <label><h4>Programming language</h4></label>
                                <Form.Item name="programmingLanguage" rules={[{ required: true, message: 'Please input the programming language!' }]}>
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className="info">
                                <label><h4>Major</h4></label>
                                <Form.Item name="major" rules={[{ required: true, message: 'Please input the major!' }]}>
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className="info">
                                <label><h4>Which year you are in?</h4></label>
                                <Form.Item name="year" rules={[{ required: true, message: 'Please select your year!' }]}>
                                    <Select style={{ width: "100%", height: "49px" }}>
                                        <Option value="Sophomore">Sophomore</Option>
                                        <Option value="Not Sophomore">Not Sophomore</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="info">
                                <label><h4>Why choose this major?</h4></label>
                                <Form.Item name="whyMajor" rules={[{ required: true, message: 'Please explain why you chose this major!' }]}>
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className="info">
                                <label><h4>Why choose to intern at Amazing Tech?</h4></label>
                                <Form.Item name="whyIntern" rules={[{ required: true, message: 'Please explain why you chose to intern at Amazing Tech!' }]}>
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className="info">
                                <label><h4>How do you know about Amazing Tech?</h4></label>
                                <Form.Item name="howKnow" rules={[{ required: true, message: 'Please explain how you know about Amazing Tech!' }]}>
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className="info">
                                <label><h4>Do you know the office address?</h4></label>
                                <Form.Item name="officeAddress" rules={[{ required: true, message: 'Please select if you know the office address!' }]}>
                                    <Select style={{ width: "100%", height: "49px" }}>
                                        <Option value="Yes">Yes</Option>
                                        <Option value="No">No</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="info">
                                <label><h4>Do you know about <span style={{ color: "red" }}>UNPAID</span> internships?</h4></label>
                                <Form.Item name="unpaid" rules={[{ required: true, message: 'Please select if you know about unpaid internships!' }]}>
                                    <Select style={{ width: "100%", height: "49px" }}>
                                        <Option value="Yes">Yes</Option>
                                        <Option value="No">No</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="info">
                                <label><h4>What are your desire when interning at Amazing Tech?</h4></label>
                                <Form.Item name="desire" rules={[{ required: true, message: 'Please explain your desire when interning at Amazing Tech!' }]}>
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className="info">
                                <label><h4>Work online or offline?</h4></label>
                                <Form.Item name="workMode" rules={[{ required: true, message: 'Please select if you want to work online or offline!' }]}>
                                    <Select style={{ width: "100%", height: "49px" }}>
                                        <Option value="Online">Online</Option>
                                        <Option value="Offline">Offline</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="info">
                                <label><h4>Are you busy with anything else?</h4></label>
                                <Form.Item name="busy" rules={[{ required: true, message: 'Please input if you are busy with anything else!' }]}>
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className="info">
                                <label><h4>Communication skill</h4></label>
                                <Form.Item name="communication" rules={[{ required: true, message: 'Please input your communication skill!' }]}>
                                    <Input />
                                </Form.Item>
                            </div>
                        </div>
                        <h3>Question of Technology</h3>
                        <div className="field qot">
                            <div className="question">
                                <label><h4>Question 1</h4></label>
                                <Form.Item name="question1" rules={[{ required: true, message: 'Please input the answer for question 1!' }]}>
                                    <Input placeholder="Enter intern's answer" />
                                </Form.Item>
                            </div>
                            <div className="question">
                                <label><h4>Question 2</h4></label>
                                <Form.Item name="question2" rules={[{ required: true, message: 'Please input the answer for question 2!' }]}>
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className="question">
                                <label><h4>Question 3</h4></label>
                                <Form.Item name="question3" rules={[{ required: true, message: 'Please input the answer for question 3!' }]}>
                                    <Input />
                                </Form.Item>
                            </div>
                        </div>
                        <h3>Assign Project</h3>
                        <div className="field ap">
                            <div className="pass">
                                <label><h4>Project's Name</h4></label>
                                <Form.Item name="projectName" rules={[{ required: true, message: 'Please input the project name!' }]}>
                                    <Input placeholder="Enter intern's answer" />
                                </Form.Item>
                            </div>
                            <div className="pass">
                                <label><h4>Position</h4></label>
                                <Form.Item name="projectPosition" rules={[{ required: true, message: 'Please input the project position!' }]}>
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className="pass">
                                <label><h4>Group Zalo</h4></label>
                                <Form.Item name="projectGroupZalo" rules={[{ required: true, message: 'Please input the Group Zalo!' }]}>
                                    <Input />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="field rs">
                            <h2>Final result:
                                <Form.Item name="finalResult" rules={[{ required: true, message: 'Please select the final result!' }]}>
                                    <Select defaultValue="Passed" style={{ width: "30%" }}>
                                        <Option value="Passed">Passed</Option>
                                        <Option value="Failed">Failed</Option>
                                    </Select>
                                </Form.Item>
                            </h2>
                        </div>
                        <div className="comment-popup-footer">
                            <div className="save-btn" style={{ marginRight: "1em" }} onClick={handleSave}>Save</div>
                            <Toaster />
                        </div>
                    </div>
                </Form>

            )}

        </Modal>
    );
};

export default CommentPopup;
