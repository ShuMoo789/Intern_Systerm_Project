import * as React from "react";
import "./ProjectMan.css";
import MainLayout from "../../MainLayout/MainLayout.jsx";

function UserAvatar({ src, name, role }) {
    return (
        <div className="user-avatar">
            <img loading="lazy" src={src} alt={`${name}'s avatar`} className="avatar-image" />
            <div className="user-info">
                <div className="user-name">{name}</div>
                <div className="user-role">{role}</div>
            </div>
        </div>
    );
}

function ActionButton({ src, text }) {
    return (
        <button className="action-button">
            <img loading="lazy" src={src} alt="" className="button-icon" />
            <span>{text}</span>
        </button>
    );
}

function FormInput({ label, id, placeholder, iconSrc }) {
    return (
        <div className="form-input">
            <label className="input-label" htmlFor={id}>{label}</label>
            <div className="input-wrapper">
                <input type="text" id={id} placeholder={placeholder} aria-label={label} />
                <img loading="lazy" src={iconSrc} alt="" className="input-icon" />
            </div>
        </div>
    );
}

function ProjectListItem({ imageSrc, altText }) {
    return (
        <div className="project-list-item">
            <img loading="lazy" src={imageSrc} alt={altText} className="project-image" />
        </div>
    );
}

function MyComponent() {
    const users = [
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/52691f601b1d26a28e1153a512f87eef65b1fd24de36be71c914320b016e1066?apiKey=41832340d6f545c2a0509736ad9e1693&", name: "Natalie Brogan", role: "Admin" },
    ];

    const actions = [
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/99bd9ff73c07cd54e79e40246e5c71822b69ae08189e69682138b8320fdb6e90?apiKey=41832340d6f545c2a0509736ad9e1693&", text: "Export Excel" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5b3c6bd4fd6d9f0c0c818844e97d93872070d24ad87e8697eed9fb897bb5b42d?apiKey=41832340d6f545c2a0509736ad9e1693&", text: "Edit" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/c3731845728a6749ec8b8e2601fba494bbd2369532ea1b3ec038cfa51684f188?apiKey=41832340d6f545c2a0509736ad9e1693&", text: "Delete" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f9e6fe513fc2997ea5e4c95fcd477e3c0ec66132866811049483b764275003a4?apiKey=41832340d6f545c2a0509736ad9e1693&", text: "Add New Project" },
    ];

    const formInputs = [
        { label: "Enter Name of project", id: "projectName", placeholder: "Enter Name of project", iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f75eebda49e9b3eb1bb69caa4b6bf30a0e2f22c6023c958d990df9c89b39980d?apiKey=41832340d6f545c2a0509736ad9e1693&" },
        { label: "Enter Position", id: "position", placeholder: "Enter Position", iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/d7587dc7d7f41e9466301509b084cdf65a7ff26a6b78b37014f4a5e682c4cec2?apiKey=41832340d6f545c2a0509736ad9e1693&" },
        { label: "Enter Technology", id: "technology", placeholder: "Enter Technology", iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/36516a317aca1e0b8b31be8fac5993fc524717c01cb31df357ed8e182360612c?apiKey=41832340d6f545c2a0509736ad9e1693&" },
        { label: "Enter Leader", id: "leader", placeholder: "Enter Leader", iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f75eebda49e9b3eb1bb69caa4b6bf30a0e2f22c6023c958d990df9c89b39980d?apiKey=41832340d6f545c2a0509736ad9e1693&" },
        { label: "Enter Sub Leader", id: "subLeader", placeholder: "Enter Sub Leader", iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/d7587dc7d7f41e9466301509b084cdf65a7ff26a6b78b37014f4a5e682c4cec2?apiKey=41832340d6f545c2a0509736ad9e1693&" },
        { label: "Enter Mentor", id: "mentor", placeholder: "Enter Mentor", iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/36516a317aca1e0b8b31be8fac5993fc524717c01cb31df357ed8e182360612c?apiKey=41832340d6f545c2a0509736ad9e1693&" },
    ];

    const projectImages = [
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/371f764fb37608eafff8b1af78b7452c2f3cc1a221f93f12f2ec16d06da77699?apiKey=41832340d6f545c2a0509736ad9e1693&", alt: "Project image" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/08f506b027269bad70af16f8b1dd558fc7470a782b29ee7f8c0fa05d60d3e3a6?apiKey=41832340d6f545c2a0509736ad9e1693&", alt: "Project image" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/44c03db76dc58551d6df58a1f93f18fefd028e313f48a9f1b1811b00c14a1c31?apiKey=41832340d6f545c2a0509736ad9e1693&", alt: "Project image" },
    ];

    return (
        <section>
            <header className="header">
                <h1 className="title">Project Management</h1>
                <div className="user-area">
                    {users.map(user => (
                        <UserAvatar key={user.name} {...user} />
                    ))}
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/4267d7b1a687bb6c80da42fabaf52d2db9b7cf12b8e97e288e3db131050351a6?apiKey=41832340d6f545c2a0509736ad9e1693&" alt="menu icon" className="menu-icon" />
                </div>
            </header>
            <MainLayout>
            <main className="main-content">
                <form className="search-form">
                    <label htmlFor="search" className="search-label">Search for Information</label>
                    <div className="action-buttons">
                        {actions.map(action => (
                            <ActionButton key={action.text} {...action} />
                        ))}
                    </div>
                </form>
                <section className="form-section">
                    <h2 className="section-title">Search Filters</h2>
                    <form className="filters-form">
                        {formInputs.map(input => (
                            <FormInput key={input.id} {...input} />
                        ))}
                        <div className="form-group">
                            <label className="input-label" htmlFor="releaseDate">Enter Release Date</label>
                            <div className="input-wrapper">
                                <input type="text" id="releaseDate" placeholder="Enter Release Date" aria-label="Enter Release Date" />
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/4dc40b25c0b82f80493d460c7030414bb6c98f4d768c75af73d0d73df384ac13?apiKey=41832340d6f545c2a0509736ad9e1693&" alt="" className="input-icon" />
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="reset" className="reset-button">
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc395f9d2cf2f6d6b498ec2fd455599d337c27d6b6b07bfc434583354b6f4468?apiKey=41832340d6f545c2a0509736ad9e1693&" alt="" className="button-icon" />
                                Clean Filters
                            </button>
                            <button type="submit" className="submit-button">
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/9334fa5a67e28af8c7fd344b2b7a84a1cf52b8e26bd247922bac592c57c32272?apiKey=41832340d6f545c2a0509736ad9e1693&" alt="" className="button-icon" />
                                Search
                            </button>
                        </div>
                    </form>
                </section>
                <section className="projects-section">
                    <h2 className="section-title">Projects</h2>
                    <div className="projects-list">
                        {projectImages.map((image, index) => (
                            <ProjectListItem key={index} {...image} />
                        ))}
                        {projectImages.map((image, index) => (
                            <ProjectListItem key={index + projectImages.length} {...image} />
                        ))}
                    </div>
                    <div className="pagination">
            <span className="page-info">
              <span className="current-page">1 -</span>
              <span className="total-pages">6 of 56</span>
            </span>
                        <nav className="pagination-nav">
                            <span className="pagination-text">The page you’re on</span>
                            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ab725234adf10e462ae88e43fa32e0418d0a598b3cff58dcf3eb3cec86b9bb2?apiKey=41832340d6f545c2a0509736ad9e1693&" alt="pagination icon" className="pagination-icon" />
                            <div className="pagination-divider" />
                            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a66b0723548322e7c6554afd3faf167f64055d4d14429d94071f2454436ef336?apiKey=41832340d6f545c2a0509736ad9e1693&" alt="previous page" className="pagination-icon" />
                            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a9b01574ae70e179dd16f70b8ae9b3134b069b3e5e8ac0f8710a59d46eb2067c?apiKey=41832340d6f545c2a0509736ad9e1693&" alt="next page" className="pagination-icon" />
                        </nav>
                    </div>
                </section>
            </main>
                </MainLayout>
        </section>
    );
}

export default MyComponent;