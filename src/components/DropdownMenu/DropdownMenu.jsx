import React, { useState, useRef, useEffect } from "react";
import { SettingOutlined,RightOutlined, UserOutlined, GlobalOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import "./DropdownMenu.css";

const DropdownMenu = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const dropdownRef = useRef(null);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    setShowLanguageSelector(false); // Reset language selector
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setMenuOpen(false);
      setShowLanguageSelector(false); // Reset language selector
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <SettingOutlined
        className={`setting-icon ${menuOpen ? 'rotate' : ''}`}
        onClick={handleMenuClick}
      />
      {menuOpen && (
        <div className={`dropdown-menu ${showLanguageSelector ? 'slide-left' : ''}`}>
          {!showLanguageSelector ? (
            <>
              <div className=" setting">
                { t("Setting")}
              </div>
              <div className="dropdown-item">
                <UserOutlined className="icon-menu"/>
                <Link to="/profile">{t("Account")}</Link>
              </div>
              <div className="dropdown-item" onClick={() => setShowLanguageSelector(true)}>
                <GlobalOutlined className="icon-menu"/>
                <Link>{t("Language")}</Link> 
                <RightOutlined className="icon-menu2"/>
              </div>
              <div className="dropdown-item">
                <LogoutOutlined className="icon-menu"/>
                <Link to="/">{t("Logout")}</Link>
              </div>
            </>
          ) : (
            <LanguageSelector onClose={() => setShowLanguageSelector(false)} />
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
