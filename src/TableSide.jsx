import React from 'react';
import { useDrop } from 'react-dnd';

export default function TableSide({ index, currentText, acceptDrop }) {
  const [, dropRef] = useDrop({
    accept: 'box',
    drop: (item) => acceptDrop(item.id, index),
  });

  // Generate position labels dynamically
  const positionLabels = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
  ];

  return (
    <div
      ref={dropRef}
      style={{
        width: "60px",
        marginTop: "80px",
        background: "linear-gradient(312deg, rgba(0,27,84,1) 0%, rgba(115,134,255,1) 100%)",
        height: "60px",
        position: "absolute",
        top: `calc(50% + ${190 * Math.sin((index * 45 * Math.PI) / 180)}px)`,
        left: `calc(50% + ${190 * Math.cos((index * 45 * Math.PI) / 180)}px)`,
        transform: "translate(-50%, -50%)",
        border: "2px dashed #aaa",
        borderRadius: "50%",
        backgroundColor: "#f0f0f0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "14px",
        fontWeight: "bold",
        textAlign: "center",
        padding: "5px",
      }}
    >
      <div>{currentText}</div>
      <div style={{ fontSize: "12px", fontWeight: "normal", marginTop: "20px",backgroundColor:'white',color:'black' }}>
        {positionLabels[index] || `Side ${index + 1}`}
      </div>
    </div>
  );
}
