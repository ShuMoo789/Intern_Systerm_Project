import React, { useState } from "react";

import MainLayout from "../../MainLayout/MainLayout";
import User_Img from "../../assets/user_image.png";
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
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { SettingOutlined, FolderOutlined } from "@ant-design/icons";
import "../PositionManagement/PositionManagement.css";
import { useTranslation } from "react-i18next";

const { Meta } = Card;

const PositionManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInterns, setSelectedInterns] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const {t} = useTranslation();
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
      key: "5",
      internID: "#12131",
      fullName: "Janes",
      phoneNumber: "987654321",
      position: "Business Analyst",
      school: "XYZ University",
      email: "janes.smith@example.com",
      cvLink: "Link",
      technology: "trello",
      rank: "Junior",
    },
    {
      key: "6",
      internID: "#123451c31",
      fullName: "Janes",
      phoneNumber: "987654321",
      position: "Marketing",
      school: "XYZ University",
      email: "janes.smdfith@example.com",
      cvLink: "Link",
      technology: "Exceel",
      rank: "Junior",
    },
    {
      key: "7",
      internID: "#12dd3451c31",
      fullName: "luke",
      phoneNumber: "987654321",
      position: "Designer",
      school: "XYZ University",
      email: "luke.smdfith@example.com",
      cvLink: "Link",
      technology: "ReactJS",
      rank: "Junior",
    },
    {
      key: "8",
      internID: "#12dd3ss451c31",
      fullName: "D",
      phoneNumber: "987654321",
      position: "Sales Executive",
      school: "XYZ University",
      email: "luke.smdfith@example.com",
      cvLink: "Link",
      technology: "Trello",
      rank: "Junior",
    },
    // Add more intern objects as needed
  ];

  const showModal = (title, position) => {
    const filteredInterns = internsData.filter(
      (intern) => intern.position === position
    );
    setSelectedInterns(filteredInterns); // Set the filtered data to be displayed in the table
    setIsModalVisible(true);
    setModalTitle(title);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
            title: "Email",
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
            width: 80,
            render: (text, record) => (
                <Dropdown
                    overlay={rankMenu(record)}
                    trigger={["click"]}
                    className="dropdown-menu"
                >
                    <a
                        className="ant-dropdown-link"
                        onClick={(e) => e.preventDefault()}
                    >
                        {text} <DownOutlined />
                    </a>
                </Dropdown>
            ),
        },
    ];

    return (
        <div id="APRCV">
            <MainLayout>
                <main className="content">
                    <header className="content-header">
                        <h1 className="content-title">
                            <b>{t("Position Management")}</b>
                        </h1>
                        <div className="user-info">
                            <img
                                loading="lazy"
                                src={User_Img}
                                alt="User Profile"
                                className="user-profile-small"
                            />
                            <div className="user-details">
                                <span className="user-name">
                                    Natalie Brogan
                                </span>
                                <span className="user-role">Admin</span>
                            </div>
                            <div className="account-setting">
                                <SettingOutlined style={{ color: "#DB0D4B" }} />
                            </div>
                        </div>
                    </header>

          <section className="content-section">
            <div className="button-group-position">
              <button className="button button-export">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0fa11b0683eb59e5c46f322a171b42edba502fadc3f8daffe251ee8087dea429?apiKey=41832340d6f545c2a0509736ad9e1693&"
                  alt="Export Icon"
                  className="button-icon"
                />
                <span>{t("Export Excel")}</span>
              </button>
              <button className="button button-edit">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ecb69ed4f9191e15f4927b1b9b7dd5b7e05e78dcd440b3b135257bd3dc95bd03?apiKey=41832340d6f545c2a0509736ad9e1693&"
                  alt="Edit Icon"
                  className="button-icon"
                />
                <span>{t("Edit")}</span>
              </button>
              <button className="button button-delete">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/68a48237f0bae3c61dd65cfd116f092ab3bef8fb895c06116eaa24230e3d5284?apiKey=41832340d6f545c2a0509736ad9e1693&"
                  alt="Delete Icon"
                  className="button-icon"
                />
                <span>{t("Delete")}</span>
              </button>
              <button className="button button-add-intern">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/464e70c797da987e533d3b7bac06274e496eb711c8027e3b77bb65828b659322?apiKey=41832340d6f545c2a0509736ad9e1693&"
                  alt="Add Intern Icon"
                  className="button-icon"
                />
                <span>{t("Add New Intern")}</span>
              </button>
            </div>
          </section>
                    <section>
                        <div className="bodyposition">
                            <div className="bodyposi">
                                <Card className = "card-pos"
                                    title="Back-End"
                                    extra={
                                        <>
                                            <Tag
                                                color="blue"
                                                style={{ borderRadius: "20px" }}
                                            >
                                                100 people
                                            </Tag>
                                            <Checkbox
                                                style={{ marginLeft: "10px" }}
                                            />
                                        </>
                                    }
                
                                >
                                    <p>
                                        <strong>{t("Technology")}:</strong> .NET, Java,
                                        ...
                                    </p>
                                    <p>
                                        <strong>{t("Rank")}:</strong> Intern, Fresher,
                                        Junior, Middle, Senior
                                    </p>
                                    <p>
                                        <strong>{t("Group Zalo")}:</strong>{" "}
                                        <a href="#">Link</a>
                                    </p>
                                    <div className="avatars">
                                        <Avatar.Group>
                                            <Tooltip
                                                title="Ant User"
                                                placement="top"
                                            >
                                                <Avatar
                                                    src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                    style={{
                                                        backgroundColor:
                                                            "#FDD145",
                                                        width: "38px",
                                                        height: "38px",
                                                    }}
                                                />
                                            </Tooltip>

                                            <Tooltip
                                                title="Ant User"
                                                placement="top"
                                            >
                                                <Avatar
                                                    src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                    style={{
                                                        backgroundColor:
                                                            "#FDD145",
                                                        marginLeft: "-10%",
                                                        width: "38px",
                                                        height: "38px",
                                                    }}
                                                />
                                            </Tooltip>
                                            <Tooltip
                                                title="Ant User"
                                                placement="top"
                                            >
                                                <Avatar
                                                    src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                    style={{
                                                        backgroundColor:
                                                            "#91CADF",
                                                        width: "38px",
                                                        height: "38px",
                                                        marginLeft: "-10%",
                                                    }}
                                                />
                                            </Tooltip>
                                            <Tooltip
                                                title="Ant User"
                                                placement="top"
                                            >
                                                <Avatar
                                                    src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                    style={{
                                                        backgroundColor:
                                                            "#5C5967",
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
                                                showModal(
                                                    "View Back-End Detail",
                                                    "Back-End"
                                                )
                                            }
                                        >
                                            {t("View Details")}
                                            <FolderOutlined className="iconfolder" />
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                            <div className="bodyposi">
                                <Card className = "card-pos"
                                    title="Front-End"
                                    extra={
                                        <>
                                            <Tag
                                                color="blue"
                                                style={{ borderRadius: "20px" }}
                                            >
                                                100 people
                                            </Tag>
                                            <Checkbox
                                                style={{ marginLeft: "10px" }}
                                            />
                                        </>
                                    }
                
                                >
                                    <p>
                                        <strong>{t("Technology")}:</strong> ReactJS,...
                                    </p>
                                    <p>
                                        <strong>{t("Rank")}:</strong> Intern, Fresher,
                                        Junior, Middle, Senior
                                    </p>
                                    <p>
                                        <strong>{t("Group Zalo")}:</strong>{" "}
                                        <a href="#">Link</a>
                                    </p>
                                    <div className="avatars">
                                        <>
                                            <Avatar.Group>
                                                <Tooltip
                                                    title="Ant User"
                                                    placement="top"
                                                >
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor:
                                                                "#FDD145",
                                                            width: "38px",
                                                            height: "38px",
                                                        }}
                                                    ></Avatar>
                                                </Tooltip>

                                                <Tooltip
                                                    title="Ant User"
                                                    placement="top"
                                                >
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor:
                                                                "#FDD145",
                                                            marginLeft: "-10%",
                                                            width: "38px",
                                                            height: "38px",
                                                        }}
                                                    ></Avatar>
                                                </Tooltip>
                                                <Tooltip
                                                    title="Ant User"
                                                    placement="top"
                                                >
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor:
                                                                "#91CADF",
                                                            width: "38px",
                                                            height: "38px",
                                                            marginLeft: "-10%",
                                                        }}
                                                        // icon={<UserOutlined />}
                                                    />
                                                </Tooltip>
                                                <Tooltip
                                                    title="Ant User"
                                                    placement="top"
                                                >
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor:
                                                                "#5C5967",
                                                            width: "38px",
                                                            height: "38px",
                                                            marginLeft: "-10%",
                                                        }}
                                                        // icon={<UserOutlined />}
                                                    />
                                                </Tooltip>
                                                <Avatar
                                                    style={{
                                                        backgroundColor:
                                                            "#F4D7DA",
                                                        width: "38px",
                                                        height: "38px",
                                                        marginLeft: "-10%",
                                                        color: "#D25B68",
                                                    }}
                                                    // icon={<UserOutlined />}
                                                >
                                                    +2
                                                </Avatar>
                                            </Avatar.Group>
                                        </>
                                    </div>
                                    <Button
                                        type="link"
                                        className="button-main"
                                        onClick={() =>
                                            showModal(
                                                "View Front-End Detail",
                                                "Front-End"
                                            )
                                        }
                                    >
                                        {t("View Details")}
                                        <FolderOutlined className="iconfolder" />
                                    </Button>
                                </Card>
                            </div>

                            <div className="bodyposi">
                                <Card className = "card-pos"
                                    title="Business Analyst"
                                    extra={
                                        <>
                                            <Tag
                                                color="blue"
                                                style={{ borderRadius: "20px" }}
                                            >
                                                100 people
                                            </Tag>
                                            <Checkbox
                                                style={{ marginLeft: "10px" }}
                                            />
                                        </>
                                    }
                
                                >
                                    <p>
                                        <strong>{t("Technology")}:</strong> Trello,...
                                    </p>
                                    <p>
                                        <strong>{t("Rank")}:</strong> Intern, Fresher,
                                        Junior, Middle, Senior
                                    </p>
                                    <p>
                                        <strong>{t("Group Zalo")}:</strong>{" "}
                                        <a href="#">Link</a>
                                    </p>
                                    <div className="avatars">
                                        <>
                                            <Avatar.Group>
                                                <Tooltip
                                                    title="Ant User"
                                                    placement="top"
                                                >
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor:
                                                                "#FDD145",
                                                            width: "38px",
                                                            height: "38px",
                                                        }}
                                                    ></Avatar>
                                                </Tooltip>

                                                <Tooltip
                                                    title="Ant User"
                                                    placement="top"
                                                >
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor:
                                                                "#FDD145",
                                                            marginLeft: "-10%",
                                                            width: "38px",
                                                            height: "38px",
                                                        }}
                                                    ></Avatar>
                                                </Tooltip>
                                                <Tooltip
                                                    title="Ant User"
                                                    placement="top"
                                                >
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor:
                                                                "#91CADF",
                                                            width: "38px",
                                                            height: "38px",
                                                            marginLeft: "-10%",
                                                        }}
                                                        // icon={<UserOutlined />}
                                                    />
                                                </Tooltip>
                                                <Tooltip
                                                    title="Ant User"
                                                    placement="top"
                                                >
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor:
                                                                "#5C5967",
                                                            width: "38px",
                                                            height: "38px",
                                                            marginLeft: "-10%",
                                                        }}
                                                        // icon={<UserOutlined />}
                                                    />
                                                </Tooltip>
                                                <Avatar
                                                    style={{
                                                        backgroundColor:
                                                            "#F4D7DA",
                                                        width: "38px",
                                                        height: "38px",
                                                        marginLeft: "-10%",
                                                        color: "#D25B68",
                                                    }}
                                                    // icon={<UserOutlined />}
                                                >
                                                    +2
                                                </Avatar>
                                            </Avatar.Group>
                                        </>
                                    </div>

                                    <Button
                                        type="link"
                                        className="button-main"
                                        onClick={() =>
                                            showModal(
                                                "View Business Analyst Detail",
                                                "Business Analyst"
                                            )
                                        }
                                    >
                                        {t("View Details")}
                                        <FolderOutlined className="iconfolder" />
                                    </Button>
                                </Card>
                            </div>

                            <div className="bodyposi">
                                <Card className = "card-pos"
                                    title="Marketing"
                                    extra={
                                        <>
                                            <Tag
                                                color="blue"
                                                style={{ borderRadius: "20px" }}
                                            >
                                                100 people
                                            </Tag>
                                            <Checkbox
                                                style={{ marginLeft: "10px" }}
                                            />
                                        </>
                                    }
                
                                >
                                    <p>
                                        <strong>{t("Technology")}:</strong> Excel,
                                        Word,...
                                    </p>
                                    <p>
                                        <strong>{t("Rank")}:</strong> Intern, Fresher,
                                        Junior, Middle, Senior
                                    </p>
                                    <p>
                                        <strong>{t("Group Zalo")}:</strong>{" "}
                                        <a href="#">Link</a>
                                    </p>
                                    <div className="avatars">
                                        <>
                                            <Avatar.Group>
                                                <Tooltip
                                                    title="Ant User"
                                                    placement="top"
                                                >
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor:
                                                                "#FDD145",
                                                            width: "38px",
                                                            height: "38px",
                                                        }}
                                                    ></Avatar>
                                                </Tooltip>

                                                <Tooltip
                                                    title="Ant User"
                                                    placement="top"
                                                >
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor:
                                                                "#FDD145",
                                                            marginLeft: "-10%",
                                                            width: "38px",
                                                            height: "38px",
                                                        }}
                                                    ></Avatar>
                                                </Tooltip>
                                                <Tooltip
                                                    title="Ant User"
                                                    placement="top"
                                                >
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor:
                                                                "#91CADF",
                                                            width: "38px",
                                                            height: "38px",
                                                            marginLeft: "-10%",
                                                        }}
                                                        // icon={<UserOutlined />}
                                                    />
                                                </Tooltip>
                                                <Tooltip
                                                    title="Ant User"
                                                    placement="top"
                                                >
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor:
                                                                "#5C5967",
                                                            width: "38px",
                                                            height: "38px",
                                                            marginLeft: "-10%",
                                                        }}
                                                        // icon={<UserOutlined />}
                                                    />
                                                </Tooltip>
                                                <Avatar
                                                    style={{
                                                        backgroundColor:
                                                            "#F4D7DA",
                                                        width: "38px",
                                                        height: "38px",
                                                        marginLeft: "-10%",
                                                        color: "#D25B68",
                                                    }}
                                                    // icon={<UserOutlined />}
                                                >
                                                    +2
                                                </Avatar>
                                            </Avatar.Group>
                                        </>
                                    </div>
                                    <Button
                                        type="link"
                                        className="button-main"
                                        onClick={() =>
                                            showModal(
                                                "View Marketing Detail",
                                                "Marketing"
                                            )
                                        }
                                    >
                                        {t("View Details")}
                                        <FolderOutlined className="iconfolder" />
                                    </Button>
                                </Card>
                            </div>

                            <div className="bodyposi">
                                <Card className = "card-pos"
                                    title="Designer"
                                    extra={
                                        <>
                                            <Tag
                                                color="blue"
                                                style={{ borderRadius: "20px" }}
                                            >
                                                100 people
                                            </Tag>
                                            <Checkbox
                                                style={{ marginLeft: "10px" }}
                                            />
                                        </>
                                    }
                
                                >
                                    <p>
                                        <strong>{t("Technology")}:</strong> ReactJS,...
                                    </p>
                                    <p>
                                        <strong>{t("Rank")}:</strong> Intern, Fresher,
                                        Junior, Middle, Senior
                                    </p>
                                    <p>
                                        <strong>{t("Group Zalo")}:</strong>{" "}
                                        <a href="#">Link</a>
                                    </p>
                                    <div className="avatars">
                                        <>
                                            <Avatar.Group>
                                                <Tooltip
                                                    title="Ant User"
                                                    placement="top"
                                                >
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor:
                                                                "#FDD145",
                                                            width: "38px",
                                                            height: "38px",
                                                        }}
                                                    ></Avatar>
                                                </Tooltip>

                                                <Tooltip
                                                    title="Ant User"
                                                    placement="top"
                                                >
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor:
                                                                "#FDD145",
                                                            marginLeft: "-10%",
                                                            width: "38px",
                                                            height: "38px",
                                                        }}
                                                    ></Avatar>
                                                </Tooltip>
                                                <Tooltip
                                                    title="Ant User"
                                                    placement="top"
                                                >
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor:
                                                                "#91CADF",
                                                            width: "38px",
                                                            height: "38px",
                                                            marginLeft: "-10%",
                                                        }}
                                                        // icon={<UserOutlined />}
                                                    />
                                                </Tooltip>
                                                <Tooltip
                                                    title="Ant User"
                                                    placement="top"
                                                >
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor:
                                                                "#5C5967",
                                                            width: "38px",
                                                            height: "38px",
                                                            marginLeft: "-10%",
                                                        }}
                                                        // icon={<UserOutlined />}
                                                    />
                                                </Tooltip>
                                                <Avatar
                                                    style={{
                                                        backgroundColor:
                                                            "#F4D7DA",
                                                        width: "38px",
                                                        height: "38px",
                                                        marginLeft: "-10%",
                                                        color: "#D25B68",
                                                    }}
                                                    // icon={<UserOutlined />}
                                                >
                                                    +2
                                                </Avatar>
                                            </Avatar.Group>
                                        </>
                                    </div>
                                    <Button
                                        type="link"
                                        className="button-main"
                                        onClick={() =>
                                            showModal(
                                                "View Designer Detail",
                                                "Designer"
                                            )
                                        }
                                    >
                                        {t("View Details")}
                                        <FolderOutlined className="iconfolder" />
                                    </Button>
                                </Card>
                            </div>

                            <div className="bodyposi">
                                <Card className = "card-pos"
                                    title="Sales Executive"
                                    extra={
                                        <>
                                            <Tag
                                                color="blue"
                                                style={{ borderRadius: "20px" }}
                                            >
                                                100 people
                                            </Tag>
                                            <Checkbox
                                                style={{ marginLeft: "10px" }}
                                            />
                                        </>
                                    }
                
                                >
                                    <p>
                                        <strong>{t("Technology")}:</strong> Trello,...
                                    </p>
                                    <p>
                                        <strong>{t("Rank")}:</strong> Intern, Fresher,
                                        Junior, Middle, Senior
                                    </p>
                                    <p>
                                        <strong>{t("Group Zalo")}:</strong>{" "}
                                        <a href="#">Link</a>
                                    </p>
                                    <div className="avatars">
                                        <>
                                            <Avatar.Group>
                                                <Tooltip
                                                    title="Ant User"
                                                    placement="top"
                                                >
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor:
                                                                "#FDD145",
                                                            width: "38px",
                                                            height: "38px",
                                                        }}
                                                    ></Avatar>
                                                </Tooltip>

                                                <Tooltip
                                                    title="Ant User"
                                                    placement="top"
                                                >
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor:
                                                                "#FDD145",
                                                            marginLeft: "-10%",
                                                            width: "38px",
                                                            height: "38px",
                                                        }}
                                                    ></Avatar>
                                                </Tooltip>
                                                <Tooltip
                                                    title="Ant User"
                                                    placement="top"
                                                >
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor:
                                                                "#91CADF",
                                                            width: "38px",
                                                            height: "38px",
                                                            marginLeft: "-10%",
                                                        }}
                                                        // icon={<UserOutlined />}
                                                    />
                                                </Tooltip>
                                                <Tooltip
                                                    title="Ant User"
                                                    placement="top"
                                                >
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor:
                                                                "#5C5967",
                                                            width: "38px",
                                                            height: "38px",
                                                            marginLeft: "-10%",
                                                        }}
                                                        // icon={<UserOutlined />}
                                                    />
                                                </Tooltip>
                                                <Avatar
                                                    style={{
                                                        backgroundColor:
                                                            "#F4D7DA",
                                                        width: "38px",
                                                        height: "38px",
                                                        marginLeft: "-10%",
                                                        color: "#D25B68",
                                                    }}
                                                    // icon={<UserOutlined />}
                                                >
                                                    +2
                                                </Avatar>
                                            </Avatar.Group>
                                        </>
                                    </div>
                                    <Button
                                        type="link"
                                        className="button-main"
                                        onClick={() =>
                                            showModal(
                                                "View Sales Executive Detail",
                                                "Sales Executive"
                                            )
                                        }
                                    >
                                        {t("View Details")}
                                        <FolderOutlined className="iconfolder" />
                                    </Button>
                                </Card>
                            </div>
                            <div style={{ position: "relative"}}>
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
                                    <Pagination
                                        defaultCurrent={1}
                                        total={10} // Total number of pages
                                        pageSize={3} // Number of items per page
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <Modal
                        title={modalTitle}
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        width={1100}
                        footer={[]}
                    >
                        <Table
                            columns={columns}
                            dataSource={selectedInterns}
                            pagination={false}
                        />
                    </Modal>
                </main>
            </MainLayout>
        </div>
    );

};

export default PositionManagement;
