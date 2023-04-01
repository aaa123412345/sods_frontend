/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 public/assets/robot-export-v05.gltf
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export const Robot = (props) => {

  const { animationIndex } = props
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/assets/robot-export-v05.gltf')
  const { actions, names } = useAnimations(animations, group)

  useEffect(()=>{
    actions[names[animationIndex]].reset().fadeIn(0.5).play()
    return ()=>{
      actions[names[animationIndex]].fadeOut(0.5)
    }
  }, [animationIndex])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Rig" position={[-0.08, -0.07, -0.14]} rotation={[-0.03, 0, -0.02]} scale={1.5}>
          <primitive object={nodes.root} />
          <group name="Arm_Lower">
            <skinnedMesh name="Cube002" geometry={nodes.Cube002.geometry} material={materials['Mat_White.001']} skeleton={nodes.Cube002.skeleton} />
            <skinnedMesh name="Cube002_1" geometry={nodes.Cube002_1.geometry} material={materials.Mat_Black} skeleton={nodes.Cube002_1.skeleton} />
          </group>
          <group name="Arm_Upper">
            <skinnedMesh name="Cube020" geometry={nodes.Cube020.geometry} material={materials.Mat_Black} skeleton={nodes.Cube020.skeleton} />
            <skinnedMesh name="Cube020_1" geometry={nodes.Cube020_1.geometry} material={materials.Mat_Orange} skeleton={nodes.Cube020_1.skeleton} />
          </group>
          <group name="Body">
            <skinnedMesh name="Cube015" geometry={nodes.Cube015.geometry} material={materials['Mat_White.001']} skeleton={nodes.Cube015.skeleton} />
            <skinnedMesh name="Cube015_1" geometry={nodes.Cube015_1.geometry} material={materials.Mat_Black} skeleton={nodes.Cube015_1.skeleton} />
          </group>
          <group name="Ears">
            <skinnedMesh name="Cube009" geometry={nodes.Cube009.geometry} material={materials['Mat_White.001']} skeleton={nodes.Cube009.skeleton} />
            <skinnedMesh name="Cube009_1" geometry={nodes.Cube009_1.geometry} material={materials.Mat_Black} skeleton={nodes.Cube009_1.skeleton} />
          </group>
          <skinnedMesh name="Face_Blur" geometry={nodes.Face_Blur.geometry} material={materials.Mat_FaceRender} skeleton={nodes.Face_Blur.skeleton} />
          <group name="Head">
            <skinnedMesh name="Cube014" geometry={nodes.Cube014.geometry} material={materials.Mat_White} skeleton={nodes.Cube014.skeleton} />
            <skinnedMesh name="Cube014_1" geometry={nodes.Cube014_1.geometry} material={materials.Mat_Orange} skeleton={nodes.Cube014_1.skeleton} />
          </group>
          <group name="Leg_Lower">
            <skinnedMesh name="Cube019" geometry={nodes.Cube019.geometry} material={materials['Mat_White.001']} skeleton={nodes.Cube019.skeleton} />
            <skinnedMesh name="Cube019_1" geometry={nodes.Cube019_1.geometry} material={materials.Mat_Black} skeleton={nodes.Cube019_1.skeleton} />
          </group>
          <group name="Leg_Upper">
            <skinnedMesh name="Cube016" geometry={nodes.Cube016.geometry} material={materials.Mat_Black} skeleton={nodes.Cube016.skeleton} />
            <skinnedMesh name="Cube016_1" geometry={nodes.Cube016_1.geometry} material={materials.Mat_Orange} skeleton={nodes.Cube016_1.skeleton} />
          </group>
          <group name="Screen">
            <skinnedMesh name="Cube003" geometry={nodes.Cube003.geometry} material={materials.Mat_Screen} skeleton={nodes.Cube003.skeleton} />
            <skinnedMesh name="Cube003_1" geometry={nodes.Cube003_1.geometry} material={materials.Mat_ScreenInner} skeleton={nodes.Cube003_1.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

export default Robot;

useGLTF.preload('/assets/robot-export-v05.gltf')
