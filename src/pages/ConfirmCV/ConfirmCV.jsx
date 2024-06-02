import React, { useState, useEffect } from 'react';
import "./ConfirmCV.css";
import { Table, Checkbox, Button, Select, Modal, Row, Col } from 'antd'; // Import Select from antd
import MainLayout from '../../MainLayout/MainLayout';
import User_Img from "../../assets/user_image.png";
import SendMailButton from '../../components/SendMailButton/SendMailButton';
import ViewButton from "../../components/ViewButton(ConfirmCV)/ViewButton"
import MailOutlined from "@ant-design/icons/MailOutlined"
import {
    DownOutlined,
    EyeOutlined,
    PlusOutlined,
    SettingOutlined,
    ArrowRightOutlined,
    ArrowLeftOutlined,
    SearchOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import { Input } from "antd";
import DataConfirmCV from "../../data/ConfirmCV.json"
import {
    DatePicker,
    Dropdown,
    Menu
} from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
const { RangePicker } = DatePicker;
const { Option } = Select; // Destructure Option from Select
dayjs.extend(customParseFormat);
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



const interns = [
    

];
const dateFormat = 'YYYY/MM/DD';
const ConfirmCV = () => {
    // Number of interns per page
    const internsPerPage = 6;

    // React useState hook to manage the current page number
    const [currentPage, setCurrentPage] = useState(0);

    // State to manage the currently selected intern(s)
    const [selectedIntern, setSelectedIntern] = useState([]);

    // State to manage the list of interns
    const [intern, setIntern] = useState(DataConfirmCV);

    // State to manage the filtered list of interns
    const [filteredInterns, setFilteredInterns] = useState(DataConfirmCV);

    // State to manage the initial page number (could be used for resetting or other purposes)
    const [initialPage, setInitialPage] = useState(0);

    // Calculate the total number of pages based on the number of interns and interns per page
    const totalPages = Math.ceil(DataConfirmCV.length / internsPerPage);
    const [commentPopupVisible, setCommentPopupVisible] = useState(false);

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
        const endIndex = Math.min((currentPage + 1) * internsPerPage, interns.length);

        // Slice the filteredInterns array to get the interns for the current page
        return filteredInterns.slice(startIndex, endIndex).map((intern, index) => (
            // Each row is a table row (<tr>) element with a unique key based on the index
            <tr key={index}>
                {/* Checkbox for selecting the intern */}
                <td><input type={"checkbox"} /></td>
                {/* Display intern details in table cells (<td>) */}
                <td>{intern.internID}</td>
                <td>{intern.dateInterView}</td>
                <td>{intern.timeinterview}</td>
                <td>{intern.fullName}</td>
                <td>{intern.dateOfBirth}</td>
                <td>{intern.phoneNumber}</td>
                <td>{intern.position}</td>
                <td>{intern.school}</td>
                <td>{intern.address}</td>
                <td>{intern.email}</td>
                {/* Link to the intern's CV */}
                <td><a href="#">{intern.cvLink}</a></td>
                {/* Comments section with eye icon for viewing comments and a button to add comments */}
                <td style={{ display: "flex" }}>
                    <div className="Comments-CV">
                        {/* Hiển thị số lượng bình luận */}
                        {renderComments(intern)}
                        {/* Hiển thị biểu tượng mắt và gán sự kiện onClick */}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: '5px' }}>{/* Thêm một khoảng cách giữa văn bản và biểu tượng */}</span>
                            <EyeOutlined style={{ cursor: 'pointer' }} onClick={() => handleCommentClick(intern)} />
                        </div>
                    </div>
                    <div className="add-cmt-btn">
                        {/* Biểu tượng Plus */}
                        <PlusOutlined />
                    </div>
                </td>
                <td>
                    <div className="Status" style={(intern.confirmEmail === "No") ? {
                        backgroundColor: "#F5A3B7",
                        color: "#7D0022"
                    } : (intern.confirmEmail === "Yes") ? { backgroundColor: "#B7EACB", color: "#3A7D34" } : {}}>
                        {intern.status}<DownOutlined />
                    </div>
                </td>
                <td>{intern.interviewer}</td>
                {/* Status section with conditional styling based on the intern's status */}
                <td>
                    <div className="Status" style={(intern.status === "Pending") ? {
                        backgroundColor: "#FFB596",
                        color: "#E5731C"
                    } : (intern.status === "Failed") ? {
                        backgroundColor: "#F5A3B7",
                        color: "#7D0022"
                    } : (intern.status === "Passed") ? { backgroundColor: "#B7EACB", color: "#3A7D34" } : {}}>
                        {intern.status}<DownOutlined />
                    </div>
                </td>
                {/* Action buttons for viewing intern details and feedbacks */}
                <td style={{ display: 'flex' }}>
                    <div className="view" style={{ border: "1px solid #4889E9", padding: "05px", borderRadius: "20px", color: "#4889E9", cursor: "pointer" }} onClick={() => {
                        handleViewClick(intern);// Set the modal visibility to true
                    }}>View</div>
                </td>
            </tr>
        ));
    };

    // Extract unique school names from the filteredInterns array
    const schoolNames = [...new Set(filteredInterns.map(intern => intern.school))];

    // Extract unique position names from the filteredInterns array
    const positionNames = [...new Set(filteredInterns.map(intern => intern.position))];

    const internIDChoice = [...new Set(filteredInterns.map(intern => intern.internID))];

    const phoneNumberChoice = [...new Set(filteredInterns.map(intern => intern.phoneNumber))]

    const fullNameChoice = [...new Set(filteredInterns.map(intern => intern.fullName))];

    const addressName = [...new Set(filteredInterns.map(intern => intern.address))];

    const timeInterviewChoice = [...new Set(filteredInterns.map(intern => intern.timeinterview))];

    const dateInterviewChoice = [...new Set(filteredInterns.map(intern => intern.dateInterView))]
    // useState hook to manage the selected filters for school and position
    const [selectedFilters, setSelectedFilters] = useState({
        school: '',   // Currently selected school filter
        position: '', // Currently selected position filter
        internID: '',
        phoneNumber: '',
        dateInterView: '',
        fullName: '',
        address: '',
        timeInterView: '',
        dateOfBirth: '',
        email: '',
    });

    /**
     * Handles menu item clicks for filtering interns.
     * @param {string} type - The type of filter (e.g., 'school' or 'position').
     * @param {string} key - The selected filter value.
     */
    const handleMenuClick = (type, key) => {
        // Update the selectedFilters state with the new filter value
        setSelectedFilters(prevFilters => ({
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
        setInitialPage(1);         // Set the initial page to 1
        setCommentPopupVisible(true); // Show the comment popup
    };

    /**
     * Handles the action when the view button is clicked.
     * @param {Object} intern - The intern object to be viewed.
     */
    // const handleViewClick = (intern) => {
    //     setSelectedIntern(intern); // Set the selected intern
    //     setInitialPage(0);         // Set the initial page to 0
    //     setCommentPopupVisible(true); // Show the comment popup
    // };

    /**
     * Handles the action to close the comment popup.
     */
    const handleCloseCommentPopup = () => {
        setCommentPopupVisible(false); // Hide the comment popup
        setSelectedIntern(null);       // Clear the selected intern
    };
    const renderComments = (record) => {
        console.log('Rendering Comments for intern:', record);
        console.log('CommentsCV value:', record.commentsCV);

        if (record.commentsCV !== undefined && record.commentsCV !== null) {
            if (record.commentsCV == 1) {
                console.log('Rendering Comment');
                return "1 Comment";
            } else {
                console.log(`Rendering ${record.commentsCV} Comments`);
                return `${record.commentsCV} Comments`;
            }
        } else {
            console.log('CommentsCV is undefined or null');
            return "No Comments";
        }
    };



    /**
     * Handles the action to save the updated comment for an intern.
     * @param {Object} updatedIntern - The updated intern object with comments.
     */
    const handleSaveComment = (updatedIntern) => {
        // Update the interns state with the updated intern object
        setInterns((prevInterns) =>
            prevInterns.map((intern) =>
                intern.internID === updatedIntern.internID ? updatedIntern : intern
            )
        );
        handleCloseCommentPopup(); // Close the comment popup after saving
    };

    /**
     * Handles input change for filter values.
     * @param {string} name - The name of the filter field.
     * @param {string} value - The value of the filter field.
     */
    const handleInputChange = (type, value) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            [type]: value,
        }));
    };

    const handleDateChange = (type, dates) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            [type]: dates,
        }));
    };

    /**
     * Handles the search functionality based on filter values.
     */
    const handleSearch = () => {
        let results = DataConfirmCV;
        if (selectedFilters.internID) {
            results = results.filter(intern => intern.internID === selectedFilters.internID);
        }
        if (selectedFilters.position) {
            results = results.filter(intern => intern.position === selectedFilters.position);
        }
        if (selectedFilters.fullName) {
            results = results.filter(intern => intern.fullName === selectedFilters.fullName);
        }
        if (selectedFilters.phoneNumber) {
            results = results.filter(intern => intern.phoneNumber === selectedFilters.phoneNumber);
        }
        if (selectedFilters.dateInterView) {
            results = results.filter(intern => intern.dateInterView === selectedFilters.dateInterView);
        }
        if (selectedFilters.timeInterView) {
            results = results.filter(intern => intern.timeinterview === selectedFilters.timeInterView);
        }
        if (selectedFilters.address) {
            results = results.filter(intern => intern.address === selectedFilters.address);
        }
        if (selectedFilters.school) {
            results = results.filter(intern => intern.school.toLowerCase().includes(searchText))
        }
        if (selectedFilters.email) {
            results = results.filter(intern => intern.email.toLowerCase().includes(searchText))
        }
        if (selectedFilters.dateOfBirth) {
            results = results.filter(intern =>
                moment(intern.dateOfBirth).isSame(selectedFilters.dateOfBirth, 'day')
            );
        }
        setFilteredInterns(results);
    };


    /**
     * Handles clearing all filter values and resetting the filtered interns list.
     */
    const handleClearFilters = () => {
        setFilteredInterns(DataConfirmCV); // Reset the filtered interns to the full list
        setCurrentPage(0);           // Reset the current page to 0
        setSelectedFilters({
            school: null,
            position: null,
            internID: null,
            phoneNumber: null,
            dateInterView: null,
            fullName: null,
            address: null,
            timeinterview: null,
            dateOfBirth: null,
            searchText: '',
        }); // Reset selected school and position filters
    };

    /**
     * Handles the action to close the view popup.
     */
    const handleViewClose = () => {
        setViewPopupVisible(false); // Hide the view popup
    };
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setSelectedIntern(null);
        setCommentPopupVisible(false);
    };
    const [statusMap, setStatusMap] = useState(interns.reduce((acc, intern) => {
        acc[intern.internId] = false; // Initialize all checkboxes to unchecked
        return acc;
    }, {}));
    const handleChange = (checked, internId) => {
        const newStatusMap = { ...statusMap, [internId]: checked };
        setStatusMap(newStatusMap);
    };

    const handleAllCheckedChange = (e) => {
        const isChecked = e.target.checked;
        const newStatusMap = {};
        for (const internId in statusMap) {
            newStatusMap[internId] = isChecked;
        }
        setStatusMap(newStatusMap);
    };
    const [modalVisible, setModalVisible] = useState(false);
    // const [selectedIntern, setSelectedIntern] = useState(null);
    // const [commentPopupVisible, setCommentPopupVisible] = useState(false);
    // const [initialPage, setInitialPage] = useState(0); // Assuming you have initial page state
    const handleViewClick = (intern) => {
        setSelectedIntern(intern);
        setInitialPage(0);
        setCommentPopupVisible(true);
        setModalVisible(true);
    };
    const handleModalCancel = () => {
        setModalVisible(false);
    };

    const [allChecked, setAllChecked] = useState(false);
    const columns = [
        {
            title: <Checkbox onChange={handleAllCheckedChange} />,
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: (text, record) => (
                <Checkbox
                    checked={statusMap[record.internId]}
                    onChange={(e) => handleChange(e.target.checked, record.internId)}
                />
            ),
        },
        {
            title: 'Intern ID',
            dataIndex: 'internID',
            key: 'internID',
            filteredValue: [selectedFilters.internID],
        },
        {
            title: 'Date Interview',
            dataIndex: 'dateInterView',
            key: 'dateInterView',
            filteredValue: [selectedFilters.dateInterView]
        },
        {
            title: 'Time Interview',
            dataIndex: 'timeinterview',
            key: 'timeinterview',
            filteredValue: [selectedFilters.timeInterView]
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            filteredValue: [selectedFilters.fullName]
        },
        {
            title: 'Date Of Birth',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
            filteredValue: [selectedFilters.dateOfBirth]
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            filteredValue: [selectedFilters.phoneNumber]
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
            filteredValue: [selectedFilters.position]
        },
        {
            title: 'School',
            dataIndex: 'school',
            key: 'school',
            filteredValue: [selectedFilters.school]
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            filteredValue: [selectedFilters.address]
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            filteredValue: [selectedFilters.email]
        },
        {
            title: 'CV',
            dataIndex: 'cvLink',
            key: 'cvLink',
            render: () => <a style={{ textDecoration: "underline", color: "black" }} onClick={() => window.location.href = '/'}>Link</a>,
        },
        {
            title: 'Comments CV',
            dataIndex: 'commentsCV',
            key: 'commentsCV',
            render: (text, record) => (
                <span>
                    {/* Hiển thị số lượng bình luận */}
                    {renderComments(record)}
                    {/* Hiển thị biểu tượng mắt và gán sự kiện onClick */}
                    <EyeOutlined style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={() => handleCommentClick(record)} />
                </span>)
        },

        {
            title: 'Confirm Email',
            dataIndex: 'confirmEmail',
            key: 'confirmEmail',
            render: (confirmEmail, record) => (
                <Select
                    defaultValue={confirmEmail}
                    style={{ width: 120 }}
                    onChange={(value) => handleChange(value, record)}
                >
                    <Option value="Yes" >Confirmed</Option>
                    <Option value="No" >Not Confirmed</Option>
                </Select>
            ),
        },
        {
            title: 'Interviewer',
            dataIndex: 'interviewer',
            key: 'interviewer',
            filteredValue: [selectedFilters.dateInterView]
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                <Select
                    defaultValue={text}

                    onChange={(value) => handleChange(value, record.internId)}
                    style={{ width: 120 }}
                >
                    <Option value="Pending">Pending</Option>
                    <Option value="Failed">Failed</Option>
                    <Option value="Passed">Passed</Option>
                </Select>
            ),
        },
        {
            title: 'Button',
            dataIndex: 'button',
            key: 'button',
            render: (text, record) => (
                <Button type="primary" onClick={() => handleViewClick(record)}
                    style={{
                        backgroundColor: "white",
                        color: "#4889E9",
                        border: "2px solid #4889E9",
                        borderRadius: "20px"


                    }}>View</Button>),
            width: 100,
        },
    ]

    return (
        <div id="APRCV">



            <MainLayout>

                <main className="content">
                    <header className="content-header">
                        <h1 className="content-title"><b>Confirm CV</b></h1>
                        <div className="user-info">
                            <img loading="lazy"
                                src={User_Img}
                                alt="User Profile" className="user-profile-small" />
                            <div className="user-details">
                                <span className="user-name">Natalie Brogan</span>
                                <span className="user-role">Admin</span>
                            </div>
                            <div className="account-setting">
                                <SettingOutlined style={{ color: "#DB0D4B" }} />
                            </div>
                        </div>
                    </header>

                    <section className="content-section">
                        <h2 className="section-title">Search for Information</h2>
                        <div className="button-group">
                            {/* <button className="button button-schedule">
                                <Sheldule />
                            </button> */}
                            <SendMailButton />
                            <button className="button button-export">
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0fa11b0683eb59e5c46f322a171b42edba502fadc3f8daffe251ee8087dea429?apiKey=41832340d6f545c2a0509736ad9e1693&"
                                    alt="Export Icon" className="button-icon" />
                                <span>Export Excel</span>
                            </button>
                            <button className="button button-edit">
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ecb69ed4f9191e15f4927b1b9b7dd5b7e05e78dcd440b3b135257bd3dc95bd03?apiKey=41832340d6f545c2a0509736ad9e1693&"
                                    alt="Edit Icon" className="button-icon" />
                                <span>Edit</span>
                            </button>
                            <button className="button button-delete">
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/68a48237f0bae3c61dd65cfd116f092ab3bef8fb895c06116eaa24230e3d5284?apiKey=41832340d6f545c2a0509736ad9e1693&"
                                    alt="Delete Icon" className="button-icon" />
                                <span>Delete</span>
                            </button>
                            <button className="button button-add-intern">
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/464e70c797da987e533d3b7bac06274e496eb711c8027e3b77bb65828b659322?apiKey=41832340d6f545c2a0509736ad9e1693&"
                                    alt="Add Intern Icon" className="button-icon" />
                                <span>Add New Intern</span>
                            </button>
                        </div>
                    </section>

                    <section className="filter-section">
                        <div className="filter">
                            <div className="fields">
                                <Dropdown overlay={createMenu('internID', internIDChoice)} trigger={['click']}>
                                    <Button style={{ padding: "7px 11px", fontSize: "15px", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
                                        <div style={{ color: selectedFilters.internID ? "#000000" : "#C7BFBF" }}>{selectedFilters.internID || "Enter intern's ID"}</div>
                                        <DownOutlined />
                                    </Button>
                                </Dropdown>

                                <Dropdown overlay={createMenu('fullName', fullNameChoice)} trigger={['click']}>
                                    <Button style={{ padding: "7px 11px", fontSize: "15px", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
                                        {/* <div style={{color: "#C7BFBF"}}>Enter intern's School</div> */}
                                        <div style={{ color: selectedFilters.fullName ? "#000000" : "#C7BFBF" }}>{selectedFilters.fullName || "Enter intern's Full name"}</div>
                                        <DownOutlined />
                                    </Button>
                                </Dropdown>

                                {/* <DatePicker format={dateFormat} placeholder="Enter intern's D.O.B" style={{ padding: "7px 11px", fontSize: "15px" }} onChange={(dates) => handleDateChange('dateOfBirth', dates)} /> */}
                                <DatePicker
                                    onChange={(date) => handleDateChange('dateOfBirth', date)}
                                    style={{ marginLeft: 10 }}
                                    placeholder={["Enter intern's D.O.B"]}
                                />
                                <Dropdown overlay={createMenu('phoneNumber', phoneNumberChoice)} trigger={['click']}>
                                    <Button style={{ padding: "7px 11px", fontSize: "15px", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
                                        {/* <div style={{color: "#C7BFBF"}}>Enter intern's School</div> */}
                                        <div style={{ color: selectedFilters.phoneNumber ? "#000000" : "#C7BFBF" }}>{selectedFilters.phoneNumber || "Enter intern's Phone number"}</div>
                                        <DownOutlined />
                                    </Button>
                                </Dropdown>

                                <Dropdown overlay={createMenu('address', addressName)} trigger={['click']}>
                                    <Button style={{ padding: "7px 11px", fontSize: "15px", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
                                        <div style={{ color: selectedFilters.address ? "#000000" : "#C7BFBF" }}>{selectedFilters.address || "Enter intern's Address"}</div>
                                        <DownOutlined />
                                    </Button>
                                </Dropdown>

                                <Input
                                    size="large"
                                    placeholder="Enter intern's Email"
                                    value={selectedFilters.email}
                                    onChange={handleInputChange}
                                />

                                <Dropdown overlay={createMenu('position', positionNames)} trigger={['click']}>
                                    <Button style={{ padding: "7px 11px", fontSize: "15px", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
                                        <div style={{ color: selectedFilters.position ? "#000000" : "#C7BFBF" }}>{selectedFilters.position || "Enter intern's Position"}</div>
                                        <DownOutlined />
                                    </Button>

                                </Dropdown>

                                <Input
                                    size="large"
                                    placeholder="Enter intern's School"
                                    value={selectedFilters.school}
                                    onChange={handleInputChange}
                                />

                                <Dropdown overlay={createMenu('dateInterView', dateInterviewChoice)} trigger={['click']}>
                                    <Button style={{ padding: "7px 11px", fontSize: "15px", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
                                        <div style={{ color: selectedFilters.dateInterView ? "#000000" : "#C7BFBF" }}>{selectedFilters.dateInterView || "Enter Date Interview"}</div>
                                        <DownOutlined />
                                    </Button>

                                </Dropdown>

                                <Dropdown overlay={createMenu('timeInterView', timeInterviewChoice)} trigger={['click']}>
                                    <Button style={{ padding: "7px 11px", fontSize: "15px", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
                                        <div style={{ color: selectedFilters.timeInterView ? "#000000" : "#C7BFBF" }}>{selectedFilters.timeInterView || "Enter Time Interview"}</div>
                                        <DownOutlined />
                                    </Button>

                                </Dropdown>
                            </div>
                            <div className="buttons">
                                <div className="cln-btn btn" onClick={handleClearFilters}><DeleteOutlined style={{ marginRight: "10px" }}/>Clean Filter</div>
                                <br />
                                <div className="srch-btn btn" onClick={handleSearch}><SearchOutlined style={{ marginRight: "10px" }}/>Search</div>
                            </div>
                        </div>
                        <div className="list">
                            <div className="tbl-wrapper">
                                <Table
                                    columns={columns}
                                    dataSource={filteredInterns}
                                    rowKey="internId"
                                    pagination={{ pageSize: 4 }}
                                    scroll={{ x: 'max-content' }}
                                />

                            </div>
                        </div>

                        {/* <div className="pagination">
                            <button
                                className="pagination-button"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 0}
                                style={{ color: currentPage === 0 ? '#92929D' : 'black' }}
                            >
                                <ArrowLeftOutlined />
                            </button>

                            <span className="pagination-info">
                                {currentPage + 1} of {totalPages}
                            </span>

                            <button
                                className="pagination-button"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage + 1 === totalPages}
                                style={{ color: currentPage + 1 === totalPages ? '#92929D' : 'black' }}
                            >
                                <ArrowRightOutlined />
                            </button>
                        </div> */}

                    </section>
                    {selectedIntern && (
                        <Modal
                            title="View details of Intern"
                            visible={commentPopupVisible}
                            onCancel={handleCancel}
                            width={900}
                            footer={null}
                        >
                            <Row gutter={[16, 16]}>
                                <Col span={8}>
                                    <p>
                                        <strong>Intern ID:</strong>
                                    </p>
                                    <p
                                        style={{
                                            border: "2px solid #12345129",
                                            padding: "10px",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        {selectedIntern.internID}
                                    </p>
                                </Col>
                                <Col span={8}>
                                    <p>
                                        <strong>Date Interview:</strong>
                                    </p>
                                    <p
                                        style={{
                                            border: "2px solid #12345129",
                                            padding: "10px",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        {" "}
                                        {selectedIntern.dateInterView}
                                    </p>
                                </Col>
                                <Col span={8}>
                                    <p>
                                        <strong>Time Interview:</strong>
                                    </p>
                                    <p
                                        style={{
                                            border: "2px solid #12345129",
                                            padding: "10px",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        {" "}
                                        {selectedIntern.timeinterview}
                                    </p>
                                </Col>
                                <Col span={8}>
                                    <p>
                                        <strong>Full Name:</strong>
                                    </p>
                                    <p
                                        style={{
                                            border: "2px solid #12345129",
                                            padding: "10px",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        {" "}
                                        {selectedIntern.fullName}
                                    </p>
                                </Col>
                                <Col span={8}>
                                    <p>
                                        <strong>Date Of Birth:</strong>
                                    </p>
                                    <p
                                        style={{
                                            border: "2px solid #12345129",
                                            padding: "10px",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        {" "}
                                        {selectedIntern.dateOfBirth}
                                    </p>
                                </Col>
                                <Col span={8}>
                                    <p>
                                        <strong>Phone Number:</strong>
                                    </p>
                                    <p
                                        style={{
                                            border: "2px solid #12345129",
                                            padding: "10px",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        {" "}
                                        {selectedIntern.phoneNumber}
                                    </p>
                                </Col>
                                <Col span={8}>
                                    <p>
                                        <strong>Position:</strong>
                                    </p>
                                    <p
                                        style={{
                                            border: "2px solid #12345129",
                                            padding: "10px",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        {" "}
                                        {selectedIntern.position}
                                    </p>
                                </Col>
                                <Col span={8}>
                                    <p>
                                        <strong>School:</strong>
                                    </p>
                                    <p
                                        style={{
                                            border: "2px solid #12345129",
                                            padding: "10px",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        {selectedIntern.school}
                                    </p>
                                </Col>
                                <Col span={8}>
                                    <p>
                                        <strong>Address:</strong>
                                    </p>
                                    <p
                                        style={{
                                            border: "2px solid #12345129",
                                            padding: "10px",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        {" "}
                                        {selectedIntern.address}
                                    </p>
                                </Col>
                                <Col span={8}>
                                    <p>
                                        <strong>Email:</strong>
                                    </p>
                                    <p
                                        style={{
                                            border: "2px solid #12345129",
                                            padding: "10px",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        {" "}
                                        <a href={`mailto:${selectedIntern.email}`}>
                                            {selectedIntern.email}
                                        </a>
                                    </p>
                                </Col>
                                <Col span={8}>
                                    <p>
                                        <strong>CV Link:</strong>
                                    </p>
                                    <p
                                        style={{
                                            border: "2px solid #12345129",
                                            padding: "10px",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        {" "}
                                        <a
                                            href={selectedIntern.cvLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Link
                                        </a>
                                    </p>
                                </Col>
                                <Col span={8}>
                                    <p>
                                        <strong>Interviewer:</strong>
                                    </p>
                                    <p
                                        style={{
                                            border: "2px solid #12345129",
                                            padding: "10px",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        {" "}
                                        {selectedIntern.interviewer}
                                    </p>
                                </Col>
                            </Row>

                        </Modal>
                    )}

                </main >
            </MainLayout>


        </div >
    );
};

export default ConfirmCV;