import React from "react"
import './RectangleContent.css'
import { SearchOutlined } from '@ant-design/icons';

const RectangleContent = (props) => {
    return (
        <div className="rectangle-content">
            <div className="content1">
                <h1 className="sub-title">{props.title}</h1>
                <div className="sub-content">{props.content.map((con) => (typeof con === 'string' ? <div>{con}</div> : con))}</div>
            </div>
            <div className="divider"/>
            <div className="content2">
                <a href="/">{props.instruction}</a>
            </div>
        </div>
    )
}

export default RectangleContent