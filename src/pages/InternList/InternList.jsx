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
} from "@ant-design/icons";
import { Table, Select, Button, Input, Col, Row } from "antd";
import DataInternList from "../../data/InternList.json"; // data of table intern list
import Navigation from "../../components/Navigation/Navigation";
import SendMailButton from "../../components/SendMailButton/SendMailButton";
import ReportProcessModal from "./ReportProcessPopup";
import ViewButton from "./ViewButton";
import "./InternList.css";
import useViewport from "../../hooks/useViewport";
import { useTranslation } from "react-i18next";

const optionsInternRole = DataInternList.reduce((options, item) => {
  const existingValue = options.find((option) => option.value === item.role);

  if (!existingValue) {
    options.push({ value: item.role, label: item.role });
  }

  return options;
}, []);

const optionsInternMentor = DataInternList.reduce((options, item) => {
  const existingValue = options.find((option) => option.value === item.mentor);

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
  const existingValue = options.find((option) => option.value === item.address);

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
  const existingValue = options.find((option) => option.value === item.project);

  if (!existingValue) {
    options.push({ value: item.project, label: item.project });
  }

  return options;
}, []);

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

const InternList = () => {
  const [isEmailPopupVisible, setEmailPopupVisible] = useState(false);
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

  // title of intern list table
  const columns = [
    {
      title: t("Intern ID"),
      dataIndex: "internID",
      width: "auto",
    },
    {
      title: t("Start Date"),
      dataIndex: "startDate",
      width: "auto",
    },
    {
      title: t("Finish Date"),
      dataIndex: "finishDate",
      width: "auto",
    },
    {
      title: t("Full Name"),
      dataIndex: "fullName",
      width: "auto",
      // filteredValue: [filter.fullName],
      // onFilter: (value, record) => {
      //     return record.fullName.includes(value)
      // }
    },
    {
      title: t("Date Of Birth"),
      dataIndex: "dateOfBirth",
      width: "auto",
      // filteredValue: [filter.dateOfBirth],
      // onFilter: (value, record) => {
      //     return record.dateOfBirth.includes(value)
      // }
    },
    {
      title: t("Phone Number"),
      dataIndex: "phoneNumber",
      width: "auto",
      // filteredValue: [filter.phoneNumber],
      // onFilter: (value, record) => {
      //     return record.phoneNumber.includes(value)
      // }
    },
    {
      title: t("Position"),
      dataIndex: "position",
      width: "auto",
      // filteredValue: [filter.position],
      // onFilter: (value, record) => {
      //     return record.position.includes(value)
      // }
    },
    {
      title: t("School"),
      dataIndex: "school",
      width: "auto",
      render: (text) => t(text),
      // filteredValue: [filter.school],
      // onFilter: (value, record) => {
      //     return record.school.includes(value)
      // }
    },
    {
      title: t("Address"),
      dataIndex: "address",
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
      width: "auto",
      // filteredValue: [filter.email],
      // onFilter: (value, record) => {
      //     return record.email.includes(value)
      // }
    },
    {
      title: "CV",
      dataIndex: "cv",
      width: 100,
      render: (text) => (
        <a style={{ color: "blue", textDecoration: "underline" }}>{text}</a>
      ),
    },
    {
      title: t("Comments"),
      dataIndex: "comments",
      width: 160,
      render: (text) => (
        <Button>
          2 {commentsText}
          <EyeOutlined />
        </Button>
      ),
    },
    {
      title: t("Role"),
      dataIndex: "role",
      width: 130,
      // filteredValue: [filter.role],
      // onFilter: (value, record) => {
      //     return record.role.includes(value)
      // }
    },
    {
      title: t("Project"),
      dataIndex: "project",
      width: "auto",
      // filteredValue: [filter.project],
      // onFilter: (value, record) => {
      //     return record.project.includes(value)
      // }
    },
    {
      title: t("Group Zalo"),
      dataIndex: "groupZalo",
      width: "auto",
      // filteredValue: [filter.groupZalo],
      // onFilter: (value, record) => {
      //     return record.groupZalo.includes(value)
      // }
    },
    {
      title: t("Mentor"),
      dataIndex: "mentor",
      width: "auto",
      // filteredValue: [filter.mentor],
      // onFilter: (value, record) => {
      //     return record.mentor.includes(value)
      // }
    },
    {
      title: t("Status"),
      dataIndex: "status",
      width: 170,
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
              <Menu onClick={({ key }) => handleChangeStatus(key, record)}>
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
      width: 170,
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

  const handleSendEmail = (emailData) => {
    console.log("Email Data:", emailData);
    // Handle email sending logic here
    handleCloseEmailPopup();
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
    t("Return Profile")
  ];

  return (
    <div>
        {/* Content of InternList right */}
        <div className="content-intern-list">
          {/* Pass props to Navigation */}
          <Navigation
            titleName={t("INTERN LIST")}
            groupButton={groupButton}
            onSendEmail={handleOpenEmailPopup}
          />
          {/* Group of filter and table */}
          <div className="group-filter-table">
            {/* Filter */}

            {!isMobile ? (
              <div className="filter">
                <div className="filter-group">
                  <Select
                    size="large"
                    showSearch
                    style={{
                      width: "100%",
                      height: "20%",
                      marginTop: 5,
                      fontSize: 5,
                    }}
                    defaultValue=""
                    placeholder={t("Enter intern's ID")}
                    options={optionsInternID}
                    onChange={handleChangeFilterInternID}
                    value={filter.internID || null}
                  />
                  <Select
                    size="large"
                    showSearch
                    style={{
                      width: "100%",
                      height: "20%",
                      marginTop: 5,
                      fontSize: 5,
                    }}
                    placeholder={t("Enter intern's Phone number")}
                    options={optionsInternPhoneNumber}
                    onChange={handleChangeFilterPhoneNumber}
                    value={filter.phoneNumber || null}
                  />
                  <Select
                    size="large"
                    showSearch
                    style={{
                      width: "100%",
                      height: "20%",
                      marginTop: 5,
                      fontSize: 5,
                    }}
                    placeholder={t("Enter intern's Role")}
                    options={optionsInternRole}
                    onChange={handleChangeFilterRole}
                    value={filter.role || null}
                  />
                  <Select
                    size="large"
                    showSearch
                    style={{
                      width: "100%",
                      height: "20%",
                      marginTop: 5,
                      fontSize: 5,
                    }}
                    placeholder={t("Enter intern's Mentor")}
                    options={optionsInternMentor}
                    onChange={handleChangeFilterMentor}
                    value={filter.mentor || null}
                  />
                </div>
                <div className="filter-group">
                  <Select
                    size="large"
                    showSearch
                    style={{
                      width: "100%",
                      height: "20%",
                      marginTop: 5,
                      fontSize: 5,
                    }}
                    placeholder={t("Enter intern's Full name")}
                    options={optionsInternFullName}
                    onChange={handleChangeFilterFullName}
                    value={filter.fullName || null}
                  />
                  <Select
                    size="large"
                    showSearch
                    style={{
                      width: "100%",
                      height: "20%",
                      marginTop: 5,
                      fontSize: 5,
                    }}
                    placeholder={t("Enter intern's Address")}
                    options={optionsInternAddress}
                    onChange={handleChangeFilterAddress}
                    value={filter.address || null}
                  />
                  <Select
                    size="large"
                    showSearch
                    style={{
                      width: "100%",
                      height: "20%",
                      marginTop: 5,
                      fontSize: 5,
                    }}
                    placeholder={t("Enter intern's Position")}
                    options={optionsInternPosition}
                    onChange={handleChangeFilterPosition}
                    value={filter.position || null}
                  />
                  <Select
                    size="large"
                    showSearch
                    style={{
                      width: "100%",
                      height: "20%",
                      marginTop: 5,
                      fontSize: 5,
                    }}
                    placeholder={t("Enter intern's Project")}
                    options={optionsInternProject}
                    onChange={handleChangeFilterProject}
                    value={filter.project || null}
                  />
                </div>
                <div className="filter-group">
                  <Input
                    size="large"
                    style={{
                      width: "100%",
                      height: "20%",
                      marginTop: 5,
                    }}
                    placeholder={t("Enter intern's D.O.B")}
                    value={filter.dateOfBirth}
                    onChange={(e) => handleChangeFilterDOB(e.target.value)}
                  />
                  <Input
                    size="large"
                    style={{
                      width: "100%",
                      height: "20%",
                      marginTop: 5,
                    }}
                    placeholder={t("Enter intern's Email")}
                    value={filter.email}
                    onChange={(e) => handleChangeFilterEmail(e.target.value)}
                  />
                  <Input
                    size="large"
                    style={{
                      width: "100%",
                      height: "20%",
                      marginTop: 5,
                    }}
                    placeholder={t("Enter intern's School")}
                    value={filter.school}
                    onChange={(e) => handleChangeFilterSchool(e.target.value)}
                  />
                  <Input
                    size="large"
                    style={{
                      width: "100%",
                      height: "20%",
                      marginTop: 5,
                    }}
                    placeholder={t("Enter intern's Group Zalo")}
                    value={filter.groupZalo}
                    onChange={(e) =>
                      handleChangeFilterGroupZalo(e.target.value)
                    }
                  />
                </div>
                <div className="filter-group">
                  <div className="filter-button">
                    <Button
                      onClick={handleCleanFilterButton}
                      style={{ width: "70%", height: 60, borderRadius: 15 }}
                    >
                      <FilterOutlined /> {isMobile ? "" : t("Clean Filters")}
                    </Button>
                  </div>
                  <div className="search-button-internlist">
                    <Button
                      type="primary"
                      onClick={handleSearch}
                      style={{ width: "70%", height: 60, borderRadius: 15 }}
                    >
                      <SearchOutlined /> {isMobile ? "" : "Search"}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <Row>
                <Col xs={22} sm={22} md={22} lg={6} xl={6} offset={1}>
                  <div className="filter-group">
                    <Select
                      size="large"
                      showSearch
                      style={{
                        width: "100%",
                        height: "20%",
                        marginTop: 15,
                        fontSize: 5,
                      }}
                      defaultValue=""
                      placeholder={t("Enter intern's ID")}
                      options={optionsInternID}
                      onChange={handleChangeFilterInternID}
                      value={filter.internID || null}
                    />
                    <Select
                      size="large"
                      showSearch
                      style={{
                        width: "100%",
                        height: "20%",
                        marginTop: 5,
                        fontSize: 5,
                      }}
                      placeholder={t("Enter intern's Phone number")}
                      options={optionsInternPhoneNumber}
                      onChange={handleChangeFilterPhoneNumber}
                      value={filter.phoneNumber || null}
                    />
                    <Select
                      size="large"
                      showSearch
                      style={{
                        width: "100%",
                        height: "20%",
                        marginTop: 5,
                        fontSize: 5,
                      }}
                      placeholder={t("Enter intern's Role")}
                      options={optionsInternRole}
                      onChange={handleChangeFilterRole}
                      value={filter.role || null}
                    />
                    <Select
                      size="large"
                      showSearch
                      style={{
                        width: "100%",
                        height: "20%",
                        marginTop: 5,
                        fontSize: 5,
                      }}
                      placeholder={t("Enter intern's Mentor")}
                      options={optionsInternMentor}
                      onChange={handleChangeFilterMentor}
                      value={filter.mentor || null}
                    />
                  </div>
                </Col>
                <Col xs={22} sm={22} md={22} lg={6} xl={6} offset={1}>
                  <div className="filter-group">
                    <Select
                      size="large"
                      showSearch
                      style={{
                        width: "100%",
                        height: "20%",
                        marginTop: 5,
                        fontSize: 5,
                      }}
                      placeholder={t("Enter intern's Fullname")}
                      options={optionsInternFullName}
                      onChange={handleChangeFilterFullName}
                      value={filter.fullName || null}
                    />
                    <Select
                      size="large"
                      showSearch
                      style={{
                        width: "100%",
                        height: "20%",
                        marginTop: 5,
                        fontSize: 5,
                      }}
                      placeholder={t("Enter intern's Address")}
                      options={optionsInternAddress}
                      onChange={handleChangeFilterAddress}
                      value={filter.address || null}
                    />
                    <Select
                      size="large"
                      showSearch
                      style={{
                        width: "100%",
                        height: "20%",
                        marginTop: 5,
                        fontSize: 5,
                      }}
                      placeholder={t("Enter intern's Position")}
                      options={optionsInternPosition}
                      onChange={handleChangeFilterPosition}
                      value={filter.position || null}
                    />
                    <Select
                      size="large"
                      showSearch
                      style={{
                        width: "100%",
                        height: "20%",
                        marginTop: 5,
                        fontSize: 5,
                      }}
                      placeholder={t("Enter intern's Project")}
                      options={optionsInternProject}
                      onChange={handleChangeFilterProject}
                      value={filter.project || null}
                    />
                  </div>
                </Col>
                <Col xs={22} sm={22} md={22} lg={6} xl={6} offset={1}>
                  <div className="filter-group">
                    <Input
                      size="large"
                      style={{
                        width: "100%",
                        height: "20%",
                        marginTop: 5,
                      }}
                      placeholder={t("Enter intern's D.O.B")}
                      value={filter.dateOfBirth}
                      onChange={(e) => handleChangeFilterDOB(e.target.value)}
                    />
                    <Input
                      size="large"
                      style={{
                        width: "100%",
                        height: "20%",
                        marginTop: 5,
                      }}
                      placeholder={t("Enter intern's Email")}
                      value={filter.email}
                      onChange={(e) => handleChangeFilterEmail(e.target.value)}
                    />
                    <Input
                      size="large"
                      style={{
                        width: "100%",
                        height: "20%",
                        marginTop: 5,
                      }}
                      placeholder={t("Enter intern's School")}
                      value={filter.school}
                      onChange={(e) => handleChangeFilterSchool(e.target.value)}
                    />
                    <Input
                      size="large"
                      style={{
                        width: "100%",
                        height: "20%",
                        marginTop: 5,
                      }}
                      placeholder={t("Enter intern's Group Zalo")}
                      value={filter.groupZalo}
                      onChange={(e) =>
                        handleChangeFilterGroupZalo(e.target.value)
                      }
                    />
                  </div>
                </Col>
                <Col xs={22} sm={22} md={22} lg={6} xl={6} offset={1}>
                  <div className="filter-group">
                    <div className="filter-button">
                      <Button
                        onClick={handleCleanFilterButton}
                        style={{ width: "100%" }}
                      >
                        {isMobile ? "" : <FilterOutlined />}{" "}
                        {t("Clean Filters")}
                      </Button>
                    </div>
                    <div className="search-button-internlist">
                      <Button
                        type="primary"
                        onClick={handleSearch}
                        style={{ width: "100%" }}
                      >
                        {isMobile ? "" : <SearchOutlined />} Search
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            )}

            <div className="table-intern-list">
              {/* use table of Ant Design */}
              <Table
                rowSelection={{
                  type: "checkbox",
                  ...rowSelection,
                }}
                columns={columns}
                dataSource={dataTable}
                scroll={{ x: "2200px", y: "360px" }}
                style={{ maxWidth: "100%", minHeight: "100%" }}
                pagination={{
                  pageSize: 7,
                }}
              />
            </div>
          </div>
        </div>
        {/*Render Email Popup */}
        <SendMailButton
          onClose={handleCloseEmailPopup}
          openPopup={isEmailPopupVisible}
          typesEmail={email_types}
        />
      <Toaster />
    </div>
  );
};

export default InternList;
