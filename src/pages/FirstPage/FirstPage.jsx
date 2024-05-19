import * as React from "react";
import "./FirstPage.css";
import { Avatar, Button } from "antd";
import userImage from "../../assets/user_image.png";

const First_Page = ({ Accounts }) => {
  const [dataAccounts, setAccounts] = React.useState([]);
  React.useEffect(() => {});
  return (
    <>
      <div classname="container-1">
        <Avatar
          className="AvaCurent"
          shape="square"
          size={64}
          src={userImage}
        />
        <h3 className="UsernameCurent">Natlie Brogan</h3>
        <Button className="ManageAccount">Manage Your Account</Button>
      </div>
      <div classname="container-1">
        
      </div>
    </>
  );
};

export default First_Page;
