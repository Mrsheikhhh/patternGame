import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Group.css';
import TopZone from './TopZone';
import TableSide from './TableSide2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function Group({ levels }) {
    const { questionIndex } = useParams();
    const navigate = useNavigate();
    const [correct, setCorrect] = useState(false);
    const initialElements = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    
    const [elements, setElements] = useState(initialElements);
    const [e, setE] = useState(elements);

    // Store previous states for undo functionality
    const [previousState, setPreviousState] = useState(null);

    const [tableSides, setTableSides] = useState({
        one: Array(3).fill(null),
        two: Array(3).fill(null),
        three: Array(3).fill(null),
    });

    const selectedQuestion = levels[2]?.questions?.[questionIndex];

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setE(elements);
        setCorrect(false);
        setOpen(false);
    }, [questionIndex]);

    // Function to reset tables
    const resetTables = () => {
        setElements(initialElements);
        setTableSides({
            one: Array(3).fill(null),
            two: Array(3).fill(null),
            three: Array(3).fill(null),
        });
    };

    // Function to handle dropping an element onto a table
    const acceptDropToTableSide = (id, tableKey, sideIndex) => {
        setPreviousState({ elements: e, tableSides }); // Save current state before updating

        setTableSides((prev) => {
            const updatedSides = { ...prev };
            updatedSides[tableKey][sideIndex] = id;
            return updatedSides;
        });

        setE((prev) => prev.filter((element) => element !== id));
    };

    // Function to handle dropping an element back to the TopZone
    const acceptDropToTop = (id) => {
        setPreviousState({ elements: e, tableSides }); // Save current state before updating

        setE((prev) => (prev.includes(id) ? prev : [...prev, id]));
        setTableSides((prev) => {
            const updatedSides = { ...prev };
            Object.keys(updatedSides).forEach((key) => {
                updatedSides[key] = updatedSides[key].map((side) => (side === id ? null : side));
            });
            return updatedSides;
        });
    };

    // Undo function to revert to previous state
    const undoLastAction = () => {
        // Collect all elements from tableSides
        const movedElements = Object.values(tableSides).flat().filter(Boolean);
    
        // Move them back to TopZone without duplicates
        setE((prev) => [...new Set([...prev, ...movedElements])]);
    
        // Clear tableSides
        setTableSides({
            one: Array(3).fill(null),
            two: Array(3).fill(null),
            three: Array(3).fill(null),
        });
    };
    

    // Function to check the answer
    const submitFunction = () => {
        const correctOutput = selectedQuestion.output;
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
            setCorrect(true);
            setOpen(true);
        } else {
            setOpen(true);
        }
    };

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
                    <div className="topzone">
                        {e.length > 0 ? <TopZone elements={e} acceptDrop={acceptDropToTop} /> : <h4 style={{ textAlign: 'center' }}>EMPTY</h4>}
                    </div>
                    
                    <Modal open={open} onClose={handleClose}>
                        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: '#000220', color: 'white', border: '2px solid #000', boxShadow: 24, p: 4 }}>
                            <Typography variant="h6" component="h2" style={{ textAlign: 'center' }}>
                                {correct ? 'Correct' : 'Wrong'}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                Explanation: {selectedQuestion.explanation}
                            </Typography>
                            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px' }}>
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
                                        <img src="/Picsart_25-01-21_21-06-42-331.png" alt="Rotating Table" className="rotating-image" />
                                        <div className="tableoptions">
                                            {tableSides[tableKey].map((text, index) => (
                                                <TableSide key={index} index={index} tableKey={tableKey} currentText={text || '-'} acceptDrop={(id) => acceptDropToTableSide(id, tableKey, index)} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="buttons">
                      
                        <Button variant="contained" onClick={undoLastAction} className='modelButton' disabled={!previousState}>
                            Undo
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
