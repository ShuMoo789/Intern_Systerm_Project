import React, { useEffect, useState } from "react";
import {
    Layout,
    Avatar,
    Button,
    Input,
    Card,
    Pagination,
    Space,
    Row,
    Col,
    Form,
    Select,
    DatePicker,
    Tooltip,
} from "antd";
import {
    UserOutlined,
    BellOutlined,
    SearchOutlined,
    PlusOutlined,
    FileExcelOutlined,
    EditOutlined,
    DeleteOutlined,
    CopyOutlined,
} from "@ant-design/icons";
import "./ProjectMan.css";
import NewProjectModal from "./NewProjectModal.jsx";
import MainLayout from "../../MainLayout/MainLayout.jsx";
import projectData from "../../data/ProjectMana.json";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import Navigation from "../../components/Navigation/Navigation.jsx";
import useViewport from "../../hooks/useViewport";

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

function ProjectCard({
    title,
    status,
    position,
    technology,
    leader,
    subLeader,
    mentor,
    startDate,
    releaseDate,
    issues,
    teamMembers,
}) {
    const { t } = useTranslation();
    const optionSelect = [
        { value: "inProcessed", label: t("In process") },
        { value: "completed", label: t("Completed") },
    ];

    const formatDate = (date) => dayjs(date).format("DD MMM YYYY");

    return (
        <Card
            className="project-card"
            title={title}
            extra={
                <span className="status">
                    <Select defaultValue={status} options={optionSelect} />
                    <input type="checkbox" />
                </span>
            }
        >
            <p>
                <b>{t("Position")}: </b>
                {position}
            </p>
            <p>
                <b>{t("Technology")}: </b>
                {technology}
            </p>
            <p>
                <b>{t("Leader")}: </b>
                <Tooltip title={leader.name}>
                    <Avatar
                        size="small"
                        src={leader.avatar}
                        icon={<UserOutlined />}
                    />
                </Tooltip>
            </p>
            <p>
                <b>{t("Sub Leader")}: </b>
                <Tooltip title={subLeader.name}>
                    <Avatar
                        size="small"
                        src={subLeader.avatar}
                        icon={<UserOutlined />}
                    />
                </Tooltip>
            </p>
            <p>
                <b>{t("Mentor")}: </b>
                <Tooltip title={mentor.name}>
                    <Avatar
                        size="small"
                        src={mentor.avatar}
                        icon={<UserOutlined />}
                    />
                </Tooltip>
            </p>
            <p>
                <b>
                    {t("Group Zalo")}:{" "}
                    <a href="#" style={{ textDecoration: "underline" }}>
                        Link
                    </a>
                </b>
            </p>
            <div className="project-deadline">
                <p style={{ color: "#5DF400" }}>
                    <b>
                        {t("Start Date")}: {formatDate(startDate)}
                    </b>
                </p>
                <p style={{ color: "#D62222" }}>
                    <b>
                        {t("Release Date")}: {formatDate(releaseDate)}
                    </b>
                </p>
            </div>
            <div className="project-footer">
                <Avatar.Group maxCount={4}>
                    {teamMembers.map((member, index) => (
                        <Tooltip title={member.name}>
                            <Avatar key={index} src={member.avatar} />
                        </Tooltip>
                    ))}
                </Avatar.Group>
                <div className="issues">
                    <CopyOutlined style={{ color: "#5C5967" }} />
                    {issues} {t("issues")}
                </div>
            </div>
        </Card>
    );
}

