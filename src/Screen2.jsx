import './Screen2.css'; // Import the CSS for the component
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { div } from 'three/tsl';

const Screen2 = ({ levels }) => {
  const navigate = useNavigate();
  const { questionIndex, categoryIndex } = useParams();
  const [open, setOpen] = React.useState(false); // Modal starts closed
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const selectedQuestion = levels[0].questions?.[questionIndex];
 console.log(levels)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
 
    transform: 'translate(-50%, -50%)',
    width: 400,
    background:'rgb(253,255,9)',
background: 'linear-gradient(312deg, rgba(253,255,9,1) 0%, rgba(255,162,0,1) 48%)',
    color:'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  // Reset selected answer and correctness when question changes
  useEffect(() => {
    
    if (selectedQuestion) {
      setQuestions([selectedQuestion]);
      setSelectedAnswer(null);
      // Reset selected answer
      setIsCorrect(null); 
      setOpen(false)
      // Reset correctness flag
    } else {
      setQuestions([]);
    }
    console.log(selectedQuestion);
  }, [levels, categoryIndex, questionIndex]);

  const handleOptionClick = (option, correctOutput) => {
    setSelectedAnswer(option);
    setIsCorrect(option === correctOutput);
    setOpen(true); // Open the modal only after selecting an answer
  };

  return (
    <div className="screen2-container">
      {/* Left Half: Question Heading and Text */}
      <div className="text-section">
        
        {questions.length > 0 ? (
          questions.map((q, index) => (
            <div key={index}>
                <h1 className="heading">Question {q.id} </h1>
              <p className="question animated-question">{q.question}</p>
              <div className="options-container">
                {/* Render 4 options dynamically */}
                {q.options.map((option, i) => (
                  <button
                    key={i}
                    className={`option-button ${
                      selectedAnswer === option
                        ? isCorrect
                          ? "correct"
                          : "incorrect"
                        : ""
                    }`}
                    onClick={() => handleOptionClick(option, q.output)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {selectedAnswer && (
                <p className={`result ${isCorrect ? "correct" : "incorrect"}`}>
                  {isCorrect ? 'correct' : "Incorrect!"}
                </p>
              )}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={{ ...style }}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" style={{
                    textAlign:'center'
                  }}>
                    {isCorrect?'Correct':'Wrong'}
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {q.solution}
                  </Typography>
                  <div style={{
                    display:'flex',
                    justifyContent:'space-between',
                    margin:'5px'
                  }}>
                  <button  onClick={() => navigate(`/category/0/question/${parseInt(questionIndex) + 1}`)} style={{
                        background: 'rgb(0,27,84)',
                        background: 'linear-gradient(312deg, rgba(0,27,84,1) 0%, rgba(115,134,255,1) 100%)', /* Dark gray background */
                  }}>
                    Next Question
                  </button>
                  <button onClick={() => setOpen(false)} style={{
                        background: 'rgb(0,27,84)',
                        background: 'linear-gradient(312deg, rgba(0,27,84,1) 0%, rgba(115,134,255,1) 100%)', /* Dark gray background */
                  }}>
                    Try Again
                  </button>
                  </div>
                </Box>
              </Modal>
            </div>
          ))
        ) : (
          <>
          <div style={{
            marginLeft:'300px'
          }}>
          <p>No questions available</p>
          <button style={{
                background: 'rgb(0,27,84)',
                background: 'linear-gradient(312deg, rgba(0,27,84,1) 0%, rgba(115,134,255,1) 100%)', /* Dark gray background */
            color:'white'
          }} onClick={()=>navigate('/category/1/question/0')}>Move to medium</button>
          </div>
          </>
        )}
      </div>

      {/* Right Half: Rotating Image */}
      <div className="rotating-image-container">
            <img
              src="/Picsart_25-01-21_21-06-42-331.png"
              alt="Rotating Table"
              className="rotating-image-0"
            />
            </div>
   
    </div>
  );
};

export default Screen2;
