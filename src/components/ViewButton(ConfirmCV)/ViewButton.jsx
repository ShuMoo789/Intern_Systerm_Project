import React, { useState, useEffect } from "react";
import { Table, Checkbox, Button, Select, Modal, Row, Col } from "antd";
import MenuNavigate from "../../components/Menu/MenuNavigate";
import "./ViewButton.css";

const ViewButton = () => {
  const [confirmedEmailKeys, setConfirmedEmailKeys] = useState([]);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

 
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
          title="View details of Intern"
          visible={modalVisible}
          onCancel={handleModalClose}
          width={900}
          footer={null}
        >
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <p>
                <strong>Intern ID:</strong>
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
                <strong>Date Submitted Form:</strong>
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
                <strong>Time Interview:</strong>
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
                <strong>Full Name:</strong>
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
                <strong>Date Of Birth:</strong>
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
                <strong>Phone Number:</strong>
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
                <strong>Position:</strong>
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
                <strong>School:</strong>
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
                <strong>Address:</strong>
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
                <strong>Email:</strong>
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
                <strong>CV Link:</strong>
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
                <strong>Interviewer:</strong>
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