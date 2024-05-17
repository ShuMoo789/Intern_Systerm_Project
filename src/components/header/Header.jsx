import * as React from "react";
import "./Header.css";
import { useTranslation } from "react-i18next";
import { DownOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Space, theme } from 'antd';
import { useState, useEffect } from "react";
const { useToken } = theme;

function Header() {
    // const { i18n } = useTranslation();
    
    // const handleLanguageChange = (language) => {
    //     i18n.changeLanguage(language);
    // }
    // const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    // const handleLanguageSwtich = (value) => {
    //     setSelectedLanguage(value);
    // };
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
        <header className="header">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/06fef8db57203c153c3c74e48930f491ad41ebc2dc7c06a9bab2ea38540e008e?apiKey=41832340d6f545c2a0509736ad9e1693&" alt="Company Logo" className="logo" />
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
        </header>
    );
}

export default Header;