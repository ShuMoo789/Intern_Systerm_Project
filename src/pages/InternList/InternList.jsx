import React, { useState } from "react";
import { MailOutlined, ExportOutlined, EditOutlined, DeleteOutlined, FolderAddOutlined, EyeOutlined } from '@ant-design/icons';
import { Table, Select, Button } from "antd";
import DataInternList from "../../data/InternList.json";  // data of table intern list
import MenuNavigate from "../../components/Menu/MenuNavigate";
import Navigation from "../../components/Navigation/Navigation";
import SendEmailPopup from './SendEmailPopup';
import './InternList.css';
import ReportProcessModal from "./ReportProcessPopup";
// props GroupButton
const groupButton = [
    {
        color: '#6537B1',
        name: 'Send Email',
        icon: <MailOutlined />
    },
    {
        color: '#41B137',
        name: 'Export Excel',
        icon: <ExportOutlined />
    },
    {
        color: '#FB8632',
        name: 'Edit',
        icon: <EditOutlined />
    },
    {
        color: '#FF3A2E',
        name: 'Delete',
        icon: <DeleteOutlined />
    },
    {
        color: '#4889E9',
        name: 'Add New Intern',
        icon: <FolderAddOutlined />
    },
];

// option of status column
const optionSelect = [
    {
        value: 'inProcess',
        label: 'In process',
    },
    {
        value: 'completedOJT',
        label: 'Completed OJT',
    },
    {
        value: 'out',
        label: 'Out',
    },
];

// title of intern list table
const columns = [
    {
        title: 'Intern ID',
        dataIndex: 'internID',
        width: 120,
    },
    {
        title: 'Start Date',
        dataIndex: 'startDate',
        width: 120,
    },
    {
        title: 'Finish Date',
        dataIndex: 'finishDate',
        width: 120,
    },
    {
        title: 'Full Name',
        dataIndex: 'fullName',
        width: 130,
    },
    {
        title: 'Date Of Birth',
        dataIndex: 'dateOfBirth',
        width: 110,
    },
    {
        title: 'Phone Number',
        dataIndex: 'phoneNumber',
        width: 120,
    },
    {
        title: 'Position',
        dataIndex: 'position',
        width: 120,
    },
    {
        title: 'School',
        dataIndex: 'school',
        width: 160,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        width: 120,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        width: 180,
    },
    {
        title: 'CV',
        dataIndex: 'cv',
        width: 120,
        render: (text) => <a style={{ color: '#000000', textDecoration: 'underline' }}>{text}</a>
    },
    {
        title: 'Comments',
        dataIndex: 'comments',
        width: 150,
        render: (text) => <Button>{text}<EyeOutlined /></Button>
    },
    {
        title: 'Role',
        dataIndex: 'role',
        width: 120,
    },
    {
        title: 'Project',
        dataIndex: 'project',
        width: 130,
    },
    {
        title: 'Group Zalo',
        dataIndex: 'groupZalo',
        width: 160,
    },
    {
        title: 'Mentor',
        dataIndex: 'mentor',
        width: 130,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        width: 160,
        render: (text) => {
            return (<Select
                defaultValue={text}
                style={{
                    width: 140,
                    color: 'red',
                }}
                // onChange={handleChange}
                options={optionSelect}
            />)
        }
    },
    {
        title: 'Report Process',
        dataIndex: 'reportProcess',
        width: 150,
        render: (text, record) => (
            <ReportProcessModal>
                {({ showModal }) => (
                    <Button onClick={() => showModal(record)}>
                        {text}
                        <EditOutlined />
                    </Button>
                )}
            </ReportProcessModal>
        ),
    },
    {
        title: 'Button',
        dataIndex: 'button',
        width: 120,
        render: (text) => <Button type="primary" ghost style={{ borderRadius: '100px' }}>{text}</Button>
    },
];

// checkbox table Ant Design
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        name: record.name,
    }),
};

const InternList = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEmailPopupVisible, setEmailPopupVisible] = useState(false);
    const [selectedIntern, setSelectedIntern] = useState(null);

    const handleOpenEmailPopup = () => {
        setSelectedIntern(null);
        setEmailPopupVisible(true);
        console.log('open popup');
    };

    const handleCloseEmailPopup = () => {
        setEmailPopupVisible(false);
    };

    const handleSendEmail = (emailData) => {
        console.log('Email Data:', emailData);
        handleCloseEmailPopup();
    };



    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            {/* Menu left*/}
            <MenuNavigate />
            {/* Content of InternList right */}
            <div className="content-intern-list">
                {/* Pass props to Navigation */}
                <Navigation
                    titleName='Intern List'
                    groupButton={groupButton}
                    onSendEmail={handleOpenEmailPopup}
                />
                {/* Group of filter and table */}
                <div className="group-filter-table">
                    {/* Filter */}
                    <div className="filter">Filter</div>
                    <div className="table-intern-list">
                        {/* use table of Ant Design */}
                        <Table
                            rowSelection={{
                                type: 'checkbox',
                                ...rowSelection
                            }}
                            columns={columns}
                            dataSource={DataInternList}
                            scroll={{ x: '2200px', y: '400px' }}
                            style={{ maxWidth: '100%', height: '100%' }}
                        />
                    </div>
                </div>
            </div>
            {/*Render Email Popup */}
            <SendEmailPopup
                onClose={handleCloseEmailPopup}
                onSendEmail={handleSendEmail}
                openPopup={isEmailPopupVisible}
            />
            {/* <ReportProcessModal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                intern={selectedIntern}
            /> */}
        </div>
    );
}


export default InternList;
