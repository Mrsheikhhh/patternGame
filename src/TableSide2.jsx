import React from 'react';
import { useDrop } from 'react-dnd';

export default function TableSide2({ index, tableKey, currentText, acceptDrop }) {
    const [, dropRef] = useDrop(() => ({
        accept: 'box',
        drop: (item) => acceptDrop(item.id),
    }));

    const radius = 130; // Radius of the circular table
    const center = 50;

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
                backgroundColor: '#f0f0f0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
                marginTop: '80px',
                color: '#000220',
            }}
        >
            {currentText}
        </div>
    );
}
