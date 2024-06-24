import React from "react";
import { Modal, Card } from "antd";
import { useTranslation } from "react-i18next";

const Detail = ({ technology, visible, handleClose }) => {
    const { t } = useTranslation();

    return (
    <Modal
        visible={visible}
        title={technology.title}
        onCancel={handleClose}
        footer={null}
    >
        <Card
            cover={<img alt={technology.title} src={technology.imageUrl} />}
        >
        </Card>
        <Card.Meta
            description={t(technology.description)}
            style={{
                marginTop: "15px",
                textAlign: "justify"
            }}
        />
    </Modal>
  );
};

export default Detail;