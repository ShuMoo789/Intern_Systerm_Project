import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import { Col, Row } from "antd";
const AuthLayout = () => {
    return(
        <Row justify= "center" gutter={[0,0]}>
            <Col span={24}>
                <Header/>
            </Col>
            <Col span={24}>
                <Outlet/>
            </Col>
        </Row>
    )
}
export default AuthLayout

