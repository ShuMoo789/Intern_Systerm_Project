import React from "react"
import "./GroupButton.css"
import { Button } from "antd"

const GroupButton = (props) => {

    const handleSendMailClick = () => {
        console.log('send mail');
    }

    const handleExportExcelClick = () => {
        console.log('export excel');
    }

    const handleEditClick = () => {
        console.log('edit');
    }

    const handleDeleteClick = () => {
        console.log('delete');
    }

    const handleAddNewInternClick = () => {
        console.log('add new intern');
    }

    const handleButtonClick = (name) => {
        if (name == 'Send Email') {
            handleSendMailClick()
        } else if (name == 'Export Excel') {
            handleExportExcelClick()
        } else if (name == 'Edit') {
            handleEditClick()
        } else if (name == 'Delete') {
            handleDeleteClick()
        } else if (name == 'Add New Intern') {
            handleAddNewInternClick()
        }
    }

    return (
        <div className="group-button">
            {props.groupButton.map((prop) => (<Button onClick={() => handleButtonClick(prop.name)} style={{ minWidth: '15%', backgroundColor: prop.color, fontSize: '10px', color: '#FFFFFF' }}>{prop.icon}{prop.name}</Button>))}
        </div>
    )
}

export default GroupButton