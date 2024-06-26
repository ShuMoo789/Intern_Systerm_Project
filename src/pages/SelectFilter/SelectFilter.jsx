import React, { useState } from "react";
import {
    Avatar,
    Typography,
    Col,
    Row,
    Button,
    Menu,
    Dropdown,
    Select,
} from "antd";
import { EllipsisOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import "./SelectFilter.css"; // Import file CSS
import useViewport from "../../hooks/useViewport";
import { useTranslation } from "react-i18next";

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
    const {t} = useTranslation()
    const menuButton = (
        <Menu>
            <Menu.Item key="1">{t("Option")} 1</Menu.Item>
            <Menu.Item key="2">{t("Option")} 2</Menu.Item>
            <Menu.Item key="3">{t("Option")} 3</Menu.Item>
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
                    <a
                        href="/GroupZaloManagementDetails"
                        className="click-view"
                    >
                        {t("Click to view")}
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
    const viewPort = useViewport();
    const {t} = useTranslation()
    const isMobile = viewPort.width <= 1200;

    // const [filter, setFilter] = useState('');

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
        {
            title: "title 5",
        },
        {
            title: "title 6",
        },
    ]);

    const [expanded, setExpanded] = useState(false);
    const [filter, setFilter] = useState(""); // add a state for the filter

    const handleFilterChange = (value) => {
        setFilter(value);
    };

    const filteredData = data.filter((item) => {
        if (filter === "") {
            return true;
        } else {
            return item.title.toLowerCase().includes(filter.toLowerCase());
        }
    });

    const handleClick = () => {
        let arr = [
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
            setData((pre) => pre.slice(0, 6));
        }
        setExpanded(!expanded);
    };

    return (
        <div className="container-group">
            <main className="main-content-group">
                <Row className="row-custom">
                    <Col className="list-items">
                        <div className="filter-container">
                            <Select
                                className="filter-select"
                                showSearch
                                value={filter}
                                onChange={handleFilterChange}
                                placeholder={
                                    <span className="filter-placeholder">
                                        {t("Filter by title")}
                                    </span>
                                }
                                style={{ width: "15%" }}
                            >
                                <Select.Option value="">{t("All")}</Select.Option>
                                <Select.Option value="Designer">
                                    Designer
                                </Select.Option>
                                <Select.Option value="Back_End">
                                    Back_End
                                </Select.Option>
                                <Select.Option value="Front_End">
                                    Front_End
                                </Select.Option>
                                <Select.Option value="Marketing">
                                    Marketing
                                </Select.Option>
                            </Select>
                        </div>
                        {/* Mobile */}
                        {!isMobile ? (
                            <Row gutter={[16, 16]}>
                                {filteredData.map((item, index) => {
                                    return (
                                        <Col span={12} key={index}>
                                            <GroupItem data={item} />
                                        </Col>
                                    );
                                })}
                            </Row>
                        ) : (
                            filteredData.map((item, index) => (
                                <Row key={index} gutter={[0, 16]}>
                                    <Col span={24}>
                                        <GroupItem data={item} />
                                    </Col>
                                </Row>
                            ))
                        )}
                    </Col>

                    <Row className="row-btn">
                        <div className="cta-btn">
                            <Button className="arrow-btn" onClick={handleClick}>
                                {expanded ? (
                                    <UpOutlined style={{ fontSize: "20px" }} />
                                ) : (
                                    <DownOutlined
                                        style={{ fontSize: "20px" }}
                                    />
                                )}
                            </Button>
                        </div>
                    </Row>
                </Row>
            </main>
        </div>
    );
};

export default MyComponent;
