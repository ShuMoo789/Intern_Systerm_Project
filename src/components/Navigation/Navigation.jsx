import React from "react";
import "./Navigation.css";
import GroupButton from "../GroupButton/GroupButton";
import AccountSetting from "../AccountSetting/AccountSetting";
import useViewport from "../../hooks/useViewport";
import { Input } from "antd";

const Navigation = (props) => {
  {/*Project-Management*/}
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    return (
        <div className="content-navigation">
            <div className="header-navigation">
                <div className="title-name">
                    {props.titleName}
                </div>
                <div className="group-header-navigation">
                    {!isMobile ? (
                        <div className="account-setting">
                            <AccountSetting />
                        </div>
                    ) : (
                        <div className="account-setting-mobile">
                            <AccountSetting />
                        </div>
                    )}
                </div>
            </div>
            <div className="navigation">
                <div className="search-navigation">
                    <Input placeholder={isMobile ? 'Search' : 'Search for Information'} variant="filled" />
                </div>
                <div className="group-button-navigation">
                    <GroupButton
                        groupButton={props.groupButton}
                        onSendEmail={props.onSendEmail}
                        onScheduleInterview={props.onScheduleInterview}
                    />
                </div>
            </div>
        </div>
      </div>
      <div className="navigation">
        <div className="search-navigation">
          {/* {isMobile ? 'Search' : 'Search for Information'} */}
          <Input
            placeholder={isMobile ? "Search" : "Search for Information"}
            variant="filled"
          />
        </div>
        {/* Pass props to GroupButton from InternList */}
        <div className="group-button-navigation">
          <GroupButton
            groupButton={props.groupButton}
            onSendEmail={props.onSendEmail}
            onScheduleInterview={props.onScheduleInterview}
            onCreateIntern={props.onCreateIntern}
          />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
