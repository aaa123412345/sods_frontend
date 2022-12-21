import React, { useState, useEffect, useRef  } from 'react'
import 'aframe'
import { connect } from 'react-redux';
import VRScene from './VRScene/VRScene';
import { useSpeechSynthesis } from 'react-speech-kit';
import { errorEN, errorZH, introductionEN, introductionZH } from '../../constants/constants';
import axios from 'axios';
import LoadingSpinner from '../TourGuideCanvas/common/LoadingSpinner/LoadingSpinner';

const VRCanvas = (props) => {

  const { vrTour, tourguide } = props
  const { host, language } = tourguide
  const { vrBoothID } = vrTour

  const path = "vr-tour"

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [speech, setSpeech] = useState(null)

  const onEnd = () => {};

  const { speak, speaking, voices } = useSpeechSynthesis({onEnd});


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

  useEffect(() => {

    axios.get(host+path)
    .then(res=>{
      let data = res.data.data
      setIsLoading(false)
      setError(null)
      let speech_zh = introductionZH.concat(data.speechZH)
      let speech_en = introductionEN.concat(data.speechEN)
      let speech = { zh: speech_zh, en: speech_en }
      setSpeech(speech)
    })
    .catch(err=>{
      setError(err)
      setIsLoading(false)
      console.log(err)
    })

  }, [vrBoothID])

  if(error !== null)
    return <div>{error.message}</div>
    
  if(isLoading || speech === null)
    return <LoadingSpinner />

  return (
  
    
    <div style={{position: 'absolute', height: '100%', width: '100%', zIndex: 2000, background: 'black'}}>
      <VRScene speak={()=>speak_speechIn(language)} />
    </div>
  
  )
}

const mapStateToProps = state => {
  return {
    tourguide: state.tourguide,
    vrTour: state.vrTour
  };
};

export default connect(
  mapStateToProps,
  null
)(VRCanvas)