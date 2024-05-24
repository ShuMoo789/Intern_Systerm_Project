import React, { useState } from "react";
import { MailOutlined, ExportOutlined, EditOutlined, DeleteOutlined, FolderAddOutlined, EyeOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { Table, Select, Button, Input } from "antd";
import DataInternList from "../../data/InternList.json";  // data of table intern list
import MenuNavigate from "../../components/Menu/MenuNavigate";
import Navigation from "../../components/Navigation/Navigation";
import SendEmailPopup from './SendEmailPopup';
import ReportProcessModal from "./ReportProcessPopup";
import ViewButton from "./ViewButton";
import './InternList.css';

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

// option of intern ID from file InternList.json
const optionsInternID = DataInternList.map(item => ({ value: item.internID, label: item.internID }))

// option of intern phone number from file InternList.json
const optionsInternPhoneNumber = DataInternList.map(item => ({ value: item.phoneNumber, label: item.phoneNumber }))

const optionsInternRole = DataInternList.reduce((options, item) => {
    const existingValue = options.find(option => option.value === item.role);

    if (!existingValue) {
        options.push({ value: item.role, label: item.role });
    }

    return options;
}, []);

const optionsInternMentor = DataInternList.reduce((options, item) => {
    const existingValue = options.find(option => option.value === item.mentor);

    if (!existingValue) {
        options.push({ value: item.mentor, label: item.mentor });
    }

    return options;
}, []);

const optionsInternFullName = DataInternList.reduce((options, item) => {
    const existingValue = options.find(option => option.value === item.fullName);

    if (!existingValue) {
        options.push({ value: item.fullName, label: item.fullName });
    }

    return options;
}, []);

const optionsInternAddress = DataInternList.reduce((options, item) => {
    const existingValue = options.find(option => option.value === item.address);

    if (!existingValue) {
        options.push({ value: item.address, label: item.address });
    }

    return options;
}, []);

const optionsInternPosition = DataInternList.reduce((options, item) => {
    const existingValue = options.find(option => option.value === item.position);

    if (!existingValue) {
        options.push({ value: item.position, label: item.position });
    }

    return options;
}, []);

const optionsInternProject = DataInternList.reduce((options, item) => {
    const existingValue = options.find(option => option.value === item.project);

    if (!existingValue) {
        options.push({ value: item.project, label: item.project });
    }

    return options;
}, []);

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

    const [isEmailPopupVisible, setEmailPopupVisible] = useState(false);
    const [selectedIntern, setSelectedIntern] = useState(null);

    // state of filter
    const [filter, setFilter] = useState({
        internID: '',
        phoneNumber: '',
        role: '',
        mentor: '',
        fullName: '',
        address: '',
        position: '',
        project: '',
        dateOfBirth: '',
        email: '',
        school: '',
        groupZalo: ''
    })

    // title of intern list table
    const columns = [
        {
            title: 'Intern ID',
            dataIndex: 'internID',
            width: 120,
            filteredValue: [filter.internID],
            onFilter: (value, record) => {
                return record.internID.includes(value)
            }
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
            filteredValue: [filter.fullName],
            onFilter: (value, record) => {
                return record.fullName.includes(value)
            }
        },
        {
            title: 'Date Of Birth',
            dataIndex: 'dateOfBirth',
            width: 110,
            filteredValue: [filter.dateOfBirth],
            onFilter: (value, record) => {
                return record.dateOfBirth.includes(value)
            }
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            width: 120,
            filteredValue: [filter.phoneNumber],
            onFilter: (value, record) => {
                return record.phoneNumber.includes(value)
            }
        },
        {
            title: 'Position',
            dataIndex: 'position',
            width: 120,
            filteredValue: [filter.position],
            onFilter: (value, record) => {
                return record.position.includes(value)
            }
        },
        {
            title: 'School',
            dataIndex: 'school',
            width: 160,
            filteredValue: [filter.school],
            onFilter: (value, record) => {
                return record.school.includes(value)
            }
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: 120,
            filteredValue: [filter.address],
            onFilter: (value, record) => {
                return record.address.includes(value)
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: 180,
            filteredValue: [filter.email],
            onFilter: (value, record) => {
                return record.email.includes(value)
            }
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
            filteredValue: [filter.role],
            onFilter: (value, record) => {
                return record.role.includes(value)
            }
        },
        {
            title: 'Project',
            dataIndex: 'project',
            width: 130,
            filteredValue: [filter.project],
            onFilter: (value, record) => {
                return record.project.includes(value)
            }
        },
        {
            title: 'Group Zalo',
            dataIndex: 'groupZalo',
            width: 160,
            filteredValue: [filter.groupZalo],
            onFilter: (value, record) => {
                return record.groupZalo.includes(value)
            }
        },
        {
            title: 'Mentor',
            dataIndex: 'mentor',
            width: 130,
            filteredValue: [filter.mentor],
            onFilter: (value, record) => {
                return record.mentor.includes(value)
            }
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
                    }}
                    options={optionSelect}
                />)
            }
        },
        {
            title: 'Report Process',
            dataIndex: 'reportProcess',
            width: 170,
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
            render: (text) => <ViewButton>{text}</ViewButton>
        },
    ];

    const handleOpenEmailPopup = () => {
        setSelectedIntern(null);
        setEmailPopupVisible(true);
    };

    const handleCloseEmailPopup = () => {
        setEmailPopupVisible(false);
    };

    const handleSendEmail = (emailData) => {
        console.log('Email Data:', emailData);
        // Handle email sending logic here
        handleCloseEmailPopup();
    };

    // Handle Clean Filter Button by set state filter to '' 
    const handleCleanFilterButton = () => {
        setFilter({
            internID: '',
            phoneNumber: '',
            role: '',
            mentor: '',
            fullName: '',
            address: '',
            position: '',
            project: '',
            dateOfBirth: '',
            email: '',
            school: '',
            groupZalo: ''
        })
        console.log(filter);
    }

    // When select intern id change, field internID in filter state change too
    const handleChangeFilterInternID = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            internID: value
        }))
    }

    // When select intern phone number change, field phoneNumber in filter state change too
    const handleChangeFilterPhoneNumber = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            phoneNumber: value
        }))
    }

    // When select intern role change, field role in filter state change too
    const handleChangeFilterRole = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            role: value
        }))
    }

    // When select intern mentor change, field mentor in filter state change too
    const handleChangeFilterMentor = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            mentor: value
        }))
    }

    // When select intern fullname change, field fullName in filter state change too
    const handleChangeFilterFullName = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            fullName: value
        }))
    }

    // When select intern address change, field address in filter state change too
    const handleChangeFilterAddress = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            address: value
        }))
    }

    // When select intern position change, field position in filter state change too
    const handleChangeFilterPosition = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            position: value
        }))
    }

    // When select intern project change, field project in filter state change too
    const handleChangeFilterProject = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            project: value
        }))
    }

    // When input intern D.O.B change, field dateOfBirth in filter state change too
    const handleChangeFilterDOB = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            dateOfBirth: value
        }))
    }

    // When input intern email change, field email in filter state change too
    const handleChangeFilterEmail = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            email: value
        }))
    }

    // When input intern School change, field school in filter state change too
    const handleChangeFilterSchool = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            school: value
        }))
    }

    // When input intern group zalo change, field groupZalo in filter state change too
    const handleChangeFilterGroupZalo = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            groupZalo: value
        }))
    }

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
                    <div className="filter">
                        <div className="filter-group">
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                    height: '17%',
                                    marginTop: 5,
                                    fontSize: 5
                                }}
                                defaultValue=""
                                placeholder="Enter intern's ID"
                                options={optionsInternID}
                                onChange={handleChangeFilterInternID}
                                value={filter.internID || null}
                            />
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                    height: '17%',
                                    marginTop: 5,
                                    fontSize: 5
                                }}
                                placeholder="Enter intern's Phone number"
                                options={optionsInternPhoneNumber}
                                onChange={handleChangeFilterPhoneNumber}
                                value={filter.phoneNumber || null}
                            />
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                    height: '17%',
                                    marginTop: 5,
                                    fontSize: 5
                                }}
                                placeholder="Enter intern's Role"
                                options={optionsInternRole}
                                onChange={handleChangeFilterRole}
                                value={filter.role || null}
                            />
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                    height: '17%',
                                    marginTop: 5,
                                    fontSize: 5
                                }}
                                placeholder="Enter intern's Mentor"
                                options={optionsInternMentor}
                                onChange={handleChangeFilterMentor}
                                value={filter.mentor || null}
                            />
                        </div>
                        <div className="filter-group">
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                    height: '17%',
                                    marginTop: 5,
                                    fontSize: 5
                                }}
                                placeholder="Enter intern's Fullname"
                                options={optionsInternFullName}
                                onChange={handleChangeFilterFullName}
                                value={filter.fullName || null}
                            />
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                    height: '17%',
                                    marginTop: 5,
                                    fontSize: 5
                                }}
                                placeholder="Enter intern's Address"
                                options={optionsInternAddress}
                                onChange={handleChangeFilterAddress}
                                value={filter.address || null}
                            />
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                    height: '17%',
                                    marginTop: 5,
                                    fontSize: 5
                                }}
                                placeholder="Enter intern's Position"
                                options={optionsInternPosition}
                                onChange={handleChangeFilterPosition}
                                value={filter.position || null}
                            />
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                    height: '17%',
                                    marginTop: 5,
                                    fontSize: 5
                                }}
                                placeholder="Enter intern's Project"
                                options={optionsInternProject}
                                onChange={handleChangeFilterProject}
                                value={filter.project || null}
                            />
                        </div>
                        <div className="filter-group">
                            <Input
                                style={{
                                    width: '100%',
                                    height: '17%',
                                    marginTop: 5,
                                }}
                                placeholder="Enter intern's D.O.B"
                                value={filter.dateOfBirth}
                                onChange={(e) => handleChangeFilterDOB(e.target.value)}
                            />
                            <Input
                                style={{
                                    width: '100%',
                                    height: '17%',
                                    marginTop: 5,
                                }}
                                placeholder="Enter intern's Email"
                                value={filter.email}
                                onChange={(e) => handleChangeFilterEmail(e.target.value)}
                            />
                            <Input
                                style={{
                                    width: '100%',
                                    height: '17%',
                                    marginTop: 5,
                                }}
                                placeholder="Enter intern's School"
                                value={filter.school}
                                onChange={(e) => handleChangeFilterSchool(e.target.value)}
                            />
                            <Input
                                style={{
                                    width: '100%',
                                    height: '17%',
                                    marginTop: 5,
                                }}
                                placeholder="Enter intern's Group Zalo"
                                value={filter.groupZalo}
                                onChange={(e) => handleChangeFilterGroupZalo(e.target.value)}
                            />
                        </div>
                        <div className="filter-group">
                            <div className="filter-button">
                                <Button onClick={handleCleanFilterButton}> <FilterOutlined />Clean Filters </Button>
                            </div>
                            <div className="search-button">
                                <Button type="primary"> <SearchOutlined />Search</Button>
                            </div>
                        </div>
                    </div>
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
                            style={{ maxWidth: '100%', minHeight: '100%' }}
                            pagination={{
                                pageSize: 7,
                            }}
                        />
                    </div>
                </div>
            </div>
            {/*Render Email Popup */}
            <SendEmailPopup
                onClose={handleCloseEmailPopup}
                onSendEmail={handleSendEmail}
                // intern={selectedIntern}
                openPopup={isEmailPopupVisible}
            />
        </div>
    );
}

export default InternList;
