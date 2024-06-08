import React from "react";


import "./MenuNavigate.css";
import Icon, {
    AppstoreOutlined,
    AuditOutlined,
    SettingOutlined,
    TeamOutlined,
    ProjectOutlined,
    LeftOutlined,
    RightOutlined
} from "@ant-design/icons";
import { Menu, Button } from "antd";
import logo from "../../assets/Logo.png";
import AccountSetting from "../AccountSetting/AccountSetting";
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import useViewport from "../../hooks/useViewport";
import miniLogo from "../../assets/chibi-logo.png";

const ZaloSvg = () => (
    <svg width="1em" height="1em" viewBox="0 0 26 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.34277 11.7157H10.8407L7.34277 17.6727H10.8407" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M22.4734 3.03967L7.36353 3.06024C2.87186 7.40884 1.51769 13.2959 5.52499 21.8127C5.77915 22.8164 5.33801 23.8224 4.48332 24.8267C5.71483 25.016 6.96768 24.7553 8.05832 24.0828C15.3411 27.7673 19.4745 25.3638 23.4979 22.4767L23.5161 4.21614C23.5164 3.90454 23.407 3.60556 23.212 3.38495C23.0169 3.16433 22.7522 3.04014 22.476 3.03967H22.4734Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M14.1988 16.1378C14.1988 16.9857 13.5634 17.6727 12.7801 17.6727C11.9967 17.6727 11.3613 16.9852 11.3613 16.1378V15.1399C11.3613 14.2926 11.9967 13.605 12.7801 13.605C13.5634 13.605 14.1988 14.2926 14.1988 15.1399M18.954 13.6062C19.3289 13.6062 19.6885 13.7742 19.9536 14.0733C20.2187 14.3724 20.3676 14.7781 20.3676 15.2011V16.079C20.3676 16.5019 20.2187 16.9075 19.9537 17.2065C19.6888 17.5056 19.3294 17.6737 18.9546 17.6739C18.5797 17.6739 18.2201 17.5059 17.955 17.2068C17.6899 16.9077 17.541 16.502 17.541 16.079V15.2011C17.541 14.7781 17.6899 14.3724 17.955 14.0733C18.2201 13.7742 18.5797 13.6062 18.9546 13.6062M14.1988 17.6727V13.6056M15.5952 11.533V16.9058C15.5952 17.3301 15.8999 17.6739 16.2754 17.6739H16.4796" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
)

