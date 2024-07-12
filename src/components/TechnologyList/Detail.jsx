import React from "react";
import { Modal, Card, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

const Detail = ({ technology, visible, handleClose }) => {
    const { t } = useTranslation();
    return (
        <Modal
            visible={visible}
            onCancel={handleClose}
            footer={null}
            centered
        >
            <Card
                cover={<img alt={technology.ten} src={technology.urlImage} />}
                bordered={false}
                bodyStyle={{ padding: 0 }}
            >
                <div style={{ textAlign: "center", marginTop: "15px" }}>
                    <Title level={4}>{technology.ten}</Title>
                </div>
                <Paragraph style={{ textAlign: "justify", marginTop: "15px" }}>
                    {t(technology.description)}
                </Paragraph>
            </Card>
        </Modal>
    );
};

export default Detail;