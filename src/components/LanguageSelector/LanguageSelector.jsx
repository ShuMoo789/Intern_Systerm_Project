import React from "react";
import { SettingOutlined,LeftOutlined,RightOutlined, UserOutlined, GlobalOutlined, LogoutOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";
import { ArrowLeftOutlined } from "@ant-design/icons"; // Import icon back từ Ant Design
import "./LanguageSelector.css";
import { Link } from "react-router-dom";

const LanguageSelector = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    onClose();
  };
  return (
    // <div className="language-selector">
    //   <div className="back-button" onClick={onClose}>
    //     <ArrowLeftOutlined classID="iconBack"/> 
    //     {t("Language")}
    //   </div>

    //   <button className="language-button" onClick={() => changeLanguage('en')}>
    //     English
    //   </button>
    //   <button className="language-button" onClick={() => changeLanguage('vi')}>
    //     Tiếng Việt
    //   </button>
    // </div>

    <div >
      <div className="setting" onClick={onClose}>
        <LeftOutlined  className="iconBack"/>
        {t("Language")}
      </div>
      <div className="dropdown-item" onClick={() => changeLanguage('vi')}>
        <Link >{t("Vietnamese")}</Link>
      </div>
      <div className="dropdown-item" onClick={() => changeLanguage('en')}>
        <Link >{t("English")}</Link>
      </div>
      
    </div>

  );
};

export default LanguageSelector;
