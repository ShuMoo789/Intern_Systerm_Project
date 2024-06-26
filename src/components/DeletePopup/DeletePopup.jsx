import React, { useState } from "react";
import { Modal, Button } from "antd";
import { InfoCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { Typography, message } from "antd";
import "./DeletePopup.css";
import { useTranslation } from "react-i18next";

const DeletePopup = ({ onClose, openPopup }) => {
  const { t } = useTranslation();
  const [loadings, setLoadings] = useState([]);

  const handleOk = () => {
    onClose();
    message.success(t("Delete successfully!"))
  };

  // Hàm được gọi khi muốn ẩn modal
  const handleCancel = () => {
    onClose();
  };

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        handleOk();
        return newLoadings;
      });
    }, 500);
  };

  return (
    <div>
        <Modal
            open={openPopup}
            onCancel={handleCancel}
            footer={[
              <Button
                className="cancel-delete"
                key="cancel"
                type="default"
                onClick={handleCancel}
              >
                {t("Cancel")}
              </Button>,
              <Button
                className="delete-btn"
                key="submit"
                type="default"
                loading={loadings[1] || false}
                onClick={() => enterLoading(1)}
                icon={<DeleteOutlined />}
              >
                {t("Delete")}
              </Button>,
            ]}
            width={900}
        >   
          <div className="warning-modal-delete">
            <InfoCircleOutlined className="icon-warning-delete"/>
            <Typography className="warning-delete"
            >
              {t("Are you sure you want to Delete?")}
            </Typography>
          </div>  
        </Modal>
    </div>

  );
};

export default DeletePopup;
