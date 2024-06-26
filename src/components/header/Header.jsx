import * as React from "react";
import "./Header.css";
import { useTranslation } from "react-i18next";
import { DownOutlined, GlobalOutlined  } from '@ant-design/icons';
import { Button, Divider, Dropdown, Space, theme, Menu } from 'antd';
import { useState, useEffect } from "react";
const { useToken } = theme;

function Header() {
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
    

    
    
    const { token } = useToken();
    const contentStyle = {
        borderRadius: '8px',
        padding: '10px',
      };
      
      const itemStyle = {
        padding: '10px 15px',
        borderRadius: '8px',
        transition: 'background 0.3s',
      };
      
      const dropdownItemStyle = {
        padding: '10px 15px',
        borderRadius: '8px',
        transition: 'background 0.3s',
        cursor: 'pointer',
        hover: {
          background: 'rgba(24, 144, 255)',
        },
      };
    const menuItems = [
      {
        key: '1',
        label: (
          <div
            style={dropdownItemStyle}
            onClick={() => handleLanguageChange('en')}
          >
            English
          </div>
        ),
      },
      {
          key: '2',
          label: (
            <div
              style={dropdownItemStyle}
              onClick={() => handleLanguageChange('vi')}
            >
              Tiếng Việt
            </div>
          ),
      },

  ];
    const menu = (
      <Menu items={menuItems} />
    );
    return (
        <header className="header">
            <img style={{marginLeft: "75px"}} src="https://cdn.builder.io/api/v1/image/assets/TEMP/06fef8db57203c153c3c74e48930f491ad41ebc2dc7c06a9bab2ea38540e008e?apiKey=41832340d6f545c2a0509736ad9e1693&" alt="Company Logo" className="logo" />
            <Dropdown
      overlay={menu}
      dropdownRender={(menu) => (
        <div style={contentStyle}>
          {React.cloneElement(menu, {
            style: { padding: 0 },
          })}
        </div>
      )}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <GlobalOutlined style={{ fontSize: '24px', color: "black"}} />
          <span style={{color:"black"}}>{selectedLanguage === 'vi' ? 'VI' : 'EN'}</span>
          <DownOutlined style={{color:"black", marginRight:"75px"}}/>
        </Space>
      </a>
    </Dropdown>
        </header>
    );
}

export default Header;