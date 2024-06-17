import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import "./AccountManagement.css";
import RectangleContent from "../../components/RectangleContent/RectangleContent";
import MainLayout from "../../MainLayout/MainLayout";
import userImage from "../../assets/user_image.png";

// Data array containing information to be displayed in the RectangleContent components
const data = [
  {
    title: "Privacy & personalisation",
    content: [
      "See the data in your Intern System Account and choose what activity is saved, to personalise your experience",
    ],
    instruction: "Privacy & personalisation",
  },
  {
    title: "Security Recommendations",
    content: ["Recommended actions found in the Security Check-Up"],
    instruction: "Protect your account",
  },
  {
    title: "Privacy Check-Up",
    content: [
      "Choose the privacy settings that are right for you with this step-by-step guide",
    ],
    instruction: "Take Privacy Check-Up",
  },
  {
    title: "What are you looking for? ",
    content: [
      <div>
        {" "}
        <SearchOutlined /> Search Intern System Account
      </div>,
      "See Help Options",
      "Send Feedback",
    ],
    instruction: "",
  },
];

// AccountManagement functional component
const AccountManagement = () => {
  return (
    <>
      <div className="content-account-management">
        <div className="user-detail">
          {/* User image */}
          <img src={userImage} alt="user image" className="ava-image" />
          {/* Welcome message */}
          <div className="welcome">Hello Natalie Brogan!</div>
          {/* User email */}
          <div className="user-gmail">nataliebrogan@gmail.com</div>
        </div>
        {/* First group of RectangleContent components */}
        <div className="rectangle-content-group">
          <RectangleContent
            title={data[0].title}
            content={data[0].content}
            instruction={data[0].instruction}
          />
          <RectangleContent
            title={data[1].title}
            content={data[1].content}
            instruction={data[1].instruction}
          />
        </div>
        {/* Second group of RectangleContent components */}
        <div className="rectangle-content-group">
          <RectangleContent
            title={data[2].title}
            content={data[2].content}
            instruction={data[2].instruction}
          />
        </div>
        {/* Third group of RectangleContent components */}
        <div className="rectangle-content-group">
          <RectangleContent
            title={data[3].title}
            content={data[3].content}
            instruction={data[3].instruction}
          />
        </div>
      </div>
    </>
  );
};

export default AccountManagement;
