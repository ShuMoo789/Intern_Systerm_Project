import React, { useState } from 'react';
import { Button, Input, Col } from "antd";


const Question = () => {
  const [questions, setQuestions] = useState([
    { id: 1, value: '' },
    { id: 2, value: '' },
    { id: 3, value: '' },
    { id: 4, value: '' },
    { id: 5, value: '' },
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

  const handleDeleteQuestion = (id) => {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    const renumberedQuestions = updatedQuestions.map((question, index) => ({
      ...question,
      id: index + 1,
    }));
    setQuestions(renumberedQuestions);
  };

  return (
    <div className="tab-content">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        {questions.map((question) => (
          <div key={question.id} style={{ marginBottom: '20px', marginLeft: "20px", marginRight: "20px" }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
              Question {question.id}
              <span
                style={{ marginLeft: '10px', cursor: 'pointer', color: 'red' }}
                onClick={() => handleDeleteQuestion(question.id)}
              >
                x
              </span>
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

      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', marginLeft: "20px" }}>
        Add Question
      </label>
      <StyledButton
        style={{
          width: '420px',
          height: '70px',
          borderRadius: '20px',
          fontSize: '20px',
          background: 'gray',
          opacity: '0.4',
          marginLeft: "20px",
          color:"red"
        }}
        onClick={handleAddQuestion}
      >
        Click to add more questions
      </StyledButton>
    </div>
  );
};

export default Question;