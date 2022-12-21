import React, { useState, useEffect } from 'react'
import 'aframe'
import * as THREE from 'three' 
import { Scene, Entity } from 'aframe-react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { connect } from 'react-redux';

const VRCanvas = (props) => {

  const { vrTour } = props

  const { isShow } = vrTour

  const modelUrl = '/assets/robot-export-v05.gltf'
  const imageUrl = ["/images/test-360-classroom.jpg", "/images/test-360-library.jpg"]

  const [imageIndex, setImageIndex] = useState(0)
  const [actions, setActions] = useState([]) // need to store all actions
  const [storedMixer, setStoredMixer] = useState(null) // need to store mixer 

  var mixer = null // for useEffect to render animation
  var clock = new THREE.Clock(); // for useEffect to render animation

  const loader = new GLTFLoader()

  const change_state = () => { // change state test

    console.log("clicked: ", imageIndex)
    setImageIndex(imageIndex=>imageIndex===0?1:0)
    console.log('actions: ', actions)
    console.log('mixer: ', mixer)
    if(storedMixer !== null){

      storedMixer.stopAllAction() // prev action: action[0]
      const action = actions[1] // next action: actions[1]
      action.reset();
      action.fadeIn(.25)
      action.play()
    }

  }

  const animationFloating = {
    property: 'position',
    dur: 5000,
    dir: 'alternate',
    easing: 'easeInOutSine',
    loop: true,
    from: '0 0 -3',
    to: '.25 .25 -3'
  }

  const load_model = () => {

    loader.load(modelUrl, (gltf) => {
  
      const entity = document.getElementById('robot')
      
      if(mixer === null){
        
        mixer = new THREE.AnimationMixer(gltf.scene)
        setStoredMixer(mixer)
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

    if(isShow){
      load_model()
      render_modelAnimation()
    }    

  },[])

  return !isShow ? <></> : (
    <div style={{position: 'absolute', height: '100%', width: '100%', zIndex: 2000}}>
      {/* <button style={{position: 'absolute', top: 0, left: 0, zIndex: 2000}} onClick={()=>change_state()}>
        change state
      </button> */}
      <Scene>
        <Entity id="robot" position="0 0 -3"
          animation__floating={animationFloating} />
        <Entity primitive='a-sky' src={imageUrl[imageIndex]}/>
      </Scene>
    </div>
    
  )
}

const mapStateToProps = state => {
  return {
      vrTour: state.vrTour
  };
};

export default connect(
  mapStateToProps,
  null
)(VRCanvas)