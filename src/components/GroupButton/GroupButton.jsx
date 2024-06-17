import React from "react";
import "./GroupButton.css";
import { Button } from "antd";
import useViewport from "../../hooks/useViewport";

const GroupButton = ({
    groupButton,
    onSendEmail,
    onScheduleInterview,
    onCreateIntern,
}) => {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1350;

    // function handle Send Mail when click button Send Mail
    const handleSendMailClick = () => {
        onSendEmail();
    };

    // function handle Export Excel when click button Export Excel
    const handleExportExcelClick = () => {
        console.log("export excel");
    };

    // function handle Edit when click button Edit
    const handleEditClick = () => {
        console.log("edit");
    };

    // function handle Delete when click button Delete
    const handleDeleteClick = () => {
        console.log("delete");
    };

    // function handle Add New Intern when click button Add New Intern
    const handleAddNewInternClick = () => {
        onCreateIntern();
    };

    const handleScheduleInterview = () => {
        onScheduleInterview();
    };

    // function branches to handle functions by button name
    const handleButtonClick = (name) => {
        if (name === "Send Email" || name === "Create Group") {
            handleSendMailClick();
        } else if (name === "Export Excel") {
            handleExportExcelClick();
        } else if (name === "Edit") {
            handleEditClick();
        } else if (name === "Delete") {
            handleDeleteClick();
        } else if (name === "Add New Intern") {
            handleAddNewInternClick();
        } else if (name === "Schedule interview") {
            handleScheduleInterview();
        }
    };

    return (
        <div className="group-button">
            {/* map button group from prop passed from InternList via Navigation */}
            {groupButton.map((prop) => (
                <Button
                    className="common-btn"
                    key={prop.name}
                    onClick={() => handleButtonClick(prop.name)}
                    style={{
                        minWidth: "12%",
                        backgroundColor: prop.color,
                        fontSize: "15px",
                        color: "#FFFFFF",
                    }}
                >
                    {isMobile ? (
                        prop.icon
                    ) : (
                        <span>
                            {prop.icon} {prop.name}
                        </span>
                    )}
                    {/* {prop.icon}{prop.name} */}
                </Button>
            ))}
        </div>
    );
};

export default GroupButton;
