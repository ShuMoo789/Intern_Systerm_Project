import React, { useState } from 'react';
import { Button} from "antd";
import ViewDetailBtn from "../../assets/folder-2.svg"

const ViewDetailButton = () => {
    return (
        <div className='container'>
            <Button 
                type="default"              
                className='view-detail-btn'
                icon={<img src={ViewDetailBtn} alt="icon" style={{ width: 20, height: 20 }} />} 
            > 
                View Details
            </Button>

        </div>
    );
};

export default ViewDetailButton;