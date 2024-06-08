import React from "react";
import "./Navigation.css";
import GroupButton from "../GroupButton/GroupButton";
import AccountSetting from "../AccountSetting/AccountSetting";
import useViewport from "../../hooks/useViewport";
import {Dropdown, Space, theme } from 'antd';
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { DownOutlined } from '@ant-design/icons';

const Navigation = (props) => {
    const viewPort = useViewport()
    const isMobile = viewPort.width <= 1024

    const { useToken } = theme;
    const { i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
    const getCurrentLang = () => i18n.language;
    useEffect(() => {
        setSelectedLanguage(i18n.language);
    }, [i18n.language]);

    const handleLanguageChange = (language) => {
        i18n.changeLanguage(language);
        setSelectedLanguage(language);
    };
    

    
    const items = [
        {
            key: '1',
            label: (
                <button onClick={(e) => handleLanguageChange(e.target.value)}>
                    <option value="en">English</option>
                </button>
            ),
        },
        {
            key: '2',
            label: (
                <button onClick={(e) => handleLanguageChange(e.target.value)}>
                    <option value="vi">Tiếng Việt</option>
                </button>
            ),

        },

    ];
    const { token } = useToken();
    const contentStyle = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
    };
    const menuStyle = {
        boxShadow: 'none',
    };
    const languageData = {
        en: {
            flag: "https://cdn.builder.io/api/v1/image/assets/TEMP/ed3550ad056d60b4375fcbb86733c2b3eb54425ccccc2358fcad0c028c501dc1?apiKey=41832340d6f545c2a0509736ad9e1693&",
            abbreviation: "EN",
        },
        vi: {
            flag: "https://th.bing.com/th/id/R.751d701d99ca9f36a2ec10d886db35bb?rik=wL0QNJdgvG%2fQsQ&riu=http%3a%2f%2fimages5.fanpop.com%2fimage%2fphotos%2f25700000%2fvietnamese-flag-vietnamese-places_mina_kimngan-25790392-1024-768.jpg&ehk=Ul%2fE21vkUUol5RlgNc%2b1OZxq5%2fHqVQmwnw42bVUaACU%3d&risl=&pid=ImgRaw&r=0",
            abbreviation: "VI",
        },
    };

    return (
        <div className="content-navigation">
            <div className="header-navigation">
                <div className="title-name">
                    {props.titleName}
                </div>
                <div className="group-header-navigation">
                    <div className="account-setting">
                        <AccountSetting />
                    </div>
                    <div className="change-language-navigation">
                        <Dropdown
                            menu={{
                                items,
                            }}
                            dropdownRender={(menu) => (
                                <div style={contentStyle}>
                                    {React.cloneElement(menu, {
                                        style: menuStyle,
                                    })}
                                </div>
                            )}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <img
                                        src={languageData[selectedLanguage].flag}
                                        alt="Language Flag"
                                        className="language-flag"
                                    />
                                    <span>{languageData[selectedLanguage].abbreviation}</span>
                                    <a onChange={(e) => handleLanguageSwtich(e.target.value)}>
                                        {getCurrentLang() === 'en'}
                                    </a>
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className="navigation">
                <div className="search-navigation">
                    {isMobile ? 'Search' : 'Search for Information'}
                </div>
                {/* Pass props to GroupButton from InternList */}
                <div className="group-button-navigation">
                    <GroupButton groupButton={props.groupButton} onSendEmail={props.onSendEmail} />
                </div>
            </div>
        </div>
    )
}

export default Navigation;
