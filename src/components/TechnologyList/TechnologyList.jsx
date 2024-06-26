import React, { useState } from "react";
import "./TechnologyList.css";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { TiFolderDelete } from "react-icons/ti";
import { Modal, Pagination, Button } from "antd";
import { Tabs } from "antd";
import Question from "./Question";
import Detail from "./Detail";
import { useTranslation } from "react-i18next";

const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: "1",
    label: "Intern",
    children: <Question />,
  },
  {
    key: "2",
    label: "Fresher",
    children: <Question />,
  },
  {
    key: "3",
    label: "Junior",
    children: <Question />,
  },
  {
    key: "4",
    label: "Middle",
    children: <Question />,
  },
  {
    key: "5",
    label: "Senior",
    children: (
      <Question />

      // <div className="tab-content">
      //     <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      //     <div style={{ marginBottom: '20px' }}>
      //     <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Question 1</label>
      //     <Input
      //           style={{
      //             width: "420px",
      //             height: "70px",
      //             borderRadius: "20px",
      //           }}
      //         />
      //     </div>

      //     <div style={{ marginBottom: '20px' }}>
      //     <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Question 2</label>
      //     <Input
      //           style={{
      //             width: "420px",
      //             height: "70px",
      //             borderRadius: "20px",
      //           }}
      //         />
      //     </div>

      //     <div style={{ marginBottom: '20px' }}>
      //     <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Question 3</label>
      //     <Input
      //           style={{
      //             width: "420px",
      //             height: "70px",
      //             borderRadius: "20px",
      //           }}
      //         />
      //     </div>

      //     </div>

      //     <div>
      //       Add Question

      //     </div>
      // </div>
    ),
  },
];

