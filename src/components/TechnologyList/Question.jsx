import React, { useState } from 'react';
import { Button,Input,Col } from "antd";
import { useTranslation } from 'react-i18next';


const Question = () => {
  const {t} = useTranslation()
  const [questions, setQuestions] = useState([
    { id: 1, value: '' },
    { id: 2, value: '' },
    { id: 3, value: '' },
  ]);

  const handleAddQuestion = () => {
    const newId = questions.length + 1;
    setQuestions([...questions, { id: newId, value: '' }]);
  };

  const handleChangeQuestion = (id, value) => {
    setQuestions(
      questions.map((question) =>
        question.id === id ? { ...question, value } : question
      )
    );
  };

  return (
    <div className="tab-content">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        {questions.map((question) => (
          <div key={question.id} style={{ marginBottom: '20px' , marginLeft:"20px",marginRight:"20px"}}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
              {t("Question")} {question.id}
            </label>
            <Input
              style={{
                width: '420px',
                height: '70px',
                borderRadius: '20px',
              }}
              value={question.value}
              onChange={(e) => handleChangeQuestion(question.id, e.target.value)}
            />
          </div>
        ))}
      </div>

      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' ,    marginLeft:"20px"}}>
        {t("Add Question")}
      </label>
      <Button
        style={{
          width: '420px',
          height: '70px',
          borderRadius: '20px',
          fontSize: '20px',
          background: 'gray',
          opacity: '0.4',
          marginLeft:"20px"
        }}
        onClick={handleAddQuestion}
      >
        {t("Click to add more questions")}
      </Button>
    </div>
  );
};

export default Question;