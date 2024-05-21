// ViewPopup.jsx
import React, { useState } from "react";
import "./ViewPopup.css";
import { Modal, Input, Tabs } from "antd";

const ViewPopup = ({ isVisible, onClose, intern }) => {
    const onChange = (key) => {
        console.log(key);
  };

  const items = [
    {
        key: "1",
        label: "View details of Intern",
        children: (
            <div className="view-popup-content">
            <div className="view-popup-row">
                <label>Intern ID</label>
                <Input type="text" value={intern.internID} />
            </div>
            <div className="view-popup-row">
                <label>Full Name</label>
                <Input type="text" value={intern.fullName} />
            </div>
            <div className="view-popup-row">
                <label>Date Of Birth</label>
                <Input type="text" value={intern.dateOfBirth} />
            </div>
            <div className="view-popup-row">
                <label>Phone Number</label>
                <Input type="text" value={intern.phoneNumber} />
            </div>
            <div className="view-popup-row">
                <label>Position</label>
                <Input type="text" value={intern.position} />
            </div>
            <div className="view-popup-row">
                <label>School</label>
                <Input type="text" value={intern.school} />
            </div>
            <div className="view-popup-row">
                <label>Address</label>
                <Input type="text" value={intern.address} />
            </div>
            <div className="view-popup-row">
                <label>Email</label>
                <Input type="text" value={intern.email} />
            </div>
            <div className="view-popup-row">
                <label>Link CV</label>
                <a
                className="view-popup-link"
                href={intern.cvLink}
                target="_blank"
                rel="noopener noreferrer"
                >
                Link
                </a>
            </div>
            <div className="view-popup-row">
                <label>Rank</label>
                <Input type="text" value="Intern" />
            </div>
            </div>
      ),
    },
    {
        key: "2",
        label: "Comments of CV",
        children: "Content of Tab Pane 2",
    },
    {
        key: "3",
        label: "Result of Interview",
        children: "Content of Tab Pane 3",
    },
  ];

  return (
    <Modal
        width={1000}
        title=""
        visible={isVisible}
        onCancel={onClose}
        footer={null}
        className="view-popup-modal"
    >
        <Tabs
            className="custom-tabs"
            style={{ fontWeight: 600 }}
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
      />
    </Modal>
  );
};

export default ViewPopup;