const TechnologyList = ({ activeTab }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleShowModal = (tech) => {
    setOpenDetail(true);
    setSelectedTech(tech);
  };

  const handleDetailCancel = () => {
    setOpenDetail(false);
  };

  const technologies = {
    "Back-End": [
      {
        title: "Java",
        imageUrl:
          "https://www.logo.wine/a/logo/Java_(programming_language)/Java_(programming_language)-Logo.wine.svg",
        description:
          "Java is a versatile, object-oriented programming language developed by Sun Microsystems in the mid-1990s. It is renowned for its platform independence, meaning programs written in Java can run on any device that has a Java Virtual Machine (JVM). Java is widely used in web development, mobile applications (Android), enterprise systems, and more.",
      },
      {
        title: "C#",
        imageUrl:
          "https://caodang.fpt.edu.vn/wp-content/uploads/2024/04/FPT-Polytechnic_HN_ngon_ngu_lap_trinh_c.webp",
        description:
          "C# (pronounced as 'C sharp') is a powerful, modern programming language developed by Microsoft as part of its .NET framework. It is designed for building a wide range of applications on the Windows platform. C# combines the power and flexibility of C++ with the simplicity of Visual Basic. It is widely used for developing desktop applications, web applications, and games, and is known for its strong typing, scalability, and rich set of libraries.",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
        description:
          "Node.js is a powerful, server-side JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to build scalable network applications with ease. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for handling concurrent connections. It is widely used for building fast and scalable web applications, real-time applications (like chat and gaming), APIs, and microservices.",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
        description:
          "Node.js is a powerful, server-side JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to build scalable network applications with ease. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for handling concurrent connections. It is widely used for building fast and scalable web applications, real-time applications (like chat and gaming), APIs, and microservices.",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
        description:
          "Node.js is a powerful, server-side JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to build scalable network applications with ease. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for handling concurrent connections. It is widely used for building fast and scalable web applications, real-time applications (like chat and gaming), APIs, and microservices.",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
        description:
          "Node.js is a powerful, server-side JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to build scalable network applications with ease. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for handling concurrent connections. It is widely used for building fast and scalable web applications, real-time applications (like chat and gaming), APIs, and microservices.",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
        description:
          "Node.js is a powerful, server-side JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to build scalable network applications with ease. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for handling concurrent connections. It is widely used for building fast and scalable web applications, real-time applications (like chat and gaming), APIs, and microservices.",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
        description:
          "Node.js is a powerful, server-side JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to build scalable network applications with ease. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for handling concurrent connections. It is widely used for building fast and scalable web applications, real-time applications (like chat and gaming), APIs, and microservices.",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
        description:
          "Node.js is a powerful, server-side JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to build scalable network applications with ease. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for handling concurrent connections. It is widely used for building fast and scalable web applications, real-time applications (like chat and gaming), APIs, and microservices.",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
        description:
          "Node.js is a powerful, server-side JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to build scalable network applications with ease. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for handling concurrent connections. It is widely used for building fast and scalable web applications, real-time applications (like chat and gaming), APIs, and microservices.",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
        description:
          "Node.js is a powerful, server-side JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to build scalable network applications with ease. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for handling concurrent connections. It is widely used for building fast and scalable web applications, real-time applications (like chat and gaming), APIs, and microservices.",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
        description:
          "Node.js is a powerful, server-side JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to build scalable network applications with ease. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for handling concurrent connections. It is widely used for building fast and scalable web applications, real-time applications (like chat and gaming), APIs, and microservices.",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
        description:
          "Node.js is a powerful, server-side JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to build scalable network applications with ease. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for handling concurrent connections. It is widely used for building fast and scalable web applications, real-time applications (like chat and gaming), APIs, and microservices.",
      },
      {
        title: "NodeJS",
        imageUrl: "https://www.svgrepo.com/show/376337/node-js.svg",
        description:
          "Node.js is a powerful, server-side JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to build scalable network applications with ease. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for handling concurrent connections. It is widely used for building fast and scalable web applications, real-time applications (like chat and gaming), APIs, and microservices.",
      },
    ],
    "Front-End": [
      {
        title: ".ReactJS",
        imageUrl:
          "https://seeklogo.com/images/R/react-logo-7B3CE81517-seeklogo.com.png",
        description:
          "ReactJS is a popular JavaScript library developed by Facebook for building user interfaces, especially for single-page applications. It allows developers to create reusable UI components and manage the state of applications efficiently. ReactJS employs a virtual DOM to optimize rendering and improve performance. It is widely used for building dynamic and interactive web applications.",
      },
    ],
    "Business Analyst": [
      {
        title: "BA",
        imageUrl:
          "https://assets.janbasktraining.com/blog/uploads/images/image_750x_5da6c72103449.jpg",
        description:
          "A Business Analyst (BA) is a professional who analyzes an organization’s business processes, systems, and strategies to identify opportunities for improvement and optimization. They act as a bridge between business stakeholders and the IT team, gathering requirements, documenting processes, and providing data-driven recommendations. BAs play a crucial role in ensuring that business needs are met efficiently through technology and process changes.",
      },
    ],
    Marketing: [
      {
        title: "Marketing",
        imageUrl:
          "https://e7.pngegg.com/pngimages/645/742/png-clipart-marketing-mix-strategy-promotion-porter-s-five-forces-analysis-framework-text-logo.png",
        description:
          "Marketing is the process of promoting, selling, and distributing a product or service. It involves understanding consumer needs, creating value, and communicating that value to target audiences through various strategies and channels. Marketing aims to attract and retain customers by delivering products or services that meet their needs, ultimately driving sales and business growth.",
      },
    ],
    Design: [
      {
        title: "Design",
        imageUrl:
          "https://i.pinimg.com/736x/a5/58/b4/a558b426cb8973523f37bbed94cf0f09.jpg",
        description:
          "Figma is a cloud-based design tool used for creating user interfaces and user experiences. It allows designers to collaborate in real-time, making it ideal for team projects. Figma supports vector graphics editing, prototyping, and design system management. Its web-based nature ensures that it is accessible from any device with an internet connection, enhancing flexibility and collaboration in the design process.",
      },
    ],
  };

  const filteredTechnologies = technologies[activeTab];
  const totalItems = filteredTechnologies.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTechnologies = filteredTechnologies.slice(
    startIndex,
    endIndex
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="technology-list-container">
      <div className="technology-list-content">
        <div className="technology-list">
          {paginatedTechnologies.map((tech, index) => (
            <div
              key={`${tech.title}-${startIndex + index}`}
              className="technology-item"
            >
              <Card className="card-custom" style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  onClick={() => handleShowModal(tech)}
                  src={tech.imageUrl}
                />
                <Card.Body>
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
                    <TiFolderDelete style={{ marginTop: 5, marginRight: 5 }} />{" "}
                    {t("Show Question")}
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
          {/* Modal Show Question */}
          <Modal
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1448}
            height={447}
            footer={[]}
          >
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </Modal>
        </div>
      </div>
      <div className="pagination-container">
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
      {/* Modal component for showing technology details */}
      {selectedTech && (
        <Detail
          technology={selectedTech}
          visible={openDetail}
          handleClose={handleDetailCancel}
        />
      )}
    </div>
  );
};

export default TechnologyList;
