import React from "react";
import "./FirstPage.css";  // Import the CSS file for styling
import { Avatar, Button, Row, Col } from "antd";  // Import Ant Design components for Avatar and Button
import userImage from "../../assets/user_image.png";  // Import a user image
import { DownOutlined, UpOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons'; // Import the icons from Ant Design

const accounts = [
  {
    name: "Francis Sam",
    email: "LWZoO@example.com",
    avatar: userImage,
  },
  {
    name: "Francis Sam2",
    email: "AL4sA@example.com",
    avatar: userImage,
  },
  {
    name: "Francis Sam3",
    email: "Zt5q8@example.com",
    avatar: userImage,
  },
];

const First_Page = ({ Accounts }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);  // Initialize state for menu collapse

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleClose = () => {
    // Add your close functionality here
    console.log("Close button clicked");
  };

  return (
    <>
      <Row className="container-background">
        <Col span={9}></Col>
        <Col span={4.5}>
        <Row>
          <div className="avatar" style={{ paddingLeft: '55px' }}>
            <Avatar
              className="AvaCurent"
              shape="square"
              size={200}
              src={userImage}
              
            />
          </div>
          {/* <Button type="text" className="close-button" onClick={handleClose}>
          <CloseOutlined />
        </Button> */}
        </Row>
          <h3 className="UsernameCurent">Natalie Brogan</h3>
          <Button className="ManageAccount">Manage Your Account</Button>

          <div className="container-cover">
            <div className="container-1">
              <Button type="text" className="btn-hide-acc" onClick={toggleMenu}>
                <span className="btn-text showandhide">
                  {isCollapsed ? "Show accounts" : "Hide accounts"}
                </span>
                <span className="btn-icon icon-large">
                  {isCollapsed ? <DownOutlined /> : <UpOutlined />}
                </span>
              </Button>
              <div className={`custom-menu ${isCollapsed ? "" : "show"}`} style={{ width: 400 }}>
                {accounts.map((account, index) => (
                  <div key={index} className="account-item">
                    <Avatar className="account-avatar" src={account.avatar} style={{ width: 60, height: 60, margin: 10 }} />
                    <div>
                      <div className="account-name">{account.name}</div>
                      <div className="account-email">{account.email}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="account-buttons">
                <Button type="link" className={isCollapsed ? "btn-add-account-hide" : "btn-add-account-show"} icon={<PlusOutlined />}>
                  Add account
                </Button>
                <Button type="link" className={isCollapsed ? "btn-signout-hide" : "btn-signout-show"} icon={<PlusOutlined />}>
                  Sign out
                </Button>
              </div>
            </div>
          </div>
        </Col>
        <Col span={9}></Col>
        
      </Row>
    </>
  );
};

export default First_Page;
