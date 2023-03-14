import React, { useState, useEffect, useRef } from 'react'

import { connect } from 'react-redux'

import styled from 'styled-components'
import { Flex, Input, useColorModeValue } from '@chakra-ui/react'

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import CustomButton from '../../../Common/common/CustomButton/CustomButton'

const MessageInput = (props) => {

    const { sendMessage, chatLang, sysConfig } = props
    const { config } = sysConfig
    const { themeColor } = config ?? 'gray'

    const [messageInput, setMessageInput] = useState('')

    const sendButtonRef = useRef()

    const bg = useColorModeValue('gray.10', 'gray.100')

    const placeholder = {
        en: 'Please input your question here...', 
        zh: '請在這裡輸入您的問題...'
    }

    const hanlde_sendMessage = () => {
        if(messageInput.length > 0){
            setMessageInput(''); 
            sendMessage(messageInput)
        }
    }

    const handle_keyDown = (e) => {
        if (e.key === 'Enter') 
            hanlde_sendMessage()
    }

    return (
        <InputContainer bg={themeColor}>
            <Input ref={sendButtonRef} value={messageInput} onChange={(e)=>{setMessageInput(e.target.value)}} 
                onKeyDown={handle_keyDown} placeholder={placeholder[chatLang]}
                m="0 1em " borderWidth="3px" bg={bg}/>
            <CustomButton faIcon={faPaperPlane} onClick={()=>{hanlde_sendMessage()}} isCircle/>
        </InputContainer>
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
)(MessageInput)

const InputContainer = styled(Flex)`

    align-items: center;
    height: 60px;
    bottom: 0;

    box-shadow: 0px -15px 15px -15px rgba(0, 0, 0, .4);

`