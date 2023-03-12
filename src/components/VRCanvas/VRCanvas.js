import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import axios from 'axios'

import 'aframe'
import { Scene, Entity } from 'aframe-react'

import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'

import { tourHost } from '../../constants/constants'
import { langGetter } from '../../helpers/langGetter'

// import { useSpeechSynthesis } from 'react-speech-kit';
// import { errorEN, errorZH, introductionEN, introductionZH } from '../../constants/constants';

const VRCanvas = (props) => {

  const { lang, id } = useParams()

  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isExit, setIsExit] = useState(false)

  const sceneRef = useRef()
  const [vrImage, setVRImage] = useState(null)

  const navigate = useNavigate()

  // const { vrTour, tourguide } = props
  // const { host, language } = tourguide
  // const { vrBoothID } = vrTour

  // const path = "vr-tour"

  // const [error, setError] = useState(null)
  // const [isLoading, setIsLoading] = useState(true)

  // const [speech, setSpeech] = useState(null)
  // const [isReady, setIsReady] = useState(false)
  // const [isSpeaking, setIsSpeaking] = useState(window.speechSynthesis.speaking)

  // const language = "en"

  // const onEnd = () => {};

  // const { speak, speaking, voices } = useSpeechSynthesis();


  // const speak_speechIn = (lang = "zh") => {

  //   let speech = "Good afternoon, I am a open day robot. Nice to meet you. Let's me introduce this facility to you first. "
  //   console.log('triggered: ', speech)
  //   let sentences = []
  //   let regex = lang === 'zh' ? /[^\u4e00-\u9fa5]/ : /[.,!?]/
  //   let langIndex = lang === "zh" ? 17 : 2

  //   // sentences = speech[lang].split(regex)
  //   sentences = speech.split(regex)
    
  //   sentences.forEach((sentence, index) => {
  //       speak({text: sentence, voice: voices[langIndex]})
  //   })
      
  // }

  // const handle_initVR = () => {
  //   setIsReady(true)
  // } 

  // useEffect(() => {

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

  // }, [])

  // useEffect(()=>{

  //   const id = setTimeout(()=>{
  //       speak_speechIn(language)
  //   }, 3000)

  //   return () => clearTimeout(id)

  // },[isReady])

  // if(error !== null)
  //     return <div>{error.message}</div>
      
  // if(isLoading || speech === null)
  //     return <LoadingSpinner />

  // useEffect(()=>{

  //   const id = setInterval(()=>{
        
  //       setIsSpeaking(window.speechSynthesis.speaking)
        
  //   },1000)

  //   return ()=>clearInterval(id)

  // }, [isSpeaking])

  const exit_to_map = () => {

    
    // navigator.mediaDevices
    // .getUserMedia()
    // .then((stream) => {
    //   /* use the stream */
    //   const tracks = stream.getTracks();
    //   tracks.forEach(track => track.stop());
    // })
    // .catch((err) => {
    //   /* handle the error */
    // });

    setIsExit(true)
    // let stream = videoElement.current.stream;

    // navigate(`/public/${langGetter() === 'en' ? 'eng': 'chi'}/tourguide/booths/${id}`)
  }

  useEffect(()=>{

    let url = `${tourHost}/booths/${id}`
    axios.get(url)
    .then((res)=>{
      setError(null)
      setVRImage(res.data.data.imageUrl)
        // console.log("updated from " + url + " successfully;")
    })
    .catch((err)=>{setError(err)})
    .finally(()=>{setIsLoading(false)})

    window.localStorage.setItem('i18n-lang', JSON.stringify(lang === 'eng' ? 'en' : 'zh'))

  }, [])

  if(error)
      return <div>{error.message}</div>

  if(isLoading)
    return <div>{t('tourguide.loading-vr')}</div>


  return !isExit && (
      
    <div style={{position: 'absolute', height: '100%', width: '100%', zIndex: 2000, background: 'black'}}>
    {/* { 
        !isReady ? 
        <ReadyButton onClick={()=>handle_initVR()}>Click to Ready</ReadyButton> 
        :
        <VRScene isSpeaking={isSpeaking}/>
        
    } */}

      <ExitButton onClick={()=>{exit_to_map()}}>
        <FontAwesomeIcon icon={faXmarkCircle} />
        {" " + t('tourguide.exit')}
      </ExitButton>

      <Scene ref={sceneRef}>
        <Entity primitive='a-sky' src={vrImage ?? ""}/>
      </Scene>
    </div>
  
  )
}

export default VRCanvas

// const ReadyButton = styled.button`
//     width: 100%; height: 100%;
//     background: white;
//     color: black;
//     font-size: 5rem;
//     cursor: pointer;
// `

const ExitButton = styled.button`

  position: fixed; z-index: 999;
  top: 1em; left: 1em;
  background: white;
  color: black;
  font-size: 1.5rem;
  border-radius: 25px;
  padding: .1em .5em;
  border-style: none;

  &:hover{
    opacity: .5;
  }

`