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
  Modal,
  Checkbox,
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
  InfoCircleOutlined,
} from "@ant-design/icons";
import "./ProjectMan.css";
import NewProjectModal from "./NewProjectModal.jsx";
import MainLayout from "../../MainLayout/MainLayout.jsx";
import projectData from "../../data/ProjectMana.json";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import Navigation from "../../components/Navigation/Navigation.jsx";
import useViewport from "../../hooks/useViewport";
import DeletePopup from "../../components/DeletePopup/DeletePopup.jsx";
import ExportExcel from "../../components/ExportExcelPopup/ExportExcelPopup.jsx";
import { message } from "antd";
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
  onSelect,
  isSelected,
}) {
  const { t } = useTranslation();
  const optionSelect = [
    { value: "inProcessed", label: t("In process") },
    { value: "completed", label: t("Completed") },
  ];

  const formatDate = (date) => dayjs(date).format("DD MMM YYYY");

  const [isDetailsModalOpen, setIsDeatailsModalOpen] = useState(false);
  const showModal = () => {
    setIsDeatailsModalOpen(true);
  };
  const handleCancel = () => {
    setIsDeatailsModalOpen(false);
  };

  return (
    <Card
      className="project-card"
      title={t(title)}
      extra={
        <span className="status">
          <Select defaultValue={status} options={optionSelect} />
          <Checkbox checked={isSelected} onChange={() => onSelect({ title, position, technology, leader, subLeader, mentor, startDate, releaseDate, issues, teamMembers, status })} />
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
          <Avatar size="small" src={leader.avatar} icon={<UserOutlined />} />
        </Tooltip>
      </p>
      <p>
        <b>{t("Sub Leader")}: </b>
        <Tooltip title={subLeader.name}>
          <Avatar size="small" src={subLeader.avatar} icon={<UserOutlined />} />
        </Tooltip>
      </p>
      <p>
        <b>{t("Mentor")}: </b>
        <Tooltip title={mentor.name}>
          <Avatar size="small" src={mentor.avatar} icon={<UserOutlined />} />
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
          <Button type="text" onClick={showModal} style={{ color: "#5C5967" }}>
            <InfoCircleOutlined />
            {t("Details")}
          </Button>
          <Modal
            className="view-modal"
            title={t(title)}
            open={isDetailsModalOpen}
            onCancel={handleCancel}
            width={900}
            footer={null}
          >
            <Row gutter={[16, 0]}>
              <Col span={8}>
                <p className="mb-0">
                  <strong>{t("Position")}</strong>
                </p>
                <p
                  className="mt-0"
                  style={{
                    border: "2px solid #12345129",
                    padding: "4px 11px",
                    borderRadius: "10px",
                  }}
                >
                  {position}
                </p>
              </Col>
              <Col span={8}>
                <p className="mb-0">
                  <strong>{t("Technology")}</strong>
                </p>
                <p
                  className="mt-0"
                  style={{
                    border: "2px solid #12345129",
                    padding: "4px 11px",
                    borderRadius: "10px",
                  }}
                >
                  {technology}
                </p>
              </Col>
              <Col span={8}>
                <p className="mb-0">
                  <strong>{t("Leader")}</strong>
                </p>
                <p
                  className="mt-0"
                  style={{
                    border: "2px solid #12345129",
                    padding: "4px 11px",
                    borderRadius: "10px",
                  }}
                >
                  {" "}
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Link
                  </a>
                </p>
              </Col>
              <Col span={8}>
                <p className="mt-0 mb-0">
                  <strong>{t("Sub Leader")}</strong>
                </p>
                <p
                  className="mt-0"
                  style={{
                    border: "2px solid #12345129",
                    padding: "4px 11px",
                    borderRadius: "10px",
                  }}
                >
                  {subLeader.name}
                </p>
              </Col>
              <Col span={8}>
                <p className="mt-0 mb-0">
                  <strong>{t("Mentor")}</strong>
                </p>
                <p
                  className="mt-0"
                  style={{
                    border: "2px solid #12345129",
                    padding: "4px 11px",
                    borderRadius: "10px",
                  }}
                >
                  {mentor.name}
                </p>
              </Col>
              <Col span={8}>
                <p className="mt-0 mb-0">
                  <strong>{t("Group Zalo")}</strong>
                </p>
                <p
                  className="mt-0"
                  style={{
                    border: "2px solid #12345129",
                    padding: "4px 11px",
                    borderRadius: "10px",
                  }}
                >
                  {position}
                </p>
              </Col>
              <Col span={8}>
                <p className="mt-0 mb-0">
                  <strong>{t("Star Date")}</strong>
                </p>
                <p
                  className="mt-0"
                  style={{
                    border: "2px solid #12345129",
                    padding: "4px 11px",
                    borderRadius: "10px",
                  }}
                >
                  {startDate}
                </p>
              </Col>
              <Col span={8}>
                <p className="mt-0 mb-0">
                  <strong>{t("Release Date")}</strong>
                </p>
                <p
                  className="mt-0"
                  style={{
                    border: "2px solid #12345129",
                    padding: "4px 11px",
                    borderRadius: "10px",
                  }}
                >
                  {releaseDate}
                </p>
              </Col>
              <Col span={8}>
                <p className="mt-0 mb-0">
                  <strong>{t("Issues")}</strong>
                </p>
                <p
                  className="mt-0"
                  style={{
                    border: "2px solid #12345129",
                    padding: "4px 11px",
                    borderRadius: "10px",
                  }}
                >
                  {issues}
                </p>
              </Col>
              <Col span={8}>
                <p className="mt-0 mb-0">
                  <strong>{t("Team Members")}</strong>
                </p>
                <p
                  className="mt-0"
                  style={{
                    border: "2px solid #12345129",
                    padding: "4px 11px",
                    borderRadius: "10px",
                  }}
                >
                  {teamMembers.length}
                </p>
              </Col>
            </Row>
          </Modal>
        </div>
      </div>
    </Card>
  );
}

function EditProjectModal({ visible, onCancel, project, onSave }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (project) {
      form.setFieldsValue({
        title: project.title,
        position: project.position,
        technology: project.technology,
        leader: project.leader.name,
        subLeader: project.subLeader.name,
        mentor: project.mentor.name,
      });
    }
  }, [project, form]);

  const handleSave = () => {
    form.validateFields().then(values => {
      onSave(values);
      onCancel();
    });
  };

  return (
    <Modal
      visible={visible}
      title="Edit Project"
      onCancel={onCancel}
      onOk={handleSave}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="position" label="Position" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="technology" label="Technology" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="leader" label="Leader" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="subLeader" label="Sub Leader" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="mentor" label="Mentor" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
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
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);


  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleProjectSelect = (project) => {
    setSelectedProjects(prev =>
      prev.some(p => p.title === project.title)
        ? prev.filter(p => p.title !== project.title)
        : [...prev, project]
    );
  };
  const handleEdit = () => {
    if (selectedProjects.length === 1) {
      setProjectToEdit(selectedProjects[0]);
      setEditModalVisible(true);
    }
  };

  const handleSaveEdit = (values) => {
    const updatedProjects = projects.map(p =>
      p.title === projectToEdit.title ? { ...p, ...values } : p
    );
    setProjects(updatedProjects);
    setFilteredProjects(updatedProjects);
    setSelectedProjects([]);
    setEditModalVisible(false);
    message.success('Project updated successfully');
  };


  const handleDelete = () => {
    if (selectedProjects.length > 0) {
      Modal.confirm({
        title: 'Are you sure you want to delete the selected project(s)?',
        content: `This will delete ${selectedProjects.length} project(s).`,
        onOk() {
          // Update both filteredProjects and projects
          setFilteredProjects(prev => prev.filter(p => !selectedProjects.some(sp => sp.title === p.title)));
          setProjects(prev => prev.filter(p => !selectedProjects.some(sp => sp.title === p.title)));
          setSelectedProjects([]);
          message.success(`${selectedProjects.length} project(s) deleted successfully`);
        },
      });
    } else {
      message.warning('Please select at least one project to delete');
    }
  };

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
        dayjs(project.releaseDate).isSame(selectedFilters.releaseDate, "day")
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
      onClick: handleEdit,
      disabled: selectedProjects.length !== 1
    },
    {
      color: "#FF3A2E",
      name: t("Delete"),
      icon: <DeleteOutlined />,
      onClick: handleDelete,
    },
    {
      color: "#4889E9",
      name: t("Add New Project"),
      icon: <PlusOutlined />,
    },
  ];

  const viewPort = useViewport();
  const isMobile = viewPort.width <= 1024;

  const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);
  const handleOpenDelete = () => {
    setDeletePopupVisible(true);
  };

  const handleCloseDeletePopup = () => {
    setDeletePopupVisible(false);
  };

  const [isExportExcelVisible, setExportExcelVisible] = useState(false);
  const handleOpenExportExcel = () => {
    setExportExcelVisible(true);
  };

  const handleCloseExportExcel = () => {
    setExportExcelVisible(false);
  };

  return (
    <div id="APRCV">
      <main className="content">
        <div>
          <Navigation
            titleName={t("Project Management")}
            groupButton={groupButton}
            onCreateIntern={handleOpenModal}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onExportExcel={handleOpenExportExcel}
            checkedCount={selectedProjects.length}
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
                  onChange={(value) => handleFilterChange("title", value)}
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
                  value={selectedFilters.position || undefined}
                  onChange={(value) => handleFilterChange("position", value)}
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
                  value={selectedFilters.technology || undefined}
                  onChange={(value) => handleFilterChange("technology", value)}
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
                  onChange={(value) => handleFilterChange("leader", value)}
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
                  value={selectedFilters.subLeader || undefined}
                  onChange={(value) => handleFilterChange("subLeader", value)}
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
                  onChange={(value) => handleFilterChange("mentor", value)}
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
                  onChange={(date) => handleFilterChange("releaseDate", date)}
                />
              </div>

              <div className="buttons">
                <Button className="cln-btn btn" onClick={handleClearFilters}>
                  {" "}
                  <DeleteOutlined />
                  {t("Clean Filter")}
                </Button>

                <Button className="srch-btn btn" onClick={handleSearch}>
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
                    value={selectedFilters.title || undefined}
                    onChange={(value) => handleFilterChange("title", value)}
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
                    value={selectedFilters.position || undefined}
                    onChange={(value) => handleFilterChange("position", value)}
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
                    value={selectedFilters.technology || undefined}
                    onChange={(value) =>
                      handleFilterChange("technology", value)
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
                    value={selectedFilters.leader || undefined}
                    onChange={(value) => handleFilterChange("leader", value)}
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
                    value={selectedFilters.subLeader || undefined}
                    onChange={(value) => handleFilterChange("subLeader", value)}
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
                    value={selectedFilters.mentor || undefined}
                    onChange={(value) => handleFilterChange("mentor", value)}
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
                    onChange={(date) => handleFilterChange("releaseDate", date)}
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
            {paginatedProjects.map((project, index) => (
              <Col key={index} style={{ minWidth: "33.33%" }}>
                <ProjectCard
                  {...project}
                  onSelect={handleProjectSelect}
                  isSelected={selectedProjects.some(p => p.title === project.title)}
                />
              </Col>
            ))}
          </Row>

          <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination
              current={currentPage}
              total={filteredProjects.length}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger
              onShowSizeChange={handlePageChange}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
              pageSizeOptions={[3, 6, 9]}
            />
          </div>
        </section>
      </main>
      <NewProjectModal open={openModal} onClose={handleCloseModal} />
      {/*Render Delete Popup */}
      <DeletePopup
        onClose={handleCloseDeletePopup}
        openPopup={isDeletePopupVisible}
      />
      {/*Render ExportExcel Popup */}
      <ExportExcel
        onClose={handleCloseExportExcel}
        openPopup={isExportExcelVisible}
      />
      <EditProjectModal
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        project={projectToEdit}
        onSave={handleSaveEdit}
      />

    </div >
  );
}

export default function MyComponent() {
  return <ProjectManagement />;
}
