import React, { useState } from "react";
import "./TechnologyList.css";

import { Link } from "react-router-dom";
import { TiFolderDelete } from "react-icons/ti";
import { Modal } from "antd";
import { Tabs, Card } from "antd";
import Question from "./Question";

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
  const [open, setOpen] = useState(false);

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

  const technologies = {
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
  };

  return (
    <div className="technology-list">
      {technologies[activeTab].map((tech) => (
        <div key={tech.title} className="technology-item">
          <Card className="card-custom" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={tech.imageUrl} />
            <Card.Body>
              <TiFolderDelete style={{ marginTop: 5, marginRight: 5 }} />
              <Link
                className="link1"
                style={{ paddingRight: 10, color: "black" }}
                variant="primary"
                onClick={showModal}
              >
                Show questions
              </Link>
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
  );
};

export default TechnologyList;
