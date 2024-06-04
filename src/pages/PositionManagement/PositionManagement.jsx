import React, { useState, useEffect } from 'react';
import { Table, Checkbox, Button, Select, Modal, Row, Col, Card, Avatar, Tag, Divider, Tooltip, Pagination } from 'antd'; // Import Select from antd
import MainLayout from '../../MainLayout/MainLayout';
import User_Img from "../../assets/user_image.png";
import {
    DownOutlined,
    EyeOutlined,
    PlusOutlined,
    SettingOutlined,
    ArrowRightOutlined,
    ArrowLeftOutlined,
    SearchOutlined,
    DeleteOutlined,
    UserOutlined, AntDesignOutlined, FolderOutlined
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
import "../PositionManagement/PositionManagement.css"
const { RangePicker } = DatePicker;
const { Option } = Select; // Destructure Option from Select
const { Meta } = Card;

const PositionManagement = () => {
    return (
        <div id="APRCV">



            <MainLayout>

                <main className="content">
                    <header className="content-header">
                        <h1 className="content-title"><b>Position Management</b></h1>
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
                        {/* <h2 className="section-title">Search for Information</h2> */}
                        <div className="button-group-position">
                            {/* <button className="button button-schedule">
                                <Sheldule />
                            </button> */}
                            {/* <SendMailButton /> */}
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

                    <section>
                        <div className='bodyposition'>
                            <div className='bodyposi'>
                                <Card
                                    title="Back-End"
                                    extra={<><Tag color="blue" style={{ borderRadius: "20px" }}>100 people</Tag><Checkbox style={{ marginLeft: '10px' }} /></>}
                                    style={{ width: 336, height: 250 }}
                                >
                                    <p><strong>Technology:</strong> .NET, Java, ...</p>
                                    <p><strong>Rank:</strong> Intern, Fresher, Junior, Middle, Senior</p>
                                    <p><strong>Group Zalo:</strong> <a href="#">Link</a></p>
                                    <div className="avatars">

                                        <>
                                            <Avatar.Group>
                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#FDD145',
                                                            width: "38px",
                                                            height: "38px"
                                                        }}>
                                                    </Avatar>
                                                </Tooltip>

                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#FDD145',
                                                            marginLeft: "-10%",
                                                            width: "38px",
                                                            height: "38px"
                                                        }}
                                                    >
                                                    </Avatar>
                                                </Tooltip>
                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#91CADF',
                                                            width: "38px",
                                                            height: "38px",
                                                            marginLeft: "-10%"
                                                        }}
                                                    // icon={<UserOutlined />}
                                                    />
                                                </Tooltip>
                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#5C5967',
                                                            width: "38px",
                                                            height: "38px",
                                                            marginLeft: "-10%"
                                                        }}
                                                    // icon={<UserOutlined />}
                                                    />
                                                </Tooltip>
                                                <Avatar

                                                    style={{
                                                        backgroundColor: '#F4D7DA',
                                                        width: "38px",
                                                        height: "38px",
                                                        marginLeft: "-10%",
                                                        color: "#D25B68"
                                                    }}
                                                // icon={<UserOutlined />}
                                                >+2</Avatar>
                                            </Avatar.Group>
                                        </>
                                    </div>
                                    <div className=' small-button'>
                                        <FolderOutlined style={{ marginRight: "6px" }} />View Details
                                    </div>
                                </Card>
                            </div>

                            <div className='bodyposi'>
                                <Card
                                    title="Front-End"
                                    extra={<><Tag color="blue" style={{ borderRadius: "20px" }}>100 people</Tag><Checkbox style={{ marginLeft: '10px' }} /></>}
                                    style={{ width: 336, height: 250 }}
                                >
                                    <p><strong>Technology:</strong> ReactJS,...</p>
                                    <p><strong>Rank:</strong> Intern, Fresher, Junior, Middle, Senior</p>
                                    <p><strong>Group Zalo:</strong> <a href="#">Link</a></p>
                                    <div className="avatars">

                                        <>
                                            <Avatar.Group>
                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#FDD145',
                                                            width: "38px",
                                                            height: "38px"
                                                        }}>
                                                    </Avatar>
                                                </Tooltip>

                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#FDD145',
                                                            marginLeft: "-10%",
                                                            width: "38px",
                                                            height: "38px"
                                                        }}
                                                    >
                                                    </Avatar>
                                                </Tooltip>
                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#91CADF',
                                                            width: "38px",
                                                            height: "38px",
                                                            marginLeft: "-10%"
                                                        }}
                                                    // icon={<UserOutlined />}
                                                    />
                                                </Tooltip>
                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#5C5967',
                                                            width: "38px",
                                                            height: "38px",
                                                            marginLeft: "-10%"
                                                        }}
                                                    // icon={<UserOutlined />}
                                                    />
                                                </Tooltip>
                                                <Avatar

                                                    style={{
                                                        backgroundColor: '#F4D7DA',
                                                        width: "38px",
                                                        height: "38px",
                                                        marginLeft: "-10%",
                                                        color: "#D25B68"
                                                    }}
                                                // icon={<UserOutlined />}
                                                >+2</Avatar>
                                            </Avatar.Group>
                                        </>
                                    </div>
                                    <div className=' small-button'>
                                        <FolderOutlined style={{ marginRight: "6px" }} />View Details
                                    </div>
                                </Card>
                            </div>

                            <div className='bodyposi'>
                                <Card
                                    title="Business Analyst"
                                    extra={<><Tag color="blue" style={{ borderRadius: "20px" }}>100 people</Tag><Checkbox style={{ marginLeft: '10px' }} /></>}
                                    style={{ width: 336, height: 250 }}
                                >
                                    <p><strong>Technology:</strong> Trello,...</p>
                                    <p><strong>Rank:</strong> Intern, Fresher, Junior, Middle, Senior</p>
                                    <p><strong>Group Zalo:</strong> <a href="#">Link</a></p>
                                    <div className="avatars">

                                        <>
                                            <Avatar.Group>
                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#FDD145',
                                                            width: "38px",
                                                            height: "38px"
                                                        }}>
                                                    </Avatar>
                                                </Tooltip>

                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#FDD145',
                                                            marginLeft: "-10%",
                                                            width: "38px",
                                                            height: "38px"
                                                        }}
                                                    >
                                                    </Avatar>
                                                </Tooltip>
                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#91CADF',
                                                            width: "38px",
                                                            height: "38px",
                                                            marginLeft: "-10%"
                                                        }}
                                                    // icon={<UserOutlined />}
                                                    />
                                                </Tooltip>
                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#5C5967',
                                                            width: "38px",
                                                            height: "38px",
                                                            marginLeft: "-10%"
                                                        }}
                                                    // icon={<UserOutlined />}
                                                    />
                                                </Tooltip>
                                                <Avatar

                                                    style={{
                                                        backgroundColor: '#F4D7DA',
                                                        width: "38px",
                                                        height: "38px",
                                                        marginLeft: "-10%",
                                                        color: "#D25B68"
                                                    }}
                                                // icon={<UserOutlined />}
                                                >+2</Avatar>
                                            </Avatar.Group>
                                        </>
                                    </div>


                                    <div className=' small-button'>
                                        <FolderOutlined style={{ marginRight: "6px" }} />View Details
                                    </div>
                                </Card>
                            </div>

                            <div className='bodyposi'>
                                <Card
                                    title="Marketing"
                                    extra={<><Tag color="blue" style={{ borderRadius: "20px" }}>100 people</Tag><Checkbox style={{ marginLeft: '10px' }} /></>}
                                    style={{ width: 336 }}
                                >
                                    <p><strong>Technology:</strong> Excel, Word,...</p>
                                    <p><strong>Rank:</strong> Intern, Fresher, Junior, Middle, Senior</p>
                                    <p><strong>Group Zalo:</strong> <a href="#">Link</a></p>
                                    <div className="avatars">

                                        <>
                                            <Avatar.Group>
                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#FDD145',
                                                            width: "38px",
                                                            height: "38px"
                                                        }}>
                                                    </Avatar>
                                                </Tooltip>

                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#FDD145',
                                                            marginLeft: "-10%",
                                                            width: "38px",
                                                            height: "38px"
                                                        }}
                                                    >
                                                    </Avatar>
                                                </Tooltip>
                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#91CADF',
                                                            width: "38px",
                                                            height: "38px",
                                                            marginLeft: "-10%"
                                                        }}
                                                    // icon={<UserOutlined />}
                                                    />
                                                </Tooltip>
                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#5C5967',
                                                            width: "38px",
                                                            height: "38px",
                                                            marginLeft: "-10%"
                                                        }}
                                                    // icon={<UserOutlined />}
                                                    />
                                                </Tooltip>
                                                <Avatar

                                                    style={{
                                                        backgroundColor: '#F4D7DA',
                                                        width: "38px",
                                                        height: "38px",
                                                        marginLeft: "-10%",
                                                        color: "#D25B68"
                                                    }}
                                                // icon={<UserOutlined />}
                                                >+2</Avatar>
                                            </Avatar.Group>
                                        </>
                                    </div>
                                    <div className=' small-button'>
                                        <FolderOutlined style={{ marginRight: "6px" }} />View Details
                                    </div>
                                </Card>
                            </div>

                            <div className='bodyposi'>
                                <Card
                                    title="Designer"
                                    extra={<><Tag color="blue" style={{ borderRadius: "20px" }}>100 people</Tag><Checkbox style={{ marginLeft: '10px' }} /></>}
                                    style={{ width: 336 }}
                                >
                                    <p><strong>Technology:</strong> ReactJS,...</p>
                                    <p><strong>Rank:</strong> Intern, Fresher, Junior, Middle, Senior</p>
                                    <p><strong>Group Zalo:</strong> <a href="#">Link</a></p>
                                    <div className="avatars">

                                        <>
                                            <Avatar.Group>
                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#FDD145',
                                                            width: "38px",
                                                            height: "38px"
                                                        }}>
                                                    </Avatar>
                                                </Tooltip>

                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#FDD145',
                                                            marginLeft: "-10%",
                                                            width: "38px",
                                                            height: "38px"
                                                        }}
                                                    >
                                                    </Avatar>
                                                </Tooltip>
                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#91CADF',
                                                            width: "38px",
                                                            height: "38px",
                                                            marginLeft: "-10%"
                                                        }}
                                                    // icon={<UserOutlined />}
                                                    />
                                                </Tooltip>
                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#5C5967',
                                                            width: "38px",
                                                            height: "38px",
                                                            marginLeft: "-10%"
                                                        }}
                                                    // icon={<UserOutlined />}
                                                    />
                                                </Tooltip>
                                                <Avatar

                                                    style={{
                                                        backgroundColor: '#F4D7DA',
                                                        width: "38px",
                                                        height: "38px",
                                                        marginLeft: "-10%",
                                                        color: "#D25B68"
                                                    }}
                                                // icon={<UserOutlined />}
                                                >+2</Avatar>
                                            </Avatar.Group>
                                        </>
                                    </div>
                                    <div className=' small-button'>
                                        <FolderOutlined style={{ marginRight: "6px" }} />View Details
                                    </div>
                                </Card>
                            </div>

                            <div className='bodyposi'>
                                <Card
                                    title="Sales Executive"
                                    extra={<><Tag color="blue" style={{ borderRadius: "20px" }}>100 people</Tag><Checkbox style={{ marginLeft: '10px' }} /></>}
                                    style={{ width: 336 }}
                                >
                                    <p><strong>Technology:</strong> Trello,...</p>
                                    <p><strong>Rank:</strong> Intern, Fresher, Junior, Middle, Senior</p>
                                    <p><strong>Group Zalo:</strong> <a href="#">Link</a></p>
                                    <div className="avatars">

                                        <>
                                            <Avatar.Group>
                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#FDD145',
                                                            width: "38px",
                                                            height: "38px"
                                                        }}>
                                                    </Avatar>
                                                </Tooltip>

                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#FDD145',
                                                            marginLeft: "-10%",
                                                            width: "38px",
                                                            height: "38px"
                                                        }}
                                                    >
                                                    </Avatar>
                                                </Tooltip>
                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#91CADF',
                                                            width: "38px",
                                                            height: "38px",
                                                            marginLeft: "-10%"
                                                        }}
                                                    // icon={<UserOutlined />}
                                                    />
                                                </Tooltip>
                                                <Tooltip title="Ant User" placement="top">
                                                    <Avatar
                                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                                        style={{
                                                            backgroundColor: '#5C5967',
                                                            width: "38px",
                                                            height: "38px",
                                                            marginLeft: "-10%"
                                                        }}
                                                    // icon={<UserOutlined />}
                                                    />
                                                </Tooltip>
                                                <Avatar

                                                    style={{
                                                        backgroundColor: '#F4D7DA',
                                                        width: "38px",
                                                        height: "38px",
                                                        marginLeft: "-10%",
                                                        color: "#D25B68"
                                                    }}
                                                // icon={<UserOutlined />}
                                                >+2</Avatar>
                                            </Avatar.Group>
                                        </>
                                    </div>
                                    <div className=' small-button'>
                                        <FolderOutlined style={{ marginRight: "6px" }} />View Details
                                    </div>
                                </Card>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                                <Pagination
                                    defaultCurrent={1}
                                    total={10} // Total number of pages
                                    pageSize={3} // Number of items per page
                                />
                            </div>
                        </div>
                    </section>




                </main >
            </MainLayout>


        </div >
    );
};

export default PositionManagement;