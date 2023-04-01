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

    const { closeChat, switchLang, chatLang, sysConfig } = props
    
    const { user } = useContext(UserContext)
    
    const initMessage = {
        sendTime: get_current_time(chatLang), 
        user_id: "bot", message: greet[chatLang],
        context_out: "", payload: "",
        predict_questions: [] 
    }

    const initDialogs = JSON.stringify([initMessage])

    const { speak, speaking, voices } = useSpeechSynthesis();

    const [animationIndex, setAnimationIndex] = useState(0)
    const [dialogs, setDialogs] = useState(JSON.parse(sessionStorage.getItem('chat_history')??initDialogs))
    const [isWaiting, setIsWaiting] = useState(false)
    const [payload, setPayload] = useState("")
    const [currentContext, setCurrentContext] = useState("")

    const bottomRef = useRef()
    const bg = useColorModeValue('gray.10', 'gray.100')

    const speak_speech = (speech) => {

        let sentences = []
        sentences = speech.split(/[.,!?]/)
        
        sentences.forEach((sentence, index) => {
            speak({text: sentence, voice: voices[2]})
        })
        
    }

    const get_request_body = (message) => {

        return { 
            sendTime: get_current_time(chatLang), 
            user_id: Number(user.userId), message: message, 
            context_in: currentContext, payload: payload
        }
        
    }

    const update_payload = (message) => {
        // process context to update payload
        const context_fragment = currentContext.split('_')
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

        console.log('token: ', user.token)
        axios.post(assistantHost + "/MLChats", message_data, header)
        .then(res=>{
            let responseData = res.data.data
            console.log(responseData)
            let robotResponseData = {...responseData, sendTime: get_current_time(chatLang), user_id: "bot"}
            setDialogs([...dialogs, message_data, robotResponseData])
            sessionStorage.setItem('chat_history', JSON.stringify([...dialogs, message_data, robotResponseData]))
            setCurrentContext(responseData.context_out)
            setIsWaiting(false)
            setAnimationIndex(1)
            speak_speech(responseData.message)
            
        })
        .catch(err=>{
            console.log(err.message)
            const errorMessage = {...initMessage, message: "Sorry, could you repeat again?"}
            setDialogs([...dialogs, message_data, errorMessage])
            setPayload("")
            setCurrentContext("")
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

        const id = setInterval(()=>{

            console.log('animationIndex: ', animationIndex)
            if(!window.speechSynthesis.speaking && animationIndex === 1)
                setAnimationIndex(0)
        }, 1000)

        return () => clearInterval(id)
        
    },[animationIndex])

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior: 'auto'}); // scroll to bottom once received message
        console.log('current_context:', currentContext)
        console.log('payload:', payload)
    }, [dialogs])

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