const PositionSvg = () => (
    <svg width="1em" height="1em" viewBox="0 0 23 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_770_1914)">
            <path d="M15.8499 12.6919L15.8388 12.7246C15.8423 12.7147 15.845 12.7046 15.8485 12.6947L15.8499 12.6919ZM14.6849 19.0358L14.3668 19.4795C14.7969 19.5382 15.2132 19.6069 15.6031 19.6902L14.3429 20.1114L16.0249 20.6162L17.2786 20.1701C18.0487 20.4615 19.115 20.8178 19.4682 21.2229H16.9543L17.2041 22.0471H19.8128C19.805 22.5116 19.069 22.8889 18.3661 23.1946L16.5833 22.7597L14.9037 23.4388L16.6977 23.9007C15.6502 24.2225 13.8917 24.4182 12.4358 24.5082L12.3746 23.5636H10.6252L10.5638 24.5082C9.10788 24.4182 7.34953 24.2228 6.30188 23.901L8.09611 23.4388L6.41642 22.7597L4.63346 23.1946C3.9407 22.9571 3.19481 22.5116 3.18699 22.0471H5.79588L6.04566 21.2229H3.53176C3.88504 20.8178 4.95132 20.4615 5.72136 20.1701L6.97509 20.6162L8.65708 20.1114L7.39691 19.6902C7.80387 19.6054 8.21318 19.5355 8.62419 19.4808L8.3107 19.0363C4.91015 19.4351 2.08391 20.2845 1.34285 21.6259C0.160881 23.7637 4.52122 25.9142 11.355 25.9477C11.4566 25.9534 11.5569 25.9492 11.6517 25.9477C18.4815 25.9124 22.838 23.7627 21.6569 21.6259C20.9154 20.284 18.0875 19.4344 14.6849 19.0358Z" fill="black" />
            <path d="M11.4665 -0.000179186C10.8318 0.00971107 10.2261 0.301148 9.78038 0.811081C9.33466 1.32101 9.08481 2.00844 9.08487 2.72463C9.08487 3.44729 9.33931 4.14036 9.79221 4.65136C10.2451 5.16236 10.8594 5.44944 11.4999 5.44944C12.1404 5.44944 12.7546 5.16236 13.2075 4.65136C13.6604 4.14036 13.9149 3.44729 13.9149 2.72463C13.9149 2.00196 13.6604 1.3089 13.2075 0.797898C12.7546 0.286898 12.1404 -0.000179186 11.4999 -0.000179186C11.4888 -0.000265792 11.4776 -0.000265792 11.4665 -0.000179186ZM11.4534 6.12207C9.65159 6.12259 7.86633 6.99609 8.05401 8.74204L8.51401 12.5373C8.59474 13.205 8.99471 14.2726 9.59202 14.2726H9.63457L10.1238 20.6385C10.1449 20.9253 10.3289 21.1576 10.5838 21.1576H12.4238C12.6786 21.1576 12.8626 20.9253 12.8838 20.6385L13.373 14.2729H13.4158C14.0131 14.2729 14.4128 13.205 14.4938 12.5373L14.9538 8.74204C15.0743 6.99453 13.2555 6.12181 11.4534 6.12207ZM-36.6276 16.0417L-36.6387 16.0744C-36.635 16.0645 -36.6325 16.0546 -36.6288 16.0445C-36.6288 16.0435 -36.6279 16.0427 -36.6274 16.0419L-36.6276 16.0417Z" fill="black" />
        </g>
        <defs>
            <clipPath id="clip0_770_1914">
                <rect width="23" height="25.9505" fill="white" />
            </clipPath>
        </defs>
    </svg>
)

const TechnologySvg = () => (
    <svg width="1em" height="1em" viewBox="0 0 25 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.94444 4.83725L12.5 1.95386M7.38889 20.6959L17.6111 9.16234M12.5 27.9044L15.0556 25.021M18.25 25.021C19.0972 25.021 19.9097 24.6413 20.5088 23.9653C21.1079 23.2894 21.4444 22.3727 21.4444 21.4168C21.4444 20.4609 21.1079 19.5441 20.5088 18.8682C19.9097 18.1923 19.0972 17.8125 18.25 17.8125C17.4028 17.8125 16.5903 18.1923 15.9912 18.8682C15.3921 19.5441 15.0556 20.4609 15.0556 21.4168C15.0556 22.3727 15.3921 23.2894 15.9912 23.9653C16.5903 24.6413 17.4028 25.021 18.25 25.021ZM6.75 12.0457C7.59722 12.0457 8.40974 11.666 9.00881 10.9901C9.60789 10.3142 9.94444 9.3974 9.94444 8.44149C9.94444 7.48559 9.60789 6.56884 9.00881 5.89291C8.40974 5.21698 7.59722 4.83725 6.75 4.83725C5.90278 4.83725 5.09026 5.21698 4.49119 5.89291C3.89211 6.56884 3.55556 7.48559 3.55556 8.44149C3.55556 9.3974 3.89211 10.3142 4.49119 10.9901C5.09026 11.666 5.90278 12.0457 6.75 12.0457ZM4.19444 27.9044C5.04166 27.9044 5.85418 27.5247 6.45326 26.8487C7.05233 26.1728 7.38889 25.2561 7.38889 24.3002C7.38889 23.3443 7.05233 22.4275 6.45326 21.7516C5.85418 21.0756 5.04166 20.6959 4.19444 20.6959C3.34723 20.6959 2.53471 21.0756 1.93563 21.7516C1.33656 22.4275 1 23.3443 1 24.3002C1 25.2561 1.33656 26.1728 1.93563 26.8487C2.53471 27.5247 3.34723 27.9044 4.19444 27.9044ZM20.8056 9.16234C21.6528 9.16234 22.4653 8.78261 23.0644 8.10668C23.6634 7.43076 24 6.514 24 5.5581C24 4.60219 23.6634 3.68544 23.0644 3.00952C22.4653 2.33359 21.6528 1.95386 20.8056 1.95386C19.9583 1.95386 19.1458 2.33359 18.5467 3.00952C17.9477 3.68544 17.6111 4.60219 17.6111 5.5581C17.6111 6.514 17.9477 7.43076 18.5467 8.10668C19.1458 8.78261 19.9583 9.16234 20.8056 9.16234Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
)

