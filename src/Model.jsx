import React from 'react'
import {Suspense,useEffect,useState}from 'react'
import { Canvas} from '@react-three/fiber'
import { OrbitControls,Preload,useGLTF } from '@react-three/drei'
function Model() {
    const mode=useGLTF('/holo-table/scene.gltf')


  return (
    <mesh>

        <hemisphereLight intensity={0.15} groundColor='white' />
        <pointLight intensity={1} />
        <primitive 
        
        object={mode.scene}
        scale={6.75}
        //position={[0,-3.25,-1.5]}
        />
       
        

    </mesh>
  )
}
const ModelCanvas=()=>{
    return(
        <Canvas 
        
        frameloop='demand'
        shadows
        camera={{position:[40,59,150],fov:7,aspect:window.innerWidth/window.innerHeight}}
        gl={{preserveDrawingBuffer:true}}
        >
            <Suspense>
            <OrbitControls 
            
            />
            <Model />
            </Suspense>
            <Preload all />
        </Canvas>
    )
}
export default ModelCanvas
