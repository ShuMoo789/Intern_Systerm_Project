import React from "react";
import "./GroupButton.css";
import { Button, message } from "antd"; // Import message from antd for displaying messages
import useViewport from "../../hooks/useViewport";
import { useTranslation } from "react-i18next";

const GroupButton = ({
  groupButton,
  onSendEmail,
  onScheduleInterview,
  checkedCount,
  onCreateIntern,
  onEdit,
  onDelete,
  onExportExcel,
  onCreatePosition,
}) => {
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 1350;
  const { t } = useTranslation();

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
  const handleCreatePosition = () => {
    onCreatePosition();
  };
  // function to handle click on Edit button
  const handleEditButtonClick = () => {
    if (checkedCount === 1) {
      handleEditClick();

    }
  };

  // function to handle click on Delete button
  const handleDeleteButtonClick = () => {
    if (checkedCount >= 1) {
      handleDeleteClick();
    }
  };

  // function branches to handle functions by button name
  const handleButtonClick = (name) => {
    if (name === t("Send Email") || name === t("Create Group")) {
      handleSendMailClick();
    } else if (name === t("Export Excel")) {
      handleExportExcelClick();
    } else if (name === t("Edit")) {
      handleEditButtonClick();
    } else if (name === t("Delete")) {
      handleDeleteButtonClick();
    } else if (name === t("Add New Intern") || name === t("Add New Project")) {
      handleAddNewInternClick();
    } else if (name === t("Schedule interview")) {
      handleScheduleInterview();
    } else if (name === t("Add New Position")) {
      handleCreatePosition();
    }
  };

  return (
    <div className="group-button">
      {/* map button group from prop passed from InternList via Navigation */}
      {groupButton.map((prop) => {
        const isEditDisabled = prop.name === t("Edit") && checkedCount !== 1;
        const isDeleteDisabled = prop.name === t("Delete") && checkedCount < 1;
        const isDisabled = isEditDisabled || isDeleteDisabled;

        return (
          <Button
            className="common-btn"
            key={prop.name}
            onClick={() => handleButtonClick(prop.name)}
            style={{
              minWidth: "12%",
              backgroundColor: isDisabled ? "gray" : prop.color, //change background to gray
              fontSize: "15px",
              color: "#FFFFFF",
            }}
            //add disable

            disabled={isDisabled}

          >
            {isMobile ? (
              prop.icon
            ) : (
              <span>
                {prop.icon} {prop.name}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default GroupButton;
