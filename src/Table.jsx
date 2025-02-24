import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Table.css';
import TopZone from './TopZone';
import TableSide from './TableSide';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function Table({ levels }) {
  const navigate = useNavigate();
  const { questionIndex } = useParams();
  const selectedQuestion = levels[1].questions?.[questionIndex];

  const elements = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const [e, setE] = useState(elements);
  const [tableZones, setTableZones] = useState(Array(8).fill(null));
  const [correct, setCorrect] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  // Reset state when questionIndex changes
  useEffect(() => {
    setE(elements);
    setTableZones(Array(8).fill(null));
    setCorrect(false);
    setOpen(false);
  }, [questionIndex]);

  const acceptDropToTop = (id) => {
    setE((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setTableZones((prev) => prev.map((zone) => (zone === id ? null : zone)));
  };

  const acceptDropToTableSide = (id, zoneIndex) => {
    if (!tableZones.includes(id)) {
      const newZones = [...tableZones];
      newZones[zoneIndex] = id;
      setTableZones(newZones);
      setE((prev) => prev.filter((element) => element !== id));
    }
  };

  const undo = () => {
    setE(elements);
    setTableZones(Array(8).fill(null));
  };

  const Done = () => {
    if (!selectedQuestion) {
      alert('No question selected.');
      return;
    }
    const correctOutput = selectedQuestion.output;
    const isCorrect = tableZones.every((zone, index) => zone === correctOutput[index]);
    setCorrect(isCorrect);
    setOpen(true);
  };

  return (
    <div className="container">
      {selectedQuestion ? (
        <div className="question-section">
          <h3>Question: {selectedQuestion.id} : {selectedQuestion.question}</h3>
          <p><strong>Level:</strong> {selectedQuestion.level}</p>
          <p><strong>Constraints:</strong></p>
          <ul>
            {selectedQuestion.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
          <p><strong>Be Careful:</strong>Use blank paper to understand constraints and make patterns.Satisfy each constraint step by step.Then you will understand to position elements     .             .....  </p>
         
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              background: 'rgb(0,27,84)',
              background: 'linear-gradient(312deg, rgba(0,27,84,1) 0%, rgba(115,134,255,1) 100%)',
              color: 'white',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}>
              <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center' }}>
                {correct ? 'Correct' : 'Wrong'}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Solution: {selectedQuestion.solution}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Explanation: {selectedQuestion.explanation}
              </Typography>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '5px',
              }}>
                <button onClick={() => navigate(`/category/1/question/${parseInt(questionIndex) + 1}`)} style={{
                   background: 'rgb(0,27,84)',
                   background: 'linear-gradient(312deg, rgba(0,27,84,1) 0%, rgba(115,134,255,1) 100%)',
                }}>
                  Next Question
                </button>
                <button className="modelButton" onClick={handleClose}  style={{
                   background: 'rgb(0,27,84)',
                   background: 'linear-gradient(312deg, rgba(0,27,84,1) 0%, rgba(115,134,255,1) 100%)',
                }}>
                  Try Again
                </button>
              </div>
            </Box>
          </Modal>
        </div>
      ) : (
        <>
          <p>No questions available</p>
          <button style={{
            backgroundColor: '#cc7722',
            color: 'white',
          }} onClick={() => navigate('/category/2/question/0')}>
            Move to hard
          </button>
        </>
      )}
      {selectedQuestion && (
        <div className="table-wrapper">
          <div className="topzone">
            {e.length > 0 ? (
              <TopZone elements={e} acceptDrop={acceptDropToTop} />
            ) : (
              <h4 style={{ textAlign: 'center' }}>EMPTY</h4>
            )}
            <div className="buttons">
              <button onClick={undo}>Undo</button>
              <button onClick={Done}>Submit</button>
            </div>
          </div>
          <div className="table">
            <div className="rotating-image-container">
              <img
                src="/Picsart_25-01-21_21-06-42-331.png"
                alt="Rotating Table"
                className="rotating-image-1"
              />
              <div className="tableoptions">
                {tableZones.map((text, index) => (
                  <TableSide
                    key={index}
                    index={index}
                    currentText={text || '-'}
                    acceptDrop={acceptDropToTableSide}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
