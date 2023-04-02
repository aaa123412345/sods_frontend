import React, { useState, useEffect, useRef, useContext } from 'react'
import axios from 'axios'

import { connect } from 'react-redux'

import { useSpeechSynthesis } from 'react-speech-kit';

import styled from 'styled-components'
import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react'

import RoomHeader from './RoomHeader/RoomHeader'
import DialogDiplay from './DialogDisplay/DialogDiplay'
import MessageInput from './MessageInput/MessageInput'
import { UserContext } from '../../../App'
import { get_current_time } from '../../../helpers/formatDate'
import { greet, today, flow_dict, assistantHost } from '../../../constants/constants'
import { template_dict } from '../../../data/formTemplates'

const Room = (props) => {

    const { closeChat, switchLang, chatLang, isShowChat, animationIndex, setAnimationIndex, sysConfig } = props
    
    const { user } = useContext(UserContext)
    
    const initMessage = {
        sendTime: get_current_time(chatLang), 
        user_id: "bot", message: greet[chatLang],
        context_out: "", payload: "",
        predict_questions: [] 
    }

    const initDialogs = JSON.stringify([initMessage])

    const [dialogs, setDialogs] = useState(JSON.parse(sessionStorage.getItem('chat_history')??initDialogs))
    const [isWaiting, setIsWaiting] = useState(false)
    const [payload, setPayload] = useState("")
    const [chatContext, setChatContext] = useState("")

    const bottomRef = useRef()
    const bg = useColorModeValue('gray.10', 'gray.100')

    const { speak, voices } = useSpeechSynthesis();


    const speak_speech = (speech) => {

        let s =  speech.replace(/<\/?[a-z][a-z0-9]*[^<>]*>/img, '')
        console.log(s)
        let sentences = []
        sentences = s.split(/[.,!?]/)
        
        sentences.forEach((sentence, index) => {
            speak({text: sentence, voice: voices[2]})
        })
        
    }

    const get_request_body = (message) => {

        return { 
            sendTime: get_current_time(chatLang), 
            user_id: Number(user.userId), message: message, 
            context_in: dialogs[dialogs.length-1].context_out, payload: payload
        }
        
    }

    const update_payload = (message) => {
        // process context to update payload
        const context_fragment = chatContext.split('_')
        console.log('context_fragment_2:', context_fragment[0])
        if (context_fragment.length > 1 ){

            let type = context_fragment[0]
            let index = context_fragment[1]
            let newPayload = template_dict[type]

            if(payload !== "")
                newPayload = {...payload}
                
            newPayload[flow_dict[type][index]] = message
            setPayload({...newPayload})
            
        }else
            setPayload("")
    }

    const receive_response = (message_data) => {

        setIsWaiting(true)
        console.log('receiving response...')
        const header = { headers: { token: user.token } }

        axios.post(assistantHost + "/MLChats", message_data, header)
        .then(res=>{
            let responseData = res.data.data
            console.log(responseData)
            let robotResponseData = {...responseData, sendTime: get_current_time(chatLang), user_id: "bot"}
            setDialogs([...dialogs, message_data, robotResponseData])
            setIsWaiting(false)
            if(!window.speechSynthesis.speaking){
                speak_speech(responseData.message)
                setAnimationIndex(1)
            }
            
            sessionStorage.setItem('chat_history', JSON.stringify([...dialogs, message_data, robotResponseData]))
        })
        .catch(err=>{
            console.log(err.message)
            const errorMessage = {...initMessage, message: "Sorry, could you repeat again?", context_out: dialogs[dialogs.length-1].context_out}
            if(!window.speechSynthesis.speaking){
                speak_speech("Sorry, could you repeat again?")
                setAnimationIndex(1)
            }
            setDialogs([...dialogs, message_data, errorMessage])
            sessionStorage.setItem('chat_history', JSON.stringify([...dialogs, message_data, errorMessage]))
            setPayload("")
            setIsWaiting(false)
        })

    }

    const send_message = (message) => {
        
        update_payload(message)
        
        // process and send message
        let userMessageData = get_request_body(message)
        console.log('send: ', userMessageData)
        setDialogs([...dialogs, userMessageData])
        sessionStorage.setItem('chat_history', JSON.stringify(dialogs))

        receive_response(userMessageData)

    }

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior: 'auto'}); // scroll to bottom once received message
    }, [dialogs])

    useEffect(()=>{
        const id = setInterval(()=>{
            console.log('chatContext: ', chatContext)
        }, 1000)

        return ()=>clearInterval(id)
    }, [chatContext])

    useEffect(()=>{

        const id = setInterval(()=>{

            // console.log('animationIndex: ', animationIndex)
            // console.log('win.speech: ', window.speechSynthesis.speaking)
            if(!window.speechSynthesis.speaking && animationIndex === 1)
                setAnimationIndex(0)
        }, 1000)

        return () => clearInterval(id)
        
    },[animationIndex])

    return (
        <ChatContainer w={{base: '100vw', md: "400px"}} h={{base: '100vh', md: '550px'}} bg={bg}>
            
            <RoomHeader closeChat={closeChat} switchLang={switchLang} chatLang={chatLang} />
            
            <DialogDiplay bottomRef={bottomRef} dialogs={dialogs} chatLang={chatLang} sendMessage={(message)=>{send_message(message)}} isWaiting={isWaiting} animationIndex={animationIndex}/>
            
            <MessageInput sendMessage={(message)=>send_message(message)} chatLang={chatLang}/>
            
        </ChatContainer>
    )
}

const mapStateToProps = state => {
    return {
        sysConfig: state.sysConfig
    };
};

export default connect(
    mapStateToProps,
    null
)(Room)

const ChatContainer = styled(Box)`

    border-radius: 16px; overflow: hidden;
    box-shadow: 0px 5px 12px rgba(0, 0, 0, .2);

`