const ZaloIcon = (props) => <Icon component={ZaloSvg} {...props} />;
const PositionIcon = (props) => <Icon component={PositionSvg} {...props} />;
const TechnologyIcon = (props) => <Icon component={TechnologySvg} {...props} />;


const items = [
    {
        key: 'dashBoard',
        label: 'Dashboard',
        icon: <AppstoreOutlined />,
    },
    {
        key: 'cvManagement',
        label: 'CV Management',
        icon: <AuditOutlined />,
        children: [
            {
                key: 'approveCV',
                label: 'Approve CV',
            },
            {
                key: 'confirmCV',
                label: 'Confirm CV',
            },
        ],
    },
    {
        key: 'listManagement',
        label: 'List Management',
        icon: <TeamOutlined />,
        children: [
            {
                key: 'internList',
                label: 'Intern list',
            },
            {
                key: 'groupList',
                label: 'Group list',
            },
        ],
    },
    {
        key: 'projectManagement',
        label: 'Project Management',
        icon: <ProjectOutlined />,
    },
    {
        key: 'positionManagement',
        label: 'Position Management',
        icon: <PositionIcon />,
    },
    {
        key: 'technologyManagement',
        label: 'Technology Management',
        icon: <TechnologyIcon />,
    },
    {
        key: 'groupZaloManagement',
        label: 'Group Zalo Management',
        icon: <ZaloIcon />,
    },
    {
        key: 'settings',
        label: 'Settings',
        icon: <SettingOutlined />,
    }
];

const MenuNavigate = ({ buttonClick }) => {
    const viewPort = useViewport()
    const isMobile = viewPort.width <= 1024
    const navigate = useNavigate()
    const onClick = (value) => {
        navigate('/' + value.key)
        console.log(value.key);
    }

    const [collapsed, setCollapsed] = useState(false);
    const [hideAccountSetting, setHideAccountSetting] = useState(false)

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
        buttonClick()
        setHideAccountSetting(!hideAccountSetting)
    };

    return (
        <div className="menu">
            {!isMobile ? (<div>
                <img src={logo} alt="Logo" className="logo-amazing" hidden={collapsed} />
                <Menu
                    onClick={onClick}
                    style={{
                        width: '100%',
                    }}
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    mode="inline"
                    items={items}
                    inlineCollapsed={collapsed}
                />
                <div onClick={toggleCollapsed} className="button-collapsed">
                    {/* <Button type="text" style={{width: '100%'}}> */}
                    {collapsed ? <RightOutlined /> : <LeftOutlined />}
                    {/* </Button> */}
                </div>
                <AccountSetting disabled={hideAccountSetting} />
            </div>) : (<div>
                <Menu
                    onClick={onClick}
                    style={{
                        width: '100%',
                    }}
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    mode="inline"
                    items={items}
                    inlineCollapsed={true}
                />
            </div>)}

        </div>
    );
};

export default MenuNavigate;