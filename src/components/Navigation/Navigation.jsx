import React from "react"
import './Navigation.css'
import GroupButton from "../GroupButton/GroupButton";
import AccountSetting from "../AccountSetting/AccountSetting";

const Navigation = (props) => {
    return (
        <div className="content">
            <div className="header-navigation">
                <div className="title-name">
                    {props.titleName}
                </div>
                <div className="account-setting">
                    <AccountSetting />
                </div>
            </div>            
            <div className="navigation">
                <div className="search-navigation">
                    Search for Information
                </div>
                <GroupButton groupButton={props.groupButton}/>
            </div>
        </div>
    )
}

export default Navigation