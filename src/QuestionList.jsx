import React from 'react';
import { Link, useParams } from 'react-router-dom';

const QuestionList = ({ levels }) => {
  const { categoryIndex } = useParams(); // Get category index from URL
  const questions = levels[categoryIndex].questions;

  return (
    <div>
      <h1>Questions</h1>
      <ul>
        {questions.map((question, index) => (
          <li key={index} style={{ margin: '10px 0' }}>
            <Link
              to={`/category/${categoryIndex}/question/${index}`}
              style={{
                textDecoration: 'none',
                color: '#007BFF',
                fontWeight: 'bold',
              }}
            >
              {question.question}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
