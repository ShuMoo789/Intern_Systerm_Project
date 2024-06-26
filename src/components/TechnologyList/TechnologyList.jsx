import React, { useState } from "react";
import "./TechnologyList.css";
import Card from "react-bootstrap/Card";
import { TiFolderDelete } from "react-icons/ti";
import { Modal, Pagination, Button, Checkbox, message, Popconfirm, Form, Input } from "antd";
import { Tabs } from "antd";
import {
  ExportOutlined,
  EditOutlined,
  DeleteOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";

// Placeholder for Question component
const Question = () => <div>Question Component Placeholder</div>;

// Tab items configuration
const items = [
  { key: "1", label: "Intern", children: <Question /> },
  { key: "2", label: "Fresher", children: <Question /> },
  { key: "3", label: "Junior", children: <Question /> },
  { key: "4", label: "Middle", children: <Question /> },
  { key: "5", label: "Senior", children: <Question /> },
];

const TechnologyList = ({ activeTab }) => {
  // State hooks
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [checkedItems, setCheckedItems] = useState({});
  const [isExactlyOneChecked, setIsExactlyOneChecked] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingTechnology, setEditingTechnology] = useState(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  // Technologies state
  const [technologies, setTechnologies] = useState({
    "Back-End": [
      {
        title: "Java",
        imageUrl:
          "https://www.logo.wine/a/logo/Java_(programming_language)/Java_(programming_language)-Logo.wine.svg",
      },
      {
        title: "C#",
        imageUrl:
          "https://caodang.fpt.edu.vn/wp-content/uploads/2024/04/FPT-Polytechnic_HN_ngon_ngu_lap_trinh_c.webp",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
      },
    ],
    "Front-End": [
      {
        title: ".ReactJS",
        imageUrl:
          "https://seeklogo.com/images/R/react-logo-7B3CE81517-seeklogo.com.png",
      },
    ],
    "Business Analyst": [
      {
        title: "BA",
        imageUrl:
          "https://assets.janbasktraining.com/blog/uploads/images/image_750x_5da6c72103449.jpg",
      },
    ],
    Marketing: [
      {
        title: "Marketing",
        imageUrl:
          "https://e7.pngegg.com/pngimages/645/742/png-clipart-marketing-mix-strategy-promotion-porter-s-five-forces-analysis-framework-text-logo.png",
      },
    ],
    Design: [
      {
        title: "Design",
        imageUrl:
          "https://i.pinimg.com/736x/a5/58/b4/a558b426cb8973523f37bbed94cf0f09.jpg",
      },
    ],
  });

  // Handle checkbox changes
  const handleCheckboxChange = (title, isChecked) => {
    const newCheckedItems = isChecked ? { [title]: true } : {};
    setCheckedItems(newCheckedItems);
    setIsExactlyOneChecked(isChecked);
  };

  // Delete technology function
  const deleteTechnology = (title) => {
    setTechnologies((prevTechnologies) => ({
      ...prevTechnologies,
      [activeTab]: prevTechnologies[activeTab].filter((tech) => tech.title !== title),
    }));
    message.success("Technology deleted successfully!");
  };

  // Function to handle adding a new technology
  const handleAddTechnology = (values) => {
    setTechnologies((prevTechnologies) => ({
      ...prevTechnologies,
      [activeTab]: [...prevTechnologies[activeTab], values],
    }));
    setAddModalVisible(false);
    form.resetFields();
    message.success("New technology added successfully!");
  };

  // Function to handle editing a technology
  const handleEditTechnology = (values) => {
    setTechnologies((prevTechnologies) => ({
      ...prevTechnologies,
      [activeTab]: prevTechnologies[activeTab].map((tech) =>
        tech.title === editingTechnology.title ? { ...tech, ...values } : tech
      ),
    }));
    setEditModalVisible(false);
    setEditingTechnology(null);
    editForm.resetFields();
    message.success("Technology updated successfully!");
  };

  // Function to open edit modal
  const showEditModal = () => {
    const selectedTechnology = technologies[activeTab].find(
      (tech) => checkedItems[tech.title]
    );
    if (selectedTechnology) {
      setEditingTechnology(selectedTechnology);
      editForm.setFieldsValue(selectedTechnology);
      setEditModalVisible(true);
    }
  };

  // Modal control functions
  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  // Pagination logic
  const filteredTechnologies = technologies[activeTab] || [];
  const totalItems = filteredTechnologies.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTechnologies = filteredTechnologies.slice(startIndex, endIndex);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <>
      <div>
        {/* Export button */}
        <Popconfirm
          title="Export folder"
          description="Are you sure to Export this file?"
          onConfirm={() => message.success("Exporting...")}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" style={{ backgroundColor: 'green', borderColor: 'green' }}>
            <ExportOutlined /> Export Excel
          </Button>
        </Popconfirm>

        {/* Edit button - only enabled when exactly one item is checked */}
    
          <Button 
            type="primary" 
            
            onClick={showEditModal}
            disabled={!isExactlyOneChecked}
          >
            <EditOutlined /> Edit
          </Button>
       

        {/* Delete button */}
        <Popconfirm
          title="Delete technology"
          description="Are you sure you want to delete this technology?"
          onConfirm={() => {
            const checkedTechnology = Object.keys(checkedItems).find(key => checkedItems[key]);
            if (checkedTechnology) {
              deleteTechnology(checkedTechnology);
              setCheckedItems({});
            } else {
              message.error("Please select a technology to delete");
            }
          }}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger disabled={!isExactlyOneChecked}>
            <DeleteOutlined /> Delete
          </Button>
        </Popconfirm>

        {/* Add new technology button */}
        <Button type="primary"  style={{ backgroundColor: 'orange', borderColor: 'orange' }} onClick={() => setAddModalVisible(true)}>
          <FolderAddOutlined /> Add new Technology
        </Button>
      </div>
    
      <div className="technology-list-container">
        <div className="technology-list-content">
          <div className="technology-list">
            {paginatedTechnologies.map((tech, index) => (
              <div
                key={`${tech.title}-${startIndex + index}`}
                className="technology-item"
              >
                <Card className="card-custom" style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={tech.imageUrl} />
                  <Card.Body>
                    <Checkbox 
                      style={{ marginRight: "110px" }}  
                      onChange={(e) => handleCheckboxChange(tech.title, e.target.checked)}
                      checked={checkedItems[tech.title]}
                    />
                    <Button
                      type="primary"
                      onClick={showModal}
                      style={{
                        background: "white",
                        color: "blue",
                        border: "1px solid blue",
                        borderRadius: "15px",
                        borderColor: "white",
                        opacity: "0.7",
                      }}
                    >
                      <TiFolderDelete style={{ marginTop: 5, marginRight: 5 }} />{" "}
                      Show Question
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
            {/* Modal for showing questions */}
            <Modal
              open={open}
              onOk={() => setOpen(false)}
              onCancel={handleCancel}
              width={1448}
              height={447}
              footer={[]}
            >
              <Tabs defaultActiveKey="1" items={items} onChange={(key) => console.log(key)} />
            </Modal>
          </div>
        </div>
        {/* Pagination */}
        <div className="pagination-container">
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </div>
      </div>

      {/* Modal for adding a technology */}
      <Modal
        title="Add New Technology"
        visible={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddTechnology}>
          <Form.Item
            name="title"
            label="Technology Name"
            rules={[{ required: true, message: 'Please input the technology name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="imageUrl"
            label="Image URL"
            rules={[{ required: true, message: 'Please input the image URL!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Technology
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for editing a technology */}
      <Modal
        title="Edit Technology"
        visible={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          setEditingTechnology(null);
          editForm.resetFields();
        }}
        footer={null}
      >
        <Form form={editForm} onFinish={handleEditTechnology}>
          <Form.Item
            name="title"
            label="Technology Name"
            rules={[{ required: true, message: 'Please input the technology name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="imageUrl"
            label="Image URL"
            rules={[{ required: true, message: 'Please input the image URL!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Technology
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TechnologyList;