import React, { useState, useEffect, useRef } from 'react'

import { Scene, Entity } from 'react-aframe-ar'
import "arjs"
import 'aframe-extras'
import useWindowSize from '../../../hooks/useWindowSize'

const ARTreasure = (props) => {

    const { isLocked = true, setIsFound } = props

    const lockedModelUrl = "url(/assets/treasure-closed-v03.glb)"
    const unlockedModelUrl = 'url(/assets/treasure-v04.glb)'

    const sceneRef = useRef()
    const markerRef = useRef()

    const windowSize = useWindowSize()

    const handle_markerFound = () => {

        const marker = markerRef.current
        if(marker !== undefined){
            setIsFound(marker.object3D.visible)
        }

    }

    useEffect(()=>{

        // const id = setInterval(()=>{ handle_markerFound() }, 1000)
        // return () => clearInterval(id)

        const marker = markerRef.current

        if(marker !== undefined){
            setIsFound(marker.object3D.visible)
        }

    }, [markerRef?.current?.object3D?.visible])

    return (
        
      
        <Scene ref={sceneRef} 
            vr-mode-ui="enabled: false;" arjs="debugUIEnabled: false; patternRatio: 0.50; sourceType: webcam;" 
            renderer="logarithmicDepthBuffer: true" device-orientation-permission-ui="enabled: true">

            <a-marker type="pattern" preset="hiro" ref={markerRef}>
                
                {
                    isLocked && 
                    <a-entity gltf-model={lockedModelUrl} 
                        scale={`0.005 0.005 ${windowSize.width > 420 ? "0.0050" : "0.009"}`} rotation={`0 -90 ${windowSize.width > 420 ? "90" : "180"}`} animation-mixer="clip: *;" />
                }
                {
                    !isLocked &&
                    <a-entity gltf-model={unlockedModelUrl} 
                        scale={`0.005 0.005 ${windowSize.width > 420 ? "0.0050" : "0.009"}`} rotation={`0 -90 ${windowSize.width > 420 ? "90" : "180"}`} animation-mixer="clip: *;" />
                }

            </a-marker>

            <Entity primitive="a-camera"></Entity> 
                
        </Scene>

    )
}

export default ARTreasure