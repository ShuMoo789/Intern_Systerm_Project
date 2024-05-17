import React from "react";
import MenuNavigate from "../components/Menu/MenuNavigate";
import AccountManagementContent from "../components/AccountManagementContent/AccountManagementContent";

const AccountManagement = () => {
    return (
        <div>
            <MenuNavigate></MenuNavigate>
            <AccountManagementContent></AccountManagementContent>
        </div>
    )
}

export default AccountManagement;