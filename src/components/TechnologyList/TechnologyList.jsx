import React from 'react';
import './TechnologyList.css';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { TiFolderDelete } from "react-icons/ti";
const TechnologyList = ({ activeTab }) => {
    const technologies = {
        'Back-End': [
            { title: 'Java', imageUrl: 'https://www.logo.wine/a/logo/Java_(programming_language)/Java_(programming_language)-Logo.wine.svg' },
            { title: 'C#', imageUrl: 'https://caodang.fpt.edu.vn/wp-content/uploads/2024/04/FPT-Polytechnic_HN_ngon_ngu_lap_trinh_c.webp' },
            { title: 'NodeJS', imageUrl: 'https://www.svgrepo.com/show/376337/node-js.svg' }
        ],
        'Front-End': [
            { title: '.ReactJS', imageUrl: 'https://seeklogo.com/images/R/react-logo-7B3CE81517-seeklogo.com.png' },
        ],
        'Business Analyst': [],
        'Marketing': [

        ],
        'Design': [

        ],
    };

    return (
        <div className="technology-list">
            {technologies[activeTab].map((tech) => (
                <div key={tech.title} className="technology-item">
                    <Card className="card-custom" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={tech.imageUrl} />
                        <Card.Body>
                            <TiFolderDelete style={{ marginTop: 5, marginRight: 5 }} />
                            <Link className='link1' style={{ paddingRight: 10, color: "black" }} to="/" variant="primary">Show questions</Link>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default TechnologyList;