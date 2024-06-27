import React, { useState, useEffect } from "react";
import "./ConfirmCV.css";
import { Table, Button, Select, Modal, Row, Col } from "antd"; // Import Select from antd
import SendMailButton from "../../components/SendMailButton/SendMailButton";
import { useTranslation } from "react-i18next";
import useViewport from "../../hooks/useViewport.jsx";

import MailOutlined from "@ant-design/icons/MailOutlined";
import EditPopup from "../../components/EditPopup/EditPopup.jsx";
import DeletePopup from "../../components/DeletePopup/DeletePopup.jsx";
import ExportExcel from "../../components/ExportExcelPopup/ExportExcelPopup.jsx";
import AddNewIntern from "../../components/AddNewIntern/AddNewIntern.jsx";

import {
  DownOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  ExportOutlined,
  EditOutlined,
  FolderAddOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import DataConfirmCV from "../../data/ConfirmCV.json";
import { DatePicker, Dropdown, Menu } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Navigation from "../../components/Navigation/Navigation";
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

const interns = [];
const dateFormat = "YYYY/MM/DD";
const ConfirmCV = () => {
  const { t } = useTranslation();
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
        <td>
          <a href="#">{intern.cvLink}</a>
        </td>
        {/* Comments section with eye icon for viewing comments and a button to add comments */}
        <td style={{ display: "flex" }}>
          <div className="Comments-CV">
            {/* Hiển thị số lượng bình luận */}
            {renderComments(intern)}
            {/* Hiển thị biểu tượng mắt và gán sự kiện onClick */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ marginRight: "5px" }}>
                {/* Thêm một khoảng cách giữa văn bản và biểu tượng */}
              </span>
              <EyeOutlined
                style={{ cursor: "pointer" }}
                onClick={() => handleCommentClick(intern)}
              />
            </div>
          </div>
          <div className="add-cmt-btn">
            {/* Biểu tượng Plus */}
            <PlusOutlined />
          </div>
        </td>
        <td>
          <div
            className="Status"
            style={
              intern.confirmEmail === "No"
                ? {
                    backgroundColor: "#F5A3B7",
                    color: "#7D0022",
                  }
                : intern.confirmEmail === "Yes"
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
        <td>{intern.interviewer}</td>
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
            {t(intern.status)}
            <DownOutlined />
          </div>
        </td>
        {/* Action buttons for viewing intern details and feedbacks */}
        <td style={{ display: "flex" }}>
          <div
            className="view"
            style={{
              border: "1px solid #4889E9",
              padding: "05px",
              borderRadius: "20px",
              color: "#4889E9",
              cursor: "pointer",
            }}
            onClick={() => {
              handleViewClick(intern); // Set the modal visibility to true
            }}
          >
            View
          </div>
        </td>
      </tr>
    ));
  };

  // Extract unique school names from the filteredInterns array
  const schoolNames = [
    ...new Set(filteredInterns.map((intern) => intern.school)),
  ];

  // Extract unique position names from the filteredInterns array
  const positionNames = [
    ...new Set(filteredInterns.map((intern) => intern.position)),
  ];

  const internIDChoice = [
    ...new Set(filteredInterns.map((intern) => intern.internID)),
  ];

  const phoneNumberChoice = [
    ...new Set(filteredInterns.map((intern) => intern.phoneNumber)),
  ];

  const fullNameChoice = [
    ...new Set(filteredInterns.map((intern) => intern.fullName)),
  ];

  const addressName = [
    ...new Set(filteredInterns.map((intern) => intern.address)),
  ];

  const timeInterviewChoice = [
    ...new Set(filteredInterns.map((intern) => intern.timeinterview)),
  ];

  const dateInterviewChoice = [
    ...new Set(filteredInterns.map((intern) => intern.dateInterView)),
  ];
  // useState hook to manage the selected filters for school and position
  const [selectedFilters, setSelectedFilters] = useState({
    school: "", // Currently selected school filter
    position: "", // Currently selected position filter
    internID: "",
    phoneNumber: "",
    dateInterView: "",
    fullName: "",
    address: "",
    timeInterView: "",
    dateOfBirth: "",
    email: "",
    searchText: "",
  });

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
    setSelectedIntern(null); // Clear the selected intern
  };
  const renderComments = (record) => {
    console.log("Rendering Comments for intern:", record);
    console.log("CommentsCV value:", record.commentsCV);

    if (record.commentsCV !== undefined && record.commentsCV !== null) {
      if (record.commentsCV == 1) {
        console.log("Rendering Comment");
        return "1" + " " + t("Comments");
      } else {
        console.log(`Rendering ${record.commentsCV} Comments`);
        return `${record.commentsCV}` + " " + t("Comments");
      }
    } else {
      console.log("CommentsCV is undefined or null");
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
    let results = DataConfirmCV;
    if (selectedFilters.internID) {
      results = results.filter(
        (intern) => intern.internID === selectedFilters.internID
      );
    }
    if (selectedFilters.position) {
      results = results.filter(
        (intern) => intern.position === selectedFilters.position
      );
    }
    if (selectedFilters.fullName) {
      results = results.filter(
        (intern) => intern.fullName === selectedFilters.fullName
      );
    }
    if (selectedFilters.phoneNumber) {
      results = results.filter(
        (intern) => intern.phoneNumber === selectedFilters.phoneNumber
      );
    }
    if (selectedFilters.dateInterView) {
      results = results.filter(
        (intern) => intern.dateInterView === selectedFilters.dateInterView
      );
    }
    if (selectedFilters.timeInterView) {
      results = results.filter(
        (intern) => intern.timeinterview === selectedFilters.timeInterView
      );
    }
    if (selectedFilters.address) {
      results = results.filter(
        (intern) => intern.address === selectedFilters.address
      );
    }
    if (selectedFilters.school) {
      if (selectedFilters.school) {
        const searchText = selectedFilters.school.toLowerCase();
        results = results.filter((intern) =>
          intern.school.toLowerCase().includes(searchText)
        );
      }
    }
    if (selectedFilters.email) {
      results = results.filter((intern) =>
        intern.email.toLowerCase().includes(searchText)
      );
    }
    if (selectedFilters.dateOfBirth) {
      results = results.filter((intern) =>
        moment(intern.dateOfBirth).isSame(selectedFilters.dateOfBirth, "day")
      );
    }
    setFilteredInterns(results);
  };

  /**
   * Handles clearing all filter values and resetting the filtered interns list.
   */
  const handleClearFilters = () => {
    setFilteredInterns(DataConfirmCV); // Reset the filtered interns to the full list
    setCurrentPage(0); // Reset the current page to 0
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
      searchText: "",
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
    setIsModalVisible(false);
  };

  const [statusMap, setStatusMap] = useState(
    interns.reduce((acc, intern) => {
      acc[intern.internId] = false; // Initialize all checkboxes to unchecked
      return acc;
    }, {})
  );
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  const [allChecked, setAllChecked] = useState(false);
  const [confirmStatus, setConfirmStatus] = useState("");
  const handleConfirmEmail = (key, confirmStatus) => {
    // Cập nhật trạng thái xác nhận email của hàng có key tương ứng
    setConfirmStatus((prevState) => ({
      ...prevState,
      [key]: confirmStatus,
    }));
  };
  const [selectedStatus, setSelectedStatus] = useState("");
  const handleChangestatus = (key, record) => {
    record.status = key;
    setSelectedOption(key);
  };

  const [selectedOption, setSelectedOption] = useState("");
  const [pageSize, setPageSize] = useState("6");
  const handleChangePageSize = (value) => {
    setPageSize(value);
  };
  const columns = [
    {
      title: t("Intern ID"),
      dataIndex: "internID",
      key: "internID",
      filteredValue: [selectedFilters.internID],
      align: "center",
      width: "auto",
    },
    {
      title: t("Date Interview"),
      dataIndex: "dateInterView",
      key: "dateInterView",
      filteredValue: [selectedFilters.dateInterView],
      align: "center",
      width: "auto",
    },
    {
      title: t("Time Interview"),
      dataIndex: "timeinterview",
      key: "timeinterview",
      filteredValue: [selectedFilters.timeInterView],
      align: "center",
      width: "auto",
    },
    {
      title: t("Full Name"),
      dataIndex: "fullName",
      key: "fullName",
      filteredValue: [selectedFilters.fullName],
      align: "center",
      width: "auto",
    },
    {
      title: t("Date Of Birth"),
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      filteredValue: [selectedFilters.dateOfBirth],
      align: "center",
      width: "auto",
    },
    {
      title: t("Phone Number"),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      filteredValue: [selectedFilters.phoneNumber],
      align: "center",
      width: "auto",
    },
    {
      title: t("Position"),
      dataIndex: "position",
      key: "position",
      filteredValue: [selectedFilters.position],
      align: "center",
      width: "auto",
    },
    {
      title: t("School"),
      dataIndex: "school",
      key: "school",
      filteredValue: [selectedFilters.school],
      align: "center",
      width: "auto",
    },
    {
      title: t("Address"),
      dataIndex: "address",
      key: "address",
      filteredValue: [selectedFilters.address],
      align: "center",
      width: "auto",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      filteredValue: [selectedFilters.email],
      align: "center",
      width: "auto",
    },
    {
      title: "CV",
      dataIndex: "cvLink",
      align: "center",
      width: "auto",
      key: "cvLink",
      render: () => (
        <a
          style={{ textDecoration: "underline", color: "blue" }}
          onClick={() => (window.location.href = "/")}
        >
          Link
        </a>
      ),
    },
    {
      title: t("Comments"),
      dataIndex: "commentsCV",
      align: "center",
      width: "auto",
      key: "commentsCV",
      render: (text, record) => (
        <span>
          {/* Hiển thị số lượng bình luận */}
          {renderComments(record)}
          {/* Hiển thị biểu tượng mắt và gán sự kiện onClick */}
          <EyeOutlined
            style={{ marginLeft: "5px", cursor: "pointer" }}
            onClick={() => handleCommentClick(record)}
          />
        </span>
      ),
    },

    {
      title: t("Confirm Email"),
      dataIndex: "confirmEmail",
      key: "confirmEmail",
      align: "center",
      width: "auto",
      render: (text, record) => (
        <div key={record.key} style={{ width: 126 }}>
          <Dropdown
            overlay={
              <Menu onClick={({ key }) => handleConfirmEmail(record.key, key)}>
                <Menu.Item key="confirmed">{t("Confirmed")}</Menu.Item>
                <Menu.Item key="not confirmed">{t("Not Confirmed")}</Menu.Item>
              </Menu>
            }
          >
            <Button
              style={{
                backgroundColor:
                  confirmStatus[record.key] === "confirmed"
                    ? "#EFF9F1"
                    : "#F8E7EE",
                color:
                  confirmStatus[record.key] === "confirmed"
                    ? "#449E3C"
                    : "#B70D52",
                borderRadius: "50px", // Đặt bo tròn thành hình tròn
                marginLeft: "-8px",
                width: "100%",
                fontSize: "12px",
              }}
            >
              {confirmStatus[record.key] === "confirmed"
                ? t("Confirmed")
                : t("Not Confirmed")}
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      ),
    },

    {
      title: t("Interviewer"),
      dataIndex: "interviewer",
      align: "center",
      width: "auto",
      key: "interviewer",
      filteredValue: [selectedFilters.dateInterView],
    },
    {
      title: t("Status"),
      dataIndex: "status",
      align: "center",
      width: "auto",
      key: "status",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu onClick={({ key }) => handleChangestatus(key, record)}>
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
            {record.status} <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },

    {
      title: "Button",
      dataIndex: "button",
      align: "center",
      width: "auto",
      key: "button",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => handleViewClick(record)}
          style={{
            backgroundColor: "white",
            color: "#4889E9",
            border: "2px solid #4889E9",
            borderRadius: "20px",
          }}
        >
          {t("View")}
        </Button>
      ),
      // width: 100,
    },
  ];
  const [selectionType, setSelectionType] = useState("checkbox");
  const groupButton = [
    {
      color: "#6537B1",
      name: t("Send Email"),
      icon: <MailOutlined />,
      component: <SendMailButton />,
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

  const [isEmailPopupVisible, setEmailPopupVisible] = useState(false);
  const handleOpenEmailPopup = () => {
    setEmailPopupVisible(true);
  };

  const handleCloseEmailPopup = () => {
    setEmailPopupVisible(false);
  };
  const handleDropdownVisibleChange = (visible) => {
    setOpen(visible);
  };

  const email_types = [
    t("Email interview"),
    t("Email result"),
    t("Internship Information"),
  ];
  const viewPort = useViewport();

  const isMobile = viewPort.width <= 1024;

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
            titleName={t("Confirm CV")}
            groupButton={groupButton}
            onSendEmail={handleOpenEmailPopup}
            checkedCount={selectedRowKeys.length}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
            onExportExcel={handleOpenExportExcel}
            onCreateIntern={handleOpenAddNewIntern}
          />
        </div>
        {/*Render Send Email Popup */}
        <SendMailButton
          typesEmail={email_types}
          onClose={handleCloseEmailPopup}
          openPopup={isEmailPopupVisible}
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

        <section className="filter-section">
          {!isMobile ? (
            <div className="filter">
              <div className="fields">
                <Dropdown
                  style={{
                    height: "32px",
                    width: "100%",
                    fontSize: "15px",
                  }}
                  overlay={createMenu("internID", internIDChoice)}
                  trigger={["click"]}
                  onDropdownVisibleChange={handleDropdownVisibleChange}
                  suffixIcon={open ? <UpOutlined /> : <DownOutlined />}
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
                        color: selectedFilters.internID ? "#000000" : "#C7BFBF",
                      }}
                    >
                      {selectedFilters.internID || t("Enter intern's ID")}
                    </div>
                    <DownOutlined />
                  </Button>
                </Dropdown>

                <Dropdown
                  style={{
                    height: "32px",
                    width: "100%",
                    fontSize: "15px",
                  }}
                  overlay={createMenu("fullName", fullNameChoice)}
                  trigger={["click"]}
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
                        color: selectedFilters.fullName ? "#000000" : "#C7BFBF",
                        paddingRight: "40px",
                      }}
                    >
                      {selectedFilters.fullName ||
                        t("Enter intern's Full name")}
                    </div>
                    <DownOutlined />
                  </Button>
                </Dropdown>

                <DatePicker
                  format="DD/MM/YYYY"
                  placeholder={t(["Enter intern's D.O.B"])}
                  className="custom-placeholder"
                  style={{
                    height: "32px",
                    width: "100%",
                    fontSize: "15px",
                  }}
                  onChange={(date) => handleDateChange("dateOfBirth", date)}
                />

                <Dropdown
                  style={{
                    height: "32px",
                    width: "100%",
                    fontSize: "15px",
                  }}
                  overlay={createMenu("phoneNumber", phoneNumberChoice)}
                  trigger={["click"]}
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
                        color: selectedFilters.phoneNumber
                          ? "#000000"
                          : "#C7BFBF",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {selectedFilters.phoneNumber ||
                        t("Enter intern's Phone number")}
                    </div>
                    <DownOutlined />
                  </Button>
                </Dropdown>

                <Dropdown
                  style={{
                    height: "32px",
                    width: "100%",
                    fontSize: "15px",
                  }}
                  overlay={createMenu("address", addressName)}
                  trigger={["click"]}
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
                        color: selectedFilters.address ? "#000000" : "#C7BFBF",
                      }}
                    >
                      {selectedFilters.address || t("Enter intern's Address")}
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
                  placeholder={t("Enter intern's Email")}
                  value={selectedFilters.email}
                  onChange={handleInputChange}
                />

                <Dropdown
                  style={{
                    height: "32px",
                    width: "100%",
                    fontSize: "15px",
                  }}
                  overlay={createMenu("position", positionNames)}
                  trigger={["click"]}
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
                        color: selectedFilters.position ? "#000000" : "#C7BFBF",
                      }}
                    >
                      {selectedFilters.position || t("Enter intern's Position")}
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
                  placeholder={t("Enter intern's School")}
                  className="custom-placeholder"
                  value={selectedFilters.school}
                  onChange={(e) => handleInputChange("school", e.target.value)}
                />

                <Dropdown
                  style={{
                    height: "32px",
                    width: "100%",
                    fontSize: "15px",
                  }}
                  overlay={createMenu("dateInterView", dateInterviewChoice)}
                  trigger={["click"]}
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
                        color: selectedFilters.dateInterView
                          ? "#000000"
                          : "#C7BFBF",
                        paddingRight: "70px",
                      }}
                    >
                      {selectedFilters.dateInterView ||
                        t("Enter Date Interview")}
                    </div>
                    <DownOutlined />
                  </Button>
                </Dropdown>

                <Dropdown
                  style={{
                    height: "32px",
                    width: "100%",
                    fontSize: "15px",
                  }}
                  overlay={createMenu("timeInterView", timeInterviewChoice)}
                  trigger={["click"]}
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
                        color: selectedFilters.timeInterView
                          ? "#000000"
                          : "#C7BFBF",
                      }}
                    >
                      {selectedFilters.timeInterView ||
                        t("Enter Time Interview  ")}
                    </div>
                    <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
              <div className="buttons">
                <Button className="cln-btn btn" onClick={handleClearFilters}>
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
            <div className="filter">
              <Row>
                <Col style={{ width: "100%" }}>
                  <Row
                    gutter={[5, 5]}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Dropdown
                      overlay={createMenu("internID", internIDChoice)}
                      trigger={["click"]}
                      onDropdownVisibleChange={handleDropdownVisibleChange}
                      suffixIcon={open ? <UpOutlined /> : <DownOutlined />}
                    >
                      <Button
                        style={{
                          fontSize: "15px",
                          textAlign: "left",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "32px",
                        }}
                      >
                        <div
                          style={{
                            color: selectedFilters.internID
                              ? "#000000"
                              : "#C7BFBF",
                          }}
                        >
                          {selectedFilters.internID || t("Enter intern's ID")}
                        </div>
                        <DownOutlined />
                      </Button>
                    </Dropdown>

                    <Dropdown
                      overlay={createMenu("fullName", fullNameChoice)}
                      trigger={["click"]}
                    >
                      <Button
                        style={{
                          fontSize: "15px",
                          textAlign: "left",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "32px",
                        }}
                      >
                        <div
                          style={{
                            color: selectedFilters.fullName
                              ? "#000000"
                              : "#C7BFBF",
                            paddingRight: "40px",
                          }}
                        >
                          {selectedFilters.fullName ||
                            t("Enter intern's Full name")}
                        </div>
                        <DownOutlined />
                      </Button>
                    </Dropdown>

                    <DatePicker
                      format="DD/MM/YYYY"
                      placeholder={t(["Enter intern's D.O.B"])}
                      style={{
                        height: "32px",

                        width: "100%",

                        fontSize: "15px",
                      }}
                      className="custom-placeholder"
                      onChange={(date) => handleDateChange("dateOfBirth", date)}
                    />

                    <Dropdown
                      overlay={createMenu("phoneNumber", phoneNumberChoice)}
                      trigger={["click"]}
                    >
                      <Button
                        style={{
                          fontSize: "15px",
                          textAlign: "left",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "32px",
                        }}
                      >
                        <div
                          style={{
                            color: selectedFilters.phoneNumber
                              ? "#000000"
                              : "#C7BFBF",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {selectedFilters.phoneNumber ||
                            t("Enter intern's Phone number")}
                        </div>
                        <DownOutlined />
                      </Button>
                    </Dropdown>

                    <Dropdown
                      overlay={createMenu("address", addressName)}
                      trigger={["click"]}
                    >
                      <Button
                        style={{
                          fontSize: "15px",
                          textAlign: "left",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "32px",
                        }}
                      >
                        <div
                          style={{
                            color: selectedFilters.address
                              ? "#000000"
                              : "#C7BFBF",
                          }}
                        >
                          {selectedFilters.address ||
                            t("Enter intern's Address")}
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
                      onChange={handleInputChange}
                    />

                    <Dropdown
                      overlay={createMenu("position", positionNames)}
                      trigger={["click"]}
                    >
                      <Button
                        style={{
                          fontSize: "15px",
                          textAlign: "left",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "32px",
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
                      placeholder={t("Enter intern's School")}
                      value={selectedFilters.school}
                      onChange={(e) =>
                        handleInputChange("school", e.target.value)
                      }
                    />

                    <Dropdown
                      overlay={createMenu("dateInterView", dateInterviewChoice)}
                      trigger={["click"]}
                    >
                      <Button
                        style={{
                          fontSize: "15px",
                          textAlign: "left",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "32px",
                        }}
                      >
                        <div
                          style={{
                            color: selectedFilters.dateInterView
                              ? "#000000"
                              : "#C7BFBF",
                            paddingRight: "70px",
                          }}
                        >
                          {selectedFilters.dateInterView ||
                            t("Enter Date Interview")}
                        </div>
                        <DownOutlined />
                      </Button>
                    </Dropdown>

                    <Dropdown
                      overlay={createMenu("timeInterView", timeInterviewChoice)}
                      trigger={["click"]}
                    >
                      <Button
                        style={{
                          fontSize: "15px",
                          textAlign: "left",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "32px",
                        }}
                      >
                        <div
                          style={{
                            color: selectedFilters.timeInterView
                              ? "#000000"
                              : "#C7BFBF",
                          }}
                        >
                          {selectedFilters.timeInterView ||
                            t("Enter Time Interview  ")}
                        </div>
                        <DownOutlined />
                      </Button>
                    </Dropdown>
                  </Row>
                </Col>
                <Col style={{ width: "100%", marginTop: "15px" }}>
                  <Row>
                    <Button
                      style={{
                        width: "100%",
                        height: "50px",
                        borderRadius: "15px",
                        marginBottom: "10px",
                      }}
                      onClick={handleClearFilters}
                    >
                      <DeleteOutlined style={{ marginRight: "10px" }} />
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
                      <SearchOutlined style={{ marginRight: "10px" }} />
                      {t("Search")}
                    </Button>
                  </Row>
                </Col>
              </Row>
            </div>
          )}

          <div
            className="tbl-wrapper"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {/* use table of Ant Design */}
            <Table
              rowSelection={{
                type: "checkbox",
              }}
              columns={columns}
              dataSource={filteredInterns}
              scroll={{ x: "142vw", y: "350px" }}
              style={{ maxWidth: "100%", minHeight: "100%" }}
              pagination={{
                pageSize: pageSize,
                style: { marginRight: "120px", marginTop: "28px" },
              }}
            />
            <div
              style={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Input
                value={pageSize}
                onChange={(e) => handleChangePageSize(e.target.value)}
                style={{ width: 80, marginRight: "10px", marginTop: "-66px" }}
                placeholder="Page Size"
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
            title={t("View details of Intern")}
            visible={commentPopupVisible}
            onCancel={handleCancel}
            width={900}
            footer={null}
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <p>
                  <strong>{t("Intern ID")}:</strong>
                </p>
                <p
                  style={{
                    border: "2px solid #12345129",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  {selectedIntern.internID}
                </p>
              </Col>
              <Col span={8}>
                <p>
                  <strong>{t("Date Interview")}:</strong>
                </p>
                <p
                  style={{
                    border: "2px solid #12345129",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  {" "}
                  {selectedIntern.dateInterView}
                </p>
              </Col>
              <Col span={8}>
                <p>
                  <strong>{t("Time Interview")}:</strong>
                </p>
                <p
                  style={{
                    border: "2px solid #12345129",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  {" "}
                  {selectedIntern.timeinterview}
                </p>
              </Col>
              <Col span={8}>
                <p>
                  <strong>{t("Full Name")}:</strong>
                </p>
                <p
                  style={{
                    border: "2px solid #12345129",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  {" "}
                  {selectedIntern.fullName}
                </p>
              </Col>
              <Col span={8}>
                <p>
                  <strong>{t("Date Of Birth")}:</strong>
                </p>
                <p
                  style={{
                    border: "2px solid #12345129",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  {" "}
                  {selectedIntern.dateOfBirth}
                </p>
              </Col>
              <Col span={8}>
                <p>
                  <strong>{t("Phone Number")}:</strong>
                </p>
                <p
                  style={{
                    border: "2px solid #12345129",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  {" "}
                  {selectedIntern.phoneNumber}
                </p>
              </Col>
              <Col span={8}>
                <p>
                  <strong>{t("Position")}:</strong>
                </p>
                <p
                  style={{
                    border: "2px solid #12345129",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  {" "}
                  {selectedIntern.position}
                </p>
              </Col>
              <Col span={8}>
                <p>
                  <strong>{t("School")}:</strong>
                </p>
                <p
                  style={{
                    border: "2px solid #12345129",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  {selectedIntern.school}
                </p>
              </Col>
              <Col span={8}>
                <p>
                  <strong>{t("Address")}:</strong>
                </p>
                <p
                  style={{
                    border: "2px solid #12345129",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  {" "}
                  {selectedIntern.address}
                </p>
              </Col>
              <Col span={8}>
                <p>
                  <strong>{t("Email")}:</strong>
                </p>
                <p
                  style={{
                    border: "2px solid #12345129",
                    padding: "5px",
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
                    padding: "5px",
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
                  <strong>{t("Interviewer")}:</strong>
                </p>
                <p
                  style={{
                    border: "2px solid #12345129",
                    padding: "5px",
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
      </main>
    </div>
  );
};

export default ConfirmCV;
