import React, { useState, useEffect } from "react";
import { Table, Checkbox, Button, Select, Modal, Row, Col } from "antd";
import MenuNavigate from "../../components/Menu/MenuNavigate";
import "./ViewButton.css";
import { useTranslation } from "react-i18next";

const ViewButton = () => {
  const [confirmedEmailKeys, setConfirmedEmailKeys] = useState([]);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {t} = useTranslation();
 
  // Function to handle view button click
  const handleView = (record) => {
    setSelectedIntern(record);
    setModalVisible(true);
  };

  // Function to close the modal
  const handleModalClose = () => {
    setModalVisible(false);
  };
  
  return (
    <>
      <div className="table-container">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            position: ["bottomCenter"],
            showQuickJumper: true,
            showSizeChanger: false,
          }}
          scroll={{ x: "50%" }}
          rowClassName={(record) =>
            confirmedEmailKeys.includes(record.key) ? "confirmed-row" : ""
          }
        />
      </div>
      {selectedIntern && (
        <Modal
          title={t("View details of Intern")}
          visible={modalVisible}
          onCancel={handleModalClose}
          width={900}
          footer={null}
        >
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <p>
                <strong>{t("Intern ID")}</strong>
              </p>
              <p
                style={{
                  border: "2px solid #12345129",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                {selectedIntern.internID}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>{t("Date Submitted Form")}</strong>
              </p>
              <p
                style={{
                  border: "2px solid #12345129",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                {" "}
                {selectedIntern.dateSubmittedForm}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>{t("Time Interview")}</strong>
              </p>
              <p
                style={{
                  border: "2px solid #12345129",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                {" "}
                {selectedIntern.timeinterview}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>{t("Full Name")}</strong>
              </p>
              <p
                style={{
                  border: "2px solid #12345129",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                {" "}
                {selectedIntern.fullName}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>{t("Date Of Birth")}</strong>
              </p>
              <p
                style={{
                  border: "2px solid #12345129",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                {" "}
                {selectedIntern.dateOfBirth}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>{t("Phone Number")}</strong>
              </p>
              <p
                style={{
                  border: "2px solid #12345129",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                {" "}
                {selectedIntern.phoneNumber}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>{t("Position")}</strong>
              </p>
              <p
                style={{
                  border: "2px solid #12345129",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                {" "}
                {selectedIntern.position}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>{t("School")}</strong>
              </p>
              <p
                style={{
                  border: "2px solid #12345129",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                {selectedIntern.school}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>{t("Address")}</strong>
              </p>
              <p
                style={{
                  border: "2px solid #12345129",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                {" "}
                {selectedIntern.address}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>{t("Email")}</strong>
              </p>
              <p
                style={{
                  border: "2px solid #12345129",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                {" "}
                <a href={`mailto:${selectedIntern.email}`}>
                  {selectedIntern.email}
                </a>
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>CV Link</strong>
              </p>
              <p
                style={{
                  border: "2px solid #12345129",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                {" "}
                <a
                  href={selectedIntern.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link
                </a>
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>{t("Interviewer")}</strong>
              </p>
              <p
                style={{
                  border: "2px solid #12345129",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                {" "}
                {selectedIntern.interviewer}
              </p>
            </Col>
          </Row>
        </Modal>
      )}
    </>
  );
};

export default ViewButton;