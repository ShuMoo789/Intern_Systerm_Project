import React, { useState } from "react";
import "./TechnologyList.css";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { TiFolderDelete } from "react-icons/ti";
import { Modal, Pagination, Button, Checkbox, message, Popconfirm, Form, Input, Tabs } from "antd";
import Question from "./Question";
import Detail from "./Detail";
import { useTranslation } from "react-i18next";
import { ExportOutlined, EditOutlined, DeleteOutlined, FolderAddOutlined } from "@ant-design/icons";

const TechnologyList = ({ activeTab }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [checkedItems, setCheckedItems] = useState({});
  const [isExactlyOneChecked, setIsExactlyOneChecked] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingTechnology, setEditingTechnology] = useState(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const items = [
    { key: "1", label: "Intern", children: <Question /> },
    { key: "2", label: "Fresher", children: <Question /> },
    { key: "3", label: "Junior", children: <Question /> },
    { key: "4", label: "Middle", children: <Question /> },
    { key: "5", label: "Senior", children: <Question /> },
  ];

  const technologiesData = {
    "Back-End": [
      {
        title: "Java",
        imageUrl: "https://www.logo.wine/a/logo/Java_(programming_language)/Java_(programming_language)-Logo.wine.svg",
        description: "Java is a versatile, object-oriented programming language...",
      },
      {
        title: "C#",
        imageUrl: "https://caodang.fpt.edu.vn/wp-content/uploads/2024/04/FPT-Polytechnic_HN_ngon_ngu_lap_trinh_c.webp",
        description: "C# (pronounced as 'C sharp') is a powerful, modern programming language...",
      },
      // Add more technology objects here
    ],
    "Front-End": [
      {
        title: "ReactJS",
        imageUrl: "https://seeklogo.com/images/R/react-logo-7B3CE81517-seeklogo.com.png",
        description: "ReactJS is a popular JavaScript library developed by Facebook...",
      },
    ],
    "Business Analyst": [
      {
        title: "BA",
        imageUrl: "https://assets.janbasktraining.com/blog/uploads/images/image_750x_5da6c72103449.jpg",
        description: "A Business Analyst (BA) is a professional who analyzes an organization’s business processes...",
      },
    ],
    Marketing: [
      {
        title: "Marketing",
        imageUrl: "https://e7.pngegg.com/pngimages/645/742/png-clipart-marketing-mix-strategy-promotion-porter-s-five-forces-analysis-framework-text-logo.png",
        description: "Marketing is the process of promoting, selling, and distributing a product or service...",
      },
    ],
    Design: [
      {
        title: "Design",
        imageUrl: "https://i.pinimg.com/736x/a5/58/b4/a558b426cb8973523f37bbed94cf0f09.jpg",
        description: "Figma is a cloud-based design tool used for creating user interfaces and user experiences...",
      },
    ],
  };

  const [technologies, setTechnologies] = useState(technologiesData);

  const handleCheckboxChange = (title, isChecked) => {
    const newCheckedItems = { ...checkedItems, [title]: isChecked };
    setCheckedItems(newCheckedItems);
    const checkedCount = Object.values(newCheckedItems).filter(Boolean).length;
    setIsExactlyOneChecked(checkedCount === 1);
  };
  const deleteTechnology = (title) => {
    setTechnologies((prevTechnologies) => ({
      ...prevTechnologies,
      [activeTab]: prevTechnologies[activeTab].filter((tech) => tech.title !== title),
    }));
  };

  const handleAddTechnology = (values) => {
    setTechnologies((prevTechnologies) => ({
      ...prevTechnologies,
      [activeTab]: [...prevTechnologies[activeTab], values],
    }));
    setAddModalVisible(false);
    form.resetFields();
    message.success("New technology added successfully!");
  };

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

  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const handleShowModal = (tech) => {
    setSelectedTech(tech);
    setOpenDetail(true);
  };

  const handleDetailCancel = () => setOpenDetail(false);

  const filteredTechnologies = technologies[activeTab] || [];
  const totalItems = filteredTechnologies.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTechnologies = filteredTechnologies.slice(startIndex, endIndex);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <>
      <div style={{marginTop:"25px", marginLeft:"15px"}}>
        <Popconfirm
          title="Export folder"
          description="Are you sure to Export this file?"
          onConfirm={() => message.success("Exporting...")}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" style={{ backgroundColor: "green", borderColor: "green",marginRight:"10px"}}>
            <ExportOutlined /> Export Excel
          </Button>
        </Popconfirm>
        <Button type="primary" onClick={showEditModal} disabled={!isExactlyOneChecked} style={{marginRight:"10px"}}>
  <EditOutlined /> Edit
</Button>

<Popconfirm
  title="Delete technology"
  description="Are you sure you want to delete the selected technology/technologies?"
  onConfirm={() => {
    const technologiesToDelete = Object.keys(checkedItems).filter(key => checkedItems[key]);
    if (technologiesToDelete.length > 0) {
      technologiesToDelete.forEach(title => deleteTechnology(title));
      setCheckedItems({});
      message.success("Selected technologies deleted successfully!");
    } else {
      message.error("Please select at least one technology to delete");
    }
  }}
  onCancel={() => {}}
  okText="Yes"
  cancelText="No"
>
  <Button type="primary" danger disabled={Object.values(checkedItems).filter(Boolean).length === 0} style={{marginRight:"10px"}}>
    <DeleteOutlined /> Delete
  </Button>
</Popconfirm>

        <Button type="primary" style={{ backgroundColor: "orange", borderColor: "orange" ,marginRight:"10px" }} onClick={() => setAddModalVisible(true)}>
          <FolderAddOutlined /> Add new Technology
        </Button>
      </div>

      <div className="technology-list-container">
        <div className="technology-list-content">
          <div className="technology-list">
            {paginatedTechnologies.map((tech, index) => (
              <div key={`${tech.title}-${startIndex + index}`} className="technology-item">
                <Card className="card-custom" style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    onClick={() => handleShowModal(tech)}
                    src={tech.imageUrl}
                  />
                  <Card.Body>
                    <Checkbox
                      style={{ marginRight: "110px" }}
                      onChange={(e) => handleCheckboxChange(tech.title, e.target.checked)}
                      checked={checkedItems[tech.title]}
                    />
                    <Button
                      type="text"
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
                      <TiFolderDelete style={{ marginTop: 5, marginRight: 5 }} /> {t("Show Question")}
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>

          <div className="pagination">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalItems}
              onChange={handlePageChange}
            />
          </div>
          {selectedTech && (
        <Detail
          technology={selectedTech}
          visible={openDetail}
          handleClose={handleDetailCancel}
        />
      )}
        </div>
      </div>


      <Modal
        title="Show Question"
        visible={open}
        onCancel={handleCancel}
        footer={null}
        width={900}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Modal>

  

      <Modal
  title="Add New Technology"
  visible={addModalVisible}
  onCancel={() => setAddModalVisible(false)}
  footer={null}
  width={400}
>
  <Form 
    form={form} 
    onFinish={handleAddTechnology}
    layout="vertical"
    style={{ width: '100%' }}
  >
    <Form.Item
      name="title"
      label="Technology Title"
      rules={[{ required: true, message: "Please enter the technology title" }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="imageUrl"
      label="Image URL"
      rules={[{ required: true, message: "Please enter the image URL" }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="description"
      label="Description"
      rules={[{ required: true, message: "Please enter the description" }]}
    >
      <Input.TextArea rows={4} />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" block>
        Add Technology
      </Button>
    </Form.Item>
  </Form>
</Modal>
<Modal
  title="Edit Technology"
  visible={editModalVisible}
  onCancel={() => setEditModalVisible(false)}
  footer={null}
  width={400}
>
  <Form 
    form={editForm} 
    onFinish={handleEditTechnology}
    layout="vertical"
    style={{ width: '100%' }}
  >
    <Form.Item
      name="title"
      label="Technology Title"
      rules={[{ required: true, message: "Please enter the technology title" }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="imageUrl"
      label="Image URL"
      rules={[{ required: true, message: "Please enter the image URL" }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="description"
      label="Description"
      rules={[{ required: true, message: "Please enter the description" }]}
    >
      <Input.TextArea rows={4} />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" block>
        Update Technology
      </Button>
    </Form.Item>
  </Form>
</Modal>
    </>
  );
};

export default TechnologyList;
