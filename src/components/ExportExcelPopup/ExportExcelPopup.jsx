import React, { useState } from "react";
import { Modal, Select, Input, Button } from "antd";
import { ExportOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Typography, message } from "antd";
import "./ExportExcelPopup.css";
import { useTranslation } from "react-i18next";

const ExportExcelPopup = ({ onClose, openPopup }) => {
  const { t } = useTranslation();
  const [loadings, setLoadings] = useState([]);

  const handleOk = () => {
    onClose();
    message.success(t("Export Excel successfully!"))
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
    }, 1000);
  };

  return (
    <div>
      <Modal
        open={openPopup}
        onCancel={handleCancel}
        footer={[
          <Button
            className="cancel-export"
            key="cancel"
            type="default"
            onClick={handleCancel}
            >
              {t("Cancel")}
          </Button>,
          <Button
            className="export-btn"
            key="submit"
            type="default"
            loading={loadings[1] || false}
            onClick={() => enterLoading(1)}
            icon={<ExportOutlined />}              
            >
              {t("Export Excel")}
          </Button>,
            
        ]}
        width={900}
      >  
        <div className="warning-modal-export">
          <InfoCircleOutlined className="icon-warning-export"/>
          <Typography className="warning-export"
          >
            {t("Are you sure you want to Export Excel?")}
          </Typography>
        </div>     
      </Modal>
    </div>

  );
};

export default ExportExcelPopup;
