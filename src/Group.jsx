import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Group.css'; // Import the adapted CSS
import TopZone from './TopZone';
import TableSide from './TableSide2'; // Reuse the TableSide component

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function Group({ levels }) {
    const { questionIndex } = useParams();
    const navigate = useNavigate();
    const [correct,setCorrect]=useState(false)
    const [elements, setElements] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','I']);
    const [e, setE] = useState(elements);

    const [tableSides, setTableSides] = useState({
        one: Array(3).fill(null), // Table 1 sides
        two: Array(3).fill(null), // Table 2 sides
        three: Array(3).fill(null), // Table 3 sides
    });

    const selectedQuestion = levels[3]?.questions?.[questionIndex];
        const [open, setOpen] = React.useState(false); // Modal starts closed
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
    const resetTables = () => {
        setElements(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','I']);
        setTableSides({
            one: Array(3).fill(null),
            two: Array(3).fill(null),
            three: Array(3).fill(null),
        });
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

    const acceptDropToTableSide = (id, tableKey, sideIndex) => {
        setTableSides((prev) => {
            const updatedSides = { ...prev };
            updatedSides[tableKey][sideIndex] = id; // Update the specific table and side
            return updatedSides;
        });

        setE((prev) => prev.filter((element) => element !== id)); // Remove the element from the TopZone
    };

    const acceptDropToTop = (id) => {
        setE((prev) => (prev.includes(id) ? prev : [...prev, id]));
        setTableSides((prev) => {
            const updatedSides = { ...prev };
            Object.keys(updatedSides).forEach((key) => {
                updatedSides[key] = updatedSides[key].map((side) => (side === id ? null : side));
            });
            return updatedSides;
        });
    };

    const submitFunction = () => {
        const correctOutput = selectedQuestion.output 
        console.log(correctOutput)

        const userOutput = {
            group1: tableSides.one,
            group2: tableSides.two,
            group3: tableSides.three,
        };

        const isCorrect = Object.keys(correctOutput).every(
            (key) =>
                JSON.stringify(correctOutput[key].sort()) ===
                JSON.stringify(userOutput[key].sort())
        );

        if (isCorrect) {
          //  alert("You are right!");
            setCorrect(true)
            setOpen(true)
        } else {
           // alert("Your answer is incorrect. Try again.");
            setOpen(true)
        }
    };
useEffect(()=>{
 handleClose()
},[])
    return (
        <div className="group-container">
            {selectedQuestion ? (
                <>
                    <div className="group-question">
                        <h3>
                            Question: {selectedQuestion.id} - {selectedQuestion.question}
                        </h3>
                        <p><strong>Constraints:</strong></p>
                        <ul>
                            {selectedQuestion.constraints.map((constraint, index) => (
                                <li key={index}>{constraint}</li>
                            ))}
                        </ul>
                        <p><strong>Explanation:</strong> {selectedQuestion.explanation}</p>
                    </div>

                    {e && e.length > 0 ? (
                        <div className="topzone">
                            <TopZone elements={e} acceptDrop={acceptDropToTop} />
                        </div>
                    ) : (
                        <h4 style={{ textAlign: 'center' }}>kuch hai nai yaha</h4>
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
            {correct?'Correct':'Wrong'}
          </Typography>
         {/*} <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Solution :{selectedQuestion.solution} 
          </Typography>*/}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Explanation :{selectedQuestion.explanation} 
          </Typography>
          <div style={{
            display:'flex',
            justifyContent:'space-between',
            margin:'5px'
          }}>
          <button className='modelButton' onClick={() => navigate(`/category/2/question/${parseInt(questionIndex) + 1}`)}>
            Next Question
          </button>
          <button className='modelButton' onClick={() => setOpen(false)}>
            Try Again
          </button>
          </div>
        </Box>
      </Modal>
                    

                    <div className="tables-section">
                        {Object.keys(tableSides).map((tableKey) => (
                            <div key={tableKey} className="single-table-wrapper">
                                <h4 className="table-title">Table {tableKey}</h4>
                                <div className="table-options">
                                    <div className="rotating-image-container">
                                        <img
                                            src="/Picsart_25-01-21_21-06-42-331.png"
                                            alt="Rotating Table"
                                            className="rotating-image"
                                        />
                                        <div className="tableoptions">
                                            {tableSides[tableKey].map((text, index) => (
                                                <TableSide
                                                    key={index}
                                                    index={index}
                                                    tableKey={tableKey} // Pass the table key
                                                    currentText={text || 'nothing'}
                                                    acceptDrop={(id) => acceptDropToTableSide(id, tableKey, index)} // Handle drop for specific table and side
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="buttons">
                        <Button variant="contained" onClick={resetTables} className='modelButton'>
                            Reset
                        </Button>
                        <Button variant="contained" onClick={submitFunction} className='modelButton'>
                            Submit
                        </Button>
                    </div>
                </>
            ) : (
                <p>No question available</p>
            )}
        </div>
    );
}
