import React, { useState } from 'react';
import './TechNavigation.css';
import { Row, Col, Dropdown, Menu } from 'antd';

const Navigation = ({ activeTab, onTabClick }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleTabClick = (tab) => {
        onTabClick(tab);
        setIsDropdownOpen(false);
    };

    const tabs = ['Back-End', 'Front-End', 'Business Analyst', 'Marketing', 'Design'];

    const dropdownMenu = (
        <Menu>
            {tabs.map((tab) => (
                <Menu.Item key={tab} onClick={() => handleTabClick(tab)}>
                    {tab}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div className="navigation-technology-management">
            <Row justify="center">
                <Col>
                    <div className="navigation-technology-management">
                        <ul className="nav-tabs">
                            {tabs.map((tab) => (
                                <li
                                    key={tab}
                                    className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
                                    onClick={() => handleTabClick(tab)}
                                >
                                    {tab}
                                </li>
                            ))}
                        </ul>

                        <div className="dropdown-container">
                            <Dropdown
                                overlay={dropdownMenu}
                                trigger={['click']}
                                onVisibleChange={(visible) => setIsDropdownOpen(visible)}
                                open={isDropdownOpen}
                                overlayClassName="custom-dropdown-overlay" /* Thêm class cho overlay */
                                getPopupContainer={(trigger) => trigger.parentNode}
                            >
                                <button className="dropdown-toggle custom-dropdown-trigger">
                                    {activeTab} <span className="caret"></span>
                                </button>
                            </Dropdown>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Navigation;