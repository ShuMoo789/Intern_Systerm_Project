import * as React from "react";
import "./ApproveCV.css";
import MenuNavigate from "../../components/Menu/MenuNavigate.jsx";
import {
    DownOutlined
} from "@ant-design/icons";
function IconTextBlock({ iconSrc, altText, text }) {
    return (
        <div className="icon-text-block">
            <img src={iconSrc} alt={altText} className="icon" />
            <span className="icon-text">{text}</span>
        </div>
    );
}

function MyComponent() {
    const interns = [
        {
            internID: "#12345128",
            dateSubmittedForm: "2 Jan 2023",
            fullName: "Esther Eden",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "2 comments",
            status: "Passed",
            buttons: {
                view: "View",
                feedbacks: "Feedbacks"
            }
        },
        {
            internID: "#12345128",
            dateSubmittedForm: "14 Dec 2022",
            fullName: "Ajmal Abdul",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "2 comments",
            status: "Failed",
            buttons: {
                view: "View",
                feedbacks: "Feedbacks"
            }
        },
        {
            internID: "#12345128",
            dateSubmittedForm: "2 Jan 2023",
            fullName: "Esther Eden",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "2 comments",
            status: "Pending",
            buttons: {
                view: "View",
                feedbacks: "Feedbacks"
            }
        },
        {
            internID: "#12345128",
            dateSubmittedForm: "14 Dec 2022",
            fullName: "Ajmal Abdul",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "2 comments",
            status: "Passed",
            buttons: {
                view: "View",
                feedbacks: "Feedbacks"
            }
        },
        {
            internID: "#12345128",
            dateSubmittedForm: "2 Jan 2023",
            fullName: "Esther Eden",
            dateOfBirth: "16/07/2001",
            phoneNumber: "0376782528",
            position: "Back-End",
            school: "FPT University",
            address: "District 9",
            email: "abc@gmail.com",
            cvLink: "Link",
            commentsCV: "2 comments",
            status: "Failed",
            buttons: {
                view: "View",
                feedbacks: "Feedbacks"
            }
        }
    ];

// Output the dataset to the console
    console.log(interns);

    return (
        <div id="APRCV">
            <nav className="sidebar">
                <MenuNavigate />
            </nav>

            <main className="content">
                <header className="content-header">
                    <h1 className="content-title">Approve CV</h1>
                    <div className="user-info">
                        <img loading="lazy"
                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a74075ff2226c9dfeae7aa6ee7046ea17e2c63a157408dc1df8a62e4a13776d?apiKey=41832340d6f545c2a0509736ad9e1693&"
                             alt="User Profile" className="user-profile-small"/>
                        <div className="user-details">
                            <span className="user-name">Natalie Brogan</span>
                            <span className="user-role">Admin</span>
                        </div>
                    </div>
                </header>

                <section className="content-section">
                    <h2 className="section-title">Search for Information</h2>
                    <div className="button-group">
                        <button className="button button-schedule">
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/df9311da8cede04c8358b213f39485de98001c308664cf2bf10daff525cb7286?apiKey=41832340d6f545c2a0509736ad9e1693&"
                                alt="Schedule Icon" className="button-icon"/>
                            <span>Schedule Interview</span>
                        </button>
                        <button className="button button-export">
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0fa11b0683eb59e5c46f322a171b42edba502fadc3f8daffe251ee8087dea429?apiKey=41832340d6f545c2a0509736ad9e1693&"
                                alt="Export Icon" className="button-icon"/>
                            <span>Export Excel</span>
                        </button>
                        <button className="button button-edit">
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ecb69ed4f9191e15f4927b1b9b7dd5b7e05e78dcd440b3b135257bd3dc95bd03?apiKey=41832340d6f545c2a0509736ad9e1693&"
                                alt="Edit Icon" className="button-icon"/>
                            <span>Edit</span>
                        </button>
                        <button className="button button-delete">
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/68a48237f0bae3c61dd65cfd116f092ab3bef8fb895c06116eaa24230e3d5284?apiKey=41832340d6f545c2a0509736ad9e1693&"
                                alt="Delete Icon" className="button-icon"/>
                            <span>Delete</span>
                        </button>
                        <button className="button button-add-intern">
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/464e70c797da987e533d3b7bac06274e496eb711c8027e3b77bb65828b659322?apiKey=41832340d6f545c2a0509736ad9e1693&"
                                alt="Add Intern Icon" className="button-icon"/>
                            <span>Add New Intern</span>
                        </button>
                    </div>

                <div className="Table">
                    <table>
                        <thead>
                        <tr>
                            <th><input type={"checkbox"}/></th>
                            <th>Intern ID</th>
                            <th>Date Submitted Form</th>
                            <th>Full Name</th>
                            <th>Date Of Birth</th>
                            <th>Phone Number</th>
                            <th>Position</th>
                            <th>School</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>CV</th>
                            <th>Comments CV</th>
                            <th>Status</th>
                            <th>Buttons</th>
                        </tr>
                        </thead>
                        <tbody>
                        {interns.map((intern, index) => (
                            <tr key={index}>
                                <td><input type={"checkbox"}/></td>
                                <td>{intern.internID}</td>
                                <td>{intern.dateSubmittedForm}</td>
                                <td>{intern.fullName}</td>
                                <td>{intern.dateOfBirth}</td>
                                <td>{intern.phoneNumber}</td>
                                <td>{intern.position}</td>
                                <td>{intern.school}</td>
                                <td>{intern.address}</td>
                                <td>{intern.email}</td>
                                <td><a href="#">{intern.cvLink}</a></td>
                                <td>{intern.commentsCV}</td>
                                <td>
                                    <div className="Status" style={(intern.status === "Pending") ? {
                                        backgroundColor: "#FFB596",
                                        color: "#E5731C"
                                    } : (intern.status === "Failed") ? {
                                        backgroundColor: "#F5A3B7",
                                        color: "#7D0022"
                                    } : (intern.status === "Passed") ? {backgroundColor: "#B7EACB", color: "#3A7D34"} : {}}><DownOutlined />{intern.status}</div>
                                </td>
                                <td style={{display: 'flex'}}>
                                    <div className="view">{intern.buttons.view}</div>
                                    <div className="feedbacks">{intern.buttons.feedbacks}</div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                </section>
            </main>
        </div>
    );
}

export default MyComponent;