import React, { useState } from 'react';
import { DatePicker, Button, Modal,Dropdown,TimePicker,Form,Input } from 'antd';
import { ClockCircleOutlined ,DownOutlined } from '@ant-design/icons';
import "./ApproveCV.css"

const items = [
    {
      key: '1',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Email interview
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Email result
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Internship information
        </a>
      ),
    },
  ];

const Sheldule = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('12:00 AM');
  const [timeDuration, setTimeDuration] = useState('15 minutes');
  const [interviewType, setInterviewType] = useState('Online/Offline');
  const [interviewer, setInterviewer] = useState('Nguyen Van A');
  const [position, setPosition] = useState('');
  const [emailType, setEmailType] = useState('');
  const [to, setTo] = useState('');
  const [bcc, setBcc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };
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

    
  const onChange = (date, dateString) => {
    // Handle the date change here
    console.log(date, dateString);
  };
  return (
    <>
      <button className="button button-schedule" onClick={showModal}>
      <ClockCircleOutlined/>
        <span className='btn-name'>Schedule interview</span>
      </button>

      <Modal
        open={open}
        title="Schedule interview for Intern's ID: xxxx"
        onOk={handleOk}
        onCancel={handleCancel}
        width={1125}
        height= {997}
        footer={[
      
            <Button type="primary" style={{ background: "#6537B1"}}>
            <ClockCircleOutlined/>
              Set Schedule
            </Button>
        
        ]}
      >
                 <form onSubmit={handleSubmit}>
                 <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent:'space-between' }}>
                 <div style={{ marginBottom: '20px', marginRight: '10px' }}>
  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Date</label>
 
  <input
    type="text"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    placeholder="DD/MM/YYYY"
    style={{
      width: '260px',
      height: '57px',
      borderRadius: '10px',
      padding: '8px',
      border: '1px solid #ccc',
      boxSizing: 'border-box', // Add this line
      fontSize: '14px', // Adjust font size if needed
    }}
  />
</div>

  <div style={{ marginBottom: '20px', marginRight: '10px' }}>
    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Start Time</label>
   
     <TimePicker 
    style={{ width: '260px',height:"57px", padding: '8px', border: '1px solid #ccc', borderRadius: '10px' }}
     value={date} use12Hours onChange={onChange} />
  </div>

  <div style={{ marginBottom: '20px'}}>
  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px',opacity: 0.5}}>Time Duration</label>
  <select
    value={timeDuration}
    onChange={(e) => setTimeDuration(e.target.value)}
    style={{ width: '260px',height:"57px", padding: '8px', border: '1px solid #ccc', borderRadius: '10px' }}
  >

    <option value="15 minutes">15 minutes</option>
    <option value="30 minutes">30 minutes</option>
    <option value="45 minutes">45 minutes</option>
    <option value="1 hour">1 hour</option>
  </select>
</div>

</div>


        {/*  SECOND ROUND */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent:'space-between' }}>

        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Types of Interviews</label>
          <select
            value={interviewType}
            onChange={(e) => setInterviewType(e.target.value)}
            style={{ width: '260px',height:"57px", padding: '8px', border: '1px solid #ccc', borderRadius: '10px' }}
          >
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        {/* INTERVIEWER */}
        <div>
  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Interviewer</label>
  <div style={{ position: 'relative', width: '322px', height: '57px' }}>
    <select 
      style={{ 
        position: 'absolute', 
        width: '122px', 
        height: '57px', 
        border: '1px solid #ccc', 
        borderRadius: '10px', 
        textAlign: 'center', 
        textAlignLast: 'center',
        zIndex: 2, 
        background: "#6537B1",
        color:"white"
      }}
    >
      <option value="" disabled selected>Position</option>
      <option value="back-end">Back-End</option>
      <option value="front-end">Front-End</option>
      <option value="ba">BA</option>
    </select>
    
    <select
      value={interviewer}
      onChange={(e) => setInterviewer(e.target.value)}
      style={{ 
        width: '322px', 
        height: '57px', 
        border: '1px solid #ccc', 
        borderRadius: '10px', 
        textAlign: 'center', 
        textAlignLast: 'center',
        zIndex: 1,
       
        
      }}
    >
    
      <option value="Nguyen Van A">Nguyen Van A</option>
      <option value="Interviewer B">Interviewer B</option>
      <option value="Interviewer C">Interviewer C</option>
    </select>
  </div>
</div>


        {/* LINK GOOGLE MEET */}
        <div style={{ marginBottom: '20px' }}>
  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Link Google Meet/Address</label>
  <input
    type="text"
    value={date}
    onChange={(e) => setDate(e.target.value)}
  
    style={{
      width: '260px',
      height: '57px',
   
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      boxSizing: 'border-box', // Add this line
      fontSize: '14px', // Adjust font size if needed
    }}
  />
</div>

        </div>

        {/* SEND EMAIL */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent:'space-between' }}>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Send Email</label>
          <select
            value={interviewType}
            
         
          
            style={{
              width: '260px',
              height: '57px',
              borderRadius: '10px',
              padding: '8px',
              border: '1px solid #ccc',
              boxSizing: 'border-box', // Add this line
              fontSize: '14px', // Adjust font size if needed
            }}
          >
            <option value="" disabled selected>Online/Offline</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Rank</label>
          <select
             style={{ width: '260px',height:"57px", padding: '8px', border: '1px solid #ccc', borderRadius: '10px' }}
          >
            <option value="intern">Intern</option>
            <option value="senior">Senior</option>
            <option value="junior">Junior</option>
          </select>
        </div>


        </div>


              {/* to and bcc  */}

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent:'space-between' }}>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>To:</label>
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Enter email addresses"
            style={{ width: '465px',height:"57px", padding: '8px', border: '1px solid #ccc', borderRadius: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Bcc:</label>
          <input
            type="email"
            value={bcc}
            onChange={(e) => setBcc(e.target.value)}
            placeholder="Enter email addresses"
            style={{ width: '465px',height:"57px", padding: '8px', border: '1px solid #ccc', borderRadius: '10px' }}
          />
        </div>

        </div>

          {/* type of email */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
  <div style={{ marginBottom: '20px' }}>
    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Choose types of Email</label>
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <select style={{ width: '260px', height: '57px', padding: '8px', border: '1px solid #ccc', borderRadius: '10px' }}>
        <option value="" disabled selected>Please select an option</option>
        <option value=""  >Email interview</option>
        <option value=""  >Email Result</option>
        <option value=""  >internship information</option>

       
      </select>
    </div>
  </div>

  <div style={{ marginBottom: '20px' }}>


  <textarea  placeholder="Enter your email"
    style={{
      width: '759px',
      height: '196px',
    
      border: '1px solid #ccc',
      borderRadius: '4px',
      lineHeight: '1',
    
    }}
      />
</div>

</div>

      </form>

      </Modal>
    </>
  );
};

export default Sheldule;