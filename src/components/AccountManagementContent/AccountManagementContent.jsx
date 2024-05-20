import React from "react";
import './AccountManagementContent.css'
import RectangleContent from "../RectangleContent/RectangleContent";
import userImage from "../../assets/user_image.png"

const data = [
    {
        title: 'Privacy & personalisation',
        content: ['See the data in your Intern System Account and choose what activity is saved, to personalise your experience'],
        instruction: 'Privacy & personalisation'
    },
    {
        title: 'Security Recommendations',
        content: ['Recommended actions found in the Security Check-Up'],
        instruction: 'Protect your account'
    },
    {
        title: 'Privacy Check-Up',
        content: ['Choose the privacy settings that are right for you with this step-by-step guide'],
        instruction: 'Take Privacy Check-Up'
    },
    {
        title: 'What are you looking for? ',
        content: [<div> Search Intern System Account</div>, 'See Help Options', 'Send Feedback'],
        instruction: ''
    }
]

const AccountManagementContent = () => {
    return (
        <div className="content">
            <img src={userImage} alt="user image" className="user-image"/>
            <div className="welcome">Hello Natalie Brogan!</div>
            <div className="user-gmail">nataliebrogan@gmail.com</div>
            <div className="rectangle-content-group">
                <RectangleContent title={data[0].title} content={data[0].content} instruction={data[0].instruction} />
                <RectangleContent title={data[1].title} content={data[1].content} instruction={data[1].instruction} />
            </div>
            <div className="rectangle-content-group">
                <RectangleContent title={data[2].title} content={data[2].content} instruction={data[2].instruction} />
            </div>
            <div className="rectangle-content-group">
                <RectangleContent title={data[3].title} content={data[3].content} instruction={data[3].instruction} />
            </div>
        </div>
    )
}

export default AccountManagementContent;