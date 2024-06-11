import React, { useState } from 'react';
import { DatePicker, Button, Modal,Dropdown,TimePicker,Form,Input } from 'antd';
import { ClockCircleOutlined ,DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';



const items = [
    {
      key: '1',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Email Interview
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
          Email Result
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
          Internship Information
        </a>
      ),
    },
  ];

const Sheldule = () => {
  const { t } = useTranslation();
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
      <Button  type="primary" onClick={showModal} style={{ background: "#7d3c98"}}>
      <ClockCircleOutlined/>
        {t("Schedule interview")}
      </Button>

      <Modal
        open={open}
        title={t("Schedule interview for Intern's ID: xxxx")}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1125}
        height= {997}
        footer={[
      
            <Button type="primary" style={{ background: "#6537B1"}}>
            <ClockCircleOutlined/>
              {t("Set Schedule")}
            </Button>
        
        ]}
      >
                 <form onSubmit={handleSubmit}>
                 <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent:'space-between' }}>
                 <div style={{ marginBottom: '20px', marginRight: '10px' }}>
  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>{t("Date")}</label>
 
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
    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>{t("Start Time")}</label>
   
     <TimePicker 
    style={{ width: '260px',height:"57px", padding: '8px', border: '1px solid #ccc', borderRadius: '10px' }}
     value={date} use12Hours onChange={onChange} />
  </div>

  <div style={{ marginBottom: '20px'}}>
  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px',opacity: 0.5}}>{t("Time Duration")}</label>
  <select
    value={timeDuration}
    onChange={(e) => setTimeDuration(e.target.value)}
    style={{ width: '260px',height:"57px", padding: '8px', border: '1px solid #ccc', borderRadius: '10px' }}
  >

    <option value={t("15 minutes")}> {t("15 minutes")}</option>
    <option value={t("30 minutes")}> {t("30 minutes")}</option>
    <option value={t("45 minutes")}> {t("45 minutes")}</option>
    <option value={t("1 hour")}> {t("1 hour")}</option>
  </select>
</div>

</div>


        {/*  SECOND ROUND */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent:'space-between' }}>

        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>{t("Types of Interviews")}</label>
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
  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>{t("Interviewer")}</label>
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
      <option value="" disabled selected>{t("Position")}</option>
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
  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>{t("Link Google Meet/Address")}</label>
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
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>{t("Send Email")}</label>
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
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>{t("Rank")}</label>
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
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>{t("To:")}</label>
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder={t("Enter email address")}
            style={{ width: '465px',height:"57px", padding: '8px', border: '1px solid #ccc', borderRadius: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Bcc:</label>
          <input
            type="email"
            value={bcc}
            onChange={(e) => setBcc(e.target.value)}
            placeholder= {t("Enter email address")}
            style={{ width: '465px',height:"57px", padding: '8px', border: '1px solid #ccc', borderRadius: '10px' }}
          />
        </div>

        </div>

          {/* type of email */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
  <div style={{ marginBottom: '20px' }}>
    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>{t("Choose types of Email")}</label>
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <select style={{ width: '260px', height: '57px', padding: '8px', border: '1px solid #ccc', borderRadius: '10px' }}>
        <option value="" disabled selected>{t("Please select an option")}</option>
        <option value=""  >{t("Email Interview")}</option>
        <option value=""  >{t("Email Result")}</option>
        <option value=""  >{t("Internship Information")}</option>

       
      </select>
    </div>
  </div>

  <div style={{ marginBottom: '20px' }}>


  <textarea  placeholder={t("Enter your email")}
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