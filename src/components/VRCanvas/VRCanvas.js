import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ref, getStorage, getDownloadURL, getBlob } from 'firebase/storage'

import axios from 'axios'

import 'aframe'
import { Scene, Entity } from 'aframe-react'

import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'

import { tourHost } from '../../constants/constants'
import { langGetter } from '../../helpers/langGetter'
import { storage } from '../../config/firebase'

// import { useSpeechSynthesis } from 'react-speech-kit';
// import { errorEN, errorZH, introductionEN, introductionZH } from '../../constants/constants';

const VRCanvas = (props) => {

  const { lang, id } = useParams()

  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const sceneRef = useRef()
  const vrImageRef = useRef()
  const [vrImage, setVRImage] = useState(null)

  const navigate = useNavigate()

  const download_vrImage = (url) => {
    console.log(url)
    const fileRef = ref(storage, url)
    const blob = getBlob(fileRef)
    const blobUrl = URL.createObjectURL(blob)
    setVRImage(blobUrl)
    // getDownloadURL(imageRef)
    // .then((url) => {
    //   // `url` is the download URL for 'images/stars.jpg'

    //   // This can be downloaded directly:
    //   const xhr = new XMLHttpRequest();
    //   xhr.responseType = 'blob';
    //   xhr.onload = (event) => {
    //     const blob = xhr.response;
    //   };
    //   // xhr.open('GET', url);
    //   // xhr.send();

    //   console.log('url: ', url)

    //   // Or inserted into an <img> element
    //   // const img = document.getElementById('vr-renderer');
    //   // img.setAttribute('src', url);
    //   // console.log(img)
    // })
    // .catch((error) => {
    //   // Handle any errors
    // });

  }

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
    navigate(`/public/${langGetter() === 'en' ? 'eng': 'chi'}/tourguide/booths/${id}`)
    window.location.reload(true); // for stopping the camera
  }

  useEffect(()=>{

    let url = `${tourHost}/booths/${id}`
    axios.get(url)
    .then((res)=>{
      let url = res.data.data.vrImageUrl
      if(url.length > 0){
        console.log(url)
        setError(null)
        setVRImage(url)
        // download_vrImage(url) 
      }

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


  return (
      
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

      {/* <image src={vrImage} height='100px'  width='100px'/> */}


      {/* <img src={vrImage}/> */}
      <Scene ref={sceneRef}>
        <a-asset>
          <img crossorigin="anonymous" src={vrImage ?? ""} id="vr-image"/>
        </a-asset>

        <Entity primitive='a-sky' id="vr-renderer" src={'#vr-image'} />
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