import * as React from "react";
import "./FirstPage.css";  // Import the CSS file for styling
import { Avatar, Button } from "antd";  // Import Ant Design components for Avatar and Button
import userImage from "../../assets/user_image.png";  // Import a user image

// First_Page component
const First_Page = ({ Accounts }) => {
    const [dataAccounts, setAccounts] = React.useState([]);  // Initialize state to store account data

    // useEffect hook with an empty dependency array, which runs only once after the initial render
    React.useEffect(() => {
        // This useEffect currently does nothing, but you might want to fetch accounts data here in the future
    }, []);

    return (
        <>
            <div className="container-1">  {/* Fixed typo: changed 'classname' to 'className' */}
                <Avatar
                    className="AvaCurent"
                    shape="square"
                    size={64}
                    src={userImage}
                />
                {/* Display user avatar using Ant Design's Avatar component */}
                <h3 className="UsernameCurent">Natlie Brogan</h3>
                {/* Display username */}
                <Button className="ManageAccount">Manage Your Account</Button>
                {/* Button to manage account */}
            </div>
            <div className="container-1">  {/* Fixed typo: changed 'classname' to 'className' */}
                {/* Another container, currently empty, can be used for additional content or layout */}
            </div>
        </>
    );
};

export default First_Page;  // Export the First_Page component as default
