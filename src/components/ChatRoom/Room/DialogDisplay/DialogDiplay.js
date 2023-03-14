import React, { useState, useRef } from 'react'

import { connect } from 'react-redux'

import styled from 'styled-components'
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react'
import Bubble from './Bubble/Bubble'

const DialogDiplay = (props) => {

    const { bottomRef, dialogs, chatLang, sysConfig } = props

    const bg = useColorModeValue('gray.10', 'gray.100')

    return (
        <DialogDiplayContainer bg={bg}
            h={{base: `calc(100vh - 120px)`, md: `calc(550px - 120px)`}}
            maxH={{base: `calc(100vh - 120px)`, md: `calc(550px - 120px)`}}
            >
        
            {
                dialogs.map((dialog, index)=>(
                    <Bubble key={index} text={dialog.message} isBotSent={dialog.sender === 'bot'} chatLang={chatLang} sendTime={dialog.sendTime} />
                ))
            }

            <div ref={bottomRef}/>
        </DialogDiplayContainer>
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
)(DialogDiplay)

const DialogDiplayContainer = styled(Box)`

    overflow-y: scroll;
    overflow-x: hidden;

`