import React, { useState } from 'react';
import { Button,Input } from "antd";


const Question = () => {
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
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {questions.map((question) => (
          <div key={question.id} style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
              Question {question.id}
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

      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
        Add Question
      </label>
      <Button
        style={{
          width: '420px',
          height: '70px',
          borderRadius: '20px',
          fontSize: '20px',
          background: 'gray',
          opacity: '0.4',
        }}
        onClick={handleAddQuestion}
      >
        Click to add more questions
      </Button>
    </div>
  );
};

export default Question;