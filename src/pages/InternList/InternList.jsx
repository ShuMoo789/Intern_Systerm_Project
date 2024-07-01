import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Tag, Dropdown, Menu } from "antd";
import {
    MailOutlined,
    DownOutlined,
    ExportOutlined,
    EditOutlined,
    DeleteOutlined,
    FolderAddOutlined,
    EyeOutlined,
    FilterOutlined,
    SearchOutlined,
    SaveOutlined
} from "@ant-design/icons";
import { Table, Select, Button, Input, Col, Row, Modal, Form, Checkbox } from "antd";
import DataInternList from "../../data/InternList.json"; // data of table intern list
import Navigation from "../../components/Navigation/Navigation";
import SendMailButton from "../../components/SendMailButton/SendMailButton";
import ReportProcessModal from "./ReportProcessPopup";
import ViewButton from "./ViewButton";
import "./InternList.css";
import useViewport from "../../hooks/useViewport";
import { useTranslation } from "react-i18next";
import EditPopup from "../../components/EditPopup/EditPopup.jsx"
import DeletePopup from "../../components/DeletePopup/DeletePopup.jsx"
import ExportExcel from "../../components/ExportExcelPopup/ExportExcelPopup.jsx"
import AddNewIntern from "../../components/AddNewIntern/AddNewIntern.jsx"

const optionsInternRole = DataInternList.reduce((options, item) => {
    const existingValue = options.find((option) => option.value === item.role);

    if (!existingValue) {
        options.push({ value: item.role, label: item.role });
    }

    return options;
}, []);

const optionsInternMentor = DataInternList.reduce((options, item) => {
    const existingValue = options.find(
        (option) => option.value === item.mentor
    );

    if (!existingValue) {
        options.push({ value: item.mentor, label: item.mentor });
    }

    return options;
}, []);

const optionsInternFullName = DataInternList.reduce((options, item) => {
    const existingValue = options.find(
        (option) => option.value === item.fullName
    );

    if (!existingValue) {
        options.push({ value: item.fullName, label: item.fullName });
    }

    return options;
}, []);

const optionsInternAddress = DataInternList.reduce((options, item) => {
    const existingValue = options.find(
        (option) => option.value === item.address
    );

    if (!existingValue) {
        options.push({ value: item.address, label: item.address });
    }

    return options;
}, []);

const optionsInternPosition = DataInternList.reduce((options, item) => {
    const existingValue = options.find(
        (option) => option.value === item.position
    );

    if (!existingValue) {
        options.push({ value: item.position, label: item.position });
    }

    return options;
}, []);

const optionsInternProject = DataInternList.reduce((options, item) => {
    const existingValue = options.find(
        (option) => option.value === item.project
    );

    if (!existingValue) {
        options.push({ value: item.project, label: item.project });
    }

    return options;
}, []);

// checkbox table Ant Design


