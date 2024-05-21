import * as React from "react";
import { useState, useEffect } from "react";
import "./ApproveCV.css";
import MenuNavigate from "../../components/Menu/MenuNavigate.jsx";
import User_Img from "../../assets/user_image.png";
import CommentPopup from './CommentPopup.jsx';
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
    Button,
    Menu
} from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import i18n from "i18next";
import axios from "axios";

dayjs.extend(customParseFormat);

function IconTextBlock({ iconSrc, altText, text }) {
    return (
        <div className="icon-text-block">
            <img src={iconSrc} alt={altText} className="icon" />
            <span className="icon-text">{text}</span>
        </div>
    );
}

function MyComponent() {

    const dateFormat = 'YYYY/MM/DD';
    
    

    const interns = [
        {
            internID: "#12345128",
            dateSubmittedForm: "2 Jan 2023",
            fullName: "Esther Eden",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "1",
            status: "Passed",
        },
        {
            internID: "#12345128",
            dateSubmittedForm: "14 Dec 2022",
            fullName: "Ajmal Abdul",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "2",
            status: "Failed",
        },
        {
            internID: "#12345128",
            dateSubmittedForm: "2 Jan 2023",
            fullName: "Esther Eden",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "3",
            status: "Pending",
        },
        {
            internID: "#12345128",
            dateSubmittedForm: "14 Dec 2022",
            fullName: "Ajmal Abdul",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "2",
            status: "Passed",
        },
        {
            internID: "#12345128",
            dateSubmittedForm: "2 Jan 2023",
            fullName: "Esther Eden",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "2",
            status: "Failed",
        },
        {
            internID: "#12345128",
            dateSubmittedForm: "2 Jan 2023",
            fullName: "Esther Eden",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "1",
            status: "Passed",
        },
        {
            internID: "#12345128",
            dateSubmittedForm: "14 Dec 2022",
            fullName: "Ajmal Abdul",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "2",
            status: "Failed",
        },
        {
            internID: "#12345128",
            dateSubmittedForm: "2 Jan 2023",
            fullName: "Esther Eden",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "3",
            status: "Pending",
        },
        {
            internID: "#12345128",
            dateSubmittedForm: "14 Dec 2022",
            fullName: "Ajmal Abdul",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "2",
            status: "Passed",
        },
        {
            internID: "#12345128",
            dateSubmittedForm: "2 Jan 2023",
            fullName: "Esther Eden",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "2",
            status: "Failed",
        },
        {
            internID: "#12345128",
            dateSubmittedForm: "2 Jan 2023",
            fullName: "Esther Eden",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "1",
            status: "Passed",
        },
        {
            internID: "#12345128",
            dateSubmittedForm: "14 Dec 2022",
            fullName: "Ajmal Abdul",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "2",
            status: "Failed",
        },
        {
            internID: "#12345128",
            dateSubmittedForm: "2 Jan 2023",
            fullName: "Esther Eden",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "3",
            status: "Pending",
        },
        {
            internID: "#12345128",
            dateSubmittedForm: "14 Dec 2022",
            fullName: "Ajmal Abdul",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "2",
            status: "Passed",
        },
        {
            internID: "#12345128",
            dateSubmittedForm: "2 Jan 2023",
            fullName: "Esther Eden",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "2",
            status: "Failed",
        },
        {
            internID: "#12345128",
            dateSubmittedForm: "2 Jan 2023",
            fullName: "Esther Eden",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "1",
            status: "Passed",
        },
        {
            internID: "#12345128",
            dateSubmittedForm: "14 Dec 2022",
            fullName: "Ajmal Abdul",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "2",
            status: "Failed",
        },
        {
            internID: "#12345128",
            dateSubmittedForm: "2 Jan 2023",
            fullName: "Esther Eden",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "3",
            status: "Pending",
        },
        {
            internID: "#12345128",
            dateSubmittedForm: "14 Dec 2022",
            fullName: "Ajmal Abdul",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "2",
            status: "Passed",
        }
    ];
    

    
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedIntern, setSelectedIntern] = useState([]);
    const [intern, setIntern] = useState(interns);
    const [filteredInterns, setFilteredInterns] = useState(interns);
    const [commentPopupVisible, setCommentPopupVisible] = useState(false);
    const [initialPage, setInitialPage] = useState(0);

    const totalPages = Math.ceil(interns.length / internsPerPage);
    const [filters, setFilters] = useState({
        internID: '',
        fullName: '',
        dateOfBirth: null,
        phoneNumber: '',
        school: '',
        email: '',
        position: '',
        address: '',
        dateSubmittedForm: null,
    });
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    
     const renderInterns = () => {
        const startIndex = currentPage * internsPerPage;
        const endIndex = Math.min((currentPage + 1) * internsPerPage, interns.length);
        
        return filteredInterns.slice(startIndex, endIndex).map((intern, index) => (
            <tr key={index}>
                <td><input type={"checkbox"} /></td>
                <td>{intern.internID}</td>
                <td>{intern.dateSubmittedForm}</td>
                <td>{intern.fullName}</td>
                <td>{intern.dateOfBirth}</td>
                <td>{intern.phoneNumber}</td>
                <td>{intern.position}</td>
                <td>{intern.school}</td>
                <td>{intern.address}</td>
                <td>{intern.email}</td>
                <td><a href="#">{intern.cvLink}</a></td>
                <td style={{ display: "flex" }}>
                    <div className="Comments-CV">
                    {intern.commentsCV === "1" ? `${intern.commentsCV} Comment` : `${intern.commentsCV} Comments`}
                        <EyeOutlined style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={() => {handleCommentClick(intern)}} />
                    </div>
                    <div className="add-cmt-btn">
                        <PlusOutlined />
                    </div>
                </td>
                <td>
                    <div className="Status" style={(intern.status === "Pending") ? {
                        backgroundColor: "#FFB596",
                        color: "#E5731C"
                    } : (intern.status === "Failed") ? {
                        backgroundColor: "#F5A3B7",
                        color: "#7D0022"
                    } : (intern.status === "Passed") ? { backgroundColor: "#B7EACB", color: "#3A7D34" } : {}}>{intern.status}<DownOutlined /></div>
                </td>
                <td style={{display: 'flex'}}>
                    <div className="view" onClick={() => handleViewClick(intern)}>View</div>
                    <div className="feedbacks">Feedbacks</div>
                </td>
            </tr>
        ));
    };
    
    const schoolNames = [...new Set(filteredInterns.map(intern => intern.school))];
    const positionNames = [...new Set(filteredInterns.map(intern => intern.position))];
    
    // const [selectedSchool, setSelectedSchool] = useState(null);
    // const [selectedPosition, setSelectedPosition] = useState(null)
    const [selectedFilters, setSelectedFilters] = useState({
        school: null,
        position: null,
    });
    const handleMenuClick = (type, key) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            [type]: key,
        }));
    };
    
    const createMenu = (type, items) => (
        <Menu onClick={({ key }) => handleMenuClick(type, key)}>
            {items.map((item) => (
                <Menu.Item key={item}>
                    <div>{item}</div>
                </Menu.Item>
            ))}
        </Menu>
    );

    
    // const menu1 = (
    //     <Menu onClick={handleMenuClick}>
    //         {positionNames.map((position, index) => (
    //             <Menu.Item key={position}>
    //                 <div>{position}</div>
    //             </Menu.Item>
    //         ))}
    //     </Menu>
    // )
        
        
    
    
    const handleCommentClick = (intern) => {
        setSelectedIntern(intern);
        setInitialPage(1)
        setCommentPopupVisible(true);
    };

    const handleViewClick = (intern) => {
        setSelectedIntern(intern);
        setInitialPage(0)
        setCommentPopupVisible(true);
    };

    const handleCloseCommentPopup = () => {
        setCommentPopupVisible(false);
        setSelectedIntern(null);
    };

    const handleSaveComment = (updatedIntern) => {
        setInterns((prevInterns) =>
            prevInterns.map((intern) =>
                intern.internID === updatedIntern.internID ? updatedIntern : intern
            )
        );
        handleCloseCommentPopup();
    };
    const handleInputChange = (name, value) => {
        setFilters({ ...filters, [name]: value });
    };
    const handleSearch = () => {
        const filtered = interns.filter((intern) => {
            return Object.keys(filters).every((key) => {
                if (filters[key]) {
                    if (key === 'dateOfBirth' || key === 'dateSubmittedForm') {
                        return dayjs(intern[key]).isSame(filters[key], 'day');
                    }
                    return intern[key].toString().toLowerCase().includes(filters[key].toString().toLowerCase());
                }
                return true;
            });
        });
        setFilteredInterns(filtered);
        setCurrentPage(0);
    };
    const handleClearFilters = () => {
        setFilters({
            internID: '',
            fullName: '',
            dateOfBirth: null,
            phoneNumber: '',
            email: '',
            address: '',
            dateSubmittedForm: null,
        });
        setFilteredInterns(interns);
        setCurrentPage(0);
        setSelectedFilters({
            school: null,
            position: null,
        });
    };
    
    
      const handleViewClose = () => {
        setViewPopupVisible(false);
    };
    

    return (
        <div id="APRCV">
            <nav className="sidebar">
                <MenuNavigate />
            </nav>

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
                        <button className="button button-schedule">
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/df9311da8cede04c8358b213f39485de98001c308664cf2bf10daff525cb7286?apiKey=41832340d6f545c2a0509736ad9e1693&"
                                alt="Schedule Icon" className="button-icon" />
                            <span>Schedule Interview</span>
                        </button>
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
                            <Input size="large" placeholder="Enter intern's ID" value={filters.internID} onChange={(e) => handleInputChange('internID', e.target.value)}/>

                            <Input size="large" placeholder="Enter intern's Full name" value={filters.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)}/>

                            <DatePicker format={dateFormat} placeholder="Enter intern's D.O.B" style={{padding: "7px 11px", fontSize: "15px"}} value={filters.dateOfBirth}  onChange={(date) => handleInputChange('dateOfBirth', date)}/>

                            <Input size="large" placeholder="Enter intern's Phone number" value={filters.phoneNumber} onChange={(e) => handleInputChange('phoneNumber', e.target.value)}/>

                            <Dropdown overlay={createMenu('school', schoolNames)} trigger={['click']}>
                                <Button style={{padding: "7px 11px",fontSize: "15px", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%"}} value={filters.school} onChange={(e) => handleInputChange('school', e.target.value)}>
                                    {/* <div style={{color: "#C7BFBF"}}>Enter intern's School</div> */}
                                    <div style={{color: "#C7BFBF"}}>{selectedFilters.school ? selectedFilters.school  : "Enter intern's School"}</div>
                                    <DownOutlined />
                                </Button>
                            </Dropdown>

                            <Input size="large" placeholder="Enter intern's Email" value={filters.email} onChange={(e) => handleInputChange('email', e.target.value)}/>

                            <Dropdown >
                                <Button style={{padding: "7px 11px",fontSize: "15px", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%"}} value={filters.position} onChange={(e) => handleInputChange('position', e.target.value)}>
                                      <div style={{color: "#C7BFBF"}}>Enter intern's Major</div>   
                                    <DownOutlined />
                                </Button>
                                
                            </Dropdown>

                            <Dropdown overlay={createMenu('position', positionNames)} trigger={['click']}>
                                <Button style={{padding: "7px 11px",fontSize: "15px", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%"}}>
                                    <div style={{color: "#C7BFBF"}}>{selectedFilters.position ? selectedFilters.position: "Enter intern's Position"}</div>
                                    <DownOutlined />
                                </Button>
                                
                            </Dropdown>

                            <Input size="large" placeholder="Enter intern's Address" value={filters.address} onChange={(e) => handleInputChange('address', e.target.value)}/>

                            <DatePicker format={dateFormat} placeholder="Enter intern's Date Submitted Form" style={{padding: "7px 11px", fontSize: "15px"}} value={filters.dateSubmittedForm}  onChange={(date) => handleInputChange('dateSubmittedForm', date)}/>
                        </div>
                        <div className="buttons">
                            <div className="cln-btn btn"><DeleteOutlined style={{marginRight: "10px"}} onClick={handleClearFilters} />Clean Filter</div>
                            <br />
                            <div className="srch-btn btn"><SearchOutlined style={{marginRight: "10px"}} onClick={handleSearch}/>Search</div>
                        </div>
                    </div>
                    <div className="list">
                        <div className="tbl-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th><input type={"checkbox"} /></th>
                                        <th>Intern ID</th>
                                        <th>Date Submitted Form</th>
                                        <th>Full Name</th>
                                        <th>Date Of Birth</th>
                                        <th>Phone Number</th>
                                        <th>Position</th>
                                        <th>School</th>
                                        <th>Address</th>
                                        <th>Email</th>
                                        <th>CV</th>
                                        <th>Comments CV</th>
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
            <CommentPopup
                isVisible={commentPopupVisible}
                onClose={handleCloseCommentPopup}
                intern={selectedIntern}
                initialPage={initialPage}
                onSave={handleSaveComment}
            />
        </div>
    );
}

export default MyComponent;