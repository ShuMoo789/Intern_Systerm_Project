import React from "react";
import { Col, Row } from "antd";
import MenuNavigate from "../components/Menu/MenuNavigate";
import { useState } from "react";

const MainLayout = ({ children }) => {
  const [spanLayout, setSpanLayout] = useState([3, 21]);

  const handleButtonChangeSpanLayout = () => {
    setSpanLayout(spanLayout[0] == 3 ? [1, 23] : [3, 21]);
  };

  return (
    <Row>
      <Col style={{ transition: "0.5s" }} span={spanLayout[0]}>
        <MenuNavigate buttonClick={handleButtonChangeSpanLayout} />
      </Col>
      <Col style={{ transition: "0.5s" }} span={spanLayout[1]}>
        {children}
      </Col>
    </Row>
  );
};

export default MainLayout;
