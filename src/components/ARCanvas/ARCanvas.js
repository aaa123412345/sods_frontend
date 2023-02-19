import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import { Scene, Entity } from 'react-aframe-ar'
import "arjs"
import 'aframe-extras'


const ARCanvas = () => {


    const modelUrl = "url(/assets/treasure-closed-v03.glb)"

    const sceneRef = useRef()

    const [isShow, setIsShow] = useState(false)
    const [arController, setARController] = useState(null)

    return (
        <div>
      
            <Scene ref={sceneRef} 
                vr-mode-ui="enabled: false;" arjs="debugUIEnabled: false; patternRatio: 0.75; sourceType: webcam;" 
                renderer="logarithmicDepthBuffer: true"
                device-orientation-permission-ui="enabled: true">

                <a-marker preset="hiro"> 
                    <a-entity gltf-model={modelUrl} scale="0.005 0.005 0.009" rotation="0 -90 90" animation-mixer="clip: *;" />
                </a-marker>

                <Entity primitive="a-camera"></Entity> 
                    
            </Scene>
        </div>
    )
}

export default ARCanvas 




const ARContainer = styled.div`

    position: fixed; top: 0; left: 0;
    max-width: 800px; max-height: 800px;
    overflow: hidden;
    border: 1px red solid;

`