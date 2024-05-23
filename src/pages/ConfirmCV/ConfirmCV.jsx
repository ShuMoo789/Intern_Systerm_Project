import React, { useState, useEffect } from 'react';
import "./ConfirmCV.css";
import { Table, Checkbox, Button, Select } from 'antd'; // Import Select from antd
import MenuNavigate from '../../components/Menu/MenuNavigate';
import User_Img from "../../assets/user_image.png";
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
import {
    DatePicker,
    Dropdown,
    Menu
} from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
const {RangePicker} = DatePicker;
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
    {
        key: '1',
        internID: "#12345128",
        dateInterView: "2 Jan 2023",
        timeinterview: "10:50:00 AM",
        fullName: "Esther Eden",
        dateOfBirth: "2001/07/16",
        phoneNumber: "0376782528",
        position: "Back-End",
        school: "FPT University",
        address: "District 9",
        email: "abc@gmail.com",
        cvLink: "Link",
        commentsCV: "1 comment",
        confirmEmail: "Yes",
        interviewer: "Ajmal Abdul",
        status: "Passed",
    },
    {
        key: '2',
        internID: "#12345129",
        dateInterView: "3 Jan 2023",
        timeinterview: "11:00:00 AM",
        fullName: "John Doe",
        dateOfBirth: "15/08/2000",
        phoneNumber: "0123456789",
        position: "Front-End",
        school: "XYZ University",
        address: "District 1",
        email: "john.doe@gmail.com",
        cvLink: "Link",
        commentsCV: "2 comments",
        confirmEmail: "No",
        interviewer: "Jane Smith",
        status: "Pending",
    },
    {
        key: '3',
        internID: "#12345129",
        dateInterView: "3 Jan 2023",
        timeinterview: "11:00:00 AM",
        fullName: "John Doe",
        dateOfBirth: "15/08/2000",
        phoneNumber: "0123456789",
        position: "Front-End",
        school: "XYZ University",
        address: "District 1",
        email: "john.doe@gmail.com",
        cvLink: "Link",
        commentsCV: "2 comments",
        confirmEmail: "No",
        interviewer: "Jane Smith",
        status: "Failed",
    },
    {
        key: '4',
        internID: "#12345129",
        dateInterView: "3 Jan 2023",
        timeinterview: "11:00:00 AM",
        fullName: "John Doe",
        dateOfBirth: "15/08/2000",
        phoneNumber: "0123456789",
        position: "Front-End",
        school: "XYZ University",
        address: "District 1",
        email: "john.doe@gmail.com",
        cvLink: "Link",
        commentsCV: "2 comments",
        confirmEmail: "No",
        interviewer: "Jane Smith",
        status: "Pending",
    },

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
    const [intern, setIntern] = useState(interns);

    // State to manage the filtered list of interns
    const [filteredInterns, setFilteredInterns] = useState(interns);

    // State to manage the initial page number (could be used for resetting or other purposes)
    const [initialPage, setInitialPage] = useState(0);

    // Calculate the total number of pages based on the number of interns and interns per page
    const totalPages = Math.ceil(interns.length / internsPerPage);

    // State to manage various filters for the interns
    // const [filters, setFilters] = useState({
    //     internID: '',            // Filter by intern ID
    //     fullName: '',            // Filter by full name
    //     dateOfBirth: null,       // Filter by date of birth
    //     phoneNumber: '',         // Filter by phone number
    //     school: '',              // Filter by school
    //     email: '',               // Filter by email
    //     position: '',            // Filter by position
    //     address: '',             // Filter by address
    //     dateSubmittedForm: null, // Filter by the date the form was submitted
    // });

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
                        {intern.commentsCV === "1" ? `${intern.commentsCV} Comment` : `${intern.commentsCV} Comments`}
                        <EyeOutlined style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={() => { handleCommentClick(intern) }} />
                    </div>
                    <div className="add-cmt-btn">
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
                    <div className="view" onClick={() => handleViewClick(intern)}>View</div>

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
        school: null,   // Currently selected school filter
        position: null, // Currently selected position filter
        internID: null,
        phoneNumber: null,
        dateInterView: null,
        fullName: null,
        address: null,
        timeInterView: null,
        dateOfBirth: null,
        searchText: '',
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
    const handleViewClick = (intern) => {
        setSelectedIntern(intern); // Set the selected intern
        setInitialPage(0);         // Set the initial page to 0
        setCommentPopupVisible(true); // Show the comment popup
    };

    /**
     * Handles the action to close the comment popup.
     */
    const handleCloseCommentPopup = () => {
        setCommentPopupVisible(false); // Hide the comment popup
        setSelectedIntern(null);       // Clear the selected intern
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
    const handleInputChange = (e) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            searchText: e.target.value,
        }));
    }

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
        let results = interns;
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
        if (selectedFilters.searchText) {
            const searchText = selectedFilters.searchText.toLowerCase();
            results = results.filter(intern =>
                intern.email.toLowerCase().includes(searchText) ||
                intern.school.toLowerCase().includes(searchText)
            );
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
        setFilteredInterns(interns); // Reset the filtered interns to the full list
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

    return (
        <div id="APRCV">

            <MenuNavigate />


            <main className="content">
                <header className="content-header">
                    <h1 className="content-title">Approve CV</h1>
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
                                    {/* <div style={{color: "#C7BFBF"}}>Enter intern's School</div> */}
                                    <div style={{ color: "#C7BFBF" }}>{selectedFilters.internID ? selectedFilters.internID : "Enter intern's ID"}</div>
                                    <DownOutlined />
                                </Button>
                            </Dropdown>

                            <Dropdown overlay={createMenu('fullName', fullNameChoice)} trigger={['click']}>
                                <Button style={{ padding: "7px 11px", fontSize: "15px", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
                                    {/* <div style={{color: "#C7BFBF"}}>Enter intern's School</div> */}
                                    <div style={{ color: "#C7BFBF" }}>{selectedFilters.fullName ? selectedFilters.fullName : "Enter intern's Full name"}</div>
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
                                    <div style={{ color: "#C7BFBF" }}>{selectedFilters.phoneNumber ? selectedFilters.phoneNumber : "Enter intern's Phone number"}</div>
                                    <DownOutlined />
                                </Button>
                            </Dropdown>

                            <Dropdown overlay={createMenu('address', addressName)} trigger={['click']}>
                                <Button style={{ padding: "7px 11px", fontSize: "15px", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>

                                    <div style={{ color: "#C7BFBF" }}>{selectedFilters.address ? selectedFilters.address : "Enter intern's Address"}</div>
                                    <DownOutlined />
                                </Button>
                            </Dropdown>

                            <Input
                                size="large"
                                placeholder="Enter intern's Email"
                                value={selectedFilters.searchText}
                                onChange={handleInputChange}
                            />

                            <Dropdown overlay={createMenu('position', positionNames)} trigger={['click']}>
                                <Button style={{ padding: "7px 11px", fontSize: "15px", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
                                    <div style={{ color: "#C7BFBF" }}>{selectedFilters.position ? selectedFilters.position : "Enter intern's Position"}</div>
                                    <DownOutlined />
                                </Button>

                            </Dropdown>

                            <Input
                                size="large"
                                placeholder="Enter intern's School"
                                value={selectedFilters.searchText}
                                onChange={handleInputChange}
                            />

                            <Dropdown overlay={createMenu('dateInterView', dateInterviewChoice)} trigger={['click']}>
                                <Button style={{ padding: "7px 11px", fontSize: "15px", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
                                    <div style={{ color: "#C7BFBF" }}>{selectedFilters.dateInterView ? selectedFilters.dateInterView : "Enter Date Interview"}</div>
                                    <DownOutlined />
                                </Button>

                            </Dropdown>

                            <Dropdown overlay={createMenu('timeInterView', timeInterviewChoice)} trigger={['click']}>
                                <Button style={{ padding: "7px 11px", fontSize: "15px", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
                                    <div style={{ color: "#C7BFBF" }}>{selectedFilters.timeInterView ? selectedFilters.timeInterView : "Enter Time Interview"}</div>
                                    <DownOutlined />
                                </Button>

                            </Dropdown>
                        </div>
                        <div className="buttons">
                            <div className="cln-btn btn"><DeleteOutlined style={{ marginRight: "10px" }} onClick={handleClearFilters} />Clean Filter</div>
                            <br />
                            <div className="srch-btn btn"><SearchOutlined style={{ marginRight: "10px" }} onClick={handleSearch} />Search</div>
                        </div>
                    </div>
                    <div className="list">
                        <div className="tbl-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th><input type={"checkbox"} /></th>
                                        <th>Intern ID</th>
                                        <th>Date Interview</th>
                                        <th>Time Interview</th>
                                        <th>Full Name</th>
                                        <th>Date Of Birth</th>
                                        <th>Phone Number</th>
                                        <th>Position</th>
                                        <th>School</th>
                                        <th>Address</th>
                                        <th>Email</th>
                                        <th>CV</th>
                                        <th>Comments CV</th>
                                        <th>Confirm Email</th>
                                        <th>Interviewer</th>
                                        <th>Status</th>
                                        <th>Buttons</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderInterns()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="pagination">
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
                    </div>
                </section>
            </main>

        </div>
    );
};

export default ConfirmCV;