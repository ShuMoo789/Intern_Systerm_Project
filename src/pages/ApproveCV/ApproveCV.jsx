import * as React from "react";
import { useState, useEffect } from "react";
import "./ApproveCV.css";

import CommentPopup from "./CommentPopup.jsx";
import ScheduleInterview from "./Schedule.jsx";
import DataApproveList from "../../data/ApproveCV.json";

import {
    DownOutlined,
    EyeOutlined,
    PlusOutlined,
    SearchOutlined,
    DeleteOutlined,
    ClockCircleOutlined,
    ExportOutlined,
    EditOutlined,
    FolderAddOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import { DatePicker, Dropdown, Button, Table, Menu } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useTranslation } from "react-i18next";
import { Typography, Row, Col } from "antd";
import useViewport from "../../hooks/useViewport.jsx";
import Navigation from "../../components/Navigation/Navigation.jsx";
import { Toaster } from "react-hot-toast";
import EditPopup from "../../components/EditPopup/EditPopup.jsx"
import DeletePopup from "../../components/DeletePopup/DeletePopup.jsx"
import ExportExcel from "../../components/ExportExcelPopup/ExportExcelPopup.jsx"
import AddNewIntern from "../../components/AddNewIntern/AddNewIntern.jsx"
// Importing dayjs library and extending it with customParseFormat plugin
dayjs.extend(customParseFormat);

/**
 * The IconTextBlock component renders a block that contains an image icon
 * and a text label next to it.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.iconSrc - The source URL of the icon image.
 * @param {string} props.altText - The alternative text for the icon image.
 * @param {string} props.text - The text to be displayed next to the icon.
 * @returns {JSX.Element} The rendered JSX for the icon-text block.
 */
function IconTextBlock({ iconSrc, altText, text }) {
    // The component returns a div with a class name 'icon-text-block'
    return (
        <div className="icon-text-block">
            {/* The image element with the source URL and alt text passed as props */}
            <img src={iconSrc} alt={altText} className="icon" />
            {/* The span element that displays the text passed as a prop */}
            <span className="icon-text">{text}</span>
        </div>
    );
}