const InternList = () => {
    //add selectedRowKeys to count
    
    const [checkedCount, setCheckedCount] = useState(0);
    const [isEmailPopupVisible, setEmailPopupVisible] = useState(false);
    const [isCommentsModalVisible, setIsCommentsModalVisible] = useState(false);//comments modal
    const [form] = Form.useForm();
    const [selectedIntern, setSelectedIntern] = useState(null);
    const [updatedData, setUpdatedData] = useState(DataInternList);
    const [dataTable, setDataTable] = useState(DataInternList);
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;
    const handleChangeStatus = (key, record) => {
        const updatedRecord = { ...record, status: key };
        const updatedData2 = updatedData.map((item) =>
            item.key === record.key ? updatedRecord : item
        );
        setUpdatedData(updatedData2);
    };
    const showCommentsModal = () => {
        setIsCommentsModalVisible(true);
    };

    const handleCommentsModalCancel = () => {
        setIsCommentsModalVisible(false);
    };

    const handleSaveComment = async () => {
        try {
            const values = await form.validateFields();
            console.log('Success:', values);

            // Here you would typically send the data to your backend
            // For now, we'll just simulate a successful save
            toast.success('Comment saved successfully');
            setIsCommentsModalVisible(false);
            form.resetFields();
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
            toast.error('Failed to save comment. Please check the form and try again.');
        }
    };

    const { t } = useTranslation();
    const commentsText = t("comments");
    // props GroupButton
    const groupButton = [
        {
            color: "#6537B1",
            name: t("Send Email"),
            icon: <MailOutlined />,
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

    // option of status column
    const optionSelect = [
        {
            value: "inProcess",
            label: t("In process"),
        },
        {
            value: "completedOJT",
            label: t("Completed OJT"),
        },
        {
            value: "out",
            label: t("Out"),
        },
    ];

    // option of intern ID from file InternList.json
    const optionsInternID = DataInternList.map((item) => ({
        value: item.internID,
        label: t(item.internID),
    }));

    // option of intern phone number from file InternList.json
    const optionsInternPhoneNumber = DataInternList.map((item) => ({
        value: item.phoneNumber,
        label: item.phoneNumber,
    }));
    // state of filter
    const [filter, setFilter] = useState({
        internID: "",
        phoneNumber: "",
        role: "",
        mentor: "",
        fullName: "",
        address: "",
        position: "",
        project: "",
        dateOfBirth: "",
        email: "",
        school: "",
        groupZalo: "",
    });
    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            setCheckedCount(checkedCount + 1);
        } else {
            setCheckedCount(checkedCount - 1);
        }
        console.log("Checked count:", checkedCount);
    };
    // title of intern list table
    const columns = [
        {
            title: "",
            dataIndex: "select",
            render: (_, record) => (
                <Checkbox onChange={handleCheckboxChange} />
            ),
            width: "40px",
        },
        {
            title: t("Intern ID"),
            dataIndex: "internID",
            width: "auto",
            align: "center"
        },
        {
            title: t("Start Date"),
            dataIndex: "startDate",
            width: "auto",
            align: "center"
        },
        {
            title: t("Finish Date"),
            dataIndex: "finishDate",
            width: "auto",
            align: "center"
        },
        {
            title: t("Full Name"),
            dataIndex: "fullName",
            width: "auto",
            align: "center"
            // filteredValue: [filter.fullName],
            // onFilter: (value, record) => {
            //     return record.fullName.includes(value)
            // }
        },
        {
            title: t("Date Of Birth"),
            dataIndex: "dateOfBirth",
            width: "auto",
            align: "center"
            // filteredValue: [filter.dateOfBirth],
            // onFilter: (value, record) => {
            //     return record.dateOfBirth.includes(value)
            // }
        },
        {
            title: t("Phone Number"),
            dataIndex: "phoneNumber",
            width: "auto",
            align: "center"
            // filteredValue: [filter.phoneNumber],
            // onFilter: (value, record) => {
            //     return record.phoneNumber.includes(value)
            // }
        },
        {
            title: t("Position"),
            dataIndex: "position",
            width: "auto",
            align: "center"
            // filteredValue: [filter.position],
            // onFilter: (value, record) => {
            //     return record.position.includes(value)
            // }
        },
        {
            title: t("School"),
            dataIndex: "school",
            width: "auto",
            align: "center",
            render: (text) => t(text),
            // filteredValue: [filter.school],
            // onFilter: (value, record) => {
            //     return record.school.includes(value)
            // }
        },
        {
            title: t("Address"),
            dataIndex: "address",
            align: "center",
            width: "auto",
            render: (text) => t(text),
            // filteredValue: [filter.address],
            // onFilter: (value, record) => {
            //     return record.address.includes(value)
            // }
        },
        {
            title: t("Email"),
            dataIndex: "email",
            align: "center",
            width: "auto",
            // filteredValue: [filter.email],
            // onFilter: (value, record) => {
            //     return record.email.includes(value)
            // }
        },
        {
            title: "CV",
            dataIndex: "cv",
            align: "center",
            width: "auto",
            render: (text) => (
                <a style={{ color: "blue", textDecoration: "underline" }}>
                    {text}
                </a>
            ),
        },
        {
            title: t("Comments"),
            dataIndex: "comments",
            align: "center",
            width: "auto",
            render: (text) => (
                <Button onClick={showCommentsModal}>
                    2 {commentsText}
                    <EyeOutlined />
                </Button>
            ),
        },
        {
            title: t("Role"),
            dataIndex: "role",
            align: "center",
            width: "auto",
            // filteredValue: [filter.role],
            // onFilter: (value, record) => {
            //     return record.role.includes(value)
            // }
        },
        {
            title: t("Project"),
            dataIndex: "project",
            width: "auto",
            align: "center"
            // filteredValue: [filter.project],
            // onFilter: (value, record) => {
            //     return record.project.includes(value)
            // }
        },
        {
            title: t("Group Zalo"),
            dataIndex: "groupZalo",
            width: "auto",
            align: "center"
            // filteredValue: [filter.groupZalo],
            // onFilter: (value, record) => {
            //     return record.groupZalo.includes(value)
            // }
        },
        {
            title: t("Mentor"),
            dataIndex: "mentor",
            width: "auto",
            align: "center"
            // filteredValue: [filter.mentor],
            // onFilter: (value, record) => {
            //     return record.mentor.includes(value)
            // }
        },
        {
            title: t("Status"),
            dataIndex: "status",
            width: "auto",
            align: "center",
            render: (text, record) => {
                const statusColor = {
                    "In process": {
                        backgroundColor: "rgb(255, 239, 230)",
                        color: "rgb(255, 93, 2)",
                    },
                    "Completed OJT": {
                        backgroundColor: "rgb(239, 249, 241)",
                        color: "#3A7D34",
                    },
                    Out: {
                        backgroundColor: "rgb(248, 231, 238)",
                        color: "rgb(183, 13, 82)",
                    },
                };

                return (
                    <Dropdown
                        overlay={
                            <Menu
                                onClick={({ key }) =>
                                    handleChangeStatus(key, record)
                                }
                            >
                                <Menu.Item key="In process">
                                    <span>In process</span>
                                </Menu.Item>
                                <Menu.Item key="Completed OJT">
                                    <span>Completed OJT</span>
                                </Menu.Item>
                                <Menu.Item key="Out">
                                    <span>Out</span>
                                </Menu.Item>
                            </Menu>
                        }
                    >
                        <Button
                            style={{
                                width: "auto",
                                ...statusColor[text],
                                borderRadius: "100px",
                                fontSize: "12px",
                            }}
                        >
                            {text}
                            <DownOutlined />
                        </Button>
                    </Dropdown>
                );
            },
        },
        {
            title: t("Report Process"),
            dataIndex: "reportProcess",
            width: "auto",
            align: "center",
            render: (text, record) => (
                <ReportProcessModal>
                    {({ showModal }) => (
                        <Button onClick={() => showModal(record)}>
                            {text}
                            <EditOutlined />
                        </Button>
                    )}
                </ReportProcessModal>
            ),
        },
        {
            title: t("Button"),
            dataIndex: "button",
            width: "auto",
            align: "center",
            render: (text) => <ViewButton>{text}</ViewButton>,
        },
    ];

    const handleOpenEmailPopup = () => {
        setSelectedIntern(null);
        setEmailPopupVisible(true);
    };

    const handleCloseEmailPopup = () => {
        setEmailPopupVisible(false);
    };

    // Handle Clean Filter Button by set state filter to ''
    const handleCleanFilterButton = () => {
        setFilter({
            internID: "",
            phoneNumber: "",
            role: "",
            mentor: "",
            fullName: "",
            address: "",
            position: "",
            project: "",
            dateOfBirth: "",
            email: "",
            school: "",
            groupZalo: "",
        });
        setDataTable(DataInternList);
    };

    const handleSearch = () => {
        // Lọc theo tất cả các trường có giá trị
        const filteredData = DataInternList.filter((item) => {
            let isValid = true;
            for (const key in filter) {
                if (filter[key] && !item[key].includes(filter[key])) {
                    isValid = false;
                    break;
                }
            }
            return isValid;
        });
        // Cập nhật state của bảng với kết quả tìm kiếm
        setDataTable(filteredData);
        console.log("search");
    };

    // When select intern id change, field internID in filter state change too
    const handleChangeFilterInternID = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            internID: value,
        }));
    };

    // When select intern phone number change, field phoneNumber in filter state change too
    const handleChangeFilterPhoneNumber = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            phoneNumber: value,
        }));
    };

    // When select intern role change, field role in filter state change too
    const handleChangeFilterRole = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            role: value,
        }));
    };

    // When select intern mentor change, field mentor in filter state change too
    const handleChangeFilterMentor = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            mentor: value,
        }));
    };

    // When select intern fullname change, field fullName in filter state change too
    const handleChangeFilterFullName = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            fullName: value,
        }));
    };

    // When select intern address change, field address in filter state change too
    const handleChangeFilterAddress = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            address: value,
        }));
    };

    // When select intern position change, field position in filter state change too
    const handleChangeFilterPosition = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            position: value,
        }));
    };

    // When select intern project change, field project in filter state change too
    const handleChangeFilterProject = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            project: value,
        }));
    };

    // When input intern D.O.B change, field dateOfBirth in filter state change too
    const handleChangeFilterDOB = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            dateOfBirth: value,
        }));
    };

    // When input intern email change, field email in filter state change too
    const handleChangeFilterEmail = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            email: value,
        }));
    };

    // When input intern School change, field school in filter state change too
    const handleChangeFilterSchool = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            school: value,
        }));
    };

    // When input intern group zalo change, field groupZalo in filter state change too
    const handleChangeFilterGroupZalo = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            groupZalo: value,
        }));
    };

    const email_types = [
        t("Email interview"),
        t("Email result"),
        t("Internship Information"),
        t("Additional Profile"),
        t("Return Profile"),
    ];

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
    const [pageSize, setPageSize] = useState("6");
    const handleChangePageSize = (value) => {
        setPageSize(value);
    };

    return (
        <div id="APRCV">
            {/* Content of InternList right */}
            <main className="content">
                {/* Pass props to Navigation */}

                <div>
                    <Navigation
                        titleName={t("INTERN LIST")}
                        groupButton={groupButton}
                        onSendEmail={handleOpenEmailPopup}
                        onEdit={handleOpenEdit}
                        onDelete={handleOpenDelete}
                        onExportExcel={handleOpenExportExcel}
                        onCreateIntern={handleOpenAddNewIntern}
                        checkedCount={checkedCount}
                    />
                </div>
                {/* Group of filter and table */}
                <section className="filter-section">
                    {/* Filter */}

                    {!isMobile ? (
                        <div className="filter">
                            <div className="fields">
                                <Select
                                    style={{
                                        height: "32px",
                                        width: "100%",

                                        fontSize: "15px",
                                    }}
                                    className="select-placeholder"
                                    showSearch
                                    defaultValue=""
                                    placeholder={t("Enter intern's ID")}
                                    options={optionsInternID}
                                    onChange={handleChangeFilterInternID}
                                    value={filter.internID || null}
                                />
                                <Select
                                    style={{
                                        height: "32px",
                                        width: "100%",

                                        fontSize: "15px",
                                    }}
                                    className="select-placeholder"
                                    showSearch
                                    placeholder={t(
                                        "Enter intern's Phone number"
                                    )}
                                    options={optionsInternPhoneNumber}
                                    onChange={handleChangeFilterPhoneNumber}
                                    value={filter.phoneNumber || null}
                                />
                                <Select
                                    style={{
                                        height: "32px",
                                        width: "100%",

                                        fontSize: "15px",
                                    }}
                                    className="select-placeholder"
                                    showSearch
                                    placeholder={t("Enter intern's Role")}
                                    options={optionsInternRole}
                                    onChange={handleChangeFilterRole}
                                    value={filter.role || null}
                                />
                                <Select
                                    style={{
                                        height: "32px",
                                        width: "100%",

                                        fontSize: "15px",

                                    }}
                                    className="select-placeholder"
                                    showSearch
                                    placeholder={t("Enter intern's Mentor")}
                                    options={optionsInternMentor}
                                    onChange={handleChangeFilterMentor}
                                    value={filter.mentor || null}
                                />

                                <Select
                                    style={{
                                        height: "32px",
                                        width: "100%",

                                        fontSize: "15px",

                                    }}
                                    className="select-placeholder"
                                    showSearch
                                    placeholder={t("Enter intern's Full name")}
                                    options={optionsInternFullName}
                                    onChange={handleChangeFilterFullName}
                                    value={filter.fullName || null}
                                />
                                <Select
                                    style={{
                                        height: "32px",
                                        width: "100%",

                                        fontSize: "15px",

                                    }}
                                    className="select-placeholder"
                                    showSearch
                                    placeholder={t("Enter intern's Address")}
                                    options={optionsInternAddress}
                                    onChange={handleChangeFilterAddress}
                                    value={filter.address || null}
                                />
                                <Select
                                    style={{
                                        height: "32px",
                                        width: "100%",

                                        fontSize: "15px",

                                    }}
                                    className="select-placeholder"
                                    showSearch
                                    placeholder={t("Enter intern's Position")}
                                    options={optionsInternPosition}
                                    onChange={handleChangeFilterPosition}
                                    value={filter.position || null}
                                />
                                <Select
                                    style={{
                                        height: "32px",
                                        width: "100%",

                                        fontSize: "15px",

                                    }}
                                    className="select-placeholder"
                                    showSearch
                                    placeholder={t("Enter intern's Project")}
                                    options={optionsInternProject}
                                    onChange={handleChangeFilterProject}
                                    value={filter.project || null}
                                />

                                <Input
                                    placeholder={t("Enter intern's D.O.B")}
                                    style={{
                                        height: "32px",
                                        width: "100%",

                                        fontSize: "15px",

                                    }}
                                    className="select-placeholder"
                                    value={filter.dateOfBirth}
                                    onChange={(e) =>
                                        handleChangeFilterDOB(e.target.value)
                                    }
                                />
                                <Input
                                    placeholder={t("Enter intern's Email")}
                                    style={{
                                        height: "32px",
                                        width: "100%",

                                        fontSize: "15px",

                                    }}
                                    className="custom-placeholder"
                                    value={filter.email}
                                    onChange={(e) =>
                                        handleChangeFilterEmail(e.target.value)
                                    }
                                />
                                <Input
                                    placeholder={t("Enter intern's School")}
                                    style={{
                                        height: "32px",
                                        width: "100%",

                                        fontSize: "15px",

                                    }}
                                    className="custom-placeholder"
                                    value={filter.school}
                                    onChange={(e) =>
                                        handleChangeFilterSchool(e.target.value)
                                    }
                                />
                                <Input
                                    placeholder={t("Enter intern's Group Zalo")}
                                    style={{
                                        height: "32px",
                                        width: "100%",

                                        fontSize: "15px",

                                    }}
                                    className="custom-placeholder"
                                    value={filter.groupZalo}
                                    onChange={(e) =>
                                        handleChangeFilterGroupZalo(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="buttons">
                                <Button
                                    className="cln-btn btn"
                                    onClick={handleCleanFilterButton}
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
                            <Col style={{ width: "100%" }}>
                                <Row gutter={[5, 5]}>
                                    <Select
                                        showSearch
                                        style={{
                                            height: "32px",
                                            width: "100%",

                                            fontSize: "15px",

                                        }}
                                        className="select-placeholder"
                                        defaultValue=""
                                        placeholder={t("Enter intern's ID")}
                                        options={optionsInternID}
                                        onChange={handleChangeFilterInternID}
                                        value={filter.internID || null}
                                    />
                                    <Select
                                        showSearch
                                        style={{
                                            height: "32px",
                                            width: "100%",

                                            fontSize: "15px",

                                        }}
                                        className="select-placeholder"
                                        placeholder={t(
                                            "Enter intern's Phone number"
                                        )}
                                        options={optionsInternPhoneNumber}
                                        onChange={handleChangeFilterPhoneNumber}
                                        value={filter.phoneNumber || null}
                                    />
                                    <Select
                                        showSearch
                                        style={{
                                            height: "32px",
                                            width: "100%",

                                            fontSize: "15px",

                                        }}
                                        className="select-placeholder"
                                        placeholder={t("Enter intern's Role")}
                                        options={optionsInternRole}
                                        onChange={handleChangeFilterRole}
                                        value={filter.role || null}
                                    />
                                    <Select
                                        showSearch
                                        style={{
                                            height: "32px",
                                            width: "100%",

                                            fontSize: "15px",

                                        }}
                                        className="select-placeholder"
                                        placeholder={t("Enter intern's Mentor")}
                                        options={optionsInternMentor}
                                        onChange={handleChangeFilterMentor}
                                        value={filter.mentor || null}
                                    />

                                    <Select
                                        showSearch
                                        style={{
                                            height: "32px",
                                            width: "100%",

                                            fontSize: "15px",

                                        }}
                                        className="select-placeholder"
                                        placeholder={t(
                                            "Enter intern's Fullname"
                                        )}
                                        options={optionsInternFullName}
                                        onChange={handleChangeFilterFullName}
                                        value={filter.fullName || null}
                                    />
                                    <Select
                                        showSearch
                                        style={{
                                            height: "32px",
                                            width: "100%",

                                            fontSize: "15px",

                                        }}
                                        className="select-placeholder"
                                        placeholder={t(
                                            "Enter intern's Address"
                                        )}
                                        options={optionsInternAddress}
                                        onChange={handleChangeFilterAddress}
                                        value={filter.address || null}
                                    />
                                    <Select
                                        showSearch
                                        style={{
                                            height: "32px",
                                            width: "100%",

                                            fontSize: "15px",

                                        }}
                                        className="select-placeholder"
                                        placeholder={t(
                                            "Enter intern's Position"
                                        )}
                                        options={optionsInternPosition}
                                        onChange={handleChangeFilterPosition}
                                        value={filter.position || null}
                                    />
                                    <Select
                                        showSearch
                                        style={{
                                            height: "32px",
                                            width: "100%",

                                            fontSize: "15px",

                                        }}
                                        className="select-placeholder"
                                        placeholder={t(
                                            "Enter intern's Project"
                                        )}
                                        options={optionsInternProject}
                                        onChange={handleChangeFilterProject}
                                        value={filter.project || null}
                                    />

                                    <Input
                                        style={{
                                            height: "32px",
                                            width: "100%",

                                            fontSize: "15px",

                                        }}
                                        className="custom-placeholder"
                                        placeholder={t("Enter intern's D.O.B")}
                                        value={filter.dateOfBirth}
                                        onChange={(e) =>
                                            handleChangeFilterDOB(
                                                e.target.value
                                            )
                                        }
                                    />
                                    <Input
                                        style={{
                                            height: "32px",
                                            width: "100%",

                                            fontSize: "15px",

                                        }}
                                        className="custom-placeholder"
                                        placeholder={t("Enter intern's Email")}
                                        value={filter.email}
                                        onChange={(e) =>
                                            handleChangeFilterEmail(
                                                e.target.value
                                            )
                                        }
                                    />
                                    <Input
                                        style={{
                                            height: "32px",
                                            width: "100%",

                                            fontSize: "15px",

                                        }}
                                        className="custom-placeholder"
                                        placeholder={t("Enter intern's School")}
                                        value={filter.school}
                                        onChange={(e) =>
                                            handleChangeFilterSchool(
                                                e.target.value
                                            )
                                        }
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
                                        value={filter.groupZalo}
                                        onChange={(e) =>
                                            handleChangeFilterGroupZalo(
                                                e.target.value
                                            )
                                        }
                                    />
                                </Row>
                            </Col>
                            <Col style={{ width: "100%", marginTop: "15px" }}>
                                <div className="filter-group">
                                    <Button
                                        onClick={handleCleanFilterButton}
                                        style={{
                                            width: "100%",
                                            height: "50px",
                                            borderRadius: "15px",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <FilterOutlined />
                                        {t("Clean Filters")}
                                    </Button>

                                    <Button
                                        type="primary"
                                        onClick={handleSearch}
                                        style={{
                                            width: "100%",
                                            height: "50px",
                                            borderRadius: "15px",
                                        }}
                                    >
                                        <SearchOutlined /> Search
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    )}

                    <div className="table-intern-list" style={{ display: 'flex', flexDirection: 'column' }}>
                        {/* use table of Ant Design */}
                        <Table
                            
                            columns={columns}
                            dataSource={dataTable}
                            scroll={{ x: "200vw", y: "360px" }}
                            style={{ maxWidth: "100%", minHeight: "100%"}}
                            pagination={{
                                pageSize: pageSize,
                                style: { marginRight: '120px', marginTop: "28px" }
                            }}
                        />
                        <div style={{ marginTop: '-47px', marginBottom: "10px", display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Input
                                value={pageSize}
                                onChange={(e) => handleChangePageSize(e.target.value)}
                                style={{ width: 80, marginRight: '10px' }}
                                placeholder="Page Size"
                            />
                        </div>
                    </div>
                </section>
            </main>
            {/*Render Email Popup */}
            <SendMailButton
                onClose={handleCloseEmailPopup}
                openPopup={isEmailPopupVisible}
                typesEmail={email_types}
            />
            <Modal
                title="Comments"
                visible={isCommentsModalVisible}
                onCancel={handleCommentsModalCancel}
                footer={[
                    <Button key="cancel" onClick={handleCommentsModalCancel}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" icon={<SaveOutlined />} onClick={handleSaveComment}>
                        Save Comment
                    </Button>
                ]}
            >
                <Form form={form} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="field1"
                                label="Field 1"
                                rules={[{ required: true, message: 'Please enter field 1' }]}
                            >
                                <Input placeholder="Enter field 1" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="field2"
                                label="Field 2"
                                rules={[{ required: true, message: 'Please enter field 2' }]}
                            >
                                <Input placeholder="Enter field 2" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="field3"
                                label="Field 3"
                                rules={[{ required: true, message: 'Please enter field 3' }]}
                            >
                                <Input placeholder="Enter field 3" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="field4"
                                label="Field 4"
                                rules={[{ required: true, message: 'Please enter field 4' }]}
                            >
                                <Input placeholder="Enter field 4" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="field5"
                                label="Field 5"
                                rules={[{ required: true, message: 'Please enter field 5' }]}
                            >
                                <Input placeholder="Enter field 5" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="field6"
                                label="Field 6"
                                rules={[{ required: true, message: 'Please enter field 6' }]}
                            >
                                <Input placeholder="Enter field 6" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>

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
            {/*Render Export Excel Popup */}
            <ExportExcel
                onClose={handleCloseExportExcel}
                openPopup={isExportExcelVisible}
            />
            {/*Render Add New Intern Popup */}
            <AddNewIntern
                onClose={handleCloseAddNewIntern}
                openPopup={isAddNewInternVisible}
            />

            <Toaster />
        </div>
    );
};

export default InternList;
