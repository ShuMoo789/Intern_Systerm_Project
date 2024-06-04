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
    CopyOutlined,
    DownOutlined
} from '@ant-design/icons';
import {
    DatePicker,
    Dropdown,

} from 'antd';
import './ProjectMan.css';
import MainLayout from "../../MainLayout/MainLayout.jsx";
import ProjectMana from "../../data/ProjectMana.json";

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

function ProjectCard({ title, status, position, technology, leader, subLeader, mentor, startDate, releaseDate, issues }) {


    // option of status column
    const optionSelect = [
        {
            value: 'pending',
            label: 'Pending',
        },
        {
            value: 'inProcess',
            label: 'In Process',
        },
        {
            value: 'finished',
            label: 'Finished',
        },
    ];

    return (
        <Card
            className="project-card"
            title={title}
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
                    <p style={{color: "#5DF400"}}><b>Start Date: {startDate}</b></p>
                    <p style={{color: "#D62222"}}><b>Release Date: {releaseDate}</b></p>
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
    const [projects, setProjects] = useState(ProjectMana.projects);
    const [filteredProjects, setFilteredProjects] = useState(ProjectMana.projects);
    const [selectedFilters, setSelectedFilters] = useState({
        title: '',
        status: '',
        position: '',
        technology: '',
        leader: '',
        subLeader: '',
        mentor: '',
        releaseDate: null,
    });

    const titleOptions = [...new Set(projects.map(project => project.title))];
    const statusOptions = [...new Set(projects.map(project => project.status))];
    const positionOptions = [...new Set(projects.map(project => project.position))];
    const technologyOptions = [...new Set(projects.map(project => project.technology))];
    const leaderOptions = [...new Set(projects.map(project => project.leader))];
    const subLeaderOptions = [...new Set(projects.map(project => project.subLeader))];
    const mentorOptions = [...new Set(projects.map(project => project.mentor))];

    const handleSearch = () => {
        let results = projects;
        if (selectedFilters.title) {
            results = results.filter(project => project.title === selectedFilters.title);
        }
        if (selectedFilters.position) {
            results = results.filter(project => project.position === selectedFilters.position);
        }
        if (selectedFilters.status) {
            results = results.filter(project => project.status === selectedFilters.status);
        }
        if (selectedFilters.technology) {
            results = results.filter(project => project.technology === selectedFilters.technology);
        }
        if (selectedFilters.leader) {
            results = results.filter(project => project.leader === selectedFilters.leader);
        }
        if (selectedFilters.subLeader) {
            results = results.filter(project => project.subLeader === selectedFilters.subLeader);
        }
        if (selectedFilters.mentor) {
            results = results.filter(project => project.mentor === selectedFilters.mentor);
        }
        if (selectedFilters.releaseDate) {
            results = results.filter(project => new Date(project.releaseDate).toLocaleDateString() === selectedFilters.releaseDate.toLocaleDateString());
        }
        setFilteredProjects(results);
    };

    const handleClearFilters = () => {
        setFilteredProjects(projects);
        setSelectedFilters({
            title: '',
            position: '',
            status: '',
            technology: '',
            leader: '',
            subLeader: '',
            mentor: '',
            releaseDate: null,
        });
    };

    const handleFilterChange = (type, value) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            [type]: value,
        }));
    };

    return (
        <Layout className="project-management-section">
            <Header className="header-section">
                <h1 className="header-title">Project Management</h1>
                <UserInfo name="Natalie Brogan" role="Admin" avatarSrc="user-avatar-url" />
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
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Enter Name of Project"
                            value={selectedFilters.title || undefined}
                            onChange={(value) => handleFilterChange('title', value)}
                            options={titleOptions.map(title => ({ value: title, label: title }))}
                        />
                    </Col>
                    <Col span={6}>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Enter Position"
                            value={selectedFilters.position || undefined}
                            onChange={(value) => handleFilterChange('position', value)}
                            options={positionOptions.map(position => ({ value: position, label: position }))}
                        />
                    </Col>
                    <Col span={6}>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Enter Technology"
                            value={selectedFilters.technology || undefined}
                            onChange={(value) => handleFilterChange('technology', value)}
                            options={technologyOptions.map(technology => ({ value: technology, label: technology }))}
                        />
                    </Col>
                    <Col span={6}>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Enter Leader"
                            value={selectedFilters.leader || undefined}
                            onChange={(value) => handleFilterChange('leader', value)}
                            options={leaderOptions.map(leader => ({ value: leader, label: leader }))}
                        />
                    </Col>
                    <Col span={6}>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Enter Sub Leader"
                            value={selectedFilters.subLeader || undefined}
                            onChange={(value) => handleFilterChange('subLeader', value)}
                            options={subLeaderOptions.map(subLeader => ({ value: subLeader, label: subLeader }))}
                        />
                    </Col>
                    <Col span={6}>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Enter Mentor"
                            value={selectedFilters.mentor || undefined}
                            onChange={(value) => handleFilterChange('mentor', value)}
                            options={mentorOptions.map(mentor => ({ value: mentor, label: mentor }))}
                        />
                    </Col>
                    <Col span={6}>
                        <DatePicker
                            style={{ width: '100%' }}
                            placeholder="Enter Release Date"
                            value={selectedFilters.releaseDate}
                            onChange={(date) => handleFilterChange('releaseDate', date)}
                        />
                    </Col>
                </Row>

                <Space className="buttons-section">
                    <Button icon={<FileExcelOutlined />} className="clean-filters-button" onClick={handleClearFilters}>Clean Filters</Button>
                    <Button type="primary" icon={<SearchOutlined />} className="search-button" onClick={handleSearch}>Search</Button>
                </Space>

                <Space className="action-buttons">
                    <Button icon={<FileExcelOutlined />} className="export">Export Excel</Button>
                    <Button icon={<EditOutlined />} className="edit">Edit</Button>
                    <Button icon={<DeleteOutlined />} className="delete">Delete</Button>
                    <Button type="primary" icon={<PlusOutlined />} className="add">Add New Project</Button>
                </Space>

                <Row gutter={[16, 16]} className="project-list">
                    {filteredProjects.map((project, index) => (
                        <Col span={8} key={index}>
                            <ProjectCard {...project} />
                        </Col>
                    ))}
                </Row>

                <Pagination className="pagination" total={filteredProjects.length} showTotal={total => `1 - ${filteredProjects.length} of ${total}`} />
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
