import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Table from './Table';

export default function QuestionScreen({ levels }) {
  const { questionIndex, categoryIndex } = useParams();

  const [questions, setQuestions] = useState([]);
  const selectedQuestion = levels?.[categoryIndex]?.questions?.[questionIndex];
  useEffect(() => {
    
    if (Array.isArray(selectedQuestion)) {
      setQuestions(selectedQuestion);
    } else if (selectedQuestion) {
      setQuestions([selectedQuestion]); 
      // Wrap single object in an array
    } else {
      setQuestions([]); // Default to empty array
    }
    console.log(selectedQuestion)
   
  }, [levels, categoryIndex, questionIndex]);
 

  return (
    <div style={{
           position:'absolute',
            top:'0',
            color:'white',
            left:'20'
        }}>
      {questions.length > 0 ? (
        questions.map((q, index) => (
          <h2 key={index}>{q.question}</h2>
        ))
      ) : (
        <p>No questions available</p>
      )}
    {/*  <Table result={selectedQuestion.output}/>*/}
    <Table />
      {console.log(selectedQuestion.output)}
    </div>
  );
}
