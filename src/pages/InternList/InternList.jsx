import React from "react"
import { MailOutlined, ExportOutlined, EditOutlined, DeleteOutlined, FolderAddOutlined, EyeOutlined } from '@ant-design/icons';
import { Table, Button, Select } from "antd";
import DataInternList from "../../data/InternList.json"
import MenuNavigate from "../../components/Menu/MenuNavigate"
import Navigation from "../../components/Navigation/Navigation"
import './InternList.css'

const groupButton = [
    {
        color: '#6537B1',
        name: 'Send Email',
        icon: <MailOutlined />,
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
]

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
]

const columns = [
    {
        title: 'Intern ID',
        dataIndex: 'internID',
    },
    {
        title: 'Start Date',
        dataIndex: 'startDate',
    },
    {
        title: 'Finish Date',
        dataIndex: 'finishDate',
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
    },
    {
        title: 'School',
        dataIndex: 'school',
        width: 160,
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        width: 180,
    },
    {
        title: 'CV',
        dataIndex: 'cv',
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
        width: 130,
        render: (text) => {
            return (<Select
                defaultValue={text}
                style={{
                    width: 120,
                    color: 'red'
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
        render: (text) => <Button>{text}<EditOutlined /></Button>
    },
    {
        title: 'Button',
        dataIndex: 'button',
    },
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        name: record.name,
    }),
};

const InternList = () => {
    return (
        <div>
            <MenuNavigate />
            <div className="content-intern-list">
                <Navigation titleName='Intern List' groupButton={groupButton} />
                <div className="group-filter-table">
                    <div className="filter">Filter</div>
                    <div className="table-intern-list">
                        <Table rowSelection={{
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
        </div>
    )
}

export default InternList