import React, { useState, useEffect, useRef } from 'react'
import 'aframe'
import * as THREE from 'three' 
import { Scene, Entity } from 'aframe-react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { modelFloatingAnim } from '../../../constants/constants'

const VRScene = (props) => {

    const { vrImage, isSpeaking } = props

    const [actions, setActions] = useState([]) // need to store all actions; 0: idle; 1: speck
    const [storedMixer, setStoredMixer] = useState(null) // need to store mixer 
    const [isLoaded, setIsLoaded] = useState(false)
    const [prevSpeaking, setPrevSpeaking] = useState(isSpeaking)

    // const boxRef = useRef(null)
        
    const modelUrl = '/assets/robot-export-v05.gltf'
    var mixer = null // for useEffect to render animation
    var clock = new THREE.Clock(); // for useEffect to render animation
    // var isSpeaking = false

    const loader = new GLTFLoader()

    const play_anim = (index) => {

        // index: 0 --> idle; 1 --> speak

        if(storedMixer !== null){

            storedMixer.stopAllAction() // prev action: action[0]
            actions[index === 1 ? 0 : 1].fadeOut(.1);
            const action = actions[index] // next action: actions[1]
            console.log('actions: ', actions)
            // action.reset();
            console.log('action: ', action)
            action.fadeIn(.1)
            action.play()

        }

    }

    const load_model = (isLoadModel = false) => {

        loader.load(modelUrl, (gltf) => {
    
            const entity = document.getElementById('robot')
            
            if(mixer === null){
                
                mixer = new THREE.AnimationMixer(gltf.scene)
                setStoredMixer(mixer)
                
                if(!isLoadModel)
                    entity.object3D.add(gltf.scene)
            
                const action = mixer.clipAction(gltf.animations[0])
                setActions([mixer.clipAction(gltf.animations[0]), mixer.clipAction(gltf.animations[1])])
                action.play()

            }
        
        })

    }

    const render_modelAnimation = () => {

        const id = setInterval(()=>{
            if(mixer !== null){
                var delta = 0.25 * clock.getDelta()
                mixer.update( delta );
            }
        }, 50)

        return ()=>setInterval(id)

    }

    useEffect(()=>{
        load_model()
    },[])

    useEffect(()=>{
        if(storedMixer === null || actions === null)
            load_model(true)
        else 
            setIsLoaded(true)
    },[storedMixer, actions])

    useEffect(()=>{
        render_modelAnimation() 
    }, [])

    useEffect(()=>{
            
        // if(isLoaded && boxRef.current !== undefined) {
        //     boxRef.current.addEventListener('click', function (e) { 
        //         if(!isSpeaking){
        //             isSpeaking = true    
        //             speak();
        //             play_anim(1)
        //         }
        //     });   

        // }

        // const id = setTimeout(()=>{
        //     play_anim(0)
        //     isSpeaking = false
        // }, 20000)

        // return ()=>clearTimeout(id)

    },[isLoaded])

    useEffect(()=>{

        if(prevSpeaking !== isSpeaking){
            play_anim(isSpeaking?1:0)
            setPrevSpeaking(isSpeaking)
        }


    },[isSpeaking])

    return (
        
        <Scene>
            {/* <a-text position="0 1 -2.5" color="white" value="Begin" rotation="0 0 0"></a-text> */}
            {/* <a-box ref={boxRef} position="1.28 1 -2.6" scale=" 2.8 .5 .1" color="black" rotation="0 0 0"></a-box> */}
            <Entity id="robot"  position="0 0 -3" animation__floating={modelFloatingAnim} />
            {
                vrImage === null || vrImage === undefined ? 
                <Entity primitive='a-sky' color="#303041" />
                :
                <Entity primitive='a-sky' src={vrImage}/>
            }
            {/* <a-camera>
                <a-cursor></a-cursor>
            </a-camera> */}
        </Scene>
        
    )
}

export default VRScene