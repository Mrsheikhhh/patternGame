import React from 'react'
import { useDrop } from 'react-dnd'

export default function TableSide({index,currentText,acceptDrop}) {
    const [,dropRef]=useDrop({
        accept:'box',
        drop:(item)=>acceptDrop(item.id,index)
    })

    return (
        <div
          ref={dropRef}
          style={{
            width: "60px",
            marginTop:'80px',
            color:'#000220',
            height: "60px",
            position: "absolute",
            top: `calc(50% + ${190 * Math.sin((index * 45 * Math.PI) / 180)}px)`,
            left: `calc(50% + ${190 * Math.cos((index * 45 * Math.PI) / 180)}px)`,
            transform: "translate(-50%, -50%)",
            border: "2px dashed #aaa",
            borderRadius: "50%",
            backgroundColor: "#f0f0f0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {currentText}
        </div>
      );
}
