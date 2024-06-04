import React, { useState } from "react";
import { Avatar, Typography, Col, Row, Button, Menu, Dropdown } from "antd";
import { EllipsisOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import "./GroupOnPage.css"; // Import file CSS

// Avatar Group
const AvatarGroup = () => {
    const avatars = [
        {
            src: "https://gamek.mediacdn.vn/133514250583805952/2021/11/28/photo-1-16381089620781449115253.jpg",
            alt: "Avatar 1",
        },
        {
            src: "https://vnn-imgs-a1.vgcloud.vn/icdn.dantri.com.vn/2021/05/08/kimoanh-851-1620472406599.jpeg",
            alt: "Avatar 2",
        },
        {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJiKR0ltYLsa4iJOiCGL5KwkfaLplmtgiyxQ&s",
            alt: "Avatar 3",
        },
        {
            src: "https://gamek.mediacdn.vn/133514250583805952/2021/11/28/photo-1-16381089620781449115253.jpg",
            alt: "Avatar 4",
        },
        {
            src: "https://gamek.mediacdn.vn/133514250583805952/2021/11/28/photo-1-16381089620781449115253.jpg",
            alt: "Avatar 5",
        },
        {
            src: "https://gamek.mediacdn.vn/133514250583805952/2021/11/28/photo-1-16381089620781449115253.jpg",
            alt: "Avatar 6",
        },
        {
            src: "https://gamek.mediacdn.vn/133514250583805952/2021/11/28/photo-1-16381089620781449115253.jpg",
            alt: "Avatar 7",
        },
        {
            src: "https://gamek.mediacdn.vn/133514250583805952/2021/11/28/photo-1-16381089620781449115253.jpg",
            alt: "Avatar 8",
        },
        {
            src: "https://gamek.mediacdn.vn/133514250583805952/2021/11/28/photo-1-16381089620781449115253.jpg",
            alt: "Avatar 9",
        },
    ];

    // Đảm bảo chỉ hiển thị tối đa 3 avatar
    const displayedAvatars = avatars.slice(0, 3);
    // Số lượng avatar còn lại
    const remainingCount = avatars.length - displayedAvatars.length;

    return (
        <div className="avatar-group">
            {displayedAvatars.map((avatar, index) => (
                <Avatar
                    key={index}
                    className="my-avatar"
                    src={avatar.src}
                    alt={avatar.alt}
                />
            ))}
            {remainingCount > 0 && (
                <div className="avatar-counter">+{remainingCount}</div>
            )}
        </div>
    );
};

// Item Group
const GroupItem = ({ data }) => {
    const menuButton = (
        <Menu>
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
        </Menu>
    );

    return (
        <div className="group-item">
            <div className="group-box">
                <AvatarGroup />

                <div className="title-group">
                    <Typography.Title className="title-name">
                        {data.title}
                    </Typography.Title>
                    <a href="#!" className="click-view">
                        Click to view
                    </a>
                </div>
            </div>

            <div className="drop-down-btn">
                <Dropdown overlay={menuButton} trigger={["click"]}>
                    <Button className="custom-dropdown-button">
                        <EllipsisOutlined />
                    </Button>
                </Dropdown>
            </div>
        </div>
    );
};

// Main Component
const MyComponent = () => {
    const [data, setData] = useState([
        {
            title: "Designer_FU_SP24",
        },
        {
            title: "Back_End_FU_SP24",
        },
        {
            title: "Front_End_FU_SP24",
        },
        {
            title: "Marketing_FU_SP24",
        },
    ]);

    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        let arr = [
            {
                title: "title 5",
            },
            {
                title: "title 6",
            },
            {
                title: "title 7",
            },
            {
                title: "title 8",
            },
            {
                title: "title 9",
            },
            {
                title: "title 10",
            },
        ];
        if (data.length < 10 && !expanded) {
            setData((pre) => [...pre, ...arr]);
        } else {
            setData((pre) => pre.slice(0, 4));
        }
        setExpanded(!expanded);
    };

    return (
        <div className="container-group">
            <main className="main-content-group">
                <Row className="row-custom">
                    <Col className="list-items">
                        {data.map((item, index) => {
                            return (
                                <Row>
                                    <GroupItem data={item} />
                                </Row>
                            );
                        })}
                    </Col>
                </Row>
            </main>
            <div className="cta-btn">
                <Button className="arrow-btn" onClick={handleClick}>
                    {expanded ? (
                        <UpOutlined style={{ fontSize: "40px" }} />
                    ) : (
                        <DownOutlined style={{ fontSize: "40px" }} />
                    )}
                </Button>
            </div>
        </div>
    );
};

export default MyComponent;
