import React from 'react';
import { Layout, Menu, Avatar, Button, Input, Card, Pagination, Space, Row, Col, Form } from 'antd';
import {
    UserOutlined,
    BellOutlined,
    SearchOutlined,
    PlusOutlined,
    FileExcelOutlined,
    EditOutlined,
    DeleteOutlined,
    TeamOutlined
} from '@ant-design/icons';
import './ProjectMan.css';
import MainLayout from "../../MainLayout/MainLayout.jsx";

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

function ProjectCard({ title, position, technology, leader, subLeader, mentor, startDate, releaseDate, issues }) {
    return (
        <Card title={title} extra={<span className="status">In process</span>} className="project-card">
            <p>Position: {position}</p>
            <p>Technology: {technology}</p>
            <p>Leader - Sub Leader: {leader} - {subLeader}</p>
            <p>Mentor: {mentor}</p>
            <p>Group Zalo: Link</p>
            <p>Start Date: {startDate}</p>
            <p>Release Date: {releaseDate}</p>
            <div className="project-footer">
                <div className="issues">
                    <TeamOutlined />
                    {issues} issues
                </div>
                <div className="members">
                    <UserOutlined />
                    +2
                </div>
            </div>
        </Card>
    );
}

function ProjectManagement() {
    const projects = [
        {
            title: "Intern System",
            position: "Back-End, Front-End, BA, Design",
            technology: ".NET, ReactJS, Trello",
            leader: "Leader Name",
            subLeader: "Sub Leader Name",
            mentor: "Mentor Name",
            startDate: "05 Jan 2023",
            releaseDate: "05 Apr 2023",
            issues: 14
        },
        {
            title: "HRM System",
            position: "Back-End, Front-End, BA, Design",
            technology: ".NET, ReactJS, Trello",
            leader: "Leader Name",
            subLeader: "Sub Leader Name",
            mentor: "Mentor Name",
            startDate: "05 Jan 2023",
            releaseDate: "05 Apr 2023",
            issues: 14
        }
    ];

    return (
        <Layout className="project-management-section">
            <Header className="header-section">
                <h1 className="header-title">Project Management</h1>
                <UserInfo name="Natalie Brogan" role="Admin" avatarSrc="user-avatar-url" notificationSrc="notification-icon-url" />
            </Header>

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
                            <ProjectCard {...project} />
                        </Col>
                    ))}
                </Row>

                <Pagination className="pagination" total={56} showTotal={total => `1 - 6 of ${total}`} />
            </Content>
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
