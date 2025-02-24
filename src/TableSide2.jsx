import React from 'react';
import { useDrop } from 'react-dnd';

export default function TableSide2({ index, tableKey, currentText, acceptDrop }) {
    const [, dropRef] = useDrop(() => ({
        accept: 'box',
        drop: (item) => acceptDrop(item.id),
    }));

    const radius = 130; // Radius of the circular table
    const center = 50;

    // Labels for each side
    const positionLabels = ["First Side", "Second Side", "Third Side"];

    return (
        <div
            ref={dropRef}
            style={{
                width: '60px',
                height: '60px',
                position: 'absolute',
                top: `calc(${center}% + ${radius * Math.sin((index * 120 * Math.PI) / 180)}px)`,
                left: `calc(${center}% + ${radius * Math.cos((index * 120 * Math.PI) / 180)}px)`,
                border: '2px dashed #aaa',
                borderRadius: '50%',
                background: 'linear-gradient(312deg, rgba(0,27,84,1) 0%, rgba(115,134,255,1) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '14px',
                fontWeight: 'bold',
                marginTop: '80px',
                color: '#000220',
                textAlign: 'center',
                padding: '5px',
            }}
        >
            <div>{currentText}</div>
            <div style={{ fontSize: '12px', fontWeight: 'normal', marginTop: '30px',backgroundColor:'white',color:'black' }}>
                {positionLabels[index] || `Side ${index + 1}`}
            </div>
        </div>
    );
}
