import React from 'react';
import './TechNavigation.css';
import { Row, Col } from 'antd';
const Navigation = ({ activeTab, onTabClick }) => {
    const handleTabClick = (tab) => {
        onTabClick(tab);
    };

    const tabs = ['Back-End', 'Front-End', 'Business Analyst', 'Marketing', 'Design'];

    return (
        <div className="navigation-technology-management">
            <Row justify="center"> {/* Sử dụng Row từ Ant Design và đặt justify="center" để căn giữa */}
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
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Navigation;