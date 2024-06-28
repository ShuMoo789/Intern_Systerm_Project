import React, { useState, useEffect, useRef } from "react";
import "./AccountManagement.css";
import userImage from "../../assets/user_image.png";
import coverImage from "../../assets/Cover-image.png";
import { useTranslation } from "react-i18next";
import { Row, Button, Tooltip } from "antd";
import {
  EditOutlined,

} from '@ant-design/icons';

// Dữ liệu mô phỏng từ backend
const database = {
  user: {
    name: "Natalie Brogan",
    nickname: "🖥️Aleam🖥️  ",
    email: "email@example.com",
    phone: "0123456789",
    address: "123 Đường ABC, Thành phố XYZ",
    experience: [
      "Công ty ABC - Kỹ sư phần mềm (2018-2021)",
      "Công ty XYZ - Chuyên gia phân tích dữ liệu (2021-nay)"
    ],
    skills: [
      "Lập trình JavaScript, Python",
      "Phân tích dữ liệu, Machine Learning",
      "Quản lý dự án Agile"
    ],
    projects: [
      "Hệ thống quản lý khách hàng CRM",
      "Ứng dụng di động quản lý công việc",
      "Dự án phân tích dữ liệu tài chính"
    ]
  }
};

// AccountManagement functional component
const AccountManagement = () => {
  const [gradientColor, setGradientColor] = useState("rgba(255, 255, 255, 0.2)");
  const coverImageRef = useRef(null);

  useEffect(() => {
    const img = coverImageRef.current;
    if (img.complete) {
      getColorFromImage();
    } else {
      img.addEventListener("load", getColorFromImage);
      return () => img.removeEventListener("load", getColorFromImage);
    }
  }, []);

  const getColorFromImage = () => {
    const img = coverImageRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

    const imageData = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
    const data = imageData.data;

    let r = 0, g = 0, b = 0;
    const length = data.length / 4;

    for (let i = 0; i < length; i++) {
      r += data[i * 4];
      g += data[i * 4 + 1];
      b += data[i * 4 + 2];
    }

    r = Math.floor(r / length);
    g = Math.floor(g / length);
    b = Math.floor(b / length);

    setGradientColor(`rgba(${r}, ${g}, ${b}, 0.5)`);
  };

  const { user } = database;
  const { t } = useTranslation();
  return (
    <>
      <Row className="header-profile">

        <div
          className="cover-container"
          style={{
            background: `linear-gradient(to bottom, ${gradientColor}, rgba(0, 0, 0, 0.8))`
          }}
        >
          <div className="cover-container2">
            <img
              src={coverImage}
              alt="cover image"
              className="coverImage"
              ref={coverImageRef}
            />
          </div>
        </div>
        <Row className="avatar-info-container">
          <div className="avatar-container">
            <img src={userImage} alt="user image" className="avatarImage" />
          </div>
          <div className="info">
            <div className="user-name2">{user.name}</div>
            <div className="user-nickname">({user.nickname})</div>
          </div>
          <Button  className="btnEditPro" icon={<EditOutlined />}  > {t("Edit")}</Button>

          
        </Row>
      </Row>
      {/* <Row className="avatar-info-container">
        <div className="avatar-container">
          <img src={userImage} alt="user image" className="avatarImage" />
        </div>
        <div className="info">
          <div className="user-name2">{user.name}</div>
          <div className="user-nickname">{user.nickname}</div>
        </div>
      </Row> */}
      <Row className="profile-sections">
        <div id="section1" className="section no-select">
          <div className="section-content">
            <h2>{t("Experience")}</h2>
            {user.experience.map((exp, index) => (
              <p key={index}>• {exp}</p>
            ))}
          </div>
        </div>
        <div id="section2" className="section no-select">
          <div className="section-content">
            <h2>{t("Specialty")}</h2>
            {user.skills.map((skill, index) => (
              <p key={index}>• {skill}</p>
            ))}
          </div>
        </div>
        <div id="section3" className="section no-select">
          <div className="section-content">
            <h2>{t("Previous Projects")}</h2>
            {user.projects.map((project, index) => (
              <p key={index}>• {project}</p>
            ))}
          </div>
        </div>
        <div id="section4" className="section no-select">
          <div className="section-content">
            <h2>{t("Contact")}</h2>
            <p>• Email: {user.email}</p>
            <p>• {t("Number Phone")}: {user.phone}</p>
            <p>• {t("Address")}: {user.address}</p>
            
          </div>
        </div>
      </Row>
    </>
  );
};

export default AccountManagement;
