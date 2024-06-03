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
            value: 'passed',
            label: 'Passed',
        },
        {
            value: 'failed',
            label: 'Failed',
        },
        {
            value: 'pending',
            label: 'Pending',
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
    const projects = [
        {
            title: "Intern System",
            status: "In process",
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
            status: "In process",
            position: "Back-End, Front-End, BA, Design",
            technology: ".NET, ReactJS, Trello",
            leader: "Ronaldo",
            subLeader: "Sub Leader Name",
            mentor: "Mentor Name",
            startDate: "05 Jan 2023",
            releaseDate: "05 Apr 2023",
            issues: 14
        },
        {
            title: "Intern System",
            status: "In process",
            position: "Back-End, Front-End, BA, Design",
            technology: ".NET, ReactJS, Trello",
            leader: "Messi",
            subLeader: "Sub Leader Name",
            mentor: "Mentor Name",
            startDate: "05 Jan 2023",
            releaseDate: "05 Apr 2023",
            issues: 14
        },
    ];
    const [filteredProjects, setFilteredProjects] = useState(projects)
    
    const [selectedProjects, setSelectedProjects] = useState([]);
    
    const titleName = [...new Set(filteredProjects.map(title => title.title))];

    const statusChange = [...new Set(filteredProjects.map(projects => projects.status))];

    const positionNames = [...new Set(filteredProjects.map(projects => projects.position))];

    const technologyName = [...new Set(filteredProjects.map(projects => projects.technology))];

    const leaderName = [...new Set(filteredProjects.map(projects => projects.leader))];

    const subLeaderName = [...new Set(filteredProjects.map(projects => projects.subLeader))];

    const mentorName = [...new Set(filteredProjects.map(projects => projects.mentor))];

    const releaseDateChoice = [...new Set(filteredProjects.map(projects => projects.releaseDate))];

    const handleDateChange = (date) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            releaseDate: date,
        }));
    };


    const [selectedFilters, setSelectedFilters] = useState({
        title: '',
        status: '',
        position: '',
        technology: '',
        leader: '',
        subLeader: '',
        mentor: '',
        releaseDate: null,
    })
    
    const createMenu = (type, items) => (
        <Menu onClick={({ key }) => handleMenuClick(type, key)}>
            {/* Map over the items to create menu items */}
            {items.map((item) => (
                <Menu.Item key={item}>
                    <div>{item}</div>
                </Menu.Item>
            ))}
        </Menu>
    );

    const handleMenuClick = (type, key) => {
        // Update the selectedFilters state with the new filter value
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            [type]: key,
        }));
    };

    const handleSearch = () => {
        let results = projects;
        if (selectedFilters.title) {
            results = results.filter(projects => projects.title === selectedFilters.title)
        }
        if (selectedFilters.position) {
            results = results.filter(projects => projects.position === selectedFilters.position)
        }
        if (selectedFilters.status) {
            results = results.filter(projects => projects.status === selectedFilters.status)
        }
        if (selectedFilters.technology) {
            results = results.filter(projects => projects.technology === selectedFilters.technology)
        }
        if (selectedFilters.leader) {
            results = results.filter(projects => projects.leader === selectedFilters.leader)
        }
        if (selectedFilters.subLeader) {
            results = results.filter(projects => projects.subLeader === selectedFilters.subLeader)
        }
        if (selectedFilters.mentor) {
            results = results.filter(projects => projects.mentor === selectedFilters.mentor)
        }
        if (selectedFilters.releaseDate) {
            results = results.filter(projects => 
                moment (projects.releaseDate).isSame(selectedFilters.releaseDate, 'day'))
        }
        setFilteredProjects(results)
    }

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
        })
    }
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
                        <Select
                            style={{
                                width: '100%',
                                height: '100%',
                                marginTop: 5,
                                fontSize: 5
                            }}
                            placeholder="Enter Name of Project"
                            value={selectedFilters.title || undefined}
                            onSelect={(value) => handleMenuClick('title', value)}
                            options={titleName.map(title => ({ value: title, label: title }))}
                        />
                    </Col>
                    <Col span={6}>
                    <Select
                            style={{
                                width: '100%',
                                height: '100%',
                                marginTop: 5,
                                fontSize: 5
                            }}
                            placeholder="Enter Postion"
                            value={selectedFilters.position || undefined}
                            onSelect={(value) => handleMenuClick('position', value)}
                            options={positionNames.map(position => ({ value: position, label: position }))}
                        />
                    </Col>
                    <Col span={6}>
                    <Select
                            style={{
                                width: '100%',
                                height: '100%',
                                marginTop: 5,
                                fontSize: 5
                            }}
                            placeholder="Enter Technology"
                            value={selectedFilters.technology || undefined}
                            onSelect={(value) => handleMenuClick('technology', value)}
                            options={technologyName.map(technology => ({ value: technology, label: technology }))}
                        />
                    </Col>
                    <Col span={6}>
                    <Select
                            style={{
                                width: '100%',
                                height: '100%',
                                marginTop: 5,
                                fontSize: 5
                            }}
                            placeholder="Enter Leader"
                            value={selectedFilters.leader || undefined}
                            onSelect={(value) => handleMenuClick('leader', value)}
                            options={leaderName.map(leader => ({ value: leader, label: leader }))}
                        />
                    </Col>
                    <Col span={6}>
                    <Select
                            style={{
                                width: '100%',
                                height: '100%',
                                marginTop: 5,
                                fontSize: 5
                            }}
                            placeholder="Enter Sub Leader"
                            value={selectedFilters.subLeader || undefined}
                            onSelect={(value) => handleMenuClick('subLeader', value)}
                            options={subLeaderName.map(subLeader => ({ value: subLeader, label: subLeader }))}
                        />
                    </Col>
                    <Col span={6}>
                    <Select
                            style={{
                                width: '100%',
                                height: '100%',
                                marginTop: 5,
                                fontSize: 5
                            }}
                            placeholder="Enter Mentor"
                            value={selectedFilters.mentor || undefined}
                            onSelect={(value) => handleMenuClick('mentor', value)}
                            options={mentorName.map(mentor => ({ value: mentor, label: mentor }))}
                    />
                    </Col>
                    <DatePicker
                    style={{
                        width: '30%',
                        height: '100%',
                        marginTop: 5,
                        fontSize: 5
                    }}
                    placeholder="Enter Release Date"
                    value={selectedFilters.releaseDate}
                    onChange={handleDateChange}
                />
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
