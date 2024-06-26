import React, { useState } from "react";
import { Button, Input, message } from "antd";

const Question = () => {
  const [questions, setQuestions] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
    { id: 3, value: "" },
    { id: 4, value: "" },
    { id: 5, value: "" },
  ]);

  const handleAddQuestion = () => {
    const newId = questions.length + 1;
    setQuestions([...questions, { id: newId, value: "" }]);
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

  const handleConfirmAddQuestion = () => {
    const allFieldsFilled = questions.every((question) => question.value.trim() !== "");

    if (allFieldsFilled) {
      // Submit the form or perform any action you need
      message.success("All fields are filled. Form submitted successfully!");
    } else {
      message.error("Please fill out all fields before submitting.");
    }
  };

  return (
    <div className="tab-content">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {questions.map((question) => (
          <div
            key={question.id}
            style={{
              marginBottom: "20px",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              Question {question.id}
              <span
                style={{ marginLeft: "10px", cursor: "pointer", color: "red" }}
                onClick={() => handleDeleteQuestion(question.id)}
              >
                x
              </span>
            </label>
            <Input
              style={{
                width: "420px",
                height: "32px",
                borderRadius: "6px",
              }}
              value={question.value}
              onChange={(e) =>
                handleChangeQuestion(question.id, e.target.value)
              }
            />
          </div>
        ))}
      </div>

      <label
        style={{
          display: "block",
          fontWeight: "bold",
          marginBottom: "5px",
          marginLeft: "20px",
        }}
      >
        Add Question
      </label>
      <Button
        style={{
          width: "420px",
          height: "32px",
          borderRadius: "6px",
          fontSize: "13px",
          background: "blue",
          opacity: "0.4",
          marginLeft: "20px",
          color: "white",
        }}
        onClick={handleAddQuestion}
      >
        Click to add more questions
      </Button>

      <label
        style={{
          display: "block",
          fontWeight: "bold",
          marginBottom: "5px",
          marginLeft: "20px",
        }}
      >
        Confirm Submission
      </label>
      <Button
        style={{
          width: "420px",
          height: "32px",
          borderRadius: "6px",
          fontSize: "13px",
          background: "green",
          opacity: "0.4",
          marginLeft: "20px",
          color: "white",
        }}
        onClick={handleConfirmAddQuestion}
      >
        CONFIRM ADD QUESTION
      </Button>
    </div>
  );
};

export default Question;
