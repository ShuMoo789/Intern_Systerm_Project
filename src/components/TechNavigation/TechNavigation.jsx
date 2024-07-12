import React, { useState } from 'react';
import './TechNavigation.css';
import { Row, Col, Dropdown, Menu } from 'antd';

const Navigation = ({ activeTab, onTabClick }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const tabValues = {
        'Back-End': 1,
        'Front-End': 2,
        'Business Analyst': 3,
        'Marketing': 4,
        'Design': 5,
    };

    const handleTabClick = (tab) => {
        onTabClick(tabValues[tab]);
        setIsDropdownOpen(false);
    };

    const tabs = Object.keys(tabValues);

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
                                    className={`nav-tab ${activeTab === tabValues[tab] ? 'active' : ''}`}
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
                                overlayClassName="custom-dropdown-overlay"
                                getPopupContainer={(trigger) => trigger.parentNode}
                            >
                                <button className="dropdown-toggle custom-dropdown-trigger">
                                    {tabs.find((key) => tabValues[key] === activeTab)} <span className="caret"></span>
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