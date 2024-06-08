import * as React from "react";
import { useState, useEffect } from "react";
import "./ApproveCV.css";
import MenuNavigate from "../../components/Menu/MenuNavigate.jsx";
import User_Img from "../../assets/user_image.png";
import CommentPopup from "./CommentPopup.jsx";
import Sheldule from "./Schedule.jsx";
import DataApproveList from "../../data/ApproveCV.json";
import MainLayout from "../../MainLayout/MainLayout.jsx";
import {
  DownOutlined,
  EyeOutlined,
  PlusOutlined,
  SettingOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import {
  DatePicker,
  Dropdown,
  Button,
  Select,
  Table,
  Menu,
  Row,
  Col,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import i18n from "i18next";
import axios from "axios";

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
    return filteredInterns.slice(startIndex, endIndex).map((intern, index) => (
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
              intern.status === "Pending"
                ? {
                    backgroundColor: "#FFB596",
                    color: "#E5731C",
                  }
                : intern.status === "Failed"
                ? {
                    backgroundColor: "#F5A3B7",
                    color: "#7D0022",
                  }
                : intern.status === "Passed"
                ? { backgroundColor: "#B7EACB", color: "#3A7D34" }
                : {}
            }
          >
            {intern.status}
            <DownOutlined />
          </div>
        </td>
        {/* Action buttons for viewing intern details and feedbacks */}
        <td style={{ display: "flex" }}>
          <div className="view" onClick={() => handleViewClick(intern)}>
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
        moment(intern.dateOfBirth).isSame(selectedFilters.dateOfBirth, "day")
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

  // title of apprve list table
  const columns = [
    {
      title: "Intern ID",
      dataIndex: "internID",
      width: 80,
      filteredValue: [selectedFilters.internID],
      // onFilter: (value, record) => {
      //     return record.internID.includes(value)
      // }
    },
    {
      title: "Date Submitted Form",
      dataIndex: "dateSubmittedForm",
      width: 140,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      width: 150,
      filteredValue: [selectedFilters.fullName],
      // onFilter: (value, record) => {
      //     return record.fullName.includes(value)
      // }
    },
    {
      title: "Date Of Birth",
      dataIndex: "dateOfBirth",
      width: 110,
      // filteredValue: [selectedFilters.dateOfBirth],
      // onFilter: (value, record) => {
      //     return record.dateOfBirth.includes(value)
      // }
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      width: 120,
      // filteredValue: [selectedFilters.phoneNumber],
      // onFilter: (value, record) => {
      //     return record.phoneNumber.includes(value)
      // }
    },
    {
      title: "Position",
      dataIndex: "position",
      width: 120,
      // filteredValue: [selectedFilters.position],
      // onFilter: (value, record) => {
      //     return record.position.includes(value)
      // }
    },
    {
      title: "School",
      dataIndex: "school",
      width: 160,
      // filteredValue: [selectedFilters.school],
      // onFilter: (value, record) => {
      //     return record.school.includes(value)
      // }
    },
    {
      title: "Address",
      dataIndex: "address",
      width: 120,
      // filteredValue: [selectedFilters.address],
      // onFilter: (value, record) => {
      //     return record.address.includes(value)
      // }
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 180,
      // filteredValue: [selectedFilters.email],
      // onFilter: (value, record) => {
      //     return record.email.includes(value)
      // }
    },
    {
      title: "CV",
      dataIndex: "cvLink",
      width: 60,
      render: (text) => (
        <a
          href={text}
          style={{ color: "#000000", textDecoration: "underline" }}
        >
          Link
        </a>
      ),
    },
    {
      title: "Comments",
      dataIndex: "commentsCV",
      width: 130,
      render: (text) => (
        <Button
          onClick={() => handleCommentClick(intern)}
          style={{ width: "100%" }}
        >
          {text === "1" ? `${text} comment` : `${text} comments`}
          <EyeOutlined />
        </Button>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 100,
      render: (text) => {
        return (
          <Select
            defaultValue={text}
            style={{
              width: 100,
            }}
            options={optionSelect}
          />
        );
      },
    },
    {
      title: "Button",
      width: 120,
      render: () => (
        <div className="approve-btns">
          <div className="view" onClick={() => handleViewClick(intern)}>
            View
          </div>
          <div className="feedbacks" onClick={() => handleViewFeedback(intern)}>
            Feedbacks
          </div>
        </div>
      ),
    },
  ];

  // option of status column
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

  return (
    <div id="APRCV">
      <MainLayout>
        <main className="content">
          <header className="content-header">
            <h1 className="content-title">Approve CV</h1>
            <div className="user-info">
              <img
                loading="lazy"
                src={User_Img}
                alt="User Profile"
                className="user-profile-small"
              />
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
                <Sheldule />
              </button>
              <button className="button button-export">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0fa11b0683eb59e5c46f322a171b42edba502fadc3f8daffe251ee8087dea429?apiKey=41832340d6f545c2a0509736ad9e1693&"
                  alt="Export Icon"
                  className="button-icon"
                />
                <span>Export Excel</span>
              </button>
              <button className="button button-edit">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ecb69ed4f9191e15f4927b1b9b7dd5b7e05e78dcd440b3b135257bd3dc95bd03?apiKey=41832340d6f545c2a0509736ad9e1693&"
                  alt="Edit Icon"
                  className="button-icon"
                />
                <span>Edit</span>
              </button>
              <button className="button button-delete">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/68a48237f0bae3c61dd65cfd116f092ab3bef8fb895c06116eaa24230e3d5284?apiKey=41832340d6f545c2a0509736ad9e1693&"
                  alt="Delete Icon"
                  className="button-icon"
                />
                <span>Delete</span>
              </button>
              <button className="button button-add-intern">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/464e70c797da987e533d3b7bac06274e496eb711c8027e3b77bb65828b659322?apiKey=41832340d6f545c2a0509736ad9e1693&"
                  alt="Add Intern Icon"
                  className="button-icon"
                />
                <span>Add New Intern</span>
              </button>
            </div>
          </section>

          <section className="filter-section">
            <div className="filter">
              <div className="fields">
                <Input
                  size="large"
                  placeholder="Enter intern's ID"
                  value={selectedFilters.internID}
                  onChange={(e) =>
                    handleInputChange("internID", e.target.value)
                  }
                />

                <Input
                  size="large"
                  placeholder="Enter intern's Full name"
                  value={selectedFilters.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                />

                <DatePicker
                  format={dateFormat}
                  placeholder="Enter intern's D.O.B"
                  style={{ padding: "7px 11px", fontSize: "15px" }}
                  onChange={(date) => handleDateChange("dateOfBirth", date)}
                />

                <Input
                  size="large"
                  placeholder="Enter intern's Phone number"
                  value={selectedFilters.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                />

                <Dropdown
                  overlay={createMenu("school", schoolNames)}
                  trigger={["click"]}
                >
                  <Button
                    style={{
                      padding: "7px 11px",
                      fontSize: "15px",
                      textAlign: "left",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    {/* <div style={{color: "#C7BFBF"}}>Enter intern's School</div> */}
                    <div
                      style={{
                        color: selectedFilters.school ? "#000000" : "#C7BFBF",
                      }}
                    >
                      {selectedFilters.school || "Enter intern's School"}
                    </div>
                    <DownOutlined />
                  </Button>
                </Dropdown>

                <Input
                  size="large"
                  placeholder="Enter intern's Email"
                  value={selectedFilters.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />

                <Dropdown
                  overlay={createMenu("position", positionNames)}
                  trigger={["click"]}
                >
                  <Button
                    style={{
                      padding: "7px 11px",
                      fontSize: "15px",
                      textAlign: "left",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        color: selectedFilters.position ? "#000000" : "#C7BFBF",
                      }}
                    >
                      {selectedFilters.position || "Enter intern's Position"}
                    </div>
                    <DownOutlined />
                  </Button>
                </Dropdown>

                <Input
                  size="large"
                  placeholder="Enter intern's Address"
                  value={selectedFilters.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />

                <DatePicker
                  format={dateFormat}
                  placeholder="Enter intern's Date Submitted Form"
                  style={{ padding: "7px 11px", fontSize: "15px" }}
                  onChange={(date) => handleDateChange("dateSub", date)}
                />
              </div>
              <div className="buttons">
                <div className="cln-btn btn" onClick={handleClearFilters}>
                  <DeleteOutlined style={{ marginRight: "10px" }} />
                  Clean Filter
                </div>
                <br />
                <div className="srch-btn btn" onClick={handleSearch}>
                  <SearchOutlined style={{ marginRight: "10px" }} />
                  Search
                </div>
              </div>
            </div>
            <div className="list">
              <Table
                rowSelection={{
                  type: "checkbox",
                  ...rowSelection,
                }}
                columns={columns}
                dataSource={filteredInterns}
                scroll={{ x: "2200px", y: "360px" }}
                style={{ maxWidth: "100%", minHeight: "100%" }}
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
      </MainLayout>
    </div>
  );
}

export default ApproveCV;
