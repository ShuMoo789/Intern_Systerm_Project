import React from "react";
import "./GroupButton.css";
import { Button } from "antd";

const GroupButton = ({ groupButton, onSendEmail }) => {
    // function handle Send Mail when click button Send Mail
    const handleSendMailClick = () => {
        onSendEmail();
    };

    // function handle Export Excel when click button Export Excel
    const handleExportExcelClick = () => {
        console.log('export excel');
    };

    // function handle Edit when click button Edit
    const handleEditClick = () => {
        console.log('edit');
    };

    // function handle Delete when click button Delete
    const handleDeleteClick = () => {
        console.log('delete');
    };

    // function handle Add New Intern when click button Add New Intern
    const handleAddNewInternClick = () => {
        console.log('add new intern');
    };

    // function branches to handle functions by button name
    const handleButtonClick = (name) => {
        if (name === 'Send Email') {
            handleSendMailClick();
        } else if (name === 'Export Excel') {
            handleExportExcelClick();
        } else if (name === 'Edit') {
            handleEditClick();
        } else if (name === 'Delete') {
            handleDeleteClick();
        } else if (name === 'Add New Intern') {
            handleAddNewInternClick();
        }
    };

    return (
        <div className="group-button">
            {/* map button group from prop passed from InternList via Navigation */}
            {groupButton.map((prop) => (
                <Button
                    key={prop.name}
                    onClick={() => handleButtonClick(prop.name)}
                    style={{ minWidth: '15%', backgroundColor: prop.color, fontSize: '10px', color: '#FFFFFF' }}
                >
                    {prop.icon}{prop.name}
                </Button>
            ))}
        </div>
    );
};

export default GroupButton;