import React from "react"
import "./GroupButton.css"
import { Button } from "antd"

const GroupButton = (props) => {
    return (
        <div className="group-button">
            {props.groupButton.map((prop) => (<Button style={{ minWidth: '15%', backgroundColor: prop.color, fontSize: '10px', color: '#FFFFFF' }}>{prop.icon}{prop.name}</Button>))}
        </div>
    )
}

export default GroupButton