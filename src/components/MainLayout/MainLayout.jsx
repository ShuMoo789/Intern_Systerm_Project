import React from 'react';
import { Col, Row } from 'antd';
import MenuNavigate from '../Menu/MenuNavigate';
import { useState } from 'react';

const MainLayout = ({ children }) => {
    const [spanLayout, setSpanLayout] = useState([4, 20])

    const handleButtonChangeSpanLayout = () => {
        setSpanLayout(spanLayout[0] == 4 ? [1, 23] : [4, 20])
    }

    return (
        <Row>
            <Col style={{transition: '0.5s'}} span={spanLayout[0]}>
                <MenuNavigate buttonClick={handleButtonChangeSpanLayout}/>
            </Col>
            <Col style={{transition: '0.5s'}} span={spanLayout[1]}>
                {children}
            </Col>
        </Row>
    );
};

export default MainLayout;