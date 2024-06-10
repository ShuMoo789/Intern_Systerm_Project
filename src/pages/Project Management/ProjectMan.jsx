import React, { useEffect, useState } from 'react';
import { Layout, Avatar, Button, Input, Card, Pagination, Space, Row, Col, Form, Select, DatePicker, Tooltip } from 'antd';
import {
    UserOutlined,
    BellOutlined,
    SearchOutlined,
    PlusOutlined,
    FileExcelOutlined,
    EditOutlined,
    DeleteOutlined,
    CopyOutlined, DownCircleOutlined
} from '@ant-design/icons';
import './ProjectMan.css';
import NewProjectModal from './NewProjectModal.jsx';
import MainLayout from "../../MainLayout/MainLayout.jsx";
import projectData from "../../data/ProjectMana.json";
import dayjs from 'dayjs';

const { Header, Content } = Layout;

function UserInfo({ name, role, avatarSrc }) {
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

function ProjectCard({ title, status, position, technology, leader, subLeader, mentor, startDate, releaseDate, issues, teamMembers }) {
    const optionSelect = [
        { value: 'inProcessed', label: 'In process' },
        { value: 'completed', label: 'Completed' },
    ];

    const formatDate = (date) => dayjs(date).format('DD MMM YYYY');

    return (
        <Card
            className="project-card"
            title={title}
            extra={
                <span className="status">
                    <Select defaultValue={status} options={optionSelect}/>
                    <input type="checkbox"/>
                </span>
            }
        >
            <p><b>Position: </b>{position}</p>
            <p><b>Technology: </b>{technology}</p>
            <p>
                <b>Leader: </b>
                <Tooltip title={leader.name}>
                    <Avatar size="small" src={leader.avatar} icon={<UserOutlined/>}/>
                </Tooltip>
            </p>
            <p>
                <b>Sub Leader: </b>
                <Tooltip title={subLeader.name}>
                    <Avatar size="small" src={subLeader.avatar} icon={<UserOutlined/>}/>
                </Tooltip>
            </p>
            <p>
                <b>Mentor: </b>
                <Tooltip title={mentor.name}>
                    <Avatar size="small" src={mentor.avatar} icon={<UserOutlined/>}/>
                </Tooltip>
            </p>
            <p><b>Group Zalo: <a href="#" style={{textDecoration: "underline"}}>Link</a></b></p>
            <div className="project-deadline">
                <p style={{color: "#5DF400"}}><b>Start Date: {formatDate(startDate)}</b></p>
                <p style={{color: "#D62222"}}><b>Release Date: {formatDate(releaseDate)}</b></p>
            </div>
            <div className="project-footer">
                <Avatar.Group maxCount={4}>
                    {teamMembers.map((member, index) => (
                        <Tooltip title={member.name}>
                            <Avatar key={index} src={member.avatar}/>
                        </Tooltip>
                    ))}
                </Avatar.Group>
                <div className="issues">
                    <CopyOutlined style={{color: "#5C5967"}}/>
                    {issues} issues
                </div>
            </div>
        </Card>
    );
}

function ProjectManagement() {
    const [openModal, setOpenModal] = useState(false);
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
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

    useEffect(() => {
        setProjects(projectData.projects);
        setFilteredProjects(projectData.projects);
    }, []);

    const handleSearch = () => {
        console.log("Selected Filters:", selectedFilters);

        let results = projects;

        if (selectedFilters.title) {
            results = results.filter(project => project.title.includes(selectedFilters.title));
        }
        if (selectedFilters.status) {
            results = results.filter(project => project.status === selectedFilters.status);
        }
        if (selectedFilters.position) {
            results = results.filter(project => project.position.includes(selectedFilters.position));
        }
        if (selectedFilters.technology) {
            results = results.filter(project => project.technology.includes(selectedFilters.technology));
        }
        if (selectedFilters.leader) {
            results = results.filter(project => project.leader.name.includes(selectedFilters.leader));
        }
        if (selectedFilters.subLeader) {
            results = results.filter(project => project.subLeader.name.includes(selectedFilters.subLeader));
        }
        if (selectedFilters.mentor) {
            results = results.filter(project => project.mentor.name.includes(selectedFilters.mentor));
        }
        if (selectedFilters.releaseDate) {
            results = results.filter(project => dayjs(project.releaseDate).isSame(selectedFilters.releaseDate, 'day'));
        }

        console.log("Filtered Results:", results);
        setFilteredProjects(results);
    };

    const handleClearFilters = () => {
        setFilteredProjects(projects);
        setSelectedFilters({
            title: '',
            status: '',
            position: '',
            technology: '',
            leader: '',
            subLeader: '',
            mentor: '',
            releaseDate: null,
        });
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleFilterChange = (type, value) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            [type]: value,
        }));
    };

    return (
        <Layout className="project-management-section">
            <header className="header-section">
                <h1 className="header-title">Project Management</h1>
                <UserInfo name="Natalie Brogan" role="Admin" avatarSrc="user-avatar-url" />
            </header>
            <section className="content-section">
                <h2 className="section-title">Search for Information</h2>
                <div className="button-group">
                    <button className="button button-export">
                        <FileExcelOutlined alt="Export Icon" className="button-icon" />
                        <span>Export Excel</span>
                    </button>
                    <button className="button button-edit">
                        <EditOutlined alt="Edit Icon" className="button-icon" />
                        <span>Edit</span>
                    </button>
                    <button className="button button-delete">
                        <DeleteOutlined alt="Delete Icon" className="button-icon" />
                        <span>Delete</span>
                    </button>
                    <button className="button button-add-intern" onClick={handleOpenModal}>
                        <PlusOutlined alt="Add Intern Icon" className="button-icon" />
                        <span>Add New Project</span>
                    </button>
                </div>
            </section>
            <main className="main-grid">
                <Form className="search-form" layout="inline">
                    <Row gutter={[16, 16]} className="filter-box">
                        <Col span={18}>
                            <Row gutter={[10,10]}>
                                <Col span={7}>
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Enter Name of Project"
                                    value={selectedFilters.title || undefined}
                                    onChange={(value) => handleFilterChange('title', value)}
                                    options={projects.map(project => ({ value: project.title, label: project.title }))}
                                />
                            </Col>
                                <Col span={7}>
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Enter Position"
                                        value={selectedFilters.position || undefined}
                                        onChange={(value) => handleFilterChange('position', value)}
                                        options={projects.map(project => ({ value: project.position, label: project.position }))}
                                    />
                                </Col>
                                <Col span={7}>
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Enter Technology"
                                        value={selectedFilters.technology || undefined}
                                        onChange={(value) => handleFilterChange('technology', value)}
                                        options={projects.map(project => ({ value: project.technology, label: project.technology }))}
                                    />
                                </Col>
                                <Col span={7}>
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Enter Leader"
                                        value={selectedFilters.leader || undefined}
                                        onChange={(value) => handleFilterChange('leader', value)}
                                        options={projects.map(project => ({ value: project.leader.name, label: project.leader.name }))}
                                    />
                                </Col>
                                <Col span={7}>
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Enter Sub Leader"
                                        value={selectedFilters.subLeader || undefined}
                                        onChange={(value) => handleFilterChange('subLeader', value)}
                                        options={projects.map(project => ({ value: project.subLeader.name, label: project.subLeader.name }))}
                                    />
                                </Col>
                                <Col span={7}>
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Enter Mentor"
                                        value={selectedFilters.mentor || undefined}
                                        onChange={(value) => handleFilterChange('mentor', value)}
                                        options={projects.map(project => ({ value: project.mentor.name, label: project.mentor.name }))}
                                    />
                                </Col>
                                <Col span={7}>
                                    <DatePicker
                                        style={{ width: '100%' }}
                                        placeholder="Enter Release Date"
                                        value={selectedFilters.releaseDate}
                                        onChange={(date) => handleFilterChange('releaseDate', date)}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={4}>
                            <Col span={6}>
                                <div className="filterbuttons">
                                <Form.Item>
                                    <Button type="primary" icon={<DeleteOutlined />} className="clean-filters-button" onClick={handleClearFilters}>Clean Filters</Button>
                                </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" icon={<SearchOutlined />} className="searchpm-button" onClick={handleSearch}>Search</Button>
                                    </Form.Item>
                                </div>
                                </Col>
                        </Col>
                    </Row>
                </Form>
                

                <Row gutter={[16, 16]} className="project-list">
                    {filteredProjects.map((project, index) => (
                        <Col span={8} key={index}>
                            <ProjectCard {...project} />
                        </Col>
                    ))}
                </Row>

                <Pagination className="pagination" total={filteredProjects.length} showTotal={total => `1 - ${filteredProjects.length} of ${total}`} />
            </main>
            <NewProjectModal open={openModal} onClose={handleCloseModal} />
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