function ApproveCV() {
    // Date format for date inputs
    const dateFormat = "YYYY/MM/DD";

    // Number of interns per page
    const internsPerPage = 6;

    // React useState hook to manage the current page number
    const [currentPage, setCurrentPage] = useState(0);

    // State to manage the currently selected intern(s)
    const [selectedIntern, setSelectedIntern] = useState([]);

    // State to manage the list of interns
    const [intern, setIntern] = useState([DataApproveList]);

    // State to manage the filtered list of interns
    const [filteredInterns, setFilteredInterns] = useState(DataApproveList);

    // State to manage the visibility of the comment popup
    const [commentPopupVisible, setCommentPopupVisible] = useState(false);

    // State to manage the initial page number (could be used for resetting or other purposes)
    const [initialPage, setInitialPage] = useState(0);

    // Calculate the total number of pages based on the number of interns and interns per page
    const totalPages = Math.ceil(DataApproveList.length / internsPerPage);

    const schoolNames = [
        ...new Set(filteredInterns.map((intern) => intern.school)),
    ];

    // Extract unique position names from the filteredInterns array
    const positionNames = [
        ...new Set(filteredInterns.map((intern) => intern.position)),
    ];

    // State to manage various filters for the interns
    const [selectedFilters, setSelectedFilters] = useState({
        internID: "", // Filter by intern ID
        dateSubmittedForm: null, // Filter by the date the form was submitted
        fullName: "", // Filter by full name
        dateOfBirth: null, // Filter by date of birth
        phoneNumber: "", // Filter by phone number
        school: null, // Filter by school
        email: "", // Filter by email
        position: null, // Filter by position
        address: "", // Filter by address
    });

    /**
     * Function to handle page changes.
     * @param {number} page - The page number to switch to.
     */
    const handlePageChange = (page) => {
        setCurrentPage(page); // Update the current page state with the new page number
    };

    /**
     * Function to render the list of interns for the current page.
     * This function slices the `filteredInterns` array to get the interns for the current page
     * and maps over them to create table rows.
     *
     * @returns {JSX.Element[]} An array of JSX elements representing the rows of the interns table.
     */
    const renderInterns = () => {
        // Calculate the starting index of the interns for the current page
        const startIndex = currentPage * internsPerPage;
        // Calculate the ending index of the interns for the current page, ensuring it does not exceed the total number of interns
        const endIndex = Math.min(
            (currentPage + 1) * internsPerPage,
            interns.length
        );

        // Slice the filteredInterns array to get the interns for the current page
        return filteredInterns
            .slice(startIndex, endIndex)
            .map((intern, index) => (
                // Each row is a table row (<tr>) element with a unique key based on the index
                <tr key={index}>
                    {/* Checkbox for selecting the intern */}
                    <td>
                        <input type={"checkbox"} />
                    </td>
                    {/* Display intern details in table cells (<td>) */}
                    <td>{intern.internID}</td>
                    <td>{intern.dateSubmittedForm}</td>
                    <td>{intern.fullName}</td>
                    <td>{intern.dateOfBirth}</td>
                    <td>{intern.phoneNumber}</td>
                    <td>{intern.position}</td>
                    <td>{intern.school}</td>
                    <td>{intern.address}</td>
                    <td>{intern.email}</td>
                    {/* Link to the intern's CV */}
                    <td>
                        <a href="#">{intern.cvLink}</a>
                    </td>
                    {/* Comments section with eye icon for viewing comments and a button to add comments */}
                    <td style={{ display: "flex" }}>
                        <div className="Comments-CV">
                            {intern.commentsCV === "1"
                                ? `${intern.commentsCV} Comment`
                                : `${intern.commentsCV} Comments`}
                            <EyeOutlined
                                style={{ marginLeft: "5px", cursor: "pointer" }}
                                onClick={() => {
                                    handleCommentClick(intern);
                                }}
                            />
                        </div>
                        <div className="add-cmt-btn">
                            <PlusOutlined />
                        </div>
                    </td>
                    {/* Status section with conditional styling based on the intern's status */}
                    <td>
                        <div
                            className="Status"
                            style={
                                intern.status === t("Pending")
                                    ? {
                                          backgroundColor: "#FFB596",
                                          color: "#E5731C",
                                      }
                                    : intern.status === t("Failed")
                                    ? {
                                          backgroundColor: "#F5A3B7",
                                          color: "#7D0022",
                                      }
                                    : intern.status === t("Passed")
                                    ? {
                                          backgroundColor: "#B7EACB",
                                          color: "#3A7D34",
                                      }
                                    : {}
                            }
                        >
                            {intern.status}
                            <DownOutlined />
                        </div>
                    </td>
                    {/* Action buttons for viewing intern details and feedbacks */}
                    <td style={{ display: "flex" }}>
                        <div
                            className="view"
                            onClick={() => handleViewClick(intern)}
                        >
                            View
                        </div>
                        <div className="feedbacks">Feedbacks</div>
                    </td>
                </tr>
            ));
    };

    /**
     * Handles menu item clicks for filtering interns.
     * @param {string} type - The type of filter (e.g., 'school' or 'position').
     * @param {string} key - The selected filter value.
     */
    const handleMenuClick = (type, key) => {
        // Update the selectedFilters state with the new filter value
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [type]: key,
        }));
    };

    /**
     * Creates a menu for filtering options.
     * @param {string} type - The type of filter (e.g., 'school' or 'position').
     * @param {string[]} items - The list of filter values.
     * @returns {JSX.Element} A menu component with filter options.
     */
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

    /**
     * Handles the action when the comment button is clicked.
     * @param {Object} intern - The intern object for which the comment is being added.
     */
    const handleCommentClick = (intern) => {
        setSelectedIntern(intern); // Set the selected intern
        setInitialPage(1); // Set the initial page to 1
        setCommentPopupVisible(true); // Show the comment popup
    };

    /**
     * Handles the action when the view button is clicked.
     * @param {Object} intern - The intern object to be viewed.
     */
    const handleViewClick = (intern) => {
        setSelectedIntern(intern); // Set the selected intern
        setInitialPage(0); // Set the initial page to 0
        setCommentPopupVisible(true); // Show the comment popup
    };

    const handleViewFeedback = (intern) => {
        setSelectedIntern(intern); // Set the selected intern
        setInitialPage(2); // Set the initial page to 0
        setCommentPopupVisible(true); // Show the comment popup
    };

    /**
     * Handles the action to close the comment popup.
     */
    const handleCloseCommentPopup = () => {
        setCommentPopupVisible(false); // Hide the comment popup
        setSelectedIntern(null); // Clear the selected intern
    };

    /**
     * Handles the action to save the updated comment for an intern.
     * @param {Object} updatedIntern - The updated intern object with comments.
     */
    const handleSaveComment = (updatedIntern) => {
        // Update the interns state with the updated intern object
        setIntern((prevInterns) =>
            prevInterns.map((intern) =>
                intern.internID === updatedIntern.internID
                    ? updatedIntern
                    : intern
            )
        );
        handleCloseCommentPopup(); // Close the comment popup after saving
    };

    /**
     * Handles input change for filter values.
     * @param {string} name - The name of the filter field.
     * @param {string} value - The value of the filter field.
     */
    const handleInputChange = (key, value) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    const handleDateChange = (type, dates) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [type]: dates,
        }));
    };

    /**
     * Handles the search functionality based on filter values.
     */
    const handleSearch = () => {
        let results = DataApproveList;

        if (selectedFilters.position) {
            results = results.filter(
                (intern) => intern.position === selectedFilters.position
            );
        }
        if (selectedFilters.school) {
            results = results.filter(
                (intern) => intern.school === selectedFilters.school
            );
        }
        if (selectedFilters.internID) {
            const searchText = selectedFilters.internID.toLowerCase();
            results = results.filter((intern) =>
                intern.internID.toLowerCase().includes(searchText)
            );
        }
        if (selectedFilters.fullName) {
            const searchText = selectedFilters.fullName.toLowerCase();
            results = results.filter((intern) =>
                intern.fullName.toLowerCase().includes(searchText)
            );
        }
        if (selectedFilters.email) {
            const searchText = selectedFilters.email.toLowerCase();
            results = results.filter((intern) =>
                intern.email.toLowerCase().includes(searchText)
            );
        }
        if (selectedFilters.address) {
            const searchText = selectedFilters.address.toLowerCase();
            results = results.filter((intern) =>
                intern.address.toLowerCase().includes(searchText)
            );
        }
        if (selectedFilters.phoneNumber) {
            const searchText = selectedFilters.phoneNumber.toLowerCase();
            results = results.filter((intern) =>
                intern.phoneNumber.toLowerCase().includes(searchText)
            );
        }
        if (selectedFilters.dateOfBirth) {
            results = results.filter((intern) =>
                moment(intern.dateOfBirth).isSame(
                    selectedFilters.dateOfBirth,
                    "day"
                )
            );
        }
        if (selectedFilters.dateSubmittedForm) {
            results = results.filter((intern) =>
                moment(intern.dateSubmittedForm).isBetween(
                    selectedFilters.dateSubmittedForm,
                    "day"
                )
            );
        }
        setFilteredInterns(results);
    };

    /**
     * Handles clearing all filter values and resetting the filtered interns list.
     */
    const handleClearFilters = () => {
        setFilteredInterns(DataApproveList); // Reset the filtered interns to the full list
        setCurrentPage(0); // Reset the current page to 0
        setSelectedFilters({
            internID: "",
            fullName: "",
            dateOfBirth: "",
            phoneNumber: "",
            email: "",
            address: "",
            dateSubmittedForm: "",
            searchText: "",
            school: "",
            position: "",
        }); // Reset selected school and position filters
    };
    const handleViewClose = () => {
        setViewPopupVisible(false); // Hide the view popup
    };

    const { t, i18n } = useTranslation();
    const [optionChoose, setOptionChoose] = useState([]);
    const commentText = t("comment");
    const commentsText = t("comments");
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;
    const { Text } = Typography;
    // checkbox table Ant Design
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            );
        },
        getCheckboxProps: (record) => ({
            name: record.name,
        }),
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Passed":
                return "green";
            case "Failed":
                return "red";
            case "Pending":
                return "yellow";
            default:
                return "black";
        }
    };
    // title of apprve list table
    const columns = [
        {
            title: t("Intern ID"),
            dataIndex: "internID",
            // width: 80,
            filteredValue: [selectedFilters.internID],
            // onFilter: (value, record) => {
            //     return record.internID.includes(value)
            // }
        },
        {
            title: t("Date Submitted Form"),
            dataIndex: "dateSubmittedForm",
            // width: 140,
        },
        {
            title: t("Full Name"),
            dataIndex: "fullName",

            filteredValue: [selectedFilters.fullName],
            // onFilter: (value, record) => {
            //     return record.fullName.includes(value)
            // }
        },
        {
            title: t("Date Of Birth"),
            dataIndex: "dateOfBirth",
            // width: 110,
            // filteredValue: [selectedFilters.dateOfBirth],
            // onFilter: (value, record) => {
            //     return record.dateOfBirth.includes(value)
            // }
        },
        {
            title: t("Phone Number"),
            dataIndex: "phoneNumber",
            // width: 120,
            // filteredValue: [selectedFilters.phoneNumber],
            // onFilter: (value, record) => {
            //     return record.phoneNumber.includes(value)
            // }
        },
        {
            title: t("Position"),
            dataIndex: "position",
            // width: 120,
            // filteredValue: [selectedFilters.position],
            // onFilter: (value, record) => {
            //     return record.position.includes(value)
            // }
        },
        {
            title: t("School"),
            dataIndex: "school",
            // width: 160,
            render: (text) => t(text),
            // filteredValue: [selectedFilters.school],
            // onFilter: (value, record) => {
            //     return record.school.includes(value)
            // }
        },
        {
            title: t("Address"),
            dataIndex: "address",
            // width: 120,
            filteredValue: [selectedFilters.address],
            render: (text) => t(text),
            // onFilter: (value, record) => {
            //     return record.address.includes(value)
            // }
        },
        {
            title: "Email",
            dataIndex: "email",
            // width: 180,
            // filteredValue: [selectedFilters.email],
            // onFilter: (value, record) => {
            //     return record.email.includes(value)
            // }
        },
        {
            title: "CV",
            dataIndex: "cvLink",
            // width: 60,
            render: (text) => (
                <a
                    href={text}
                    style={{ color: "Blue", textDecoration: "underline" }}
                >
                    Link
                </a>
            ),
        },
        {
            title: t("Comments"),
            dataIndex: "commentsCV",
            // width: 130,
            render: (text) => (
                <Button
                    onClick={() => handleCommentClick(intern)}
                    style={{ width: "100%" }}
                >
                    {text === "1"
                        ? `${text} ${commentText}`
                        : `${text} ${commentsText}`}
                    <EyeOutlined />
                </Button>
            ),
        },
        {
            title: t("Status"),
            dataIndex: "status",
            // width: 100,
            render: (text, record) => (
                <Dropdown
                    overlay={
                        <Menu
                            onClick={({ key }) =>
                                handleChangestatus(key, record)
                            }
                        >
                            <Menu.Item key="Pending">
                                <span>{t("Pending")}</span>
                            </Menu.Item>
                            <Menu.Item key="Failed">
                                <span>{t("Failed")}</span>
                            </Menu.Item>
                            <Menu.Item key="Passed">
                                <span>{t("Passed")}</span>
                            </Menu.Item>
                        </Menu>
                    }
                >
                    <Button
                        style={{
                            width: 120,
                            backgroundColor:
                                record.status === "Failed"
                                    ? "#F8E7EE"
                                    : record.status === "Passed"
                                    ? "#EFF9F1"
                                    : "#FFEFE6",
                            color:
                                record.status === "Failed"
                                    ? "#B70D52"
                                    : record.status === "Passed"
                                    ? "#449E3C"
                                    : "#FF5D02",
                            borderRadius: "100px",
                            fontSize: "12px",
                        }}
                    >
                        {t(record.status)} <DownOutlined />
                    </Button>
                </Dropdown>
            ),
        },
        {
            title: "Button",
            // width: 120,
            render: (intern) => (
                <div className="approve-btns">
                    <div
                        className="view"
                        onClick={() => handleViewClick(intern)}
                    >
                        {t("View")}
                    </div>
                    <div
                        className="feedbacks"
                        onClick={() => handleViewFeedback(intern)}
                    >
                        {t("Feedbacks")}
                    </div>
                </div>
            ),
        },
    ];

    // option of status column
    const handleChangestatus = (key, record) => {
        record.status = key;
        setSelectedOption(key);
    };
    const [selectedOption, setSelectedOption] = useState("");
    const optionSelect = [
        {
            value: "passed",
            label: "Passed",
        },
        {
            value: "failed",
            label: "Failed",
        },
        {
            value: "pending",
            label: "Pending",
        },
    ];
    const translatedData = optionSelect.map((item) => ({
        value: item.value,
        label: t(item.label),
    }));

    const groupButton = [
        {
            color: "#6537B1",
            name: t("Schedule interview"),
            icon: <ClockCircleOutlined />,
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

    const [isSchedulePopupVisible, setSchedulePopupVisible] = useState(false);
    const handleOpenScheduleInterView = () => {
        setSchedulePopupVisible(true);
    };

    const handleCloseScheduleInterView = () => {
        setSchedulePopupVisible(false);
    };

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
                        titleName={t("Approve CV")}
                        groupButton={groupButton}
                        onScheduleInterview={handleOpenScheduleInterView}
                        onEdit={handleOpenEdit}
                        onDelete={handleOpenDelete}
                        onExportExcel={handleOpenExportExcel}
                        onCreateIntern={handleOpenAddNewIntern}
                    />
                </div>

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
                                    value={selectedFilters.internID}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "internID",
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
                                    placeholder={t("Enter intern's Full name")}
                                    value={selectedFilters.fullName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "fullName",
                                            e.target.value
                                        )
                                    }
                                />

                                <DatePicker
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    className="custom-placeholder"
                                    format={dateFormat}
                                    placeholder={t("Enter intern's D.O.B")}
                                    onChange={(date) =>
                                        handleDateChange("dateOfBirth", date)
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
                                        "Enter intern's Phone number"
                                    )}
                                    value={selectedFilters.phoneNumber}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "phoneNumber",
                                            e.target.value
                                        )
                                    }
                                />

                                <Dropdown
                                    overlay={createMenu("school", schoolNames)}
                                    trigger={["click"]}
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                >
                                    <Button
                                        style={{
                                            fontSize: "15px",
                                            textAlign: "left",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        {/* <div style={{color: "#C7BFBF"}}>Enter intern's School</div> */}
                                        <div
                                            style={{
                                                color: selectedFilters.school
                                                    ? "#000000"
                                                    : "#C7BFBF",
                                            }}
                                        >
                                            {selectedFilters.school ||
                                                t("Enter intern's School")}
                                        </div>
                                        <DownOutlined />
                                    </Button>
                                </Dropdown>

                                <Input
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    className="custom-placeholder"
                                    placeholder={t("Enter intern's Email")}
                                    value={selectedFilters.email}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "email",
                                            e.target.value
                                        )
                                    }
                                />

                                <Dropdown
                                    overlay={createMenu(
                                        "position",
                                        positionNames
                                    )}
                                    trigger={["click"]}
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                >
                                    <Button
                                        style={{
                                            fontSize: "15px",
                                            textAlign: "left",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div
                                            style={{
                                                color: selectedFilters.position
                                                    ? "#000000"
                                                    : "#C7BFBF",
                                            }}
                                        >
                                            {selectedFilters.position ||
                                                t("Enter intern's Position")}
                                        </div>
                                        <DownOutlined />
                                    </Button>
                                </Dropdown>

                                <Input
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    className="custom-placeholder"
                                    placeholder={t("Enter intern's Address")}
                                    value={selectedFilters.address}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "address",
                                            e.target.value
                                        )
                                    }
                                />

                                <DatePicker
                                    format={dateFormat}
                                    placeholder={t(
                                        "Enter intern's Date Submitted Form"
                                    )}
                                    style={{
                                        height: "32px",
                                        width: "100%",
                                        fontSize: "15px",
                                    }}
                                    className="custom-placeholder"
                                    onChange={(date) =>
                                        handleDateChange("dateSub", date)
                                    }
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
                                    onClick={handleSearch}
                                >
                                    <SearchOutlined />
                                    {t("Search")}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="filter">
                            <Row gutter={[16, 16]}>
                                <Col>
                                    <Row gutter={[5, 5]}>
                                        <Input
                                            style={{
                                                height: "32px",
                                                width: "100%",
                                                fontSize: "15px",
                                            }}
                                            placeholder={t("Enter intern's ID")}
                                            value={selectedFilters.internID}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "internID",
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
                                            placeholder={t(
                                                "Enter intern's Full name"
                                            )}
                                            value={selectedFilters.fullName}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "fullName",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <DatePicker
                                            style={{
                                                height: "32px",
                                                width: "100%",
                                                fontSize: "15px",
                                            }}
                                            className="custom-placeholder"
                                            format={dateFormat}
                                            placeholder={t(
                                                "Enter intern's D.O.B"
                                            )}
                                            onChange={(date) =>
                                                handleDateChange(
                                                    "dateOfBirth",
                                                    date
                                                )
                                            }
                                        />

                                        <Input
                                            style={{
                                                height: "32px",
                                                width: "100%",
                                                fontSize: "15px",
                                            }}
                                            placeholder={t(
                                                "Enter intern's Phone number"
                                            )}
                                            value={selectedFilters.phoneNumber}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "phoneNumber",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <Dropdown
                                            overlay={createMenu(
                                                "school",
                                                schoolNames
                                            )}
                                            trigger={["click"]}
                                        >
                                            <Button
                                                style={{
                                                    width: "100%",
                                                    fontSize: "15px",
                                                    textAlign: "left",
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {/* <div style={{color: "#C7BFBF"}}>Enter intern's School</div> */}
                                                <div
                                                    style={{
                                                        color: selectedFilters.school
                                                            ? "#000000"
                                                            : "#C7BFBF",
                                                    }}
                                                >
                                                    {selectedFilters.school ||
                                                        t(
                                                            "Enter intern's School"
                                                        )}
                                                </div>
                                                <DownOutlined />
                                            </Button>
                                        </Dropdown>

                                        <Input
                                            style={{
                                                height: "32px",
                                                width: "100%",
                                                fontSize: "15px",
                                            }}
                                            placeholder={t(
                                                "Enter intern's Email"
                                            )}
                                            value={selectedFilters.email}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "email",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <Dropdown
                                            overlay={createMenu(
                                                "position",
                                                positionNames
                                            )}
                                            trigger={["click"]}
                                        >
                                            <Button
                                                style={{
                                                    width: "100%",
                                                    fontSize: "15px",
                                                    textAlign: "left",
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        color: selectedFilters.position
                                                            ? "#000000"
                                                            : "#C7BFBF",
                                                    }}
                                                >
                                                    {selectedFilters.position ||
                                                        t(
                                                            "Enter intern's Position"
                                                        )}
                                                </div>
                                                <DownOutlined />
                                            </Button>
                                        </Dropdown>

                                        <Input
                                            style={{
                                                height: "32px",
                                                width: "100%",
                                                fontSize: "15px",
                                            }}
                                            placeholder={t(
                                                "Enter intern's Address"
                                            )}
                                            value={selectedFilters.address}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <DatePicker
                                            format={dateFormat}
                                            placeholder={t(
                                                "Enter intern's Date Submitted Form"
                                            )}
                                            style={{
                                                height: "32px",
                                                width: "100%",
                                                fontSize: "15px",
                                            }}
                                            className="custom-placeholder"
                                            onChange={(date) =>
                                                handleDateChange(
                                                    "dateSub",
                                                    date
                                                )
                                            }
                                        />
                                    </Row>
                                </Col>
                                <Col style={{ width: "100%" }}>
                                    <Row gutter={[16, 10]}>
                                        <Button
                                            style={{
                                                width: "100%",
                                                height: "50px",
                                                borderRadius: "15px",
                                            }}
                                            onClick={handleClearFilters}
                                        >
                                            <DeleteOutlined
                                                style={{ marginRight: "10px" }}
                                            />
                                            {t("Clean Filter")}
                                        </Button>

                                        <Button
                                            type="primary"
                                            style={{
                                                width: "100%",
                                                height: "50px",
                                                borderRadius: "15px",
                                            }}
                                            onClick={handleSearch}
                                        >
                                            <SearchOutlined
                                                style={{ marginRight: "10px" }}
                                            />
                                            {t("Search")}
                                        </Button>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    )}
                    <div className="list">
                        <Table
                            rowSelection={{
                                type: "checkbox",
                                ...rowSelection,
                            }}
                            columns={columns}
                            dataSource={filteredInterns}
                            scroll={{ x: "max-content" }}
                            pagination={{
                                pageSize: 8,
                            }}
                        />
                    </div>
                </section>
            </main>
            <CommentPopup
                isVisible={commentPopupVisible}
                onClose={handleCloseCommentPopup}
                intern={selectedIntern}
                initialPage={initialPage}
                onSave={handleSaveComment}
            />
            {/*Render ScheduleInterView Popup */}
            <ScheduleInterview
                onClose={handleCloseScheduleInterView}
                openPopup={isSchedulePopupVisible}
            />
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

            <Toaster />
        </div>
    );
}

export default ApproveCV;
