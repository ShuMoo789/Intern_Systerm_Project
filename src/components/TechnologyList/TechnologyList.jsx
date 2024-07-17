import React, { useState, useEffect } from "react";
import "./TechnologyList.css";
import Card from "react-bootstrap/Card";
import { TiFolderDelete } from "react-icons/ti";
import { Modal, Pagination, Button, Checkbox, message, Popconfirm, Form, Input, Tabs } from "antd";
import Question from "./Question";
import Detail from "./Detail";
import { useTranslation } from "react-i18next";
import { ExportOutlined, EditOutlined, DeleteOutlined, FolderAddOutlined } from "@ant-design/icons";
import axios from "axios";

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
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);

  const items = [
    { key: "1", label: "Intern", children: <Question /> },
    { key: "2", label: "Fresher", children: <Question /> },
    { key: "3", label: "Junior", children: <Question /> },
    { key: "4", label: "Middle", children: <Question /> },
    { key: "5", label: "Senior", children: <Question /> },
  ];

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://api-internsystem.amazingtech.vn/api/CongNghe/get-all");
      if (response.data.statusCode === 200) {
        console.log("Technologies data:", response.data.data);
        setTechnologies(response.data.data);
      } else {
        message.error("Failed to fetch technologies");
      }
    } catch (error) {
      console.error("Error fetching technologies:", error);
      message.error("An error occurred while fetching technologies");
    } finally {
      setLoading(false);
    }
    
  };

  const handleCheckboxChange = (id, isChecked) => {
    const newCheckedItems = { ...checkedItems, [id]: isChecked };
    setCheckedItems(newCheckedItems);

    const checkedCount = Object.values(newCheckedItems).filter(Boolean).length;
    setIsExactlyOneChecked(checkedCount === 1);
  };

  const deleteTechnology = async (id) => {
    try {
      const response = await axios.delete(`https://api-internsystem.amazingtech.vn/api/CongNghe/delete/${id}`);
      if (response.data.statusCode === 200) {
        setTechnologies(technologies.filter(tech => tech.id !== id));
        message.success("Technology deleted successfully!");
      } else {
        message.error("Failed to delete technology");
      }
} catch (error) {
      console.error("Error deleting technology:", error);
      message.error("An error occurred while deleting the technology");
    }
  };

  const handleAddTechnology = async (values) => {
    try {
      const response = await axios.post("https://api-internsystem.amazingtech.vn/api/CongNghe/create", {
        ten: values.title,
        idViTri: parseInt(activeTab),
        urlImage: values.imageUrl
      });
      if (response.data.statusCode === 200) {
        fetchTechnologies();
        setAddModalVisible(false);
        form.resetFields();
        message.success("New technology added successfully!");
      } else {
        message.error("Failed to add new technology");
      }
    } catch (error) {
      console.error("Error adding technology:", error);
      message.error("An error occurred while adding the technology");
    }
  };

  const handleEditTechnology = async (values) => {
    try {
      console.log('Editing technology ID:', parseInt(activeTab));
    console.log('Editing technology URL:', `https://api-internsystem.amazingtech.vn/api/CongNghe/update/${editingTechnology.id}`);
      const response = await axios.put(`https://api-internsystem.amazingtech.vn/api/CongNghe/update/${editingTechnology.id}`, {
        ten: values.title,
        urlImage: values.imageUrl
      });
      if (response.data.statusCode === 200) {
        fetchTechnologies();
        setEditModalVisible(false);
        setEditingTechnology(null);
        editForm.resetFields();
        message.success("Technology updated successfully!");
      } else {
        message.error("Failed to update technology");
      }
    } catch (error) {
      console.error("Error updating technology:", error);
      message.error("An error occurred while updating the technology");
    }
  };

  const showEditModal = () => {
    const selectedTechnology = technologies.find(
      (tech) => checkedItems[tech.id]
    );
    if (selectedTechnology) {
      console.log('Selected technology for editing:', selectedTechnology);
      setEditingTechnology(selectedTechnology);
      editForm.setFieldsValue({
        title: selectedTechnology.ten,
        imageUrl: selectedTechnology.urlImage
      });
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
  console.log("Active tab:", activeTab); // Log active tab value
  console.log("Technologies:", technologies); // Log all technologies
  const filteredTechnologies = technologies.filter(tech => tech.idViTri === parseInt(activeTab));
  console.log("Filtered technologies:", filteredTechnologies);
  const totalItems = filteredTechnologies.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTechnologies = filteredTechnologies.slice(startIndex, endIndex);
  console.log("Paginated technologies:", paginatedTechnologies);
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
              technologiesToDelete.forEach(id => deleteTechnology(parseInt(id)));
              setCheckedItems({});
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
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="technology-list">
              {paginatedTechnologies.map((tech) => (
                
                <div key={tech.id} className="technology-item">
                  <Card className="card-custom" style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      onClick={() => handleShowModal(tech)}
                      src={tech.urlImage || 'default-image-url.jpg'}
                    />
                    <Card.Body>
                      <Checkbox
                        style={{ marginRight: "110px" }}
                        onChange={(e) => handleCheckboxChange(tech.id, e.target.checked)}
                        checked={checkedItems[tech.id]}
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
          )}

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