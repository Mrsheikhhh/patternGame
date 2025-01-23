import React, { useEffect, useState } from 'react'
import TopZone from './TopZone'
import TableSide from './TableSide'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './Table.css'
import Model from './Model';


export default function Table({result}) {
    const elements=['A','B','C','D','E','F','G','H']
    const [e,setE]=useState(elements)
    const [tableZones,setTableZones]=useState(Array(8).fill(null))
    
  const acceptDropToTop = (id) => {
    // Move element back to the top
    setE((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setTableZones((prev) => prev.map((zone) => (zone === id ? null : zone)));
  };
  const acceptDropToTableSide=(id,zoneIndex)=>{
   if(tableZones.includes(id)){
    
   }
   else{
    console.log('already not')
    console.log(zoneIndex)
    tableZones[zoneIndex]=id
    console.log(tableZones)
    setE((prev) => prev.filter((element) => element !== id));
   }
  }
   const undo=()=>{
    setE(['A','B','C','D','E','F','G','H'])
    setTableZones(Array(8).fill(null))
   }
   const Done=()=>{
    console.log(result)
    let m=true
   for(let i=0;i<tableZones.length;i++){
    console.log(tableZones)
    console.log(result)
    
        if(tableZones[i]!=result[i]){

          m=false
          console.log('wrong')
        }
   }
   if (!m){alert('wrong')}
    else{alert('right')}
   
   }
  return (
    <div >
      {e.length>1? <TopZone elements={e} acceptDrop={acceptDropToTop} />:<h4 style={{
        textAlign:'center'
      }}>kuch hai nai yaha</h4>}
    
      {/*<div
          style={{
            position: "relative",
            width: "300px",
            height: "300px",
            margin: "20px auto",
            borderRadius: "50%",
            border: "5px solid #333",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f8f8f8",
          }}
        >
          {tableZones.map((text,index)=>(
            <TableSide index={index} currentText={text||'nothing'} acceptDrop={acceptDropToTableSide} />
          ))}
          <p style={{ position: "absolute", fontSize: "18px", fontWeight: "bold" }}>Table</p>
       
</div>*/}
<div style={{
           display:'flex',
           justifyContent:'center',
           alignItems:'center',
            position:'absolute',
            top:300,
            height:200,
            width:200,
            left:400,
            color:'white',
        
        }}>
          <Model />
      </div>
<button onClick={undo}>Undo</button>
<button onClick={Done}>Submit</button>
    </div>
  )
}
