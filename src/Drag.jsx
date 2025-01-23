import React from 'react';
import { useDrag } from 'react-dnd';

export default function Drag({ id, itemName }) {
    const [, dragRef] = useDrag(() => ({
        type: 'box',
        item: { id },
    }));

    return (
        <div
            ref={dragRef}
            style={{
              padding: '30px',
                margin: '5px',
                backgroundColor: 'white',
                color: 'black',
                borderRadius: '50%',
                cursor: 'grab',
            }}
        >
            {itemName}
        </div>
    );
}
