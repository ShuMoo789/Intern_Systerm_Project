import React, { useState, useEffect } from "react";

import User_Img from "../../assets/user_image.png";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import { Link } from "react-router-dom";
import {
  Table,
  Checkbox,
  Button,
  Modal,
  Card,
  Avatar,
  Tag,
  Tooltip,
  Pagination,
  Dropdown,
  Menu,
  message,
  Input,
  InputNumber,
  Form,
  Select
} from "antd";
import {
  DownOutlined,
  ExportOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { SettingOutlined, FolderOutlined } from "@ant-design/icons";
import "../PositionManagement/PositionManagement.css";
import useViewport from "../../hooks/useViewport";
import GroupButton from "../../components/GroupButton/GroupButton";
import { useTranslation } from "react-i18next";
import DeletePopup from "../../components/DeletePopup/DeletePopup.jsx";
import ExportExcel from "../../components/ExportExcelPopup/ExportExcelPopup.jsx";
import NewPositionModal from "./NewPositionModal.jsx";
import Navigation from "../../components/Navigation/Navigation.jsx";

function getRankClass(text) {
  switch (text) {
    case "Intern":
      return "intern-rank";
    case "Fresher":
      return "fresher-rank";
    case "Junior":
      return "junior-rank";
    case "Middle":
      return "middle-rank";
    default:
      return "default-rank";
  }
}
const { Meta } = Card;


const PositionManagement = () => {

  const [positionGroup, setPositionGroup] = useState([
    {
      title: "Back-End",
      valueUser: 100,
      technology: ".NET, Java,",
      rank: "Intern, Fresher, Junior, Middle, Senior",
      groupLink: "",
    },
    {
      title: "Front-End",
      valueUser: 100,
      technology: "ReactJS,",
      rank: "Intern, Fresher, Junior, Middle, Senior",
      groupLink: "",
    },
    {
      title: "Business Analyst",
      valueUser: 100,
      technology: "Trello,",
      rank: "Intern, Fresher, Junior, Middle, Senior",
      groupLink: "",
    },
    {
      title: "Marketing",
      valueUser: 100,
      technology: "Excel, Word,",
      rank: "Intern, Fresher, Junior, Middle, Senior",
      groupLink: "",
    },
    {
      title: "Designer",
      valueUser: 100,
      technology: "ReactJS,",
      rank: "Intern, Fresher, Junior, Middle, Senior",
      groupLink: "",
    },
    {
      title: "Sales Executive",
      valueUser: 100,
      technology: "Trello,",
      rank: "Intern, Fresher, Junior, Middle, Senior",
      groupLink: "",
    },
  ]);
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInterns, setSelectedInterns] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [originalSelectedInterns, setOriginalSelectedInterns] = useState([]);
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 1024;
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  // State for selected positions
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [positionToEdit, setPositionToEdit] = useState(null);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const paginatedPositions = positionGroup.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );



  const handlePositionSelect = (position) => {
    setSelectedPositions(prev =>
      prev.some(p => p.title === position.title)
        ? prev.filter(p => p.title !== position.title)
        : [...prev, position]
    );
  };

  const handleEdit = () => {
    if (selectedPositions.length === 1) {
      setPositionToEdit(selectedPositions[0]);
      setEditModalVisible(true);
    }
  };

  const handleSaveEdit = (values) => {
    setPositionGroup(prev => prev.map(p =>
      p.title === positionToEdit.title ? { ...p, ...values } : p
    ));
    setSelectedPositions([]);
    setEditModalVisible(false);
    message.success('Position updated successfully');
  };

  const handleDelete = () => {
    if (selectedPositions.length > 0) {
      Modal.confirm({
        title: 'Are you sure you want to delete the selected position(s)?',
        content: `This will delete ${selectedPositions.length} position(s).`,
        onOk() {
          setPositionGroup(prev => prev.filter(p => !selectedPositions.some(sp => sp.title === p.title)));
          setSelectedPositions([]);
          message.success(`${selectedPositions.length} position(s) deleted successfully`);
        },
      });
    } else {
      message.warning('Please select at least one position to delete');
    }
  };

  const groupButton = [
    {
      color: "#41B137",
      name: t("Export Excel"),
      icon: <ExportOutlined />,
    },
    {
      color: "#FB8632",
      name: t("Edit"),
      icon: <EditOutlined />,
      onClick: handleEdit,
      disabled: selectedPositions.length !== 1
    },
    {
      color: "#FF3A2E",
      name: t("Delete"),
      icon: <DeleteOutlined />,
      onClick: handleDelete,
    },
    {
      color: "#4889E9",
      name: t("Add New Position"),
      icon: <PlusOutlined />,
    },
  ];

  // JSON data
  const internsData = [
    {
      key: "1",
      internID: "#12345128",
      fullName: "Esther Eden",
      phoneNumber: "0376782528",
      position: "Back-End",
      school: "FPT University",
      email: "abc@gmail.com",
      cvLink: "Link",
      technology: ".NET",
      rank: "Intern",
    },
    {
      key: "2",
      internID: "#12345129",
      fullName: "John Doe",
      phoneNumber: "123456789",
      position: "Back-End",
      school: "ABC University",
      email: "john.doe@example.com",
      cvLink: "Link",
      technology: "Java",
      rank: "Intern",
    },
    {
      key: "3",
      internID: "#12345130",
      fullName: "Jane Smith",
      phoneNumber: "987654321",
      position: "Front-End",
      school: "XYZ University",
      email: "jane.smith@example.com",
      cvLink: "Link",
      technology: "ReactJS",
      rank: "Junior",
    },
    {
      key: "4",
      internID: "#12345e131",
      fullName: "Janes",
      phoneNumber: "987654321",
      position: "Front-End",
      school: "XYZ University",
      email: "janes.smith@example.com",
      cvLink: "Link",
      technology: "ReactJS",
      rank: "Junior",
    },
    {
      color: "#41B137",
      name: "Export Excel",
      icon: <ExportOutlined />,
    },
    {
      color: "#FB8632",
      name: "Edit",
      icon: <EditOutlined />,
    },
    {
      color: "#FF3A2E",
      name: "Delete",
      icon: <DeleteOutlined />,
    },
    {
      color: "#4889E9",
      name: "Add New Position",
      icon: <PlusOutlined />,
    },
  ];

  const showModal = (title, position) => {
    const filteredInterns = internsData.filter(
      (intern) => intern.position === position
    );
    setSelectedInterns(filteredInterns); // Set the filtered data to be displayed in the table
    setIsModalVisible(true);
    setModalTitle(title);
    setOriginalSelectedInterns([...filteredInterns]);
  };

  const handleOk = () => {
    message.success("Update Success");
    setIsModalVisible(false);
  };

  // Function to handle Cancel button
  const handleCancel = () => {
    setSelectedInterns(originalSelectedInterns); // Reset selected interns to original values
    setIsModalVisible(false); // Close modal
  };

  const rankMenu = (record) => (
    <Menu onClick={(e) => handleRankChange(e, record)}>
      <Menu.Item key="Intern">Intern</Menu.Item>
      <Menu.Item key="Fresher">Fresher</Menu.Item>
      <Menu.Item key="Junior">Junior</Menu.Item>
      <Menu.Item key="Middle">Middle</Menu.Item>
    </Menu>
  );

  const handleRankChange = (e, record) => {
    const { key } = e;
    // Cập nhật dữ liệu của record với rank mới được chọn
    const updatedInterns = selectedInterns.map((intern) => {
      if (intern.key === record.key) {
        return { ...intern, rank: key };
      }
      return intern;
    });
    setSelectedInterns(updatedInterns);
  };

  const columns = [
    {
      title: t("Intern ID"),
      dataIndex: "internID",
      key: "internID",
    },
    {
      title: t("Full Name"),
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: t("Phone Number"),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: t("Position"),
      dataIndex: "position",
      key: "position",
    },
    {
      title: t("School"),
      dataIndex: "school",
      key: "school",
    },
    {
      title: t("Email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: "CV Link",
      dataIndex: "cvLink",
      key: "cvLink",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          Link
        </a>
      ),
    },
    {
      title: t("Technology"),
      dataIndex: "technology",
      key: "technology",
    },
    {
      title: t("Rank"),
      dataIndex: "rank",
      key: "rank",
      width: 110,
      render: (text, record) => (
        <Dropdown
          overlay={rankMenu(record)}
          trigger={["click"]}
          className={`dropdown-menu ${getRankClass(text)}`}
        >
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            {text} <DownOutlined />
          </a>
        </Dropdown>
      ),
    },
  ];

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

  const [isNewPositionModalVisible, setNewPositionModalVisible] =
    useState(false);
  const handleOpenNewPositionModal = () => {
    setNewPositionModalVisible(true);
  };
  const handleCloseNewPositionModal = () => {
    setNewPositionModalVisible(false);
  };

  function UserInfo({ name, role, avatarSrc }) {
    return (
      <div className="user-info">
        <div className="avatar-section">
          <Link to="/Profile">
            <Avatar
              style={{ border: "1px solid #67A943" }}
              size={54}
              src={avatarSrc}
              icon={<UserOutlined />}
            />
          </Link>
          <div className="user-details">
            <p className="username">{name}</p>
            <p className="role">{role}</p>
          </div>
        </div>
        <DropdownMenu />
      </div>
    );
  }

  return (
    <div id="APRCV">
      <main className="content">
        <div>
          <Navigation
            titleName={t("Position Management")}
            groupButton={groupButton}
            hideSearch={true}
            onCreatePosition={handleOpenModal}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onExportExcel={handleOpenExportExcel}
            checkedCount={selectedPositions.length}
          />
        </div>

        <section>
          <div className="bodyposition">
            {paginatedPositions.map((item) => (
              <div className="bodyposi" key={item.title}>
                <Card
                  className="card-pos"
                  title={item.title}
                  extra={
                    <>
                      <Tag color="blue" style={{ borderRadius: "20px" }}>
                        {item.valueUser} {t("people")}
                      </Tag>
                      <Checkbox
                        style={{ marginLeft: "10px" }}
                        checked={selectedPositions.some(p => p.title === item.title)}
                        onChange={() => handlePositionSelect(item)}
                      />
                    </>
                  }
                >
                  <p>
                    <strong>{t("Technology")}:</strong> {item.technology} ...
                  </p>
                  <p>
                    <strong>{t("Rank")}:</strong> {item.rank}
                  </p>
                  <p>
                    <strong>{t("Group Zalo")}:</strong> <a href="#">Link</a>
                  </p>
                  <div className="avatars">
                    <Avatar.Group>
                      <Tooltip title="Ant User" placement="top">
                        <Avatar
                          src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                          style={{
                            backgroundColor: "#FDD145",
                            width: "38px",
                            height: "38px",
                          }}
                        />
                      </Tooltip>

                      <Tooltip title="Ant User" placement="top">
                        <Avatar
                          src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                          style={{
                            backgroundColor: "#FDD145",
                            marginLeft: "-10%",
                            width: "38px",
                            height: "38px",
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="Ant User" placement="top">
                        <Avatar
                          src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                          style={{
                            backgroundColor: "#91CADF",
                            width: "38px",
                            height: "38px",
                            marginLeft: "-10%",
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="Ant User" placement="top">
                        <Avatar
                          src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                          style={{
                            backgroundColor: "#5C5967",
                            width: "38px",
                            height: "38px",
                            marginLeft: "-10%",
                          }}
                        />
                      </Tooltip>
                      <Avatar
                        style={{
                          backgroundColor: "#F4D7DA",
                          width: "38px",
                          height: "38px",
                          marginLeft: "-10%",
                          color: "#D25B68",
                        }}
                      >
                        +2
                      </Avatar>
                    </Avatar.Group>
                  </div>
                  <div className="buttons">
                    <Button
                      type="link"
                      className="button-main"
                      onClick={() =>
                        showModal(t("View Back-End Detail"), "Back-End")
                      }
                    >
                      {t("View Details")}
                      <FolderOutlined className="iconfolder" />
                    </Button>
                  </div>
                </Card>
              </div>
            ))}

            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "relative",
                  top: "30px",
                  bottom: 0,
                  width: "calc(82vw - 46px)",
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "20px",
                }}
              >

              </div>
            </div>
          </div>
          <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination
              current={currentPage}
              total={positionGroup.length}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger
              onShowSizeChange={handlePageChange}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
              pageSizeOptions={[2, 4, 6]}
            />
          </div>
        </section>

        <Modal
          title={modalTitle}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1100}
          footer={[
            <Button
              key="submit"
              type="primary"
              onClick={handleOk}
              style={{
                width: "7%",
                borderRadius: "10px",
                padding: "1px",
              }}
            >
              {t("OK")}
            </Button>,
          ]}
        >
          <Table
            columns={columns}
            dataSource={selectedInterns}
            pagination={false}
          />
        </Modal>
      </main>
      <NewPositionModal open={openModal} onClose={handleCloseModal} />
      <ExportExcel
        onClose={handleCloseExportExcel}
        openPopup={isExportExcelVisible}
      />
      <EditPositionModal
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        position={positionToEdit}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

function EditPositionModal({ visible, onCancel, position, onSave }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (position) {
      form.setFieldsValue({
        title: position.title,
        valueUser: position.valueUser,
        technology: position.technology,
        rank: position.rank,
      });
    }
  }, [position, form]);

  const handleSave = () => {
    form.validateFields().then(values => {
      onSave(values);
      onCancel();
    });
  };

  return (
    <Modal
      visible={visible}
      title="Edit Position"
      onCancel={onCancel}
      onOk={handleSave}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="valueUser" label="Number of Users" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="technology" label="Technology" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="rank" label="Rank" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default PositionManagement;
