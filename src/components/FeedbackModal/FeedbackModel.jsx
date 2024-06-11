import React, { useState } from 'react';
import { FiSave } from "react-icons/fi";
import './modal.css';
import { useTranslation } from 'react-i18next';

const FeedBackModal = ({ onClose }) => {
    const {t} = useTranslation()
    const [formData, setFormData] = useState({
        programmingLanguage: '',
        major: '',
        year: '',
        whyChooseMajor: '',
        whyChooseIntern: '',
        howKnowCompany: '',
        knowOfficeAddress: '',
        knowUNPAIDInternships: '',
        desireForInternship: '',
        workMode: '',
        busyWithOther: '',
        communicationSkill: '',
        question1: '',
        question2: '',
        question3: '',
        projectName: '',
        position: '',
        groupZalo: '',
        finalResult: 'Passed',
    });

    const handleSaveComments = () => {

        onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFinalResultChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            finalResult: e.target.value,
        }));
    };

    return (


        <div className="container">
            <h2>Result of Interview</h2>
            <div className="form-group-row">
                <div className="form-group">
                    <label htmlFor="programmingLanguage">Programming language</label>
                    <input
                        placeholder='ReactJS'
                        type="text"
                        id="programmingLanguage"
                        name="programmingLanguage"
                        value={formData.programmingLanguage}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="major">Major</label>
                    <input
                        placeholder='Software Engineering'
                        type="text"
                        id="major"
                        name="major"
                        value={formData.major}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="year">Which year you are in?</label>
                    <select
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}

                    >
                        <option value="Sophohmore">Sophohmore</option>
                        <option value="Not Sophohmore">Not Sophohmore</option>
                    </select>

                </div>
                <div className="form-group">
                    <label htmlFor="whyChooseMajor">Why choose this major?</label>
                    <input
                        type="text"
                        id="whyChooseMajor"
                        name="whyChooseMajor"
                        value={formData.whyChooseMajor}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="whyChooseIntern">Why choose to intern at Amazing Tech?</label>
                    <input
                        type="text"
                        id="whyChooseIntern"
                        name="whyChooseIntern"
                        value={formData.whyChooseIntern}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="howKnowCompany">How do you know about Amazing Tech?</label>
                    <input
                        type="text"
                        id="howKnowCompany"
                        name="howKnowCompany"
                        value={formData.howKnowCompany}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="knowOfficeAddress">Do you know the office address?</label>
                    <select
                        placeholder='Yes/No'
                        id="knowOfficeAddress"
                        name="knowOfficeAddress"
                        value={formData.knowOfficeAddress}
                        onChange={handleChange}
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="knowUNPAIDInternships">Do you know about UNPAID internships?
                    </label>
                    <select
                        placeholder='Yes/No'
                        id="knowUNPAIDInternships"
                        name="knowUNPAIDInternships"
                        value={formData.knowUNPAIDInternships}
                        onChange={handleChange}
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="desireForInternship">What are your desires when interning at Amazing Tech?</label>
                    <input
                        type="text"
                        id="desireForInternship"
                        name="desireForInternship"
                        value={formData.desireForInternship}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="workMode">Work online or offline?</label>
                    <input
                        type="text"
                        id="workMode"
                        name="workMode"
                        value={formData.workMode}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="busyWithOther">Are you busy with anything else?</label>
                    <input
                        type="text"
                        id="busyWithOther"
                        name="busyWithOther"
                        value={formData.busyWithOther}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="communicationSkill">Communication skill</label>
                    <input
                        type="text"
                        id="communicationSkill"
                        name="communicationSkill"
                        value={formData.communicationSkill}
                        onChange={handleChange}
                    />
                </div>
                {/**end section 1 */}
            </div>

            <div className="question-group">
                <h3>Question of Technology</h3>
                <div className="form-group-row">
                    <div className="form-group">
                        <label htmlFor="question1">{t("Question")} 1</label>
                        <input
                            placeholder='Enter answer'
                            type="text"
                            id="question1"
                            name="question1"
                            value={formData.question1}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="question2">{("Question")} 2</label>
                        <input
                            type="text"
                            id="question2"
                            name="question2"
                            value={formData.question2}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="question3">{t("Question")} 3</label>
                        <input
                            type="text"
                            id="question3"
                            name="question3"
                            value={formData.question3}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <div className="project-group">
                <h3>Assign Project</h3>
                <div className="form-group-row">
                    <div className="form-group">
                        <label htmlFor="projectName">Project's Name</label>
                        <input
                            placeholder='Enter answer'
                            type="text"
                            id="projectName"
                            name="projectName"
                            value={formData.projectName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="position">Position</label>
                        <input
                            type="text"
                            id="position"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="groupZalo">Group Zalo</label>
                        <input
                            type="text"
                            id="groupZalo"
                            name="groupZalo"
                            value={formData.groupZalo}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Add position and groupZalo here */}
                </div>
            </div>
            <div className="container-two">
                <div className="result-group" >
                    <h3>Final result:</h3>
                    <select
                        id="finalResult"
                        name="finalResult"
                        value={formData.finalResult}
                        onChange={handleFinalResultChange}
                        className="result-select"
                    >
                        <option value="Passed">Passed</option>
                        <option value="Not Passed">Not Passed</option>
                    </select>
                </div>
                <button className="save-comments-button" onClick={handleSaveComments} style={{ marginTop: "50px", marginBottom: "50px", cursor: "pointer" }}><FiSave />
                    &nbsp;
                    Save Comments
                </button>
            </div>
        </div>

    );
};

export default FeedBackModal;