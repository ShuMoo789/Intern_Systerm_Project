import React,{ useState, useEffect } from 'react';
import { Modal, Input, DatePicker, Select, Button } from 'antd';
import dayjs from 'dayjs';
import "./NewProjectModal.css";

const NewProjectModal = ({ open, onClose, create }) => {

    // option of status column
    const optionSelect = [
        {
            value: 'inProcessed',
            label: 'In processed',
        },
    ];

    const [projectInfo, setProjectInfo] = useState({
        title:          '',
        position:       '',
        technology:     '',
        leader:         '',
        subLeader:      '', 
        mentor:         '',
        startDate:      null,
        releaseDate:    null,
        groupZalo:      '',
        status:         '',
    });
    
    // Date format for date inputs
    const dateFormat = 'YYYY/MM/DD';

    const handleInputChange = (key, value) => {
        setProjectInfo(prev => ({
            ...prev,
            [key]: value,
        }));
  
    }

    const handleDateChange = (type, date) => {   
        setProjectInfo(prev => ({
            ...prev,
            [type]: date,
        }));
        console.log(date)
    }

    return (
        <Modal
        title={<h3 style={{margin: "0"}}>Add New Project</h3>}
            open={open}
            width={1200}
            footer={
                <Button className='create-project-btn'>Create Project</Button>
            }
            onCancel={onClose}
            centered
        >
            <div className="create-new-project-modal">
                <div className="field">
                    <label>
                        <h4>Project title</h4>
                        <Input type='text' name="title" value={projectInfo.title} onChange={(e) => handleInputChange("title",e.target.value)}></Input>
                    </label>
                </div>
                <div className="field">
                    <label>
                        <h4>Position</h4>
                        <Input type='text' value={projectInfo.position}  onChange={(e) => handleInputChange("position",e.target.value)}></Input>
                    </label>
                </div>
                <div className="field">
                    <label>
                        <h4>Technology</h4>
                        <Input type='text' value={projectInfo.technology}  onChange={(e) => handleInputChange("technology",e.target.value)}></Input>
                    </label>
                </div>
                <div className="field">
                    <label>
                        <h4>Leader</h4>
                        <Input type='text' value={projectInfo.leader}  onChange={(e) => handleInputChange("leader",e.target.value)}></Input>
                    </label>
                </div>
                <div className="field">
                    <label>
                        <h4>Sub Leaders</h4>
                        <Input type='text' value={projectInfo.subLeader}  onChange={(e) => handleInputChange("subLeader",e.target.value)}></Input>
                    </label>
                </div>
                <div className="field">
                    <label>
                        <h4>Mentor</h4>
                        <Input type='text' value={projectInfo.mentor}  onChange={(e) => handleInputChange("mentor",e.target.value)}></Input>
                    </label>
                </div>
                <div className="field">
                    <label>
                        <h4>Start Date</h4>
                        <DatePicker format={dateFormat} onChange={(date)=> handleDateChange("startDate",date)} style={{width: "100%", height: "3.4em"}}/>                                    
                    </label>
                </div>
                <div className="field">
                    <label>
                        <h4>Release Date</h4>
                        <DatePicker format={dateFormat} onChange={(date)=> handleDateChange("releaseDate",date)} style={{width: "100%", height: "3.4em"}}/>                    
                    </label>
                </div>
                <div className="field">
                    <label>
                        <h4>Group Zalo</h4>
                        <Input type='text' value={projectInfo.groupZalo}  onChange={(e) => handleInputChange("groupZalo",e.target.value)}></Input>
                    </label>
                </div>
                <div className="field">
                    <label>
                        <h4>Status</h4>
                        <Select options={optionSelect} defaulValue={projectInfo.status} onChange={(e) => handleInputChange("status",e.target.value)}></Select>
                    </label>
                </div>
            </div>
        </Modal>
    )
}

export default NewProjectModal