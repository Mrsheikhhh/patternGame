import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Table.css';
import TopZone from './TopZone';
import TableSide from './TableSide';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function Table({ levels }) {
   const navigate = useNavigate();
   
    const [open, setOpen] = React.useState(false); // Modal starts closed
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  const { questionIndex } = useParams();
  const selectedQuestion = levels[2].questions?.[questionIndex];
  const [elements] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
  const [e, setE] = useState(elements);
  const [tableZones, setTableZones] = useState(Array(8).fill(null));
  const [correct,setCorrect]=useState(false)

  const acceptDropToTop = (id) => {
    setE((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setTableZones((prev) => prev.map((zone) => (zone === id ? null : zone)));
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
 
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#000220',
    color:'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const acceptDropToTableSide = (id, zoneIndex) => {
    if (!tableZones.includes(id)) {
      const newZones = [...tableZones];
      newZones[zoneIndex] = id;
      
      setTableZones(newZones);
     
      setE((prev) => prev.filter((element) => element !== id));
      console.log(tableZones)
    }
  };

  const undo = () => {
    setE(elements);
    setTableZones(Array(8).fill(null));
  };

  const Done = () => {
    if (!selectedQuestion) {
      alert("No question selected.");
      return;
    }
  
    // Retrieve the correct output from the selected question
    const correctOutput = selectedQuestion.output;
  
    // Compare the user's arrangement (`tableZones`) with the correct output
    const isCorrect = tableZones.every((zone, index) => zone === correctOutput[index]);
  
    // Display the result
    //alert(isCorrect ? 'Right Answer!' : 'Wrong Answer!');
    if (isCorrect){
      setCorrect(true)
    
    }
    setOpen(true)
    
    //print(zone)
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
          <p><strong>Explanation:</strong> {selectedQuestion.explanation}</p>
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
            {correct?'Correct':'Wrong'}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Solution :{selectedQuestion.solution} 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Explanation :{selectedQuestion.explanation} 
          </Typography>
          <div style={{
            display:'flex',
            justifyContent:'space-between',
            margin:'5px'
          }}>
          <button  onClick={() => navigate(`/category/1/question/${parseInt(questionIndex) + 1}`)}>
            Next Question
          </button>
          <button className='modelButton' onClick={() => setOpen(false)}>
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
            backgroundColor:'#ffd700',
            color:'wh9te',
           
          }} onClick={()=>navigate('/category/2/question/0')}>Move to hard</button>
        
       
      </>
      )}
{selectedQuestion?
      <div className="table-wrapper">
        <div className="topzone">
          {e.length > 0 ? (
            <TopZone elements={e} acceptDrop={acceptDropToTop} />
          ) : (
            <h4 style={{ textAlign: 'center' }}>kuch hai nai yaha</h4>
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
              className="rotating-image"
            />
            <div className="tableoptions">
              {tableZones.map((text, index) => (
                <TableSide
                  key={index}
                  index={index}
                  currentText={text || 'nothing'}
                  acceptDrop={acceptDropToTableSide}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      :null}

     
    </div>
  );
}
