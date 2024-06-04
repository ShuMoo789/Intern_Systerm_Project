import React, { useState } from 'react';
import { Layout, Menu, Avatar, Button, Input, Card, Pagination, Space, Row, Col, Form, Select } from 'antd';
import {
    UserOutlined,
    BellOutlined,
    SearchOutlined,
    PlusOutlined,
    FileExcelOutlined,
    EditOutlined,
    DeleteOutlined,
    CopyOutlined
} from '@ant-design/icons';
import './ProjectMan.css';
import NewProjectModal from './NewProjectModal.jsx';
import MainLayout from "../../MainLayout/MainLayout.jsx";
import dayjs from 'dayjs'

const { Header, Sider, Content } = Layout;

function UserInfo({ name, role, avatarSrc, notificationSrc }) {
    return (
        <div className="user-info">
            <div className="avatar-section">
                <Avatar size={54} src={avatarSrc} icon={<UserOutlined />} />
                <div className="user-details">
                    <p className="username">{name}</p>
                    <p className="role">{role}</p>
                </div>
            </div>
            <BellOutlined className="notification-icon" />
        </div>
    );
}

function ManagementItem({ icon, title }) {
    return (
        <div className="management-item">
            {icon}
            <p className="management-title">{title}</p>
        </div>
    );
}

function ProjectCard({ title, status, position, technology, leader, subLeader, mentor, startDate, releaseDate, issues, onClick }) {
    
    // option of status column
    const optionSelect = [
        {
            value: 'inProcessed',
            label: 'In processed',
        },
    ];

    const formatDate = (date) => {
        return dayjs(date).format('DD MMM YYYY');
    };
    
    return (
        <Card 
            className="project-card"
            title={title} 
            onClick={onClick}
            extra={
            <span className="status">
                <Select defaultValue={status} options={optionSelect}/>
                <input type="checkbox" />
            </span>} 
            >
                <p><b>Position: </b>{position}</p>
                <p><b>Technology: </b>{technology}</p>
                <p><b>Leader - Sub Leader: </b>{leader} - {subLeader}</p>
                <p><b>Mentor: </b>{mentor}</p>
                <p><b>Group Zalo: <a href="#">Link</a></b></p>
                <div className="project-deadline">
                    <p style={{color: "#5DF400"}}><b>Start Date: {formatDate(startDate)}</b></p>
                    <p style={{color: "#D62222"}}><b>Release Date: {formatDate(releaseDate)}</b></p>
                </div>
                <div className="project-footer">
                    <div className="members">
                        <UserOutlined />
                        +2
                    </div>
                    <div className="issues">
                        <CopyOutlined style={{color: "#5C5967"}}/>
                        {issues} issues
                    </div>
                </div>
        </Card>
    );
}

function ProjectManagement() {

    const [openModal, setOpenModal] = useState(false); // Move modal state inside component
    const [selectedProject, setSelectedProject] = useState(null); // State to manage the currently selected Project

    const projects = [
        {
            title: "Intern System",
            status: "In process",
            position: "Back-End, Front-End, BA, Design",
            technology: ".NET, ReactJS, Trello",
            leader: "Leader Name",
            subLeader: "Sub Leader Name",
            mentor: "Mentor Name",
            startDate: dayjs("05 Jan 2023", 'DD MMM YYYY'),
            releaseDate: dayjs("05 Apr 2023", 'DD MMM YYYY'),
            issues: 14
        },
        {
            title: "HRM System",
            status: "In process",
            position: "Back-End, Front-End, BA, Design",
            technology: ".NET, ReactJS, Trello",
            leader: "Leader Name",
            subLeader: "Sub Leader Name",
            mentor: "Mentor Name",
            startDate: dayjs("05 Jan 2023", 'DD MMM YYYY').toDate(),
            releaseDate: dayjs("05 Apr 2023", 'DD MMM YYYY').toDate(),
            issues: 14
        },
        {
            title: "Intern System",
            status: "In process",
            position: "Back-End, Front-End, BA, Design",
            technology: ".NET, ReactJS, Trello",
            leader: "Leader Name",
            subLeader: "Sub Leader Name",
            mentor: "Mentor Name",
            startDate: dayjs("05 Jan 2023", 'DD MMM YYYY').toDate(),
            releaseDate: dayjs("05 Apr 2023", 'DD MMM YYYY').toDate(),
            issues: 14
        },
    ];

    const handleOpenModal = (project) => {
        setOpenModal(true);
        setSelectedProject(project);
    };

    return (
        <Layout className="project-management-section">
            <header className="header-section">
                <h1 className="header-title">Project Management</h1>
                <UserInfo name="Natalie Brogan" role="Admin" avatarSrc="user-avatar-url" notificationSrc="notification-icon-url" />
            </header>

            <Content className="main-content">
                <Form className="search-form" layout="inline">
                    <Form.Item>
                        <Input placeholder="Search for Information" prefix={<SearchOutlined />} className="search-input" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" icon={<SearchOutlined />} className="search-button">Search</Button>
                    </Form.Item>
                </Form>

                <Row gutter={[16, 16]} className="filter-box">
                    <Col span={6}>
                        <Input placeholder="Enter Name of project" className="filter-input" />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Enter Position" className="filter-input" />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Enter Technology" className="filter-input" />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Enter Leader" className="filter-input" />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Enter Sub Leader" className="filter-input" />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Enter Mentor" className="filter-input" />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Enter Release Date" className="filter-input" />
                    </Col>
                </Row>

                <Space className="buttons-section">
                    <Button icon={<FileExcelOutlined />} className="clean-filters-button">Clean Filters</Button>
                    <Button type="primary" icon={<SearchOutlined />} className="search-button">Search</Button>
                </Space>

                <Space className="action-buttons">
                    <Button icon={<FileExcelOutlined />} className="export">Export Excel</Button>
                    <Button icon={<EditOutlined />} className="edit">Edit</Button>
                    <Button icon={<DeleteOutlined />} className="delete">Delete</Button>
                    <Button type="primary" icon={<PlusOutlined />} className="add">Add New Project</Button>
                </Space>

                <Row gutter={[16, 16]} className="project-list">
                    {projects.map((project, index) => (
                        <Col span={8} key={index}>
                            <ProjectCard {...project} onClick={() => handleOpenModal(project)} />
                        </Col>
                    ))}
                </Row>

                <Pagination className="pagination" total={56} showTotal={total => `1 - 6 of ${total}`} />
            </Content>
            <NewProjectModal
                open={openModal}
                project={selectedProject}
                onClose={() => setOpenModal(false)} // Ensure you handle closing the modal
            />
        </Layout>
    );
}

export default function MyComponent() {
    return (
        <MainLayout>
            <ProjectManagement />
        </MainLayout>
    );
}
