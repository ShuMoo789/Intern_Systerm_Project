import React, { useEffect, useState } from "react";
import "../GroupList/GroupList.css";
import {
    Row,
    Col,
    Input,
    Button,
    Table,
    Checkbox,
    Space,
    Select,
    Modal,
    message,
    Dropdown,
    Menu,
} from "antd";

import {
    UsergroupAddOutlined,
    ExportOutlined,
    EditOutlined,
    DeleteOutlined,
    FolderAddOutlined,
    FilterOutlined,
    SearchOutlined,
    DownOutlined,
} from "@ant-design/icons";

import jsonData from "../../data/GroupList.json";
import Navigation from "../../components/Navigation/Navigation";
import useViewport from "../../hooks/useViewport";
import "./GroupList.css"
import ViewPopup from "./ViewPopup";
import EditPopup from "../../components/EditPopup/EditPopup.jsx"
import DeletePopup from "../../components/DeletePopup/DeletePopup.jsx"
import ExportExcel from "../../components/ExportExcelPopup/ExportExcelPopup.jsx"
import AddNewIntern from "../../components/AddNewIntern/AddNewIntern.jsx"
import { useTranslation } from "react-i18next";

const { Option } = Select;

const GroupList = () => {

const [checkedCount, setCheckedCount] = useState(0);
    const [data, setData] = useState(jsonData);
    const [filteredData, setFilteredData] = useState(jsonData);
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;
    const [visible, setVisible] = useState(false);
    const { t } = useTranslation();
    const [filters, setFilters] = useState({
        InternId: "",
        FullName: "",
        DOB: "",
        PhoneNumber: "",
        Address: "",
        Email: "",
        Major: "",
        Position: "",
        School: "",
        Title: "",
        Project: "",
        GroupZalo: "",
    });

    useEffect(() => {
        setData(jsonData);
        setFilteredData(jsonData);
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const handleSearch = () => {
        const filtered = data.filter((item) =>
            Object.keys(filters).every(
                (key) =>
                    filters[key] === "" ||
                    (item[key] &&
                        item[key]
                            .toString()
                            .toLowerCase()
                            .includes(filters[key].toString().toLowerCase()))
            )
        );
        setFilteredData(filtered);
    };

    const handleClearFilters = () => {
        setFilters({
            InternId: "",
            FullName: "",
            DOB: "",
            PhoneNumber: "",
            Address: "",
            Email: "",
            Major: "",
            Position: "",
            School: "",
            Title: "",
            Project: "",
            GroupZalo: "",
        });
        setFilteredData(data);
    };

    const handleStatusChange = (value, recordToUpdate) => {
        // Update the status of the record
        recordToUpdate.Status = value;
        // Trigger re-render by updating state or forceUpdate
        setData([...data]); // Assuming data is an array of records
    };

    const handleContractChange = (value, recordToUpdate) => {
        // Update the status of the record
        recordToUpdate.InternshipContract = value;
        // Trigger re-render by updating state or forceUpdate
        setData([...data]); // Assuming data is an array of records
    };

    const groupButton = [
        {
            color: "#6537B1",
            name: t("Create Group"),
            icon: <UsergroupAddOutlined />,
        },
        {
            color: "#41B137",
            name: t("Export Excel"),
            icon: <ExportOutlined />,
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
            name: t("Add New Intern"),
            icon: <FolderAddOutlined />,
        },
    ];

    const handleCreateIntern = () => {
        setVisible(true);
    };
const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setCheckedCount(checkedCount + 1);
    } else {
      setCheckedCount(checkedCount - 1);
    }
    console.log("Checked count:", checkedCount);
  };
    const columns = [
    {
      title: "",
      dataIndex: "select",
      render: (_, record) => (
        <Checkbox onChange={handleCheckboxChange} />
      ),
      width: "auto",
    },
        {
            title: t("Intern ID"),
            dataIndex: "InternId",
            key: "InternId",
            width: "auto",
        },
        {
            title: t("Date of Interview"),
            dataIndex: "DateInterview",
            key: "DateInterview",
            width: "auto",
        },
        {
            title: t("Time of Interview"),
            dataIndex: "TimeInterview",
            key: "TimeInterview",
            width: "auto",
        },
        {
            title: t("Full Name"),
            dataIndex: "FullName",
            key: "FullName",
            width: "auto",
        },
        {
            title: t("Date of Birth"),
            dataIndex: "DateOfBirth",
            key: "DateOfBirth",
            width: "auto",
        },
        {
            title: t("Phone Number"),
            dataIndex: "PhoneNumber",
            key: "PhoneNumber",
            width: "auto",
        },
        {
            title: t("Position"),
            dataIndex: "Position",
            key: "Position",
            width: "auto",
        },
        {
            title: t("School"),
            dataIndex: "School",
            key: "School",
            width: "auto",
        },
        {
            title: t("Address"),
            dataIndex: "Address",
            key: "Address",
            width: "auto",
        },
        {
            title: "Email",
            dataIndex: "Email",
            key: "Email",
            width: "auto",
        },
        {
            title: "CV",
            dataIndex: "CV",
            // key: "CV",
            // width: 140,
            render: (text) => (
                <a
                    href={text}
                    style={{ color: "#0000FF", textDecoration: "underline" }}
                >
                    Link
                </a>
            ),
            key: "CV",
            width: "auto",
        },
        {
            title: t("Comments"),
            dataIndex: "Comments",
            key: "Comments",
            width: "auto",
            render: (text) => t(text),
        },
        {
            title: t("Role"),
            dataIndex: "Role",
            key: "Role",
            width: "auto",
        },
        {
            title: t("Project"),
            dataIndex: "Project",
            key: "Project",
            width: "auto",
            render: (text) => t(text),
        },
        {
            title: t("Group Zalo"),
            dataIndex: "GroupZalo",
            key: "GroupZalo",
            width: "auto",
            render: (text) => t(text),
        },
        {
            title: t("Mentor"),
            dataIndex: "Mentor",
            key: "Mentor",
            width: "auto",
        },
        {
            title: t("Status"),
            dataIndex: "Status",
            key: "Status",
            width: "auto",

            render: (text, record) => (
                <div style={{ width: 126 }}>
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item
                                    value="Accepted"
                                    onClick={() =>
                                        handleStatusChange("Accepted", record)
                                    }
                                >
                                    <span>{t("Accepted")}</span>
                                </Menu.Item>
                                <Menu.Item
                                    value="Pending"
                                    onClick={() =>
                                        handleStatusChange("Pending", record)
                                    }
                                >
                                    <span>{t("Pending")}</span>
                                </Menu.Item>
                                <Menu.Item
                                    value="Interviewed"
                                    onClick={() =>
                                        handleStatusChange(
                                            "Interviewed",
                                            record
                                        )
                                    }
                                >
                                    <span>{t("Interviewed")}</span>
                                </Menu.Item>
                            </Menu>
                        }
                    >
                        <Button
                            style={{
                                backgroundColor:
                                    record.Status === "Accepted"
                                        ? "#EFF9F1"
                                        : record.Status === "Pending"
                                        ? "#F8E7EE"
                                        : record.Status === "Interviewed"
                                        ? "#E8F4FD"
                                        : "FFFFFF",
                                color:
                                    record.Status === "Accepted"
                                        ? "#449E3C"
                                        : record.Status === "Pending"
                                        ? "#B70D52"
                                        : record.Status === "Interviewed"
                                        ? "#106BA3"
                                        : "#333333",
                                borderRadius: "50px", // Đặt bo tròn thành hình tròn
                                marginLeft: "-8px",
                                width: "100%",
                                fontSize: "12px",
                            }}
                        >
                            {t(record.Status)}
                            <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
            ),
        },
        {
            title: t("Internship Contract"),
            dataIndex: "InternshipContract",
            key: "InternshipContract",
            width: "auto",

            render: (text, record) => (
                <div style={{ width: 126 }}>
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item
                                    value="Signed"
                                    onClick={() =>
                                        handleContractChange("Signed", record)
                                    }
                                >
                                    <span>{t("Signed")}</span>
                                </Menu.Item>
                                <Menu.Item
                                    value="Pending"
                                    onClick={() =>
                                        handleContractChange("Pending", record)
                                    }
                                >
                                    <span>{t("Pending")}</span>
                                </Menu.Item>
                            </Menu>
                        }
                    >
                        <Button
                            style={{
                                backgroundColor:
                                    record.InternshipContract === "Signed"
                                        ? "#EFF9F1"
                                        : record.InternshipContract ===
                                          "Pending"
                                        ? "#F8E7EE"
                                        : "FFFFFF",
                                color:
                                    record.InternshipContract === "Signed"
                                        ? "#449E3C"
                                        : record.InternshipContract ===
                                          "Pending"
                                        ? "#B70D52"
                                        : "#333333",
                                borderRadius: "50px", // Đặt bo tròn thành hình tròn
                                marginLeft: "-8px",
                                width: "100%",
                                fontSize: "12px",
                            }}
                        >
                            {t(record.InternshipContract)}
                            <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
            ),
        },
        {
            title: t("Button"),
            key: "Button",
            // width: 200,
            render: (_, record) => (
                <Space>
                    <ViewPopup></ViewPopup>
                    <Button
                        className="upload-file-button"
                        shape="round"
                        style={{
                            color: "#3498db",
                            borderColor: "#3498db",
                        }}
                    >
                        {t("Upload File")}
                    </Button>
                </Space>
            ),
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [role, setRole] = useState("");
    const [groupZalo, setGroupZalo] = useState("");
    const [project, setProject] = useState("");
    const [mentor, setMentor] = useState("");
    const [groups, setGroups] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const response = await fetch(
                "https://65f40c0f105614e654a1c922.mockapi.io/group"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch groups");
            }

            const data = await response.json();
            setGroups(data);
        } catch (error) {
            console.error("Error fetching groups:", error);
            message.error("Failed to fetch groups");
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel2 = () => {
        setIsModalOpen(false);
        setErrors({});
    };

    const validateFields = () => {
        const newErrors = {};
        if (!role) newErrors.role = t("Role is required");
        if (!groupZalo) newErrors.groupZalo = t("Group Zalo is required");
        if (!project) newErrors.project = t("Project is required");
        if (!mentor) newErrors.mentor = t("Mentor is required");
        return newErrors;
    };

    const handleCreateGroup = async () => {
        const newErrors = validateFields();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            message.error("Please fill in all fields");
            return;
        }

        const newGroup = { role, groupZalo, project, mentor };

        try {
            const response = await fetch(
                "https://65f40c0f105614e654a1c922.mockapi.io/group",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newGroup),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add new group");
            }

            const data = await response.json();
            setGroups([...groups, data]);
            setIsModalOpen(false);

            // Reset form values
            setRole("");
            setGroupZalo("");
            setProject("");
            setMentor("");
            setErrors({});
            message.success("Group created successfully!");
        } catch (error) {
            console.error("Error adding new group:", error);
            message.error("Failed to add new group");
        }
    };

    const onChangeRole = (value) => {
        setRole(value);
    };

    const onChangeProject = (value) => {
        setProject(value);
    };

  
        


    const filterOption = (input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

    const [isEditPopupVisible, setEditPopupVisible] = useState(false);
    const handleOpenEdit = () => {
        setEditPopupVisible(true);
    };

    const handleCloseEditPopup = () => {
        setEditPopupVisible(false);
    };

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

    const [isAddNewInternVisible, setAddNewInternVisible] = useState(false);
    const handleOpenAddNewIntern = () => {
        setAddNewInternVisible(true);
    };

    const handleCloseAddNewIntern = () => {
        setAddNewInternVisible(false);
    };

    return (
        <div id="APRCV">
            <main className="content">
                <div>
                    <Navigation
                        titleName={t("GROUP LIST")}
                        groupButton={groupButton}
                        onSendEmail={showModal}
                        onEdit={handleOpenEdit}
                        onDelete={handleOpenDelete}
                        onExportExcel={handleOpenExportExcel}
                        onCreateIntern={handleOpenAddNewIntern}
 checkedCount={checkedCount}
                    />
                </div>
                {/*Render Edit Popup */}
                <EditPopup
                    onClose={handleCloseEditPopup}
                    openPopup={isEditPopupVisible}
                />
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
                {/*Render Add New Intern Popup */}
                <AddNewIntern
                    onClose={handleCloseAddNewIntern}
                    openPopup={isAddNewInternVisible}
                />
                <section className="filter-section">
                    {!isMobile ? (
                        <div className="filter">
                            <div className="fields">
                                <Input
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    className="custom-placeholder"
                                    placeholder={t("Enter intern's ID")}
                                    name="InternId"
                                    value={filters.InternId}
                                    onChange={handleFilterChange}
                                />
                                <Input
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    className="custom-placeholder"
                                    placeholder={t("Enter intern's Full name")}
                                    name="FullName"
                                    value={filters.FullName}
                                    onChange={handleFilterChange}
                                />
                                <Input
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    className="custom-placeholder"
                                    placeholder={t("Enter intern's D.O.B")}
                                    name="DOB"
                                    value={filters.DOB}
                                    onChange={handleFilterChange}
                                />
                                <Input
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    className="custom-placeholder"
                                    placeholder={t(
                                        "Enter intern's Phone number"
                                    )}
                                    name="PhoneNumber"
                                    value={filters.PhoneNumber}
                                    onChange={handleFilterChange}
                                />
                                <Input
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    className="custom-placeholder"
                                    placeholder={t("Enter intern's Address")}
                                    name="Address"
                                    value={filters.Address}
                                    onChange={handleFilterChange}
                                />
                                <Input
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    className="custom-placeholder"
                                    placeholder={t("Enter intern's Email")}
                                    name="Email"
                                    value={filters.Email}
                                    onChange={handleFilterChange}
                                />
                                <Input
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    className="custom-placeholder"
                                    placeholder={t("Enter intern's Major")}
                                    name="Major"
                                    value={filters.Major}
                                    onChange={handleFilterChange}
                                />
                                <Input
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    className="custom-placeholder"
                                    placeholder={t("Enter intern's Position")}
                                    name="Position"
                                    value={filters.Position}
                                    onChange={handleFilterChange}
                                />
                                <Input
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    className="custom-placeholder"
                                    placeholder={t("Enter intern's School")}
                                    name="School"
                                    value={filters.School}
                                    onChange={handleFilterChange}
                                />
                                <Input
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    className="custom-placeholder"
                                    placeholder={t("Enter intern's Title")}
                                    name="Title"
                                    value={filters.Title}
                                    onChange={handleFilterChange}
                                />
                                <Input
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    className="custom-placeholder"
                                    placeholder={t("Enter intern's Project")}
                                    name="Project"
                                    value={filters.Project}
                                    onChange={handleFilterChange}
                                />
                                <Input
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    className="custom-placeholder"
                                    placeholder={t("Enter intern's Group Zalo")}
                                    name="GroupZalo"
                                    value={filters.GroupZalo}
                                    onChange={handleFilterChange}
                                />
                            </div>
                            <div className="buttons">
                                <Button
                                    className="cln-btn btn"
                                    onClick={handleClearFilters}
                                >
                                    <DeleteOutlined />
                                    {t("Clean Filter")}
                                </Button>
                                <Button
                                    className="srch-btn btn"
                                    type="primary"
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
                                    <Input
                                        style={{
                                            height: "32px",
                                            width: "100%",
                                            fontSize: "15px",
                                        }}
                                        className="custom-placeholder"
                                        placeholder={t("Enter intern's ID")}
                                        name="InternId"
                                        value={filters.InternId}
                                        onChange={handleFilterChange}
                                    />
                                    <Input
                                        style={{
                                            height: "32px",
                                            width: "100%",
                                            fontSize: "15px",
                                        }}
                                        className="custom-placeholder"
                                        placeholder={t(
                                            "Enter intern's Full name"
                                        )}
                                        name="FullName"
                                        value={filters.FullName}
                                        onChange={handleFilterChange}
                                    />
                                    <Input
                                        style={{
                                            height: "32px",
                                            width: "100%",
                                            fontSize: "15px",
                                        }}
                                        className="custom-placeholder"
                                        placeholder={t("Enter intern's D.O.B")}
                                        name="DOB"
                                        value={filters.DOB}
                                        onChange={handleFilterChange}
                                    />
                                    <Input
                                        style={{
                                            height: "32px",
                                            width: "100%",
                                            fontSize: "15px",
                                        }}
                                        className="custom-placeholder"
                                        placeholder={t(
                                            "Enter intern's Phone number"
                                        )}
                                        name="PhoneNumber"
                                        value={filters.PhoneNumber}
                                        onChange={handleFilterChange}
                                    />
                                    <Input
                                        style={{
                                            height: "32px",
                                            width: "100%",
                                            fontSize: "15px",
                                        }}
                                        className="custom-placeholder"
                                        placeholder={t(
                                            "Enter intern's Address"
                                        )}
                                        name="Address"
                                        value={filters.Address}
                                        onChange={handleFilterChange}
                                    />
                                    <Input
                                        style={{
                                            height: "32px",
                                            width: "100%",
                                            fontSize: "15px",
                                        }}
                                        className="custom-placeholder"
                                        placeholder={t("Enter intern's Email")}
                                        name="Email"
                                        value={filters.Email}
                                        onChange={handleFilterChange}
                                    />
                                    <Input
                                        style={{
                                            height: "32px",
                                            width: "100%",
                                            fontSize: "15px",
                                        }}
                                        className="custom-placeholder"
                                        placeholder={t("Enter intern's Major")}
                                        name="Major"
                                        value={filters.Major}
                                        onChange={handleFilterChange}
                                    />
                                    <Input
                                        style={{
                                            height: "32px",
                                            width: "100%",
                                            fontSize: "15px",
                                        }}
                                        className="custom-placeholder"
                                        placeholder={t(
                                            "Enter intern's Position"
                                        )}
                                        name="Position"
                                        value={filters.Position}
                                        onChange={handleFilterChange}
                                    />
                                    <Input
                                        style={{
                                            height: "32px",
                                            width: "100%",
                                            fontSize: "15px",
                                        }}
                                        className="custom-placeholder"
                                        placeholder={t("Enter intern's School")}
                                        name="School"
                                        value={filters.School}
                                        onChange={handleFilterChange}
                                    />
                                    <Input
                                        style={{
                                            height: "32px",
                                            width: "100%",
                                            fontSize: "15px",
                                        }}
                                        className="custom-placeholder"
                                        placeholder={t("Enter intern's Title")}
                                        name="Title"
                                        value={filters.Title}
                                        onChange={handleFilterChange}
                                    />
                                    <Input
                                        style={{
                                            height: "32px",
                                            width: "100%",
                                            fontSize: "15px",
                                        }}
                                        className="custom-placeholder"
                                        placeholder={t(
                                            "Enter intern's Project"
                                        )}
                                        name="Project"
                                        value={filters.Project}
                                        onChange={handleFilterChange}
                                    />
                                    <Input
                                        style={{
                                            height: "32px",
                                            width: "100%",
                                            fontSize: "15px",
                                        }}
                                        className="custom-placeholder"
                                        placeholder={t(
                                            "Enter intern's Group Zalo"
                                        )}
                                        name="GroupZalo"
                                        value={filters.GroupZalo}
                                        onChange={handleFilterChange}
                                    />
                                </Row>
                            </Col>
                            <Col
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    gap: "10px",
                                    marginTop: "15px",
                                }}
                            >
                                <Button
                                    style={{
                                        height: "50px",
                                        borderRadius: "15px",
                                    }}
                                    className="cln-btn btn"
                                    onClick={handleClearFilters}
                                >
                                    <DeleteOutlined />
                                    {t("Clean Filter")}
                                </Button>
                                <Button
                                    style={{
                                        height: "50px",
                                        borderRadius: "15px",
                                    }}
                                    className="srch-btn btn"
                                    type="primary"
                                    onClick={handleSearch}
                                >
                                    <SearchOutlined />
                                    {t("Search")}
                                </Button>
                            </Col>
                        </Row>
                    )}

                    <div>
                        <Table
                            style={{
                                maxWidth: "100%",
                                minHeight: "100%",
                            }}
                            columns={columns}
                            dataSource={filteredData}
                            scroll={{ x: 3300 }}
                            pagination={{ pageSize: 7 }}
                        />
                    </div>
                </section>

                <Modal
                    title={<h2>{t("Create Group")}</h2>}
                    open={isModalOpen}
                    onCancel={handleCancel2}
                    footer={null}
                    style={{
                        maxWidth: "1200px",
                        width: "100%",
                    }}
                >
                    <Row justify="center">
                        <Col span={8}>
                            <div
                                style={{ width: "95%", alignContent: "center" }}
                            >
                                <p>
                                    <b>{t("Role")}</b>
                                </p>
                                <Select
                                    showSearch
                                    placeholder="Select a role"
                                    optionFilterProp="children"
                                    onChange={onChangeRole}
                                    filterOption={filterOption}
                                    style={{ width: "100%" }}
                                    options={[
                                        { value: "Admin", label: "Admin" },
                                        {
                                            value: "Human resources",
                                            label: "Human resources",
                                        },
                                        { value: "Mentor", label: t("Mentor") },
                                        { value: "School", label: t("School") },
                                        { value: "Intern", label: t("Intern") },
                                    ]}
                                    value={role}
                                />
                                {errors.role && (
                                    <p style={{ color: "red" }}>
                                        {errors.role}
                                    </p>
                                )}
                            </div>

                            <div
                                style={{ width: "95%", alignContent: "center" }}
                            >
                                <p>
                                    <b>{t("Mentor")}</b>
                                </p>
                                <Input
                                    style={{ width: "100%" }}
                                    placeholder="Mentor name"
                                    value={mentor}
                                    onChange={(e) => setMentor(e.target.value)}
                                />
                                {errors.mentor && (
                                    <p style={{ color: "red" }}>
                                        {errors.mentor}
                                    </p>
                                )}
                            </div>
                        </Col>

                        <Col span={8}>
                            <div
                                style={{ width: "95%", alignContent: "center" }}
                            >
                                <p>
                                    <b>{t("Project")}</b>
                                </p>
                                <Select
                                    showSearch
                                    placeholder="Select a project"
                                    optionFilterProp="children"
                                    onChange={onChangeProject}
                                    filterOption={filterOption}
                                    style={{ width: "100%" }}
                                    options={[
                                        {
                                            value: "Project 1",
                                            label: "Project 1",
                                        },
                                    ]}
                                    value={project}
                                />
                                {errors.project && (
                                    <p style={{ color: "red" }}>
                                        {errors.project}
                                    </p>
                                )}
                            </div>
                        </Col>

                        <Col span={8}>
                            <div
                                style={{
                                    width: "100%",
                                    alignContent: "center",
                                }}
                            >
                                <p>
                                    <b>{t("Group Zalo")}</b>
                                </p>
                                <Input
                                    style={{ width: "100%" }}
                                    placeholder="FE intern system"
                                    value={groupZalo}
                                    onChange={(e) =>
                                        setGroupZalo(e.target.value)
                                    }
                                />
                                {errors.groupZalo && (
                                    <p style={{ color: "red", width: "120%" }}>
                                        {errors.groupZalo}
                                    </p>
                                )}
                            </div>
                        </Col>
                    </Row>
                    <div style={{ width: "100%", alignContent: "center" }}>
                        <Button
                            type="primary"
                            onClick={handleCreateGroup}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: "auto",
                                backgroundColor: "#6537B1",
                                padding: "20px",
                                borderRadius: "10px",
                            }}
                        >
                            <span>{t("Create Group")}</span>
                        </Button>
                    </div>
                </Modal>
            </main>
        </div>
    );
};

export default GroupList;