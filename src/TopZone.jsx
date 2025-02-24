import React from 'react';
import { useDrop } from 'react-dnd';
import Drag from './Drag';

export default function TopZone({ elements, acceptDrop }) {
    const [, dropRef] = useDrop(() => ({
        accept: 'box',
        drop: (item) => acceptDrop(item.id),
    }));

    return (
        <div
            ref={dropRef}
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: '60px',
                background: 'rgb(0,27,84)',
                background: 'linear-gradient(312deg, rgba(0,27,84,1) 0%, rgba(115,134,255,1) 100%)',
                minHeight: '80px',
                padding: '10px',
                border: '2px dashed #aaa',
                backgroundColor: '#cc7722',
            }}
        >
            {elements.map((e) => (
                <Drag id={e} itemName={e} key={e} />
            ))}
        </div>
    );
}
