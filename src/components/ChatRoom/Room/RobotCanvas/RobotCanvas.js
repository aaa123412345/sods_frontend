import React from 'react'

import { Canvas } from '@react-three/fiber'

import Robot from './Robot-export-v05'

const RobotCanvas = (props) => {

    const { animationIndex } = props

    return (
        <Canvas className="robot-canvas"
            camera={{position: [1, 0, 2.5], fov:50}}>

            <ambientLight intensity={0.5}/>
            <directionalLight position={[-2, 5, 2]} intensity={1}/>

            <group position={[0, -3, -1.5]}>
                <Robot animationIndex={animationIndex}/>
            </group>
            
            <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -1, 0]} receiveShadow>
                <planeBufferGeometry args={[10, 10, 1, 1]}/>
                <shadowMaterial transparent opacity={0.2}/>
            </mesh>

        </Canvas>
    )
}

export default RobotCanvas