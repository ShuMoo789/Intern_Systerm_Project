import React from "react";
import "./Navigation.css";
import GroupButton from "../GroupButton/GroupButton";
import AccountSetting from "../AccountSetting/AccountSetting";
import useViewport from "../../hooks/useViewport";

const Navigation = (props) => {
    const viewPort = useViewport()
    const isMobile = viewPort.width <= 1024
    return (
        <div className="content-navigation">
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
                    {isMobile ? 'Search' : 'Search for Information'}
                </div>
                {/* Pass props to GroupButton from InternList */}
                <div className="group-button-navigation">
                    <GroupButton groupButton={props.groupButton} onSendEmail={props.onSendEmail}/>
                </div>
            </div>
        </div>
    )
}

export default Navigation;
