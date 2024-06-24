import React from "react";
import "./GroupButton.css";
import { Button } from "antd";
import useViewport from "../../hooks/useViewport";
import { useTranslation } from "react-i18next";

const GroupButton = ({
    groupButton,
    onSendEmail,
    onScheduleInterview,
    onCreateIntern,
    onEdit,
    onDelete,
    onExportExcel,
}) => {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1350;

    // function handle Send Mail when click button Send Mail
    const handleSendMailClick = () => {
        onSendEmail();
    };

    // function handle Export Excel when click button Export Excel
    const handleExportExcelClick = () => {
        onExportExcel();
    };

    // function handle Edit when click button Edit
    const handleEditClick = () => {
        onEdit();
    };

    // function handle Delete when click button Delete
    const handleDeleteClick = () => {
        onDelete();
    };

    // function handle Add New Intern when click button Add New Intern
    const handleAddNewInternClick = () => {
        onCreateIntern();
    };

    const handleScheduleInterview = () => {
        onScheduleInterview();
    };

    const { t } = useTranslation();

    // function branches to handle functions by button name
    const handleButtonClick = (name) => {
        if (name === t("Send Email") || name === t("Create Group")) {
            handleSendMailClick();
        } else if (name === t("Export Excel")) {
            handleExportExcelClick();
        } else if (name === t("Edit")) {
            handleEditClick();
        } else if (name === t("Delete")) {
            handleDeleteClick();
        } else if (name === t("Add New Intern") || (name === t("Add New Project"))) {
            handleAddNewInternClick();
        } else if (name === t("Schedule interview")) {
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
