import React, { useState, useEffect, useRef } from 'react'

import { connect } from 'react-redux'

import styled from 'styled-components'
import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react'

import RoomHeader from './RoomHeader/RoomHeader'
import DialogDiplay from './DialogDisplay/DialogDiplay'
import MessageInput from './MessageInput/MessageInput'

const Room = (props) => {

    const { closeChat, switchLang, chatLang, sysConfig } = props
    // const { config } = sysConfig
    // const { themeColor } = config ?? 'gray'

    const bottomRef = useRef()

    const bg = useColorModeValue('gray.10', 'gray.100')

    const greet = {
        en: 'Hello! I\'m AI assistant. How may I help you?', 
        zh: '你好！我係智能助理，請問我點樣可以幫到你？'
    }

    const todayText = {
        en: "Today", 
        zh: "今天"
    }

    const today = new Date()

    const format_date = (date) => {

        let day = date.getDay()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        let dateDisplay = ""
        let today = new Date()
        if(day === today.getDay() && month === (today.getMonth() + 1) && year === today.getFullYear())
            dateDisplay += todayText[chatLang]

        let h = date.getHours() 
        h = h < 10 ? "0" + h : h
        let m = date.getMinutes() 
        m = m < 10 ? "0" + m : m
        let s = date.getSeconds()
        s = s < 10 ? "0" + s : s

        return `${dateDisplay} ${h}:${m}:${s}` 
    }

    const initMessage = {
        sender: 'bot', 
        message: greet[chatLang], 
        sendTime: format_date(today)
    }

    const initDialogs = JSON.stringify([initMessage])

    const [dialogs, setDialogs] = useState(JSON.parse(sessionStorage.getItem('chat_history')??initDialogs))

    const send_message = (message) => {

        let currentTime = new Date()
        let data = { sender: 'user', message: message, sendTime: format_date(currentTime)}
        console.log('send: ', data)
        let newList = [...dialogs]
        newList.push(data)
        setDialogs([...newList])
        sessionStorage.setItem('chat_history', JSON.stringify(newList))

    }

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior: 'smooth'}); // scroll to bottom once received message
    }, [dialogs])

    return (
        <ChatContainer w={{base: '100vw', md: "400px"}} h={{base: '100vh', md: '550px'}} bg={bg}>
            
            <RoomHeader closeChat={closeChat} switchLang={switchLang} chatLang={chatLang} />
            
            <DialogDiplay bottomRef={bottomRef} dialogs={dialogs} chatLang={chatLang} />
            
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