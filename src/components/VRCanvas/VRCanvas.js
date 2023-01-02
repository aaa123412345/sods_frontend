import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import 'aframe'
import VRScene from './VRScene/VRScene';
import { useSpeechSynthesis } from 'react-speech-kit';
import { errorEN, errorZH, introductionEN, introductionZH } from '../../constants/constants';

const VRCanvas = (props) => {

  // const { vrTour, tourguide } = props
  // const { host, language } = tourguide
  // const { vrBoothID } = vrTour

  // const path = "vr-tour"

  // const [error, setError] = useState(null)
  // const [isLoading, setIsLoading] = useState(true)
  const [speech, setSpeech] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(window.speechSynthesis.speaking)

  const language = "en"

  // const onEnd = () => {};

  const { speak, speaking, voices } = useSpeechSynthesis();


  const speak_speechIn = (lang = "zh") => {

    console.log('triggered: ', speech)
    let sentences = []
    let regex = lang === 'zh' ? /[^\u4e00-\u9fa5]/ : /[.,!?]/
    let langIndex = lang === "zh" ? 17 : 2

    sentences = speech[lang].split(regex)
    
    sentences.forEach((sentence, index) => {
        speak({text: sentence, voice: voices[langIndex]})
    })
      
  }

  const handle_initVR = () => {
    setIsReady(true)
  } 

  useEffect(() => {

    // axios.get(host+path)
    // .then(res=>{
    // let data = res.data.data
    //     setIsLoading(false)
    //     setError(null)
    // let speech_zh = introductionZH.concat(data.speechZH)
    // let speech_en = introductionEN.concat(data.speechEN)
    // let speech = { zh: speech_zh, en: speech_en }
    // setSpeech(speech)
    // })
    // .catch(err=>{
    //     setError(err)
    //     setIsLoading(false)
    //     console.log(err)
    // })

  }, [])

  useEffect(()=>{

    const id = setTimeout(()=>{
        speak_speechIn()
    }, 3000)

    return () => clearTimeout(id)

  },[isReady])

  // if(error !== null)
  //     return <div>{error.message}</div>
      
  // if(isLoading || speech === null)
  //     return <LoadingSpinner />

  useEffect(()=>{

    const id = setInterval(()=>{
        
        setIsSpeaking(window.speechSynthesis.speaking)
        
    },1000)

    return ()=>clearInterval(id)

  }, [isSpeaking])

  return (
      
    <div style={{position: 'absolute', height: '100%', width: '100%', zIndex: 2000, background: 'black'}}>
    { 
        !isReady ? 
        <ReadyButton onClick={()=>handle_initVR()}>Click to Ready</ReadyButton> 
        :
        <VRScene isSpeaking={isSpeaking}/>
        
    }
    </div>
  
  )
}

export default VRCanvas

const ReadyButton = styled.button`
    width: 100%; height: 100%;
    background: white;
    color: black;
    font-size: 5rem;
    cursor: pointer;
`