function ProjectManagement() {
    const { t } = useTranslation();
    const [openModal, setOpenModal] = useState(false);
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({
        title: "",
        status: "",
        position: "",
        technology: "",
        leader: "",
        subLeader: "",
        mentor: "",
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
            results = results.filter((project) =>
                project.title.includes(selectedFilters.title)
            );
        }
        if (selectedFilters.status) {
            results = results.filter(
                (project) => project.status === selectedFilters.status
            );
        }
        if (selectedFilters.position) {
            results = results.filter((project) =>
                project.position.includes(selectedFilters.position)
            );
        }
        if (selectedFilters.technology) {
            results = results.filter((project) =>
                project.technology.includes(selectedFilters.technology)
            );
        }
        if (selectedFilters.leader) {
            results = results.filter((project) =>
                project.leader.name.includes(selectedFilters.leader)
            );
        }
        if (selectedFilters.subLeader) {
            results = results.filter((project) =>
                project.subLeader.name.includes(selectedFilters.subLeader)
            );
        }
        if (selectedFilters.mentor) {
            results = results.filter((project) =>
                project.mentor.name.includes(selectedFilters.mentor)
            );
        }
        if (selectedFilters.releaseDate) {
            results = results.filter((project) =>
                dayjs(project.releaseDate).isSame(
                    selectedFilters.releaseDate,
                    "day"
                )
            );
        }

        console.log("Filtered Results:", results);
        setFilteredProjects(results);
    };

    const handleClearFilters = () => {
        setFilteredProjects(projects);
        setSelectedFilters({
            title: "",
            status: "",
            position: "",
            technology: "",
            leader: "",
            subLeader: "",
            mentor: "",
            releaseDate: null,
        });
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleFilterChange = (type, value) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [type]: value,
        }));
    };

    const groupButton = [
        {
            color: "#41B137",
            name: t("Export Excel"),
            icon: <FileExcelOutlined />,
        },
        {
            color: "#FB8632",
            name: t("Edit"),
            icon: <EditOutlined />,
        },
        {
            color: "#FF3A2E",
            name: t("Delete"),
            icon: <DeleteOutlined />,
        },
        {
            color: "#4889E9",
            name: t("Add New Project"),
            icon: <PlusOutlined />,
        },
    ];

    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    return (
        <div id="APRCV">
            <main className="content">
                <div>
                    <Navigation
                        titleName={t("Project Management")}
                        groupButton={groupButton}
                        onCreateIntern={handleOpenModal}
                    />
                </div>
                <section className="filter-section">
                    {!isMobile ? (
                        <div className="filter">
                            <div className="fields">
                                <Select
                                    showSearch
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    className="custom-placeholder"
                                    placeholder={t("Enter Name of Project")}
                                    value={selectedFilters.title || undefined}
                                    onChange={(value) =>
                                        handleFilterChange("title", value)
                                    }
                                    options={projects.map((project) => ({
                                        value: project.title,
                                        label: project.title,
                                    }))}
                                />

                                <Select
                                    showSearch
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    className="custom-placeholder"
                                    placeholder={t("Enter Position")}
                                    value={
                                        selectedFilters.position || undefined
                                    }
                                    onChange={(value) =>
                                        handleFilterChange("position", value)
                                    }
                                    options={projects.map((project) => ({
                                        value: project.position,
                                        label: project.position,
                                    }))}
                                />

                                <Select
                                    showSearch
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    className="custom-placeholder"
                                    placeholder={t("Enter Technology")}
                                    value={
                                        selectedFilters.technology || undefined
                                    }
                                    onChange={(value) =>
                                        handleFilterChange("technology", value)
                                    }
                                    options={projects.map((project) => ({
                                        value: project.technology,
                                        label: project.technology,
                                    }))}
                                />

                                <Select
                                    showSearch
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    className="custom-placeholder"
                                    placeholder={t("Enter Leader")}
                                    value={selectedFilters.leader || undefined}
                                    onChange={(value) =>
                                        handleFilterChange("leader", value)
                                    }
                                    options={projects.map((project) => ({
                                        value: project.leader.name,
                                        label: project.leader.name,
                                    }))}
                                />

                                <Select
                                    showSearch
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    className="custom-placeholder"
                                    placeholder={t("Enter Sub Leader")}
                                    value={
                                        selectedFilters.subLeader || undefined
                                    }
                                    onChange={(value) =>
                                        handleFilterChange("subLeader", value)
                                    }
                                    options={projects.map((project) => ({
                                        value: project.subLeader.name,
                                        label: project.subLeader.name,
                                    }))}
                                />

                                <Select
                                    showSearch
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    className="custom-placeholder"
                                    placeholder={t("Enter Mentor")}
                                    value={selectedFilters.mentor || undefined}
                                    onChange={(value) =>
                                        handleFilterChange("mentor", value)
                                    }
                                    options={projects.map((project) => ({
                                        value: project.mentor.name,
                                        label: project.mentor.name,
                                    }))}
                                />

                                <DatePicker
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    className="custom-placeholder"
                                    placeholder={t("Enter Release Date")}
                                    value={selectedFilters.releaseDate}
                                    onChange={(date) =>
                                        handleFilterChange("releaseDate", date)
                                    }
                                />
                            </div>

                            <div className="buttons">
                                <Button
                                    className="cln-btn btn"
                                    onClick={handleClearFilters}
                                >
                                    {" "}
                                    <DeleteOutlined />
                                    {t("Clean Filter")}
                                </Button>

                                <Button
                                    className="srch-btn btn"
                                    onClick={handleSearch}
                                >
                                    <SearchOutlined />
                                    {t("Search")}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <Row>
                            <Col>
                                <Row gutter={[5, 5]}>
                                    <Select
                                        showSearch
                                        placeholder={t("Enter Name of Project")}
                                        value={
                                            selectedFilters.title || undefined
                                        }
                                        onChange={(value) =>
                                            handleFilterChange("title", value)
                                        }
                                        options={projects.map((project) => ({
                                            value: project.title,
                                            label: project.title,
                                        }))}
                                        style={{
                                            height: "32px",
                                            width: "100%",
                                            fontSize: "15px",
                                        }}
                                        className="custom-placeholder"
                                    />

                                    <Select
                                        showSearch
                                        placeholder={t("Enter Position")}
                                        value={
                                            selectedFilters.position ||
                                            undefined
                                        }
                                        onChange={(value) =>
                                            handleFilterChange(
                                                "position",
                                                value
                                            )
                                        }
                                        options={projects.map((project) => ({
                                            value: project.position,
                                            label: project.position,
                                        }))}
                                        style={{
                                            height: "32px",
                                            width: "100%",
                                            fontSize: "15px",
                                        }}
                                        className="custom-placeholder"
                                    />

                                    <Select
                                        showSearch
                                        placeholder={t("Enter Technology")}
                                        value={
                                            selectedFilters.technology ||
                                            undefined
                                        }
                                        onChange={(value) =>
                                            handleFilterChange(
                                                "technology",
                                                value
                                            )
                                        }
                                        options={projects.map((project) => ({
                                            value: project.technology,
                                            label: project.technology,
                                        }))}
                                        style={{
                                            height: "32px",
                                            width: "100%",
                                            fontSize: "15px",
                                        }}
                                        className="custom-placeholder"
                                    />

                                    <Select
                                        showSearch
                                        placeholder={t("Enter Leader")}
                                        value={
                                            selectedFilters.leader || undefined
                                        }
                                        onChange={(value) =>
                                            handleFilterChange("leader", value)
                                        }
                                        options={projects.map((project) => ({
                                            value: project.leader.name,
                                            label: project.leader.name,
                                        }))}
                                        style={{
                                            height: "32px",
                                            width: "100%",
                                            fontSize: "15px",
                                        }}
                                        className="custom-placeholder"
                                    />

                                    <Select
                                        showSearch
                                        placeholder={t("Enter Sub Leader")}
                                        value={
                                            selectedFilters.subLeader ||
                                            undefined
                                        }
                                        onChange={(value) =>
                                            handleFilterChange(
                                                "subLeader",
                                                value
                                            )
                                        }
                                        options={projects.map((project) => ({
                                            value: project.subLeader.name,
                                            label: project.subLeader.name,
                                        }))}
                                        style={{
                                            height: "32px",
                                            width: "100%",
                                            fontSize: "15px",
                                        }}
                                        className="custom-placeholder"
                                    />

                                    <Select
                                        showSearch
                                        placeholder={t("Enter Mentor")}
                                        value={
                                            selectedFilters.mentor || undefined
                                        }
                                        onChange={(value) =>
                                            handleFilterChange("mentor", value)
                                        }
                                        options={projects.map((project) => ({
                                            value: project.mentor.name,
                                            label: project.mentor.name,
                                        }))}
                                        style={{
                                            height: "32px",
                                            width: "100%",
                                            fontSize: "15px",
                                        }}
                                        className="custom-placeholder"
                                    />

                                    <DatePicker
                                        placeholder={t("Enter Release Date")}
                                        value={selectedFilters.releaseDate}
                                        onChange={(date) =>
                                            handleFilterChange(
                                                "releaseDate",
                                                date
                                            )
                                        }
                                        style={{
                                            height: "32px",
                                            width: "100%",
                                            fontSize: "15px",
                                        }}
                                        className="custom-placeholder"
                                    />
                                </Row>
                            </Col>
                            <Row style={{ width: "100%", marginTop: "15px" }}>
                                <Col style={{ width: "100%" }}>
                                    <Button
                                        style={{
                                            width: "100%",
                                            height: "50px",
                                            borderRadius: "15px",
                                            marginBottom: "10px",
                                        }}
                                        className="cln-btn btn"
                                        onClick={handleClearFilters}
                                    >
                                        <DeleteOutlined />
                                        {t("Clean Filter")}
                                    </Button>

                                    <Button
                                        style={{
                                            width: "100%",
                                            height: "50px",
                                            borderRadius: "15px",
                                        }}
                                        type="primary"
                                        onClick={handleSearch}
                                    >
                                        <SearchOutlined />
                                        {t("Search")}
                                    </Button>
                                </Col>
                            </Row>
                        </Row>
                    )}
                    <Row gutter={[16, 16]} className="project-list">
                        {filteredProjects.map((project, index) => (
                            <Col key={index} style={{ minWidth: "33.33%" }}>
                                <ProjectCard {...project} />
                            </Col>
                        ))}
                    </Row>

                    <Pagination
                        className="pagination"
                        total={filteredProjects.length}
                        showTotal={(total) =>
                            `1 - ${filteredProjects.length} of ${total}`
                        }
                    />
                </section>
            </main>
            <NewProjectModal open={openModal} onClose={handleCloseModal} />
        </div>
    );
}

export default function MyComponent() {
    return <ProjectManagement />;
}
