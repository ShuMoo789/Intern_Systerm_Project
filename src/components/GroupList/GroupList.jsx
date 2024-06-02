import React, { useState, useEffect } from 'react';
import { Button, Input, Modal, Select, Table, message } from 'antd';
// import PeopleIcon from '@mui/icons-material/People';
import MenuNavigate from '../Menu/MenuNavigate';
import "../GroupList/GroupList.css";

const GroupList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [role, setRole] = useState('');
    const [groupZalo, setGroupZalo] = useState('');
    const [project, setProject] = useState('');
    const [mentor, setMentor] = useState('');
    const [groups, setGroups] = useState([]);
    const [errors, setErrors] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        fetchGroups(); // Fetch groups data when component mounts
    }, []);

    const fetchGroups = async () => {
        try {
            const response = await fetch('https://65f40c0f105614e654a1c922.mockapi.io/group');
            if (!response.ok) {
                throw new Error('Failed to fetch groups');
            }
            const data = await response.json();
            setGroups(data);
        } catch (error) {
            console.error('Error fetching groups:', error);
            message.error('Failed to fetch groups');
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setErrors({});
    };

    const validateFields = () => {
        const newErrors = {};
        if (!role) newErrors.role = 'Role is required';
        if (!groupZalo) newErrors.groupZalo = 'Group Zalo is required';
        if (!project) newErrors.project = 'Project is required';
        if (!mentor) newErrors.mentor = 'Mentor is required';
        return newErrors;
    };

    const handleCreateGroup = async () => {
        const newErrors = validateFields();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            message.error('Please fill in all fields');
            return;
        }

        const newGroup = { role, groupZalo, project, mentor };

        try {
            const response = await fetch('https://65f40c0f105614e654a1c922.mockapi.io/group', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGroup),
            });

            if (!response.ok) {
                throw new Error('Failed to add new group');
            }

            const data = await response.json();
            setGroups([...groups, data]);
            setIsModalOpen(false);

            // Reset form values
            setRole('');
            setGroupZalo('');
            setProject('');
            setMentor('');
            setErrors({});
        } catch (error) {
            console.error('Error adding new group:', error);
            message.error('Failed to add new group');
        }
    };

    const onChangeRole = (value) => {
        setRole(value);
    };

    const onChangeProject = (value) => {
        setProject(value);
    };

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const columns = [
        { title: 'Role', dataIndex: 'role', key: 'role' },
        { title: 'Project', dataIndex: 'project', key: 'project' },
        { title: 'Group Zalo', dataIndex: 'groupZalo', key: 'groupZalo' },
        { title: 'Mentor', dataIndex: 'mentor', key: 'mentor' }
    ];

    const handleTableChange = (pagination, filters, sorter) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    return (
        <>
            <MenuNavigate />
            <Button type="primary" onClick={showModal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', backgroundColor: "#6537B1", padding: "20px", borderRadius: "10px" }}>
                <PeopleIcon />&nbsp; &nbsp; <span>Create group</span>
            </Button>
            <Modal
                title={<h2>Create group</h2>}
                visible={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                style={{
                    maxWidth: "1200px",
                    width: "100%",
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '33%' }}>
                        <p><b>Role</b></p>
                        <Select
                            showSearch
                            placeholder="Select a role"
                            optionFilterProp="children"
                            onChange={onChangeRole}
                            filterOption={filterOption}
                            style={{ width: "100%" }}
                            options={[
                                { value: 'Admin', label: 'Admin' },
                                { value: 'Human resources', label: 'Human resources' },
                                { value: 'Mentor', label: 'Mentor' },
                                { value: 'School', label: 'School' },
                                { value: 'Intern', label: 'Intern' },
                            ]}
                            value={role}
                        />
                        {errors.role && <p style={{ color: 'red' }}>{errors.role}</p>}

                        {/* Mentor */}
                        <p><b>Mentor</b></p>
                        <Input
                            style={{ width: "100%" }}
                            placeholder='Mentor name'
                            value={mentor}
                            onChange={(e) => setMentor(e.target.value)}
                        />
                        {errors.mentor && <p style={{ color: 'red' }}>{errors.mentor}</p>}
                    </div>
                    <div style={{ width: '33%', paddingLeft: '16px', paddingRight: '16px', marginLeft: '20px' }}>
                        {/* Project */}
                        <p><b>Project</b></p>
                        <Select
                            showSearch
                            placeholder="Select a project"
                            optionFilterProp="children"
                            onChange={onChangeProject}
                            filterOption={filterOption}
                            style={{ width: "100%" }}
                            options={[
                                { value: 'Project 1', label: 'Project 1' }
                            ]}
                            value={project}
                        />
                        {errors.project && <p style={{ color: 'red' }}>{errors.project}</p>}
                    </div>

                    <div style={{ width: '33%', paddingLeft: '16px' }}>
                        {/* Group zalo */}
                        <p><b>Group zalo</b></p>
                        <Input
                            style={{ width: "100%" }}
                            placeholder='FE intern system'
                            value={groupZalo}
                            onChange={(e) => setGroupZalo(e.target.value)}
                        />
                        {errors.groupZalo && <p style={{ color: 'red' }}>{errors.groupZalo}</p>}
                    </div>
                </div>
                <div style={{ marginTop: 16, textAlign: 'right' }}>
                    <Button
                        type="primary"
                        onClick={handleCreateGroup}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', backgroundColor: "#6537B1", padding: "20px", borderRadius: "10px" }}
                    >
                        <PeopleIcon /> &nbsp; &nbsp; <span>Create group</span>
                    </Button>
                </div>
            </Modal>

            <div style={{ marginTop: "32px", marginLeft: "260px",width: '80vw', overflowX: 'auto' }}>
                <Table
                    dataSource={groups.map((group, index) => ({ key: index, ...group }))}   
                    columns={columns}
                    pagination={{ current: currentPage, pageSize: pageSize }}
                    onChange={handleTableChange}
                />
            </div>



        </>
    );
};

export default GroupList;